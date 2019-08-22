var counter = 0;
var isPaused = true;

$("#pause, #resume").hide();
$("#days, #hours, #first-divider, #second-divider").hide();
$("#start").show();

var t = window.setInterval(function() {
	if (!isPaused) {
		counter++;
		var s = counter;
		convertSeconds(Math.floor(s));
	}
}, 1000);

// Button Click Events
$("#start").click(function () {
	startClock();
	$(this).hide();
	$("#pause").show();
	$("#reset, #stop").css("opacity", "1");
});

$("#pause").click(function (){
	pauseClock();
	$(this).hide();
	$("#resume").show();
});

$("#resume").click(function (){
	resumeClock();
	$(this).hide();
	$("#pause").show();
});

$("#reset").click(function (){
	resetClock();stopClock();
	$("#resume").hide();
	$("#pause").show();
});

$("#stop").click(function () {
	resetClock();stopClock();
    console.log("stop clicked")
	$("#pause, #resume").hide();
	$("#start").show();
	$("#reset, #stop").css("opacity", "0");
});


function startClock() { 
	isPaused = false;
}
function pauseClock() { 
	isPaused = true;
}
function resumeClock() { isPaused = false; }
function resetClock() {
	counter = 0;
	$("#days").html("00");
	$("#hours").html("00");
	$("#minutes").html("00");
	$("#seconds").html("00");
}
function stopClock() {
	resetClock();
	isPaused = true;
}

function convertSeconds(s) {
	var days = Math.floor(s / 86400)
	var hours = Math.floor((s % 86400) / 3600);
	var minutes = Math.floor(((s % 86400) % 3600) / 60);
	var seconds = ((s % 86400) % 3600) % 60;
	
	if (days		< 10) {days 	 = "0" + days}
	if (hours 	< 10) {hours 	 = "0" + hours;}
	if (minutes < 10) {minutes = "0" + minutes;}
	if (seconds < 10) {seconds = "0" + seconds;}
	
	$("#days").html(days);
	$("#hours").html(hours);
	$("#minutes").html(minutes);
	$("#seconds").html(seconds);
	
	if (days == 0 && hours == 0) {
		$("#days, #hours").hide();
		$("#first-divider, #second-divider").hide();
	} else if (days == 0) {
		$("#days").hide();
		$("#hours").show();
		$("#second-divider").show();
	} else {
		$("p, .divider").show();
	}
}