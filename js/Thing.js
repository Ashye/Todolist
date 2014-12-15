function Thing(text, mark) {
	this.text = text||"Thing one";
	this.cTime = new Date();
	/* 0: give up  	1:done 		2:wait 		3:doing */
	this.phase = 2;
	/* 0:normal		1:important 	2: imergency */
	this.mark = mark || 0;
}
Thing.prototype = {
	constructor: Thing,

};