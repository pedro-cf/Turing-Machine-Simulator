String.prototype.lines = function () { return this.split(/\r*\n/); }
String.prototype.lineCount = function () { return this.lines().length; }

var semTree = [];
var states = [], alphabet = [], blank, initial, final = [], transitions = [], input = [];

var validTM = "?";

$(document).ready(function () {
	updateVerifyUI();


	$("#lexicalVerification").click(function () {

		verifyLex($("#inputText").val());

		if (validTM == "T")
			verifySemantic();

		if (validTM == "T") {
			$("#verifyAlert").hide();
			$("#cpAlert").hide();

		}

	});

});

var page = $("html, body");

function updateVerifyUI() {
	if (validTM == "T") {
		$("#lexicalVerification span").first().removeClass('glyphicon-question-sign');
		$("#lexicalVerification span").first().removeClass('glyphicon-remove-sign');
		$("#lexicalVerification span").first().addClass('glyphicon-ok-sign');
		$("#lexicalVerification").removeClass('btn-primary');
		$("#lexicalVerification").removeClass('btn-danger');
		$("#lexicalVerification").addClass('btn-success');
		if ($("#inputText").val() != "") {
			$("#inputText").css("background-color", "rgba(92,184,92, 0.5)");
		}

		$("#tmcontrolpanel").show();


		/*
		$('html, body').animate({
			scrollTop: $("#step3").offset().top - 100
		}, 500);
		*/

		page.on("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove", function () {
			page.stop();
		});

		page.animate({ scrollTop: $("#tmcontrolpanel").offset().top - 150 }, 'slow', function () {
			page.off("scroll mousedown wheel DOMMouseScroll mousewheel keyup touchmove");
		});


	} else if (validTM == "F") {
		$("#lexicalVerification span").first().removeClass('glyphicon-question-sign');
		$("#lexicalVerification span").first().removeClass('glyphicon-ok-sign');
		$("#lexicalVerification span").first().addClass('glyphicon-remove-sign');
		$("#lexicalVerification").removeClass('btn-primary');
		$("#lexicalVerification").removeClass('btn-success');
		$("#lexicalVerification").addClass('btn-danger');
		if ($("#inputText").val() != "") {
			$("#inputText").css("background-color", "rgba(201,48,44, 0.5)");
		}

		$("#tmcontrolpanel").hide();

	} else {
		$("#lexicalVerification span").first().removeClass('glyphicon-remove-sign');
		$("#lexicalVerification span").first().removeClass('glyphicon-ok-sign');
		$("#lexicalVerification span").first().addClass('glyphicon-question-sign');
		$("#lexicalVerification").removeClass('btn-danger');
		$("#lexicalVerification").removeClass('btn-success');
		$("#lexicalVerification").addClass('btn-primary');
		$("#inputText").css("background-color", "rgba(255,255,255, 1)");

		$("#tmcontrolpanel").hide();
	}
}

