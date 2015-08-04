/* jshint devel:true , unused : false*/
'use strict';
// console.log('\'Allo \'Allo!');
$(function(){
	// fake mobile
	// $('html').removeClass('desktop').addClass('mobile');


	var colorbox = function(target,callback){
		callback = callback || function(){};
		$.colorbox({
			inline:true,
			href: target,
			transition:'fade',
			innerWidth: 	600, 	
			initialWidth: 	'100%', 
			initialHeight: 	'100%',
			title:'',
			onComplete:callback
		});
	};
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
		$('.dragon:not(.one)').on('mousewheel',function(evt){
			var direction = 0;
			var container = $('.dragon');
			var pageTotalWidth = $('.page.home').width() + 1 +
				625 +
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
				infiniteList();
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
		$('.nav-pills li:eq(0)').on('click',function(){
			colorbox('#about');
		});
		$('.nav-pills li:eq(1)').on('click',function(){
			colorbox('#terms');
		});
		$('.build-a-home').on('click',function(){
			FB.login(function(r){
			  if(r.status === 'connected'){
			    // FB.api('/me',function(me){
			      next();
			    // });
			  }
			}); 
			function next(){
				colorbox('#step2');
			}
		});		
		$('#step2 .add-button').on('click', function(){
			$('#colorbox #step2 .families.hide:eq(0)').fadeTo(1,0).removeClass('hide').fadeTo(200,1);
		});	
		$('#step2 .submit').on('click',function(){
			FB.api('/me',function(me){
				$('#step3 .name').html(me.name);
				colorbox('#step3');
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
	// var tpl = $('#tpl').clone().removeAttr('id');
	// var dragon = $('.dragon');
	// var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
	// tpl.removeClass(houses[0]);
	// for(var i=0;i<20;i++){
	// 	var random =  Math.floor(Math.random() * +new Date() % houses.length);
	// 	var house = houses[random ];
	// 	var page = document.createElement('section');
	// 	page = $(page).addClass('page house');
	// 	var cur = tpl.clone();
	// 	$('.number', cur).html(i+1);
	// 	cur.addClass(house);
	// 	page.append(cur);
	// 	page.appendTo(dragon);
	// }

	//list
	var offset = 0;
	var nextExists = true;
	var freeze = false;
	function infiniteList(){
		if(freeze){
			return false;
		}
		if(!nextExists){
			return false;
		}
		var tpl = $('#tpl').clone().removeAttr('id');
		var dragon = $('.dragon');
		var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
		tpl.removeClass(houses[0]);
		freeze = true;
		$.get('http://api.kchsu.com/api/Participants',{limit:5,offset:0},function(list){
			freeze = false;

			if(list.length < 5){
				nextExists = false;
			}
			$.each(list,function(idx,obj){
				var randomHouse =  houses[Math.floor(Math.random() * +new Date() % houses.length) ];
				var page = document.createElement('section');
				page = $(page).addClass('page house');
				var cur = tpl.clone();
				var random = Math.floor(Math.random() * +new Date() % 99) ;
				$('.number', cur).html(random);
				$('.number', cur).html(random);
				cur.addClass(randomHouse);
				page.append(cur);
				page.appendTo(dragon);

			});
			var pageTotalWidth = $('.page.home').width() + 1 +
				625 +
				( $('.page.house').width() + 2 )* $('.page.house').length ;
				$('.dragon').width(pageTotalWidth);

		});
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
