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
			overlayClose:false,
			escKey:false,
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
		$('.dragon:not(.one),.cross').on('mousewheel',function(evt){
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
			if($('html.mac').length >0){
				fact = 300 / $(window).width();
			}
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
		      	next();
			  }
			}, {scope:'email'}); 
			function next(){
				colorbox('#step2');
			}
		});		
		var serial;
		$('#step2 .add-button').on('click', function(){
			$('#colorbox #step2 .families.hide:eq(0)').fadeTo(1,0).removeClass('hide').fadeTo(200,1);
		});	
		$('#step2 .submit').on('click',function(){
			var formData = {};
			formData.words = $('#step2 [name=words]').val();
			formData.families01 = $('#step2 [name=families01]').val();
			formData.families02 = $('#step2 [name=families02]').val();
			formData.families03 = $('#step2 [name=families03]').val();
			formData.families04 = $('#step2 [name=families04]').val();
			formData.families05 = $('#step2 [name=families05]').val();
			formData.random = Math.floor(Math.random() * +new Date() % 99) ;
			FB.api('/me',function(me){
				formData.name = me.name;
				formData.email = me.email;
				$('#step3 .name').html(formData.name);
				$('#step3 .families01').html(formData.families01);
				$('#step3 .families02').html(formData.families02);
				$('#step3 .families03').html(formData.families03);
				$('#step3 .families04').html(formData.families04);
				$('#step3 .families05').html(formData.families05);
				$('#step3 .number').html(formData.random);
				$.post('http://api.kchsu.com/api/Participants',formData,function(resp){
					serial = resp.id;
					html2canvas($('#step3 aside'), {
					  onrendered: function(canvas) {
					    $('#step3').append(canvas);
					    var img    = canvas.toDataURL('image/png');
					    var capt = document.createElement('img');
					    capt.src=img;
					    TweenMax.set(capt,{
					      position:'absolute',
					      left:0,
					      top:0,
					      display:'none'
					    });
						$.post('http://api.kchsu.com/api/Participants/s/' + serial ,{
							base64Url : $(capt).attr('src')},function(){
							var serial = resp.id;
						});
					    $(capt).appendTo($('#step3'));
						colorbox('#step3');
					  }
					});

				});

				//capture step 3 to png data url

				// $.post('http://api.kchsu.com/api/Participants/s/');
			});
		});	
		$('#step3 .button').on('click',function(){
			FB.ui({
			  method: 'feed',
			  link: 'http://api.kchsu.com/r/' + serial,
			  caption: 'An example caption',
			}, function(response){
				colorbox('#step4');
			});
		});
			$(window).trigger('resize');

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

		(function(mobile){
			$('.build-a-home',mobile).on('click',function(){

				FB.login(function(r){
				  if(r.status === 'connected'){
			      	next();
				  }
				}); 
				function next(){
					colorbox($('#step2',mobile));
				}
			});	
		}($('html.mobile')));


	}


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
		$.get('http://api.kchsu.com/api/Participants',{filter:{limit:5,offset:offset}},function(list){
			freeze = false;
			offset += list.length;
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
				$('.me span', cur).html(obj.name);
				$('ul li:eq(0)', cur).html(obj.families01);
				$('ul li:eq(1)', cur).html(obj.families02);
				$('ul li:eq(2)', cur).html(obj.families03);
				$('ul li:eq(3)', cur).html(obj.families04);
				$('ul li:eq(4)', cur).html(obj.families05);
				$(cur).attr('data-serial',obj.id);
				cur.addClass(randomHouse);
				page.append(cur);
				page.appendTo(dragon);

			});
			$(window).trigger('resize');

		});
	}
	infiniteList();
});
window.fbAsyncInit = function() {
	FB.init({
	  appId      : '1645980782348774',
	  xfbml      : true,
	  version    : 'v2.4'
	});
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = '//connect.facebook.net/zh_TW/sdk.js';
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));
