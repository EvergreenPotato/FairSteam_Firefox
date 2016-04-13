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


//We have our player injected at this point
$.ajax({
	url: "//www.fairsteam.com/app/"+app_id+"?api_version=2",
	dataType: 'json',
    timeout: 5000,
	success: function(data){ 
		var formated_array = new Object();
		var thumb_data = new Object();
        var channel_data = new Object();

		if (!data['data']) return
		
		videos = data['data']['videos']
		rating_change = data['data']['rating_change']
		
		if(videos && videos.length>0)
		{
			for (var i = videos.length; i--;) {
				var item = videos[i];
				
				formated_array['yv_'+item.yid] = item.yid
				thumb_data['yv_'+item.yid] = item.thumb
				channel_data['yv_'+item.yid] = item.channel
			}
			
			for(key in thumb_data) {
				var channel_name = channel_data[key].length > 17 ? channel_data[key].substring(0,14)+"..." : channel_data[key];

				highlight_strip_youtube = '<div class="highlight_strip_item highlight_strip_youtube" id="thumb_youtube_'+ key +'">'+
					'<img style="max-width: 100%;max-height:100%;" src="'+thumb_data[key]+'">'+
					'<div class="highlight_youtube_marker"></div>'+
					'<div class="highlight_channel_marker">'+channel_name+'</div>'+
				'</div>'
				
				$('.highlight_selector').after(highlight_strip_youtube);
			
				highlight_youtube = '<div style="display: none;" class="highlight_player_item highlight_youtube tall" id="highlight_youtube_'+key+'">'+
							'<div id="youtube_'+key+'"/>'+

						'</div>'

				$('.highlight_player_area_spacer').after(highlight_youtube);
			}
			
			$('#highlight_strip_scroll').width($('#highlight_strip_scroll').width() + Object.keys(formated_array).length*120)
			
			var youtubeUrlCode = 'var rgYoutubeURLs = ' + JSON.stringify(formated_array); + ';';

			var script = document.createElement('script');
			script.textContent = youtubeUrlCode;
			(document.head || document.documentElement).appendChild(script);
			script.parentNode.removeChild(script);
		}

		if(rating_change)
		{
			reviews_positive = rating_change['positive']
			reviews_negative = rating_change['negative']
			reviews_count = (reviews_positive + reviews_negative)
			
			
			reviews_percent = Math.round(reviews_positive/reviews_count*100)
			if (reviews_count==0)
				reviews_percent = '?'
			
			reviews_days = rating_change['days']
			
			reviews_count_str = reviews_count.toLocaleString('en')	
			reviews_text = reviews_percent+"% of the recent "+reviews_count_str+" user reviews for this game are positive."

			//http://www.gamasutra.com/blogs/LarsDoucet/20141006/227162/Fixing_Steams_User_Rating_Charts.php
			if (reviews_percent>= 95)
				reviews_descrition = 'Overhwelmingly Positive'
			else if (reviews_percent>= 80)
				reviews_descrition = 'Very Positive'
			else if (reviews_percent>= 70)
				reviews_descrition = 'Mostly Positive'
			else if (reviews_percent>= 40)
				reviews_descrition = 'Mixed'
			else if (reviews_percent>= 20)
				reviews_descrition = 'Mostly Negative'
			else if (reviews_percent < 20 && reviews_count >50) 
				reviews_descrition = 'Overwhelmingly Negative' 
			else
				reviews_descrition = 'Very Negative' 
			
			if (reviews_count < 20)
			{ 
				if (reviews_percent>=80)
					reviews_descrition = 'Positive'
				else if (reviews_percent<40)
					reviews_descrition = 'Negative'
			}
			
			reviews_style = ''
			if (reviews_percent>= 70)
				reviews_style = ' positive'
				
			if (reviews_count < 10) {
				reviews_descrition = 'Uncertain'
				reviews_style = ' none'
			}
			
			rating_change_html = '<div onclick="window.location=\'#app_reviews_hash\'" style="cursor: pointer;" data-store-tooltip="'+reviews_text+'" itemprop="aggregateRating" itemscope="" itemtype="http://schema.org/AggregateRating">'+
									'<div class="release_date">'+
										'Recent reviews: <span class="game_review_summary'+reviews_style+'" itemprop="description">'+reviews_descrition+'</span>'+
											'<span class="responsive_hidden"> ('+reviews_count_str+' reviews) </span>'+
											'<span class="nonresponsive_hidden responsive_reviewdesc"> - '+reviews_text+'</span>'+

									'</div>'+
								'</div>';
								
			$('.glance_ctn_responsive_left div:eq(0)').before(rating_change_html);		
			
		}
		
		chrome.runtime.sendMessage({action: "gaPageSuccess"})
	},
	error: function(data) {
		console.log('Cant reach api server'); 
		
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

