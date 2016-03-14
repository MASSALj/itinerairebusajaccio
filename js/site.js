//Dynamic height of the map

$(document).ready(function(){
	var header = $('.page-header'), footer = $('.page-footer'), map = $('#map'), displayHeight = $(window).height();
	$(header).css('height', 0.1*displayHeight);
	$(footer).css('height', 0.1*displayHeight);
	$(map).css('height', 0.8*displayHeight);
});