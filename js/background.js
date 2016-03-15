chrome.runtime.onInstalled.addListener(function(details){
    if(details.reason == "install"){
        console.log("This is a first install!");
		 chrome.tabs.create({
			url: 'welcome/page.html'
		});
  
    }else if(details.reason == "update"){
        var thisVersion = chrome.runtime.getManifest().version;
        console.log("Updated from " + details.previousVersion + " to " + thisVersion + "!");
    }
});

//Prevent Valve version of gamehighlightplayer.js to get our player working
chrome.webRequest.onBeforeRequest.addListener(
	function(details) {
		return {cancel: details.url.indexOf("gamehighlightplayer.js") != -1};
    },
    {urls: ["*://*.steamstatic.com/*"]},
    ["blocking"]);
	
		
chrome.runtime.onMessage.addListener(
  function(request, sender, sendResponse) {
	// Messages from content scripts
  });
  
  
chrome.runtime.onMessageExternal.addListener(
  function(request, sender, sendResponse) {
	// Messages from web page
		
});