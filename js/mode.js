$( document ).ready(function() {

	$("#textMode").click(function() {
		
		tmDelete();
		//ui_reset();
		
		$("#uiModeArea").hide();
		$("#texModeArea").show(200);
		$("#uiMode").removeClass("btn-success");
		$("#uiMode").addClass("btn-primary");
		$("#textMode").removeClass("btn-primary");
		$("#textMode").addClass("btn-success");
		
		
		$("#step").html("<b>Step 2:</b> Input TM and Verifiy it.");
	});
	
	
	$("#uiMode").click(function() {
	
		tmDelete();
		//ui_reset();
	
		$("#texModeArea").hide();
		$("#uiModeArea").show(200);
		$("#uiMode").removeClass("btn-primary");
		$("#uiMode").addClass("btn-success");
		$("#textMode").removeClass("btn-success");
		$("#textMode").addClass("btn-primary");
		
		
		$("#step").html("<b>Step 2:</b> Input TM and Verifiy it.");
	});
	
	$("#uiReset").click(function() {
		ui_reset();
	});
	
	var patt = /^(\w+(,\w+)*)$/;

	$("#addState").click(function() {
		var str = $("#addStateText").val();
		if (str && str != "" && patt.test(str)) {
			$("#patternWarn").hide();
			
			statesRdy = "<STATES>"+str+"</STATES>";
			
			$("#addStateText").prop('disabled', 'disabled');
			$("#addState").prop('disabled', 'disabled');
			$("#addState").addClass("btn-success");
			$("#addState").removeClass("btn-default");
			
			var states = str.split(",");
			for (var i = 0; i < states.length; i++) {
				$("#setInitState").append("<option>"+states[i]+"</option>");
				$("#transInitState").append("<option>"+states[i]+"</option>");
				$("#transEndState").append("<option>"+states[i]+"</option>");
			}
			
			$("#setBlank")
			
			if (alphabetRdy != "") {
				ui_phase2();
			}

		} else {
			$("#patternWarn").hide();
			$("#patternWarn").show(200);
		}
	});
	
	$("#addAlphabet").click(function() {
		
		var str = $("#addAlphabetText").val();
		if (str && str != ""  && patt.test(str)) {
			$("#patternWarn").hide();
			
			alphabetRdy = "<ALPHABET>"+str+"</ALPHABET>";
			
			$("#addAlphabetText").prop('disabled', 'disabled');
			$("#addAlphabet").prop('disabled', 'disabled');
			$("#addAlphabet").addClass("btn-success");
			$("#addAlphabet").removeClass("btn-default");
			
			var alphabet = str.split(",");
			for (var i = 0; i < alphabet.length; i++) {
				$("#setBlank").append("<option>"+alphabet[i]+"</option>");
				$("#transInput").append("<option>"+alphabet[i]+"</option>");
				$("#transOutput").append("<option>"+alphabet[i]+"</option>");
			}
				
			if (statesRdy != "") {
				ui_phase2();
			}
	
		} else {
			$("#patternWarn").hide();
			$("#patternWarn").show(200);
		}
	});

	$("#setBlankBtn").click(function() {
		var str = $("#setBlank option:selected").text();
		if (str && str != "") {
			blankRdy = "<BLANK>" + str + "</BLANK>";
			
			$("#setBlank").prop("disabled", "disabled");
			$("#setBlankBtn").prop("disabled", "disabled");
			$("#setBlankBtn").removeClass("btn-default");
			$("#setBlankBtn").addClass("btn-success");
			
		}
		
	});
	
	
	
	$("#setInitStateBtn").click(function() {
		var str = $("#setInitState option:selected").text();
		if (str && str != "") {
			initRdy = "<INITSTATE>" + str + "</INITSTATE>";
			
			$("#setInitState").prop("disabled", "disabled");
			$("#setInitStateBtn").prop("disabled", "disabled");
			$("#setInitStateBtn").removeClass("btn-default");
			$("#setInitStateBtn").addClass("btn-success");
			
		}
		
	});
	
	$("#setEndStateBtn").click(function() {
		
		var str = $("#setEndState").val();
		if (str && str != ""  && patt.test(str)) {
			$("#patternWarn").hide();
			
			endRdy = "<ENDSTATES>" + str + "</ENDSTATES>";
			
			$("#setEndState").prop("disabled", "disabled");
			$("#setEndStateBtn").prop("disabled", "disabled");
			$("#setEndStateBtn").removeClass("btn-default");
			$("#setEndStateBtn").addClass("btn-success");
		} else {
			$("#patternWarn").hide();
			$("#patternWarn").show(200);
		}
		
	});
	
	
	$("#addTransition").click(function() {
		
		var is = $("#transInitState option:selected").text();
		var input = $("#transInput option:selected").text();
		var es = $("#transEndState option:selected").text();
		var output = $("#transOutput option:selected").text();
		var move = $("#transMove option:selected").val();
		
		if (is && input && es && output && move) {
			var str = "<TRANSITION>("+is+","+input+")>("+es+","+output+","+move+")</TRANSITION>";
			transitionsArr.push(str);
			$("#transList").append("<option>"+str+"</option>");
			
			$("#transWarning").hide();
			$("#transWarning").show(100);
		}
		
	});
	
	$("#transRemove").click(function() {
		
		var str = "<TRANSITION>" + $("#transList option:selected").text() + "</TRANSITION>";
		
		for (var i = 0; i < transitionsArr.length; i++) {
			if (transitionsArr[i] == str) {
				transitionsArr.splice(i, 1);
			}
			
		}
		
		$("#transList option:selected").remove();
	});
	
	
	$("#lexicalVerification2").click(function() {
		if (statesRdy != "" && alphabetRdy != "" && blankRdy != "" && initRdy != "" && endRdy != "" && transitionsArr.length > 0) {
			
			$("#uiWarning").hide();
		
			var tmCode = "<TM>" + "\n\t" + statesRdy + "\n\t" + alphabetRdy + "\n\t" + blankRdy + "\n\t" + initRdy + "\n\t" + endRdy + "\n\t" + "<TRANSITIONS>";
			
			for (var i = 0; i < transitionsArr.length; i++) {
				tmCode = tmCode + "\n\t\t" + transitionsArr[i];
			}
			
			tmCode = tmCode + "\n\t</TRANSITIONS>\n</TM>";
			
			$("#inputText").val(tmCode);
			
			verifyLex($("#inputText").val());
			if(validTM=="T")
				verifySemantic();

			if (validTM == "T") {
				$("#verifyAlert").hide();
				$("#cpAlert").hide();
			}
			
		} else {
			$("#uiWarning").show(200);
		}
		
	})
	


});

var statesRdy = "";
var alphabetRdy = "";
var blankRdy = "";
var initRdy = "";
var endRdy = "";
var transitionsArr = [];

function ui_reset() {
	statesRdy = "";
	alphabetRdy = "";
	blankRdy = "";
	initRdy = "";
	endRdy = "";
	transitionsArr = [];
	
	$("#patternWarn").hide();
	$("#uiWarning").hide();
	$("#transWarning").hide();
	
	$("#addStateText").prop('disabled', false);
	//$("#addStateText").val("");
	$("#addState").prop('disabled', false);
	$("#addState").removeClass("btn-success");
	$("#addState").addClass("btn-default");
	
	$("#addAlphabetText").prop('disabled', false);
	//$("#addAlphabetText").val("");
	$("#addAlphabet").prop('disabled', false);
	$("#addAlphabet").removeClass("btn-success");
	$("#addAlphabet").addClass("btn-default");
	
	
	$("#setBlank").prop('disabled', 'disabled');
	$("#setBlank").children().remove();
	$("#setBlankBtn").prop('disabled', 'disabled');
	$("#setBlankBtn").removeClass("btn-success");
	$("#setBlankBtn").addClass("btn-default");
	
	$("#setInitState").prop('disabled', 'disabled');
	$("#setInitState").children().remove();
	$("#setInitStateBtn").prop('disabled', 'disabled');
	$("#setInitStateBtn").removeClass("btn-success");
	$("#setInitStateBtn").addClass("btn-default");
	
	$("#setEndState").prop('disabled', 'disabled');
	$("#setEndState").children().remove();
	$("#setEndStateBtn").prop('disabled', 'disabled');
	$("#setEndStateBtn").removeClass("btn-success");
	$("#setEndStateBtn").addClass("btn-default");
	
	
	///////
	$("#transInitState").prop('disabled', 'disabled');
	$("#transInitState").children().remove();
	$("#transEndState").prop('disabled', 'disabled');
	$("#transEndState").children().remove();
	$("#transInput").prop('disabled', 'disabled');
	$("#transInput").children().remove();
	$("#transOutput").prop('disabled', 'disabled');
	$("#transOutput").children().remove();
	$("#transMove").prop('disabled', 'disabled');
	$("#addTransition").prop('disabled', 'disabled');
	$("#addTransition").removeClass("btn-success");
	$("#addTransition").addClass("btn-default");
}

function ui_phase2() {

	$("#setBlank").prop('disabled', false);
	$("#setBlankBtn").prop('disabled', false);
	
	$("#setInitState").prop('disabled', false);
	$("#setInitStateBtn").prop('disabled', false);
	
	$("#setEndState").prop('disabled', false);
	$("#setEndStateBtn").prop('disabled', false);
	
	$("#transInitState").prop('disabled', false);
	$("#transEndState").prop('disabled', false);
	$("#transInput").prop('disabled', false);
	$("#transOutput").prop('disabled', false);
	$("#transMove").prop('disabled', false);
	$("#addTransition").prop('disabled', false);

}

function ui_phase3() {
	
}








