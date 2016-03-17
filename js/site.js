// function that activates the select of Materielize, DON'T REMOVE
$(document).ready(function() {
	$('select').material_select();
});

//Dynamic height of the map
//Handle the dynamic height of elements of the application
$(document).ready(function(){

	var headerResultSearch = $('.headerResultSearch h2'), h1 = $('h1'), resultSearch = $('.resultSearch'), logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
	
	header.css('height', 0.1*displayHeight+'px');
	footer.css('height', 0.05*displayHeight+'px');
	map.css('height', 0.85*displayHeight+'px');
	resultSearch.css({height: 0.25*displayHeight+'px', bottom: 0.07*displayHeight+'px'});
	h1.css('line-height', header.height()+'px');
	headerResultSearch.css('line-height', 0.2*resultSearch.height()+'px');
	logo.css({height: header.height()-10+'px', marginTop: '5px', marginBottom: '5px'});
	footerText.css('line-height', footer.height()+'px');

	//When the dimension of the window changes 
	$(window).resize(function(){
		var headerResultSearch = $('.headerResultSearch h2'), h1 = $('h1'), resultSearch = $('.resultSearch'), logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
		header.css('height', 0.1*displayHeight+'px');
		footer.css('height', 0.05*displayHeight+'px');
		map.css('height', 0.85*displayHeight+'px');
		resultSearch.css({height: 0.25*displayHeight+'px', bottom: 0.07*displayHeight+'px'});
		h1.css('line-height', header.height()+'px');
		headerResultSearch.css('line-height', 0.2*resultSearch.height()+'px');
		logo.css({height: header.height()-10+'px', marginTop: '5px', marginBottom: '5px'});
		footerText.css('line-height', footer.height()+'px');
	});

	//Provisoire
	var SearchSubmit = $('.inputsubmit');
	SearchSubmit.click(function(){
		event.preventDefault();
		resultSearch.fadeIn(500);
	});
});

//datepicker materielize options

$('.datepicker').pickadate({

    selectMonths: true, // Creates a dropdown to control month
    selectYears: 15, // Creates a dropdown of 15 years to control year
    firstDay: true, // first day of the week, True = Monday False= Sunday

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

function addDepart() {
	var depart = document.getElementById('selecthour');
	for (var i = 0; i < 24; i++) {
		for (var j = 0; j < 60; j += 15) {
			var x = i < 10 ? '0' + i : i;
			var y = j < 10 ? '0' + j : j;
			depart.innerHTML += '<option>' + x + ':' + y + '</option>';
		}
	}
}

