//Dynamic height of the map

$(document).ready(function(){
	var logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
	$(header).css('height', 0.1*displayHeight+'px');
	$(footer).css('height', 0.1*displayHeight+'px');
	$(map).css('height', 0.8*displayHeight+'px');

	$(logo).css('line-height', $(header).height()+'px');
	$(footerText).css('line-height', $(footer).height()+'px');

	$(window).resize(function(){
		var logo = $('.brand-logo'), header = $('.page-header'), footer = $('.page-footer'), footerText = $('.page-footer .container'), map = $('#map'), displayHeight = $(window).height();
		$(header).css('height', 0.1*displayHeight+'px');
		$(footer).css('height', 0.1*displayHeight+'px');
		$(map).css('height', 0.8*displayHeight+'px');

		$(logo).css('line-height', $(header).height()+'px');
		$(footerText).css('line-height', $(footer).height()+'px');
	});
});