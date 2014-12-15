// app init fucntion
function init() {
	// $(document).ready(function() {
		console.log("ready..............");
	// 	$("#newEvtDiscard").on("click", discardEvent);
	// 	$("#newEvtSave").on("click", saveEvent);
		
	// });

	$(document).on("pageshow", "#pageNewEvent", function() {
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
	}, 1500);
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
function discardEvent() {
	debug("don't save new event and exit");
	toast('this is toast test');
}

function saveEvent() {
	// debug("save new event and exit");
	var mark = $('input[name="radio-mark-b"]:checked').val();
	var text = $('#eventText').val();
	// debug('mark: '+mark);

	if (!text) {
		alert("input event content please!!!!!");
		return;
	}

	var thing = new Thing();
	thing.mark = mark;
	thing.text = text;
	debug(thing.toString());
}
