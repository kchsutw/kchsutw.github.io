/* jshint devel:true */
'use strict';
// console.log('\'Allo \'Allo!');
$(function(){
	// fit window size
	if($('html.desktop').length){

		(function(w){
			$(w).on('scroll resize',function(){
				var width = $(w).width();
				var height = $(w).height() > 530 ? $(w).height() : 530;
				$('body').width(width);
				$('body').height(height);
				$('.home').width(width);
			}).trigger('resize');
		}(window));
		$('.text-muted a').on('click',function(){
			TweenMax.to($('.dragon'),0.3,{
				left : 60,
				onComplete: function(){
					$(window).trigger('mousewheel');
				}
			});
			return false;
		});

		//mouse wheel dragon
		$(window).on('mousewheel',function(evt){
			var direction = 1;
			var container = $('.dragon');
			var pageTotalWidth = $('.page.home').width() + $('.page.rule').width() +
				$('.page.house').width() * $('.page.house').length;
			var ceil = $(window).width() - pageTotalWidth;
			var dragonWidth = $('.dragon').width();
			if(dragonWidth < pageTotalWidth){
				$('.dragon').width(pageTotalWidth);
			}

			if(evt.deltaY < 0 ){
				direction = -1;
			}
			if(+container.css('left').replace(/px/,'') >= 0 && direction === 1)
			{
				TweenMax.to(container,0.25,{
					left :0
				});
				return false;
			}
			if(+container.css('left').replace(/px/,'') <= ceil && direction === -1)
			{
				TweenMax.to(container,0.25,{
					left : ceil + 'px'
				});
				return false;
			}
			var fact = 12000 / $(window).width();
			var zCross = +$('.cross').attr('data-zfact');
			var zRoad = +$('.road').attr('data-zfact');
			TweenMax.to(container,0.3,{
				left :'+=' + evt.deltaY * fact + '%'
			});
			TweenMax.to($('.cross'),0.3,{
				left :'+=' + evt.deltaY * fact / zCross + '%'
			});

			TweenMax.to($('.road'),0.3,{
				left :'+=' + evt.deltaY * fact / zRoad + '%'
			});
			return false;
		});
		// drag
		var from,to;
		var draggie = new Draggabilly( '.dragon', {
		  axis: 'x'
		}).on('dragStart' ,function(e){
			from = e.clientX;
		}).on('dragEnd' ,function(e){
			to = e.clientX;
			var diff = from - to;
			console.log(diff)
			var container = $('.dragon');
			TweenMax.to(container,1,{
				left :'-=' + diff/2
			});
		});


		// fake
		var tpl = $('#tpl').clone().removeAttr('id');
		var dragon = $('.dragon');
		var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
		tpl.removeClass(houses[0]);
		for(var i=0;i<200;i++){
			var random =  Math.floor(Math.random() * +new Date() % houses.length);
			var house = houses[random ];
			var page = document.createElement('section');
			page = $(page).addClass('page house');
			var cur = tpl.clone();
			$('.number', cur).html(i+1);
			cur.addClass(house);
			page.append(cur);
			page.appendTo(dragon);
		}
	}
});
