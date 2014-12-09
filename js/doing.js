
var daylyWords = ["【一次不要做太多事情哦】",
					"【集中精神，效率会高很多哦】"];
var touchX;
var touchY;

var hintIdx = 0;
function init() {
/* 	var docElm = document.documentElement;
	if (docElm.requestFullscreen) {
		docElm.requestFullscreen();
	}
	else if (docElm.mozRequestFullScreen) {
		docElm.mozRequestFullScreen();
	}
	else if (docElm.webkitRequestFullScreen) {
		docElm.webkitRequestFullScreen();
	} */
	
	$(document).on("pageshow", "#home", function(){
		//debug(daylyWords[1]);
		alterHint();
	});
	
	$(document).ready(function() {
		//debug("sssssssssss");
		//setInterval(alterHint, 1000);
	});
	
	$(document).on("pageinit", "#addThing", function() {
		$("#addThingSave").on("tap", getNewThing);
		
	});
}

function alterHint() {
	hintIdx +=1;
	if (hintIdx >=daylyWords.length) {
		hintIdx = 0;
	}
	$("#doingHint").text(daylyWords[hintIdx]);
}

function getNewThing(e) {
	var text = $("#thingText").val();
	var extra = $("#thingExtra").val();
	var mark = $("input:checked[name='mark']").val();
	var thing = new Thing(text, extra);
	
	thing.setMark(mark);
	addThing(thing);
	document.getElementById("addThingForm").reset();
	history.back();
}

function addThing(thing) {
	var ul = document.getElementById("doingList");
	var li = document.createElement("li");
	li.appendChild(thing.toHtml());
	// li.addEventListener("touchstart", touchStart, false);
	// li.addEventListener("touchmove", touchMove, false);
	// li.addEventListener("touchend", touchEnd, false);
	// li.on("swipeleft", showOpMenu());
	//$(li).on("swipeleft", showOpMenu);

	$(li).on("mousedown mousemove mouseup", touchHandler);

	if (ul.childElementCount === 0) {
		var bro = $(ul).prevAll("p");
		if(bro) {
			bro.hide();
		}
	
		$(li).addClass("ui-first-child");
		$(li).addClass("ui-last-child");
		ul.appendChild(li);
	}else {
		var last = ul.lastElementChild;
		if (ul.childElementCount == 1) {
			$(last).removeClass("ui-last-child");
		}
		$(li).addClass("ui-last-child");
		ul.appendChild(li);
	}
//	debug(ul.innerHTML);
}

function touchHandler(event) {
	switch(event.type) {
		case "mousedown":
			// debug("mouse down event");
			break;
		// case "mousemove":
		// 	debug("mouse move event");
		// 	break;
		case "mouseleave":
			debug("mouse leave event");
			break;
		case "mouseup":
			debug("mouse up event");
			break;

	}
}

function touchStart(event) {
//	debug("touchStart");
	event.preventDefault();

	if(!event.touches.length) {
		return;
	}
	var touch = event.touchs[0];
	touchX = touch.pageX;
	touchY = touch.pageY;

	$("li").sytle.left = touchX+"px";
	$("li").style.top = touchY +"px";
}

function touchMove(event) {
	event.preventDefault();

	if(!event.touches.length) {
		return;
	}
	var touch = event.touchs[0];
	touchX = touch.pageX;
	touchY = touch.pageY;

	$("li").style.left = touchX+"px";
	$("li").style.top = touchY +"px";
}

function touchEnd(event) {
	event.preventDefault();


	debug("touch leaving....");
}

function showOpMenu() {
	debug("swiping left........");
}

function debug(info) {
	alert(info);
}

function winopen() {
	window.open("#home");
	window.back();
}
