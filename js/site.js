// function that activates the select of Materielize, DON'T REMOVE
$(document).ready(function() {
	$('select').material_select();
});

//Dynamic height of the map
//Handle the dynamic height of elements of the application
$(document).ready(function(){
	var loader = $('.loader'), displayWidth= $(window).width(), displayHeight = $(window).height();
	loader.css({width: 0.5*displayWidth, height: 0.005*displayWidth, left:0.25*displayWidth, top: 0.4975*displayHeight});

	$(window).load(function(){
		var buttonRow = $('.buttonRow'), resultButton = $('.resultButton'), routeForm = $('.routeForm'), page = $('#page'), headerResultSearch = $('.headerResultSearch h2, .impression'), h1 = $('h1'), resultSearch = $('.resultSearch'), logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
		loader.fadeOut(200);
		$('section').append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyB99iQwVsKF-QqDPM0Xj47XedR8Xda6U4E&libraries=places&callback=initMap"></script>');
		page.delay(100).fadeIn(1000);
	});

	//datepicker materielize options

	$('.datepicker').pickadate({

	    selectMonths: true, // Creates a dropdown to control month
	    selectYears: 15, // Creates a dropdown of 15 years to control year
	    firstDay: true, // first day of the week, True = Monday False= Sunday
        format: 'dddd, dd mmmm, yyyy',
        formatSubmit: 'yyyy-mm-dd',

	    labelMonthNext: 'mois suivant',
	    labelMonthPrev: 'mois précédent',
	    labelMonthSelect: 'Choisir un mois',
	    labelYearSelect: 'Choisir une année',
	    monthsFull: [ 'Janiver', 'Février', 'Mars', 'Avril', 'Mai', 'Juin', 'Juillet', 'Août', 'Septembre', 'Octobre', 'Novembre', 'Décembre' ],
	    monthsShort: [ 'Jan', 'Feb', 'Mar', 'Avr', 'Mai', 'Jui', 'Juil', 'Au', 'Sep', 'Oct', 'Nov', 'Dec' ],
	    weekdaysFull: [ 'Dimanche', 'Lundi', 'Mardi', 'Mercredi', 'Jeudi', 'Vendredi','Samedi' ],
	    weekdaysShort: ['Dim', 'Lun', 'Mar', 'Mer', 'Jeu', 'Ven', 'Sam'],
	    weekdaysLetter: [ 'D', 'L', 'Ma', 'Me', 'J', 'V', 'S' ],
	    today: 'aujourd\'hui',
	    clear: 'effacer',
	    close: 'Fermer'
	});
	
	//timepicker options "http://trentrichardson.com/examples/timepicker/"
	$("#timepicker").timepicker(
		$.timepicker.regional['fr'],
		{addSliderAccess: true, sliderAccessArgs: { touchonly: false }}
	);
});

$('.picker__footer').addClass("col s12");
