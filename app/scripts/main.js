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
	function showOne(event){
		var req = querystring.parse(location.search.replace('?',''));
		if(req.sn){
			$('.dragon').hide();
			$('.one').hide();
			$.get('http://api.kchsu.com/api/Participants/'+req.sn,function(r){
				(function(one, dragon){
					r.number = r.number || 69;
					r.house = r.house || 'house-home';
					var positionX =  (38-500) * (r.number/100);
					var positionY =  (38-209) * (r.number/100);
					$('.dialog span',one).html(r.words);
					$('.me span',one).html(r.name);
					$('.tpl ul li:eq(0)',one).html(r.families01);
					$('.tpl ul li:eq(1)',one).html(r.families02);
					$('.tpl ul li:eq(2)',one).html(r.families03);
					$('.tpl ul li:eq(3)',one).html(r.families04);
					$('.tpl').removeClass('house-home').addClass(r.house);
					$('.tpl .number',one).html(r.number);
					$('.me .dot', one).css('background-position', positionX + 'px ' + positionY + 'px');
					$('h1').trigger('click');
					one.fadeIn(250);
					$('.close ',one).one('click',function(){
						one.hide();
						dragon.fadeIn(250,function(){
							if (window.history && window.history.pushState)
							{
								history.pushState('home','home','./');
								window.onpopstate = showOne;
							}else{
								location.href='./';
							}
						});
					});
				}($('.one'), $('.dragon')));				
			});
		}else{
			$('.dragon').fadeIn();
			$('.one').hide();
		}

	}
	showOne();
	$('.one .button').on('click',
	function oneShare(){
		var req = querystring.parse(location.search.replace('?',''));
		FB.ui({
		  method: 'share',
		  href: 'http://api.kchsu.com/r/' + req.sn
		}, function(response){
		});

	});

	$('#step2 [name=words],#step2 input').maxlength({
		alwaysShow: true,
		threshold: 30,
		warningClass: 'label label-success',
		limitReachedClass: 'label label-important',
		separator: ' 個字，最多 ',
		preText: '已輸入 ',
		postText: ' 個字。'
	});

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
		$('.goto-rule').on('click',function(){
			var container = $('.dragon');
			TweenMax.to(container,0.3,{
				left : $(window).width() * -0.8,
				onComplete:function(){
					$(window).trigger('resize');
				}
			});
		});	
		$('.build-a-home').on('click',function(){

			FB.login(function(r){
			  if(r.status === 'connected'){
		      	next();
			  }
			}, {scope:'email'}); 
			// bypass login
			// next();

			function next(){
				colorbox('#step2');
			}
		});		
		var serial;
		var formData = {};
		$('#step2 .add-button').on('click', function(){
			$('#colorbox #step2 .families.hide:eq(0)').fadeTo(1,0).removeClass('hide').fadeTo(200,1);
		});	
		$('#step2 .submit').on('click',function(){
			var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
			var randomHouse =  houses[Math.floor(Math.random() * +new Date() % houses.length) ];
			formData.words = $('#step2 [name=words]').val();
			formData.families01 = $('#step2 [name=families01]').val();
			formData.families02 = $('#step2 [name=families02]').val();
			formData.families03 = $('#step2 [name=families03]').val();
			formData.families04 = $('#step2 [name=families04]').val();
			formData.number = Math.floor(Math.random() * +new Date() % 99) ;
			formData.house = randomHouse ;
			FB.api('/me',function(me){
				formData.name = me.name;
				formData.email = me.email;
				formData.facebookid = me.id;
				// fake
				// formData.name = 'Nelson';
				// formData.email = 'nelson119@outlook.com';
				// formData.facebookid = '123';
				// end
				formData.timestamp = new Date() * 1;
				var positionX =  (38-500) * (formData.number/100);
				var positionY =  (38-209) * (formData.number/100);
				$('#step3 .name,#step3 .me span').html(formData.name);
				$('#step3 ul li:eq(0)').html(formData.families01);
				$('#step3 ul li:eq(1)').html(formData.families02);
				$('#step3 ul li:eq(2)').html(formData.families03);
				$('#step3 ul li:eq(3)').html(formData.families04);
				$('#step3 .dialog span').html(formData.words);
				$('#step3 .number').html(formData.number);
				$('#step3 .me .dot').css('background-position', positionX + 'px ' + positionY + 'px');
				$('#step3 .tpl').removeClass('house-home').addClass(randomHouse);
				$('#step4 [name=email]').attr('placeholder',formData.email);
				$.post('http://api.kchsu.com/api/Participants',formData,function(resp){
					serial = resp.id;
					colorbox('#step3',function(){
						$('#step3 .button').hide();
						html2canvas($('#step3 >aside'), {
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
								$('#step3 .button').fadeIn();
							});
						    $(capt).appendTo($('#step3'));
						  }
						});
					});

				});

			});
		});	
		$('#step3 .button').on('click',function(){
			FB.ui({
			  method: 'share',
			  href: 'http://api.kchsu.com/r/' + serial
			}, function(response){
				colorbox('#step4');
			});
		});
		$('#step4 .button.submit').on('click',function(){
			formData.email += ',' + $('#step4 [name=email]').val();
			formData.officialName = $('#step4 [name=name]').val();
			formData.address = $('#step4 [name=address]').val();
			$.ajax({
			  method:'PUT',
			  headers: {          
			    Accept : 'application/json'
			  },
			  // jshint quotmark: false
			  data :'{"officialName":"'+formData.officialName+'","email":"'+formData.email+'","address":"'+formData.address+'"}',
			  contentType:'application/json; charset=UTF-8',
			  url:'http://api.kchsu.com/api/Participants/' + serial
			}).done(function(resp){
				$('.dragon >.page.house').remove();
				$(window).trigger('resize');
				$.colorbox.close();
				offset = 0;
			});
		});
		$(window).trigger('resize');

	}

	if($('html.mobile').length){
		// $('p').appendTo($('body')).html($('html').attr('class'));
	// fit window size
		(function(w){
			var scrollTop = 0;
			$(w).on('scroll resize',function(){
				var width = $(w).width();
				var height = $(w).height() > 530 ? $(w).height() : 530;
				$('body').width(width);
				$('.home').width(width);
				if(!$('.pageSizeHeight').length){
					$('<style></style>').addClass('pageSizeHeight').appendTo($('head'));
				}
				$('.pageSizeHeight').html('.home{height:'+height+'px!important}');
				var direction = 0;
				if($(window).scrollTop() < scrollTop ){
					direction = -1;
				}else if($(window).scrollTop() > scrollTop){
					direction = 1;
				}
				scrollTop = $(window).scrollTop();
				if(direction === 1 && $(window).scrollTop() >= $('body').height() -$(window).height() *1.5){
					infiniteList();
				}
			}).trigger('resize');
		}(window));

		(function(mobile){
			var colorbox = function(target,callback){
				callback = callback || function(){};
				TweenMax.set($(target),{
					'overflow':'auto',
					'height':'auto'
				});
				TweenMax.set($(target).siblings(),{
					'overflow':'hidden',
					'height':$(window).height()
				});
				TweenMax.to($('body >.box >.hide'),0.2,{left : $(target).index() * -100 + '%' });
				TweenMax.set($('body >.container .dragon'),{
					display:'none'
				});
				TweenMax.set($('.box'),{
					width:'100%'
				});
				TweenMax.to($('html,body'),0.2,{
					scrollTop:0,
					delay:0.2,
					onComplete:callback
				});

			};
			var colorboxClose = function(){
				TweenMax.set($('.box'),{
					width:0
				});
				TweenMax.set($('body >.container .dragon'),{
					opacity:0,
					display:'block'
				});
				TweenMax.to($('body >.container .dragon'),0.2,{
					opacity:1
				});
			};
			$('.goto-rule',mobile).on('click touchstart',function(){
				TweenMax.to($('html,body'),0.25,{
					scrollTop : $('.go').offset().top -100
				});
			});	
			$('.build-a-home',mobile).on('click touchstart',function(){

				// FB.login(function(r){
				//   if(r.status === 'connected'){
			 //      	next();
				//   }
				// }); 
			      	next();
				function next(){
					colorbox($('#step2',mobile));
				}
			});

			$('#step2 .add-button',mobile).on('click touchstart', function(){
				$('#step2 .families.hide:eq(0)').fadeTo(1,0).removeClass('hide').fadeTo(200,1);
			});	
			var serial;
			var formData = {};
			$('#step2 .submit', mobile).on('click touchstart',function(){
				var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
				var randomHouse =  houses[Math.floor(Math.random() * +new Date() % houses.length) ];
				formData.words = $('#step2 [name=words]').val();
				formData.families01 = $('#step2 [name=families01]').val();
				formData.families02 = $('#step2 [name=families02]').val();
				formData.families03 = $('#step2 [name=families03]').val();
				formData.families04 = $('#step2 [name=families04]').val();
				formData.number = Math.floor(Math.random() * +new Date() % 99) ;
				formData.house = randomHouse ;
				FB.api('/me',function(me){
					formData.name = me.name;
					formData.email = me.email;
					formData.facebookid = me.id;
					formData.timestamp = new Date() * 1;
					var positionX =  (38-500) * (formData.number/100);
					var positionY =  (38-209) * (formData.number/100);
					$('#step3 .name,#step3 .me span').html(formData.name);
					$('#step3 ul li:eq(0)').html(formData.families01);
					$('#step3 ul li:eq(1)').html(formData.families02);
					$('#step3 ul li:eq(2)').html(formData.families03);
					$('#step3 ul li:eq(3)').html(formData.families04);
					$('#step3 .dialog span').html(formData.words);
					$('#step3 .number').html(formData.number);
					$('#step3 .me .dot').css('background-position', positionX + 'px ' + positionY + 'px');
					$('#step3 .tpl').removeClass('house-home').addClass(randomHouse);
					$('#step4 [name=email]').attr('placeholder',formData.email);
					$.post('http://api.kchsu.com/api/Participants',formData,function(resp){
						serial = resp.id;
						$('#step3 .button').hide();
						colorbox('#step3',function(){
							html2canvas($('#step3 >aside'), {
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
								// $.post('http://api.kchsu.com/api/Participants/s/' + serial ,{
								// 	base64Url : $(capt).attr('src')},function(){
								// 	var serial = resp.id;
								// 	$('#step3 .button').fadeIn();
								// });
								$.ajax({
								  method:'POST',
								  data :{ base64Url : $(capt).attr('src')},
								  url:'http://api.kchsu.com/api/Participants/s/' + serial 
								}).done(function(){
									var serial = resp.id;
									$('#step3 .button').fadeIn();
								}).error(function(e,x){
									alert($(capt).attr('src'));
									alert(e);
									alert(x);
									alert('圖片無法上傳');
								});
							    $(capt).appendTo($('#step3'));
							  }
							});
						});

					});

				});
			});	
			$('#step3 .button',mobile).on('click touchstart',function(){
				FB.ui({
				  method: 'share',
				  href: 'http://api.kchsu.com/r/' + serial
				}, function(response){
					colorbox('#step4');
				});
					// colorbox('#step4');
			});
			$('#step4 .button.submit',mobile).on('click touchstart',function(){
				formData.email += ',' + $('#step4 [name=email]').val();
				formData.officialName = $('#step4 [name=name]').val();
				formData.address = $('#step4 [name=address]').val();
				$.ajax({
				  method:'PUT',
				  headers: {          
				    Accept : 'application/json'
				  },
				  // jshint quotmark: false
				  data :'{"officialName":"'+formData.officialName+'","email":"'+formData.email+'","address":"'+formData.address+'"}',
				  contentType:'application/json; charset=UTF-8',
				  url:'http://api.kchsu.com/api/Participants/' + serial
				}).done(function(resp){
					$('.dragon >.page.house').remove();
					$(window).trigger('resize');
					colorboxClose();
					offset = 0;
				});
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
		tpl.removeClass('house-home');
		freeze = true;
		$('.container >.loading').show();
		$.get('http://api.kchsu.com/api/Participants',{filter:{limit:5,offset:offset,order:'id DESC'}},function(list){
			freeze = false;
			offset += list.length;
			if(list.length < 5){
				nextExists = false;
			}
			$.each(list,function(idx,obj){
				var page = document.createElement('section');
				page = $(page).addClass('page house');
				var cur = tpl.clone();
				obj.number = obj.number || 69;
				obj.house = obj.house || 'house-home';
				var positionX =  (38-500) * (obj.number/100);
				var positionY =  (38-209) * (obj.number/100);
				$('.me span', cur).html(obj.name);
				$('.me .dot', cur).css('background-position', positionX + 'px ' + positionY + 'px');
				$('ul li:eq(0)', cur).html(obj.families01);
				$('ul li:eq(1)', cur).html(obj.families02);
				$('ul li:eq(2)', cur).html(obj.families03);
				$('ul li:eq(3)', cur).html(obj.families04);
				$('ul li:eq(4)', cur).html(obj.families05);
				$(cur).attr('data-serial',obj.id);
				$('.number', cur).html(obj.number);
				$('.dialog span', cur).html(obj.words);
				cur.addClass(obj.house);
				page.append(cur);
				page.appendTo(dragon);

			});
			$(window).trigger('resize');
			$('.container >.loading').hide();
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

/* jshint ignore:start */
(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='//www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
ga('create','UA-XXXXX-X');ga('send','pageview');
/* jshint ignore:end */
