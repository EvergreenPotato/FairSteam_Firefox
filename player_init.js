//Initialization of our HighlightPlayer class

var rgYoutubeURLs = rgYoutubeURLs || new Array();

var player;

player = new HighlightPlayer( {
	elemPlayerArea: 'highlight_player_area',
	elemStrip: 'highlight_strip',
	elemStripScroll: 'highlight_strip_scroll',
	elemSlider: 'highlight_slider',
	rgMovieFlashvars: rgMovieFlashvars,
	rgScreenshotURLs: rgScreenshotURLs,
	rgYoutubeURLs: rgYoutubeURLs,
	rgDefaultMovieFlashvars: rgCommonFlashVars,
	bUseHTMLPlayer: bShouldUseHTML5
} );

$J('#highlight_slider_right').attr('onclick','').unbind('click');
$J('#highlight_slider_left').attr('onclick','').unbind('click');

$J('#highlight_slider_right').click( function() {
	player.Transition( true );
});
$J('#highlight_slider_left').click( function() {
	player.TransitionBack( true );
});

if( window.location.hash )
{
	var ssid = window.location.hash.substr(1);
	player.HighlightScreenshot(ssid);
}

if( bShouldUseHTML5 )
{
	for(key in rgMovieFlashvars)
	{
		if( key.indexOf("movie") != -1)
		{
			jQuery("#"+key).videoControls();
		}
	}
}
