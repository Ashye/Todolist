function Thing(text,extra) {
	this.text = text||"Thing one";
	this.extra = extra|| "this is the thing one 's extra information";
	this.cTime = new Date().getTime();
	this.phase = 0;
	/* 0:normal		1:important 	2: imergency */
	this.mark = 0;
}
Thing.prototype = {
	constructor: Thing,
	setMark: function(m) {
		if (m) {
			this.mark = m;
		}
	},
	getMark: function() {
		return this.mark;
	},
	setExtra: function(info) {
		if (info) {
			this.extra = info;
		}
	},
	setPhase: function(ph) {
		if (ph) {
			this.phase = ph;
		}
	},
	toHtml: function() {
	//<li data-icon="arrow-d"><a href="#">this</a></li>
/*
 		var divThing = document.createElement("div");
		var pText = document.createElement("p");
		pText.innerHTML = this.text;
		divThing.appendChild(pText);
		
		if (this.extra && this.extra.length >0) {
			var divExtra = document.createElement("div");
			
			var pExtra = document.createElement("p");
			pExtra.innerHTML = this.extra;
			
			divExtra.appendChild(pExtra);
			divThing.appendChild(divExtra);
		}
		*/
		
		var divThing = document.createElement("a");
		divThing.setAttribute("href", "#");
		//"ui-btn ui-btn-icon-right ui-icon-arrow-r"
		//"ui-btn ui-btn-icon-right ui-icon-carat-r"
		var btnStyle = "ui-btn ui-btn-icon-left";
		switch (this.mark) {
			case "1":
				btnStyle += " ui-icon-alert";
				break;
			case "2":
				btnStyle += " ui-icon-star";
				break;
			default:
				btnStyle += " ui-icon-info";
				break;
		}
		
		//$(divThing).addClass("ui-btn ui-btn-icon-right ui-icon-carat-r");
		$(divThing).addClass(btnStyle);
		divThing.innerHTML = this.text;
		
		//debug(divThing);
		return divThing;
	}
};