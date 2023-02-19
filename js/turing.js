var curTransitionID = 0;
var curLinkID = 0;

var tMachine;
var tmRunning = false;
var lastState;

String.prototype.replaceAt=function(index, character) {
    return this.substr(0, index) + character + this.substr(index+character.length);
}

function TuringMachine(definition, transitions) {
	this.definition = definition;
	this.transitions = transitions;

	this.tapePos = 1;
	this.curState = this.definition.initial;

	this.inputReady = false;

	this.halt = false;
}

TuringMachine.prototype.setInput = function(input) {
	this.input = input;
	this.tape = this.definition.blank + this.input + this.definition.blank;

	this.inputReady = true;

}

TuringMachine.prototype.next = function() {

	if (!this.inputReady) {
		return;
	}

	var input = this.tape[this.tapePos];
	for (var i = 0; i < this.transitions.length; i++) {
		if (this.curState == this.transitions[i].stateA && input == this.transitions[i].input) {
			var dir = this.transitions[i].direction;
			if (dir == "R") {
				this.tape = this.tape.replaceAt(this.tapePos, this.transitions[i].output);
				this.tapePos++;
				this.curState = this.transitions[i].stateB;
				if (this.tapePos >= this.tape.length-1) {
					this.tape = this.tape + this.definition.blank;
					this.tapePos = this.tape.length-2;
				}
				
			} else if (dir == "L") {
				this.tape = this.tape.replaceAt(this.tapePos, this.transitions[i].output);
				this.tapePos--;
				if (this.tapePos <= 0) {
					this.tape = this.definition.blank + this.tape;
					this.tapePos = 1;
				}
				this.curState = this.transitions[i].stateB;
			} else if(dir == "S") {
				this.tape = this.tape.replaceAt(this.tapePos, this.transitions[i].output);
				this.curState = this.transitions[i].stateB;
			}

			for (var k = 0; k < nodes.length; k++) {
				nodes[k].highlighted = false;
				if (this.curState == nodes[k].text) {
					nodes[k].highlighted = true;
				}
			}

			if ( $.inArray(this.curState, this.definition.finals) != -1) {
				this.halt = true;
				updateStatus(2); // Success
				return 1;
			}

			resetCaret();
			draw();

			return 0;
		}
	}
	resetCaret();
	draw();

	if ( $.inArray(this.curState, this.definition.finals) != -1) {
		this.halt = true;
		updateStatus(2); // Success
		return 1;
	} else {
		this.halt = true;
		updateStatus(3); // Failure
		return -1;
	}
}

TuringMachine.prototype.reset = function() {
	this.halt = false;
	this.tape = this.definition.blank + this.input + this.definition.blank;
	this.tapePos = 1;
	this.curState = this.definition.initial;

	for (var k = 0; k < nodes.length; k++) {
		nodes[k].highlighted = false;
		if (this.curState == nodes[k].text) {
			nodes[k].highlighted = true;
		}
	}

}

TuringMachine.prototype.init = function() {
	this.halt = false;
	var states = this.definition.states;
	var numOfStates = states.length;
	var offx = 150;
	var offy = 0;
	for (var i = 0; i < numOfStates; i++) {
		if ((i % 4) == 0) {
			offx = 150;
			offy += 150
		}
		var tmp_node = new Node(offx, offy);
		offx += 150;
		tmp_node.text = states[i];
		if ($.inArray(states[i], this.definition.finals) != -1) {
			tmp_node.isAcceptState = true;
		}
		nodes.push(tmp_node);
	}

	var transitions = this.transitions;
	for (var i = 0; i < nodes.length; i++) {
		for (var j = 0; j < transitions.length; j++) {
			if (nodes[i].text == transitions[j].stateA) {
				for (var k = 0; k < nodes.length; k++) {
					if (nodes[k].text == transitions[j].stateB) {

						var tmp_trans = this.hasTransitionLink(transitions[j]);
						if (tmp_trans) {

							/*
								*************************

								WARNING MIGHT BE A BUG HERE


								*************************

							*/

							for (var u = 0; u < links.length; u++) {
								if (tmp_trans.linkID == links[u].linkID) {
									links[u].text.push(transitions[j].input + ":" + transitions[j].output + ", " + transitions[j].direction);
									break;
								}
							}
						} else {

							if (transitions[j].stateA == transitions[j].stateB) {
								var pos = {
									'x': nodes[i].x,
									'y': nodes[i].y - 100,
								};
								var li = new SelfLink(nodes[i], pos);
								li.linkID = curLinkID++;
								li.text.push(transitions[j].input + ":" + transitions[j].output + ", " + transitions[j].direction);
								links.push(li);

								transitions[j].linkID = li.linkID;
							} else {
								var li = new Link(nodes[i], nodes[k]);
								li.linkID = curLinkID++;
								li.text.push(transitions[j].input + ":" + transitions[j].output + ", " + transitions[j].direction);
								links.push(li);

								transitions[j].linkID = li.linkID;
							}

						}
					}
				}
			}

		}
	}


	for (var k = 0; k < nodes.length; k++) {
		nodes[k].highlighted = false;
		if (this.curState == nodes[k].text) {
			nodes[k].highlighted = true;
			var pos = {
				'x': nodes[k].x - 50,
				'y': nodes[k].y - 50,
			};
			links.push(new StartLink(nodes[k], pos));
		}
	}

	resetCaret();
	draw();
}

TuringMachine.prototype.hasTransitionLink = function(transition) {
	for (var i = 0; i < this.transitions.length; i++) {
		if (this.transitions[i].id != transition.id && this.transitions[i].linkID != null && this.transitions[i].isSame(transition)) {
			return this.transitions[i];
		}
	}
	return false;
}

function Definition(states, alphabet, blank, initial, finals){
	this.states = states;
	this.alphabet = alphabet;
	this.blank = blank;
	this.initial = initial;
	this.finals = finals;

}

function Transition(stateA, input, stateB, output, direction) {
	this.id = curTransitionID++;

	this.stateA = stateA;
	this.input = input;
	this.stateB = stateB;
	this.output = output;
	this.direction = direction;

	this.linkID = null;
}

Transition.prototype.isSame = function(transition) {
	return this.stateA == transition.stateA && this.stateB == transition.stateB;
}

Transition.prototype.toString = function(transition) {
	return this.stateA+", "+this.input+", "+this.stateB+", "+this.output+", "+this.direction;
}

function initializeTape() {
	$("#curState").text(tMachine.curState);
	$("#tape").empty();
	for (var i = 0, len = tMachine.tape.length; i < len; i++) {
		if (i == 1) {
			$("#tape").append("<li class=\"active\"><a> "+tMachine.tape[i]+" </a></li>");
		} else {
			$("#tape").append("<li><a> "+tMachine.tape[i]+" </a></li>");
		}
	}
}

function updateTape() {
	$("#curState").text(tMachine.curState);

	$("#tape").empty();
	for (var i = 0, len = tMachine.tape.length; i < len; i++) {
		if (i == tMachine.tapePos) {
			$("#tape").append("<li class=\"active\"><a> "+tMachine.tape[i]+" </a></li>");
		} else {
			$("#tape").append("<li><a> "+tMachine.tape[i]+" </a></li>");
		}
	}
}

function clearTape() {
	$("#tape").empty();
	for (var i = 0; i < 9; i++) {
		$("#tape").append("<li><a>&nbsp;</a></li>");
	}
}

function tmStart() {

	lastState = tMachine.curState;
	
	//console.log("Last State:" + lastState);
	//console.log("Current State: " + tMachine.curState);

	if (validTM != "T") {
		if (validTM == "?") {
			$("#cpAlert").removeClass("alert-danger");
			$("#cpAlert").addClass("alert-warning");
			$("#cpAlert").last().text("You must verify the Turing Machine Code first.");
		} else if (validTM == "F") {
			$("#cpAlert").removeClass("alert-warning");
			$("#cpAlert").addClass("alert-danger");
			$("#cpAlert").last().text("Invalid Turing machine code.");
		}
		$("#cpAlert").show(300);
		return;
	}

	var pattern = "^([" + tMachine.definition.alphabet.join("") + "]+)$";
	if ($("#tminput").val() == "") {
		$("#cpAlert").removeClass("alert-danger");
		$("#cpAlert").addClass("alert-warning");
		$("#cpAlert").last().text("You must write the TM Input.");
		$("#tminput").focus();
		$("#cpAlert").show(300);
		return;
	} else if($("#tminput").val().search(pattern) == -1) {
		$("#cpAlert").removeClass("alert-warning");
		$("#cpAlert").addClass("alert-danger");
		$("#cpAlert").last().text("Invalid Input.");
		$("#tminput").focus();
		$("#cpAlert").show(300);
		return;
	}

	$("#cpAlert").hide();

	tMachine.setInput($("#tminput").val());

	clearCanvas();
	tMachine.init();
	tmRunning = true;
	$("#start").addClass("disabled");
	$("#delete").removeClass("disabled");
	$("#reset").removeClass("disabled");
	$("#next").removeClass("disabled");

	updateStatus(1); // Running
	initializeTape();
}

function tmDelete() {
	clearCanvas();
	tmRunning = false;
	$("#delete").addClass("disabled");
	$("#reset").addClass("disabled");
	$("#next").addClass("disabled");
	$("#start").removeClass("disabled");

	tMachine = null;

	validTM = "?";
	updateVerifyUI();
	clearTape();

	$("#inputText").focus();

	$("#curState").text("");

	updateStatus(0); // Waiting

}

function tmReset() {
	
	document.getElementById("Steps").innerHTML=0;
	document.getElementById("States").innerHTML=0;

	var pattern = "^([" + tMachine.definition.alphabet.join("") + "]+)$";
	if ($("#tminput").val() == "") {
		$("#cpAlert").removeClass("alert-danger");
		$("#cpAlert").addClass("alert-warning");
		$("#cpAlert").last().text("You must write the TM Input.");
		$("#tminput").focus();
		$("#cpAlert").show(300);
		return;
	} else if($("#tminput").val().search(pattern) == -1) {
		$("#cpAlert").removeClass("alert-warning");
		$("#cpAlert").addClass("alert-danger");
		$("#cpAlert").last().text("Invalid Input.");
		$("#tminput").focus();
		$("#cpAlert").show(300);
		return;
	}

	$("#cpAlert").hide();

	tMachine.input = $("#tminput").val();

	tMachine.reset();
	
	lastState = tMachine.curState;
	
	$("#next").removeClass("disabled");
	updateTape();

	updateStatus(1); // Running

}

function tmNext() {
	tMachine.next();
	
	//console.log("Last State:" + lastState);
	//console.log("Current State: " + tMachine.curState);
	
	if(lastState !== tMachine.curState){
		document.getElementById("States").innerHTML = parseInt(document.getElementById("States").innerHTML)+1;
		lastState = tMachine.curState;
	}
	document.getElementById("Steps").innerHTML = parseInt(document.getElementById("Steps").innerHTML)+1;
	if (tMachine.halt) {
		$("#next").addClass("disabled");
		$("html").focus();
	} else {
		$("#next").removeClass("disabled");
	}
	updateTape();
}

function updateStatus(status) { //0: Waiting | 1: Running | 2: Success | 3: Failure
	if (status == 0) {
		$("#result").removeClass("btn-success");
		$("#result").removeClass("btn-danger");
		$("#result").removeClass("btn-warning");
		$("#result").addClass("btn-default");
		$("#result").text("Waiting");
	} else if(status == 1) {
		$("#result").removeClass("btn-success");
		$("#result").removeClass("btn-danger");
		$("#result").removeClass("btn-default");
		$("#result").addClass("btn-warning");
		$("#result").text("Running");
	} else if(status == 2) {
		$("#result").removeClass("btn-default");
		$("#result").removeClass("btn-danger");
		$("#result").removeClass("btn-warning");
		$("#result").addClass("btn-success");
		$("#result").text("Success");
	} else if(status == 3) {
		$("#result").removeClass("btn-success");
		$("#result").removeClass("btn-default");
		$("#result").removeClass("btn-warning");
		$("#result").addClass("btn-danger");
		$("#result").text("Failure");
	}
}


$( document ).ready(function() {

	$("#start").click(tmStart);

	$("#delete").click(tmDelete);

	$("#reset").click(tmReset);

	$("#next").click(tmNext);

});
