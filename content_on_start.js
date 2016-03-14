//This file prevents HighlightPlayer from first initialisation by using our own stub file instead.

var s = document.createElement('script');
s.src = chrome.extension.getURL('gamehighlightplayer_stub.js');
s.onload = function() {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);