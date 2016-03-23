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
		var buttonRow = $('.buttonRow'), resultButton = $('.resultButton'), routeForm = $('.routeForm'), page = $('#page'), headerResultSearch = $('.headerResultSearch h2'), h1 = $('h1'), resultSearch = $('.resultSearch'), logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
		loader.fadeOut(200);
		$('section').append('<script async defer src="https://maps.googleapis.com/maps/api/js?key=AIzaSyCDIsOi_yjA_mo6kpMkDMYwOolP3s5Thtk&libraries=places&callback=initMap"></script>');
		page.delay(100).fadeIn(1000)

		header.css({height: 0.1*displayHeight+'px',  minHeight: 0.1*768+'px'});
		footer.css({height: 0.05*displayHeight+'px', minHeight: 0.05*768+'px'});
		map.css({height: 0.85*displayHeight+'px', minHeight: 0.85*768+'px'});
		resultSearch.css({height: 0.25*displayHeight+'px', top: 0.69*768+'px'});
		h1.css('line-height', header.height()+'px');
		headerResultSearch.css('line-height', 0.2*resultSearch.height()+'px');
		logo.css({height: header.height()-10+'px', marginTop: '5px', marginBottom: '5px'});
		footerText.css('line-height', footer.height()+'px');
		buttonRow.css({paddingTop: (buttonRow.height()-resultButton.height())/2+'px'});

		//When the dimension of the window changes 
		$(window).resize(function(){
			var buttonRow = $('.buttonRow'), resultButton = $('.resultButton'),routeForm = $('.routeForm'), page = $('#page'), headerResultSearch = $('.headerResultSearch h2'), h1 = $('h1'), resultSearch = $('.resultSearch'), logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
			header.css({height: 0.1*displayHeight+'px',  minHeight: 0.1*768+'px'});
			footer.css({height: 0.05*displayHeight+'px', minHeight: 0.05*768+'px'});
			map.css({height: 0.85*displayHeight+'px', minHeight: 0.85*768+'px'});
			resultSearch.css({height: 0.25*displayHeight+'px', top: 0.63*768+'px'});
			h1.css('line-height', header.height()+'px');
			headerResultSearch.css('line-height', 0.2*resultSearch.height()+'px');
			logo.css({height: header.height()-10+'px', marginTop: '5px', marginBottom: '5px'});
			footerText.css('line-height', footer.height()+'px');
			buttonRow.css({paddingTop: (buttonRow.height()-resultButton.height())/2+'px'});
		});
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

/*$('.timepicker').pickatime({

    closeOnSelect: true,
    closeOnClear: true,

    min: [5,00],
    max: [1,00]
});*/

//vérification formulaire

/*$('#formRecherche').validate({
	rules: {
		depart: {
			required: true,
		},
		arrivee: {
			required: true,
		},
		date1: {
			required: true,
		},
		selecthour: {
			required: true,
		},
		selectMinute: {
			required: true,
		},
	},
	//For custom messages
	messages: {
		depart:{
			required: "Enter a depart",
		},
	},
	errorElement : 'div',
	errorPlacement: function(error, element) {
		var placement = $(element).data('error');
		if (placement) {
			$(placement).append(error)
		} else {
			error.insertAfter(element);
		}
	}
});*/

/*function addDepart() {
	var depart = document.getElementById('selecthour');
	for (var i = 0; i < 24; i++) {
		for (var j = 0; j < 60; j += 15) {
			var x = i < 10 ? '0' + i : i;
			var y = j < 10 ? '0' + j : j;
			depart.innerHTML += '<option>' + x + ':' + y + '</option>';
		}
	}
}*/