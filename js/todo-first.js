/* App Global Part */
var eventsDo ;
var eventsWait ;
function init() {

	console.log("init..............");

	$(document).on("pageinit", "#pageTodo", function(event) {
		debug("page todo on pageinit");
		if (!eventsDo) {
			eventsDo = new EventList('d');
		}

		if (!eventsWait) {
			eventsWait = new EventList('w');
		}



		$(document).on("click", "#pageTodo", function(event){
			// debug("sssssssssssssssssssssssssss click");
		});

		$(document).on("click", "#pageWaitEvent", function(event){
			// debug("sssssssssssssssssssssssssss click");
		});

		$(document).on("swipeleft", "#pageTodo", function(event){
			// debug("sssssssssssssssssssssssssss wipe left");
			$('#awaitPage').eq(0).click();

			return true;
		});

		eventsDo.loadFromLocal();


	});


	$(document).on("pageshow", "#pageTodo", function() {
		debug("page todo on pageshow");

		refreshTodoPageUI();

	});



	$(document).on("pageinit", "#pageNewEvent", function() {
		debug("page newevent on pageinit");
		$("#newEvtDiscard").on("click", discardEvent);
		$("#newEvtSave").on("click", saveEvent);


	});


	$(document).on("pageinit", "#pageWaitEvent", function(){
		debug("page WaitEvent on pageinit");
		if (!eventsWait) {
			eventsWait = new EventList('w');
		}


		$("#itemListWait>#todoNoItem").on("click", function(event){
			// $("#itemListWait>a").eq(0).click();
			debug("click");

		}); 
		$("#itemListWait>#todoNoItem").on("mousedown touchstart", function(event){
			debug("down");
			$("#itemListWait>#todoNoItem").removeClass('item-event');
			$("#itemListWait>#todoNoItem").addClass('item-event-active');

		}); 
		$("#itemListWait>#todoNoItem").on("mouseup touchend", function(event){
			// $("#itemListWait>a").eq(0).click();
			debug("up");
			$("#itemListWait>#todoNoItem").removeClass('item-event-active');
			$("#itemListWait>#todoNoItem").addClass('item-event');
		}); 

		$(document).on("swiperight", "#pageWaitEvent", function(event){
			// debug("sssssssssssssssssssssssssss wipe right");
			$('#atodoPage').eq(0).click();

			return true;
		});
	})


}

function debug(e) {
	console.log(e);
}

function toast(text) {
	$('#toast').html('<p>'+text+'</p>');
	document.getElementById('toastStart').click();
	setTimeout(function() {
		$('#toast').popup('close');
	}, 2000);
}

function isArray(o) { 
	return Object.prototype.toString.call(o) === '[object Array]'; 
}




/* localStorage */
function addNewThing(thing) {
	if (thing) {
		debug("add thine "+thing.text)

		if (eventsDo.list.u.length +eventsDo.list.i.length+eventsDo.list.n.length <5) {
			eventsDo.add(thing);
			debug(eventsDo);
			// localStorage.setItem("d",JSON.stringify(eventsDo));
		}else {
			eventsWait.add(thing);
			debug(eventsWait);
			// localStorage.setItem("w",JSON.stringify(eventsWait));
		}

	}
}

function clearEventsOnlocalStorage() {
	localStorage.clear();
	eventsDo.list.u.shift();
	eventsDo.list.i.shift();
	eventsDo.list.n.shift();
	refreshTodoPageUI();
}




/* Event prototype definition */
function Thing(text, mark) {
	this.text = text;
	this.cTime = new Date();
	/* 0: give up  	1:done 		2:wait 		3:doing */
	this.sta = 2;
	/* 0:normal		1:important 	2: imergency */
	this.mark = mark || 0;
}
Thing.prototype = {
	constructor: Thing,

	toString: function() {
		return "text:"+this.text+"\n time:"+this.cTime.toUTCString()
		+"\n status:"+this.sta+"\n mark:"+this.mark;
	}
};


function EventList(type) {
	this.type = type || "w";
	this.list = {'n':[],
				'i':[],
				'u':[]
			};
	this.dirty = {
				'n':false,
				'i':false,
				'u':false
			};
				
}
EventList.prototype = {
	constructor: EventList,

	add: function (thing) {

		switch(thing.mark) {
			case 'U':
			case 'u':
				this.list.u.push(thing);
				this.dirty.u = true;
				break;
			case 'i':
			case 'I':
				this.list.i.push(thing);
				this.dirty.i = true;
				break;
			case 'n':
			case 'N':
				this.list.n.push(thing);
				this.dirty.n = true;
				break;
			default:
				debug("EventList.add unknown event mark");
		}

	},
	length: function() {
		var len = 0;
		if (this.list.n.length) {
			len+= this.list.n.length;
		}
		if (this.list.i.length) {
			len+= this.list.i.length;
		}
		if (this.list.u.length) {
			len+= this.list.u.length;
		}
		return len;
	},
	loadFromLocal: function () {
		// if (window.localStorage) {
		var data = localStorage.getItem(this.type);
		if(data){
				this.list = JSON.parse(data);
			if (this.list) {
				this.dirty.u = this.list.u.length>0;
				this.dirty.i = this.list.i.length>0;
				this.dirty.n = this.list.n.length>0;
			}
		}
		debug(this);
	// }

	},
	saveToLocal: function () {

	},
	clearLocal: function(){
		localStorage.clear(this.type);
	}
};




/* Todo Page Part */
function refreshTodoPageUI() {

	//update navbar
	// $('#tabTodo ul li a').first().text('进行中('+eventsDo.length()+')');
	// $('#tabTodo ul li a').last().text('排队('+eventsWait.length()+')');


	//update events by event's mark
	if (eventsDo.dirty.u) {
		// debug(eventsDo.list.u.length);
		$('#urgent h1 span').text(eventsDo.list.u.length);

		var tag_ol = document.getElementById('urgentTodo');

		if (eventsDo.list.u.length > 0) {
			if (tag_ol.getAttribute("hidden") == "hidden") {
				debug("first add  todo event")

				tag_ol.removeAttribute("hidden");
				$('#urgent #todoNoItem').attr('hidden', 'hidden');
			}

			//add event ui show
			$('#urgentTodo').empty();
			for(var idx=0; idx< eventsDo.list.u.length; idx++) {
				var li = todoEventsHtmlAppend(eventsDo.list.u[idx]);
				if (idx <eventsDo.list.u.length-1) {
					li.innerHTML += "<hr>";
				}
				tag_ol.appendChild(li);
			}
			
		}else {
			tag_ol.setAttribute('hidden', 'hidden');
			$('#urgent #todoNoItem').removeAttr('hidden');
		}
		debug("later add todo event");
	}
	if (eventsDo.dirty.i) {
		// debug(eventsDo.list.i.length);
		$('#important h1 span').text(eventsDo.list.i.length);
		var tag_ol = document.getElementById('importantTodo');

		if (eventsDo.list.i.length > 0) {
			if (tag_ol.getAttribute("hidden") == "hidden") {
				debug("first add  todo event")

				tag_ol.removeAttribute("hidden");
				$('#important #todoNoItem').attr('hidden', 'hidden');
			}

			//add event ui show
			$('#importantTodo').empty();
			for(var idx=0; idx< eventsDo.list.i.length; idx++) {
				var li = todoEventsHtmlAppend(eventsDo.list.i[idx]);
				if (idx <eventsDo.list.i.length-1) {
					li.innerHTML += "<hr>";
				}
				tag_ol.appendChild(li);
			}
			
		}else {
			tag_ol.setAttribute('hidden', 'hidden');
			$('#important #todoNoItem').removeAttr('hidden');
		}
		debug("later add todo event");
	}
	if (eventsDo.dirty.n) {
		// debug(eventsDo.list.n.length);
		$('#normal h1 span').text(eventsDo.list.n.length);
		var tag_ol = document.getElementById('normalTodo');

		if (eventsDo.list.n.length > 0) {
			if (tag_ol.getAttribute("hidden") == "hidden") {
				debug("first add  todo event")

				tag_ol.removeAttribute("hidden");
				$('#normal #todoNoItem').attr('hidden', 'hidden');
			}

			//add event ui show
			$('#normalTodo').empty();
			for(var idx=0; idx< eventsDo.list.n.length; idx++) {
				var li = todoEventsHtmlAppend(eventsDo.list.n[idx]);
				if (idx <eventsDo.list.n.length-1) {
					// li.appendChild(document.createElement('hr'));
					// debug(li.innerHTML);
					li.innerHTML += "<hr>";
				}
				tag_ol.appendChild(li);
			}
			
		}else {
			tag_ol.setAttribute('hidden', 'hidden');
			$('#normal #todoNoItem').removeAttr('hidden');
		}
		debug("later add todo event");
	}

}

function refreshWaitPageUI() {

}

function itemEventHtmlAppend(thing) {
	var tag_div = document.createElement("div");
	tag_div.innerHTML = "<div class='item-event ui-corner-all'><span>"+thing.text
						+"</span></div>";

	return tag_div;
}

function todoEventsHtmlAppend(thing) {
	var tag_li = document.createElement("li");
	var innerHtml = "<p style='word-wrap:break-word;'>"+thing.text+"</p>"
					+"<a href='#' class='ui-btn ui-btn-shdown ui-btn-inline ui-mini ui-corner-all ui-icon-edit ui-btn-icon-notext ui-alt-icon'></a>"
					+"<a href='#' class='ui-btn ui-btn-shdown ui-btn-inline ui-mini ui-corner-all ui-icon-check ui-btn-icon-notext ui-alt-icon'></a>"
					+"<a href='#' class='ui-btn ui-btn-shdown ui-btn-inline ui-mini ui-corner-all ui-icon-delete ui-btn-icon-notext ui-alt-icon'></a>"
	tag_li.innerHTML = innerHtml;
	return tag_li; 
}







/* New Event Page Part */
function discardEvent(event) {
	// debug("don't save new event and exit");
	// toast('this is toast test');
	setTimeout(function() {
		document.getElementById('formNewEvent').reset();
	}, 500);

	
}

function saveEvent(event) {
	debug("save new event and exit    event type:"+event.type +" eventPhase:"+event.eventPhase);
	var mark = $('input[name="radio-mark-b"]:checked').val();
	var text = $('#eventText').val();
	// debug('mark: '+mark);

	if (!text) {
		toast("the Event's content can't been blank!");
		return;
	}

	var thing = new Thing();
	thing.mark = mark;
	thing.text = text;

	addNewThing(thing);

	setTimeout(function() {
		document.getElementById('formNewEvent').reset();
	}, 500);
	history.back();

	event.bubbles = false;
	event.cancelable = true;
	event.preventDefault();
	event.stopPropagation();
	return false;
}
