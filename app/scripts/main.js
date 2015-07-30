/* jshint devel:true , unused : false*/
'use strict';
// console.log('\'Allo \'Allo!');
$(function(){
	// fake mobile
	// $('html').removeClass('desktop').addClass('mobile');


	if($('html.desktop').length){

	// fit window size
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
		$('.dragon').on('mousewheel',function(evt){
			var direction = 0;
			var container = $('.dragon');
			var pageTotalWidth = $('.page.home').width() + 1 +
				$('.page.rule').width() + 1 +
				$('.page.go').width() + 1 +
				( $('.page.house').width() + 2 )* $('.page.house').length ;
			// if(dragonWidth < pageTotalWidth){
				$('.dragon').width(pageTotalWidth);
			// }
			var dragonWidth = $('.dragon').width();
			var ceil = $(window).width() - dragonWidth;
			
			if(evt.deltaY < 0 ){
				direction = -1;
			}else if(evt.deltaY > 0){
				direction = 1;
			}


			if(+container.css('left').replace(/px/,'') >= 0 && direction >= 0)
			{
				TweenMax.to(container,0.25,{
					left :0
				});
				return false;
			}
			if(+container.css('left').replace(/px/,'') <= ceil && direction <= 0)
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
		var from,to,tween;
		var draggie = new Draggabilly( '.dragon', {
		  axis: 'x'
		}).on('dragStart' ,function(e){
			from = e.clientX;
		}).on('pointerUp' ,function(e){
			to = e.clientX;
			var diff = from - to;
			var container = $('.dragon');
				try{tween.kill();}catch(e){}
				tween = TweenMax.to(container,1,{
				left :'-=' + diff/2,
				onComplete: function(){
					$('.dragon').trigger('mousewheel');
				}
			});
		});


	}

	if($('html.mobile').length){

	// fit window size
		(function(w){
			$(w).on('scroll resize',function(){
				var width = $(w).width();
				var height = $(w).height() > 530 ? $(w).height() : 530;
				$('body').width(width);
				$('body').height(height);
				$('.home').width(width);
				if(!$('.pageSizeHeight').length){
					$('<style></style>').addClass('pageSizeHeight').appendTo($('head'));
				}
				$('.pageSizeHeight').html('.home{height:'+height+'px!important}');
			}).trigger('resize');
		}(window));


	}

	// fake
	var tpl = $('#tpl').clone().removeAttr('id');
	var dragon = $('.dragon');
	var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
	tpl.removeClass(houses[0]);
	for(var i=0;i<20;i++){
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
});
window.fbAsyncInit = function() {
	FB.init({
	  appId      : '887313441322816',
	  xfbml      : true,
	  version    : 'v2.4'
	});
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = '//connect.facebook.net/en_US/sdk.js';
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
