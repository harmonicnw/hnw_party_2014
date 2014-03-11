(function ( $ ) {
	var myMinWidth = 768;

	$(document).ready( function() {
		$('.parallax').hmcParallax({
			scRate: 0.5,
			minWidth: myMinWidth
		});
		
		if (window.outerWidth >= myMinWidth){
			// make images zoom in all fancy-like
			initAppear();
			
			// make each section the full height of the browser window
			fullHeight();
		}
		
		// vertically center sections and right/left content pairs
		$("section").hmcVerticalCenter();
		$("section#celebrate, section#fortgeorge, section#fun").each( function() {
			$(this).find(".row > div").hmcVerticalCenter({
				minWidth: myMinWidth,
				sameHeight: true
			});
		});
		
		// fade in body after UI functions have had a chance to load
		//var to = setTimeout( function() {
			$("body").animate({'opacity': '1'}, 500);
		//}, 500);
	});
	
	function initAppear() {
		$('.appear_from_left').each(function(){
			$(this).appear(function() {
				$(this).addClass('appear_from_left_active').animate({left: "0px",}, 1000);
				
			},{accX: 0, accY: -150});
		});
		$('.appear_from_right').each(function(){
			$(this).appear(function() {
				$(this).addClass('appear_from_left_active').animate({right: "0px",}, 1000);
			},{accX: 0, accY: -150});
		});
	};
	
	function fullHeight() {
		$('section').each(function(){
			var sheight = $(window).height();
			$(this).css('height' , sheight+50 + "px");
		})
	}
	
	/*
	Harmonic Background Parallax jQuery pluggin 
	Version: 1.0.1
	
	Options:
	{
		scRate : ( optional | integer | default = 0.3 ) identifies the scroll rate for the parallaxed background image, must be an integer between 0 and 1.
		minWidth: ( optional | integer | default = 768 ) identifies the minimum screen width required for the parallax to operate.
	}
	
	Usage:

	$('.parallax').hmcParallax({scRate: 0.5, minWidth: 900});
	
	Notes: 
	
	All parallaxed background images must have a background-attachement of fixed. 
	*/
	
	$.fn.hmcParallax = function(optionsPassed) {
		
		// set initial parameters
		var options = {
			scRate : 0.3,
			minWidth : 768 
		};
			
		$.extend( options, optionsPassed );
		var parallaxArray = $(this)
		
		$(window).scroll(function(e) {
			if (window.outerWidth >= options.minWidth){
				
				var scrolled = $(window).scrollTop();
				parallaxArray.each( function () {
					var scrollBuffer = $(this).offset();
					var parallaxScroll = -(scrolled - scrollBuffer.top) * options.scRate;
					$(this).css('background-position-y', parallaxScroll + 'px');
				})
			}
		})
	};
	
	/*
	
	Options:
	{
		minWidth : ( optional | integer | default = 0 ) minimum window width to apply the vertical centering
		sameHeight : ( optional | boolean | default = false ) if set to true, all elements are set to the same height so that contents align appear vertically aligned when sitting side by side
	}
	
	To do:
	- adjust parent container width to match width set in CSS (if set)
	- do better job of cleanup when undoing formatting (return height to previously set value) 
	*/
	
	$.fn.hmcVerticalCenter = function(optionsPassed) {
		
		var target = $(this);
		
		// set initial parameters
		var options = {
			minWidth: 0,
			sameHeight : false
		};
			
		$.extend( options, optionsPassed );
		
		// recenter when window size changes
		$(window).resize(function(){
			target.hmcVCUpdate(options);
		});
		$(window).trigger('resize');
	}
			
	$.fn.hmcVCUpdate = function(options) {
		
		// make sure that window is wider than declared minimum width
		if ( window.outerWidth > options.minWidth ) {
		
			// figure out biggest height if heights are to match
			var biggestHeight = 0;
			if ( options.sameHeight ) {
				$(this).each(function(){
					if ( $(this).height() > biggestHeight ) {
						biggestHeight = $(this).height();
					}
				});
			}
			
			$(this).each(function(){
			
				// add centering wrappers if they haven't already been added
				if ( !$(this).hasClass('hmcVC') ) {
					$(this)
					.addClass('hmcVC')
					//.css({'height' : myHeight + "px"})
					.wrapInner("<div class='hmcVC2' style='border-collapse:collapse;display:table;margin:0;padding:0;width:100%;'><div class='hmcVC3' style='display:table-cell;vertical-align:middle;'></div></div>");
				}
				
				// if sameHeight is true, set centering wrapper to biggest height, otherwise use container height
				var myHeight = options.sameHeight ? biggestHeight : $(this).height();
				$(this).children('.hmcVC2').height(myHeight);
				
			});
			
		} else {
			// if below minimus width, remove formatting
			$(this).find(".hmcVC3").contents().unwrap().unwrap();
		}
		
	}	

}( jQuery ));

