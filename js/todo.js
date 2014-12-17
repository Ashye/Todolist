/* App Global Part */
function init() {

	console.log("init..............");

	$(document).on("pagecreate", "#pageTodo", function() {
		debug("page todo on pagecreate");
		// clearEventsOnlocalStorage();
		loadTodoEvents();

	});
	
	$(document).on("pageshow", "#pageTodo", function() {
		debug("page todo on pageshow");
		if(eventsDo && eventsDo.dirty) {
			debug("need refresh Todo list here....")


			eventsDo.dirty = false;
		}
	});

	$(document).on("pageshow", "#pageNewEvent", function() {
		debug("page newevent on pageshow");
		$("#newEvtDiscard").on("click", discardEvent);
		$("#newEvtSave").on("click", saveEvent);

		
	});


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
// {
//     "d": [],
//     "w": [],
//     "o": [],
//     "g": []
//     "System": {}
// }
var eventsDo = {
	dirty: false,
	list: []
};
var eventsWait = {
	dirty: false,
	list: []
};
var eventDone = {
	dirty: false,
	list: []
};
var eventGv = {
	dirty: false,
	list: []
};

function addNewThing(thing) {
	if (thing) {
		if (!eventsDo.list) {
			eventsDo.list = [];
		}

		if (eventsDo.list.length <3) {
			eventsDo.list.push(thing);
			eventsDo.dirty = true;
			debug(eventsDo);
			// localStorage.setItem("d",JSON.stringify(eventsDo));
		}else {
			if (!eventsWait.list) {
				eventsWait.list = [];
			}
			eventsWait.list.push(thing);
			eventsWait.dirty = true;
			debug(eventsWait);
			// localStorage.setItem("w",JSON.stringify(eventsWait));
		}

	}
}

function loadTodoEvents() {
	var things = localStorage.getItem("d");
	eventsDo.list = JSON.parse(things);
	eventsDo.dirty = true;
	debug(eventsDo);
}

function saveEvents(type) {


}

function clearEventsOnlocalStorage() {
	localStorage.clear();
}


/* Event prototype definition */
function Thing(text, mark) {
	this.text = text;
	this.cTime = new Date();
	/* 0: give up  	1:done 		2:wait 		3:doing */
	this.status = 2;
	/* 0:normal		1:important 	2: imergency */
	this.mark = mark || 0;
}

Thing.prototype = {
	constructor: Thing,

	toString: function() {
		return "text:"+this.text+"\n time:"+this.cTime.toUTCString()
		+"\n status:"+this.status+"\n mark:"+this.mark;
	}
};





/* Todo Page Part */





/* New Event Page Part */
function discardEvent(event) {
	// debug("don't save new event and exit");
	// toast('this is toast test');
	setTimeout(function() {
		document.getElementById('formNewEvent').reset();
	}, 500);

	
}

function saveEvent(event) {
	// debug("save new event and exit");
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
	 // var jstr = JSON.stringify(thing);
	 // debug(typeof(jstr))
	 // var jsonsdf = JSON.parse(jstr);
	// debug("eventsDo:"+jsonsdf);
	setTimeout(function() {
		document.getElementById('formNewEvent').reset();
	}, 500);
	history.back();
}
