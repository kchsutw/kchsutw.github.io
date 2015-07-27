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
		}).trigger('resize');
	}(window));

	//mouse wheel dragon
	$('.dragon').on('mousewheel',function(evt){
		var direction = 1;

		if(evt.deltaY < 0 ){
			direction = -1;
		}
		if(+$(this).css('margin-left').replace(/px/,'') >= 0 && direction === 1)
		{
			TweenMax.to(this,0.25,{
				marginLeft :0
			});
			return false;
		}
		TweenMax.to(this,0.3,{
			marginLeft :'+=' + evt.deltaY * 8 + '%'
		});
		return false;
	});
});
