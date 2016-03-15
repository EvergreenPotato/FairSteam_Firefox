//Main app logic located here

var r = /\d+/;
var app_id = document.location.href.match(r)[0]

chrome.runtime.sendMessage({action: "gaPageID", data:app_id})

var s = document.createElement('script');
s.src = chrome.extension.getURL('js/gamehighlightplayer_updated.js');
s.onload = function() {
	this.parentNode.removeChild(this);
};
(document.head || document.documentElement).appendChild(s);

var jsonCallback = function(data)
{
	console.log(data)
}

//We have our player injected at this point
$.ajax({
	url: "//www.fairsteam.com/app/"+app_id,
	dataType: 'json',
	success: function(data){ 
		var formated_array = new Object();
		var thumb_data = new Object();
		
		if (!data['data']) return
		
		
		for (var i = data['data'].length; i--;){
			var item = data['data'][i];
			
			formated_array['yv_'+item.yid] = item.yid
			thumb_data['yv_'+item.yid] = item.thumb
		}
		
		for(key in thumb_data)
		{
			highlight_strip_youtube = '<div class="highlight_strip_item highlight_strip_youtube" id="thumb_youtube_'+ key +'">'+
				'<img style="max-width: 100%;max-height:100%;" src="'+thumb_data[key]+'" >'+
				'<div class="highlight_youtube_marker"></div>'+
			'</div>'
			
			$('.highlight_selector').after(highlight_strip_youtube);
		
			highlight_youtube = '<div style="display: none;" class="highlight_player_item highlight_youtube tall" id="highlight_youtube_'+key+'">'+
						'<div id="youtube_'+key+'"/>'+

					'</div>'

			$('.highlight_player_area_spacer').after(highlight_youtube);
		}
		
		$('#highlight_strip_scroll').width($('#highlight_strip_scroll').width() + Object.keys(formated_array).length*120)
		

		var actualCode = 'var rgYoutubeURLs = ' + JSON.stringify(formated_array); + ';';

		var script = document.createElement('script');
		script.textContent = actualCode;
		(document.head||document.documentElement).appendChild(script);
		script.parentNode.removeChild(script);
		
		chrome.runtime.sendMessage({action: "gaPageSuccess"})
	},
	error: function(data) {
		console.log('cant reach api server'); 
		
		chrome.runtime.sendMessage({action: "gaPageFailure"})
	},
	complete: function(data) {
		makeItRightJesse()
	}
});

var makeItRightJesse = function()
{
	var s = document.createElement('script');
	s.src = chrome.extension.getURL('js/player_init.js');
	s.onload = function() {
		this.parentNode.removeChild(this);
	};
	(document.head || document.documentElement).appendChild(s);
}

