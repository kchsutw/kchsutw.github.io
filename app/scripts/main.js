/* jshint devel:true */
'use strict';
// console.log('\'Allo \'Allo!');
$(function(){
	// fit window size
	(function(w){
		$(w).on('scroll resize',function(){
			var width = $(w).width();
			var height = $(w).height();
			$('body').width(width);
			$('body').height(height);
			if(!$('.page-width').length){
				$('<style></style>').addClass('page-width').appendTo($('head'))
			}
			$('.page-width').html('.page{width:'+width+'px!important}');
		}).trigger('resize');
	}(window));

	//mouse wheel dragon
	$(window).on('mousewheel',function(evt){
		var direction = 1;
		var container = $('.dragon');

		if(evt.deltaY < 0 ){
			direction = -1;
		}
		if(+container.css('margin-left').replace(/px/,'') >= 0 && direction === 1)
		{
			TweenMax.to(container,0.25,{
				marginLeft :0
			});
			return false;
		}
		var fact = 12000 / $(window).width();
		TweenMax.to(container,0.3,{
			marginLeft :'+=' + evt.deltaY * fact + '%'
		});
		return false;
	});
});
