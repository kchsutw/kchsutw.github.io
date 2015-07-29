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
			$('.home').width(width);
		}).trigger('resize');
	}(window));
	$('.text-muted a').on('click',function(){
		TweenMax.to($('.dragon'),0.3,{
			marginLeft : 0
		});
		return false;
	});

	//mouse wheel dragon
	$(window).on('mousewheel',function(evt){
		var direction = 1;
		var container = $('.dragon');
		var pageTotalWidth = $('.page.home').width() + $('.page.home').width() +
			$('.page.home').width() * $('.page.home').length;

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
			var ceil = $(window).width() - pageTotalWidth;
			console.log(ceil)
		if(+container.css('margin-left').replace(/px/,'') <= ceil && direction === -1)
		{
			console.log(ceil)
			TweenMax.to(container,0.25,{
				marginLeft : ceil + 'px'
			});
			return false;
		}
		var fact = 12000 / $(window).width();
		var zCross = +$('.cross').attr('data-zfact');
		var zRoad = +$('.road').attr('data-zfact');
		TweenMax.to(container,0.3,{
			marginLeft :'+=' + evt.deltaY * fact + '%'
		});
		TweenMax.to($('.cross'),0.3,{
			marginLeft :'+=' + evt.deltaY * fact / zCross + '%'
		});

		TweenMax.to($('.road'),0.3,{
			marginLeft :'+=' + evt.deltaY * fact / zRoad + '%'
		});
		return false;
	});
	var tpl = $('#tpl').clone().removeAttr('id');
	var dragon = $('.dragon');
	var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
	tpl.removeClass(houses[0]);
	for(var i=0;i<10;i++){
		var random =  Math.floor(Math.random() * +new Date % houses.length);
		var house = houses[random ];
		var page = document.createElement('section');
		page = $(page).addClass('page house');
		var cur = tpl.clone();
		cur.addClass(house);
		page.append(cur);
		page.appendTo(dragon);
	}
});
