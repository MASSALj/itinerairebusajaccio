//Dynamic height of the map

$(document).ready(function(){
	var resultSearch = $('.resultSearch'), logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
	$(header).css('height', 0.1*displayHeight+'px');
	$(footer).css('height', 0.05*displayHeight+'px');
	$(map).css('height', 0.85*displayHeight+'px');
	$(resultSearch).css('height', 0.25*displayHeight+'px');
	$(resultSearch).css('bottom', 0.115*displayHeight+'px');

	$(logo).css({height: $(header).height()-10+'px', marginTop: '5px', marginBottom: '5px'});
	$(footerText).css('line-height', $(footer).height()+'px');

	$(window).resize(function(){
		var resultSearch = $('.resultSearch'), logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
		$(header).css('height', 0.1*displayHeight+'px');
		$(footer).css('height', 0.05*displayHeight+'px');
		$(map).css('height', 0.85*displayHeight+'px');
		$(resultSearch).css('height', 0.25*displayHeight+'px');
		$(resultSearch).css('bottom', 0.115*displayHeight+'px');

		$(logo).css({height: $(header).height()-10+'px', marginTop: '5px', marginBottom: '5px'});
		$(footerText).css('line-height', $(footer).height()+'px');
	});


	//Provisoire
	var SearchSubmit = $('.inputsubmit');
	SearchSubmit.click(function(){
		event.preventDefault();
		resultSearch.fadeIn(500);
	});
});