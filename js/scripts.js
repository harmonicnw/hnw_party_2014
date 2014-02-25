(function ( $ ) {
	//run scripts for desktop screen sizes
	$(window).scroll(function(e) {
		if (window.outerWidth >= 768){
			$('.parallax').hmcParallax({scRate: 0.5});
		}
	});
	
	$(window).load(function() {
		if (window.outerWidth >= 768){
			initAppear();
			fullHeight();
		}
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
	

	
	function fullHeight () {
		$('section').each(function(){
			var sheight = $(window).height();
			$(this).css('height' , sheight+200 + "px");
		})
	}
	
	$.fn.hmcParallax = function(optionsPassed) {
		
		// set initial parameters
		var options = {
			scRate : 0.3, 
		};
		
		$.extend( options, optionsPassed );
		
		var scrolled = $(window).scrollTop()
		$(this).each(function(){
			var scrollBuffer = $(this).offset();
			var parallaxScroll = -(scrolled - scrollBuffer.top) * options.scRate;
			$(this).css('background-position-y', parallaxScroll + 'px');
		})
	};
		

}( jQuery ));

