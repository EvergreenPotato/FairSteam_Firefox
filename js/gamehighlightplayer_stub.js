//This file is purely a simple hack to prevent HighlightPlayer from first initialisation. It's just stub and flow stop preventer. 

function HighlightPlayer( args )
{
}

function BDoesUserPreferHTML5()
{
	var rgMatches = document.cookie.match( /(^|; )bShouldUseHTML5=([^;]*)/ );
	return ( rgMatches && rgMatches[2] == 1 );
}

function BCanPlayWebm()
{
	var ele = document.createElement('video');

	return ele.canPlayType('video/webm; codecs="vp8, vorbis"') == "probably"; // Eh, I dunno, probably.
}


(function( $ ){
	$.fn.videoControls = function( options ) {
	};
})( jQuery );
