/* jshint devel:true , unused : false, camelcase : false, latedef : nofunc*/
'use strict';
// console.log('\'Allo \'Allo!');
$(function(){
	// fake mobile
	// $('html').removeClass('desktop').addClass('mobile');
	var streets = ['光譜一街','光譜二街', '光譜三街', '平等一路', 
				'平等二路','平等三路','和諧街','陽光大道','石牆路',
				'伴侶南路','伴侶北路','平權東路','平權西路','擇愛一路',
				'擇愛二路','擇愛三路','擇愛四路','擇愛五路','成家一路',
				'成家二路','成家三路','成家四路','成家五路','家屬南路',
				'家屬北路','家屬東路','家屬西路','羈絆路','偕老一路','偕老二路'];
	var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];
	var apiBaseUrl =  /localhost/.test(location.href) ? 'http://localhost:3000' : 'http://api.kchsu.com';

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
	var colorboxClose = function(){
		ga('send', 'event', 'colorbox', 'colorbox', 'close', 1);
		offset = 0;
		$(window).trigger('resize');
		$.colorbox.close();
	};
	function showOne(event){
		var req = querystring.parse(location.search.replace('?',''));
		if(req.sn){
			$('.container >.loading').hide();
			$('.dragon').hide();
			$('.one').hide();
			$('.container').addClass('show-one');
			$.get(apiBaseUrl + '/api/Participants/'+req.sn,function(r){
				(function(one, dragon){
					r.number = r.number || 69;
					r.house = r.house || houses[0];
					r.street = r.street || streets[0];
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
					$('.tpl .road-name', one).html(r.street);
					var pic = new Image();
					pic.src = 'https://graph.facebook.com/'+r.facebookid+'/picture?type=large';
					$('.me .dot', one).append(pic);
					$('.me .dot', one).css('background-position', positionX + 'px ' + positionY + 'px');
					$('h1').trigger('click');
					one.fadeIn(250);
					$('.close ',one).one('click',function(){
						one.hide();
						$('.container').removeClass('show-one');
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
					$('.one .button.start').on('click', function(){
						one.hide();
								$('.build-a-home').trigger('click');
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

	$.get(apiBaseUrl + '/api/Participants/count',function(r){
		$('.party-count').html(r.count);
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

	if($('html.desktop,html.tablet').length){

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
			if($('html.desktop').length){
				TweenMax.to($('.dragon'),0.3,{
					left : 60,
					onComplete: function(){
						$(window).trigger('mousewheel');
					}
				});
			}
			if($('html.tablet').length){
				TweenMax.to($(window),0.3,{
					scrollLeft : -20
				});
			}
			return false;
		});

		if($('html.desktop').length){
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

		}
		if($('html.tablet').length){
			var scrollLeft = 0;
			$(window).on('scroll resize',function(){

				var direction = 0;
				var container = $('.dragon');
				var pageTotalWidth = $('.page.home').width() + 1 +
					625 +
					( $('.page.house').width() + 2 )* $('.page.house').length ;
				// if(dragonWidth < pageTotalWidth){
					$('.container, .dragon').width(pageTotalWidth);
				// }
				var dragonWidth = $('.dragon').width();
				var ceil = $(window).width() - dragonWidth;
				if($(window).scrollLeft() < scrollLeft ){
					direction = -1;
				}else if($(window).scrollLeft() > scrollLeft){
					direction = 1;
				}
				scrollLeft = $(window).scrollLeft();
				if(direction === 1 && $(window).scrollLeft() >= $('.container').width() -$(window).width() *1.5){
					infiniteList();
				}
			}).trigger('resize');
		}
		$('.nav-pills li:eq(0)').on('click',function(){
			colorbox('#about');
		});
		$('.goto-rule').on('click',function(){
			var container = $('.dragon');
			if($('html.tablet').length){
				container = $('html,body');
				TweenMax.to(container,0.3,{
					scrollLeft : $(window).width() * 0.8,
					onComplete:function(){
						$(window).trigger('resize');
					}
				});
			}else{
				TweenMax.to(container,0.3,{
					left : $(window).width() * -0.8,
					onComplete:function(){
						$(window).trigger('resize');
					}
				});				
			}
		});	
		$(window).trigger('resize');

	}

	if($('html.mobile').length){
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
				var req = querystring.parse(location.search.replace('?',''));
				if(req.sn){
					return;
				}
				if(direction === 1 && $(window).scrollTop() >= $('body').height() -$(window).height() *1.5){
					infiniteList();
				}
			}).trigger('resize');
		}(window));

		(function(mobile){
			$('.menu', mobile).on('click',function(){
				ga('send', 'event', 'menu', 'menu', 'slide', 1);
				$('.nav-pills', mobile).toggleClass('on');
				$('.container').one('click',function(){
					$('.nav-pills', mobile).removeClass('on');
				});
			});
			colorbox = function(target,callback){
				callback = callback || function(){};
				TweenMax.set($(target),{
					'overflow':'auto',
					'height':'auto'
				});
				TweenMax.set($(target).siblings(),{
					'overflow':'hidden',
					'height':$(window).height()
				});
				TweenMax.set($('body >.container .dragon'),{
					display:'none'
				});
				TweenMax.set($('body >.container'),{
					position:'absolute',
					height:'100%'
				});
				TweenMax.set($('.box'),{
					width:'100%'
				});
				TweenMax.to($(target),0.2,{'width':'100%',display:'block' });
				TweenMax.to($(target).siblings(),0.2,{'width':0,display:'none' });
				TweenMax.to($('html,body'),0.2,{
					scrollTop:0,
					delay:0.2,
					onComplete:callback
				});

				freeze = true;
			};
			colorboxClose = function(){
				ga('send', 'event', 'colorbox', 'colorbox', 'close', 1);
				TweenMax.set($('.box'),{
					width:0
				});
				TweenMax.set($('body >.container .dragon'),{
					opacity:0,
					display:'block'
				});
				TweenMax.set($('body >.container'),{
					position:'static',
					height:'auto'
				});
				TweenMax.to($('body >.container .dragon'),0.2,{
					opacity:1
				});
				freeze = false;
			};
			$('.goto-rule',mobile).on('click',function(){
				TweenMax.to($('html,body'),0.25,{
					scrollTop : $('.go').offset().top -100
				});
			});	


		}($('html.mobile')));
	}

	var serial;
	var formData = {};
	var step2Processing = false;
	var pictures = [];
	var celebrities = [];

	$('.go .term').on('click',function(){
		ga('send', 'event', 'terms', 'terms', 'click', 1);
		colorbox('#terms');
	});


	$('#step2 .add-button').on('click', function(){
		ga('send', 'event', 'participants-steps', 'add-family', 'click', 1);
		$('#step2 .families.tt-input.hide:eq(0)').fadeTo(1,0).removeClass('hide').fadeTo(200,1);
		if(!$('#step2 .families.hide:eq(0)').length){
			$(this).fadeOut(250);
		}
	});	

	$('.build-a-home').on('click touchend',function(){
		ga('send', 'event', 'participants-steps', 'facebook-login', 'start', 1);
		FB.login(function(r){
		  if(r.status === 'connected'){
			FB.api('/me?fields=email,name,first_name',function(me){
				formData.name = me.first_name;
				formData.email = me.email;
				formData.facebookid = me.id;
				formData.timestamp = new Date() * 1;
				$.get(apiBaseUrl + '/face/'+formData.facebookid,function(r){
					var pic = new Image();				
					pic.src = 'https://graph.facebook.com/'+me.id+'/picture?type=large';
					$('#step3 .me .dot').html(pic);
					var img = new Image();				
					img.src = r.dataUrl;
					pictures.push({image:img,target:$('#step3 .me img')});
				});
				$('#step2 .families,#step2 [name=words]').val('');
				importFriends();
	      		next();
			});
	      	return;
		  }
		}, {scope:'email,user_friends'}); 
		ga('send', 'event', 'participants-steps', 'facebook-login', 'denied', 1);
		function next(){
			colorbox($('#step2'));
		}
	});

	$('#step2 .submit').on('click',function(){
		ga('send', 'event', 'participants-steps', 'create-house', 'submit', 1);
		if(step2Processing){
			return false;
		}
		step2Processing = true;
		var randomHouse =  houses[Math.floor(Math.random() * +new Date() % houses.length) ];
		var randomStreet =  streets[Math.floor(Math.random() * +new Date() % streets.length) ];
		formData.words =  lineBreak($('#step2 [name=words]').val(), 160);
		formData.street = lineBreak(randomStreet, 10);
		formData.number = Math.floor(Math.random() * +new Date() % 99) ;
		var positionX =  (38-500) * (formData.number/100);
		var positionY =  (38-209) * (formData.number/100);


		var cel = $(document.createElement('i'));

		cel.html($('#step2 [data-target=families01]').clone().removeAttr('style')
			.css('background-position', positionX + 'px ' + positionY + 'px'));
		formData.families01 = $('#step2 [name=families01]').val() + cel.html();

		cel.html($('#step2 [data-target=families02]').clone().removeAttr('style')
			.css('background-position', positionX + 'px ' + positionY + 'px'));
		formData.families02 = $('#step2 [name=families02]').val() + cel.html();

		cel.html($('#step2 [data-target=families03]').clone().removeAttr('style')
			.css('background-position', positionX + 'px ' + positionY + 'px'));
		formData.families03 = $('#step2 [name=families03]').val() + cel.html();

		cel.html($('#step2 [data-target=families04]').clone().removeAttr('style')
			.css('background-position', positionX + 'px ' + positionY + 'px'));
		formData.families04 = $('#step2 [name=families04]').val() + cel.html();

		addCelebrities();

		formData.house = randomHouse ;
		$('#step3 .name,#step3 .me span').html(formData.name);
		$('#step3 ul li:eq(0)').html(formData.families01);
		$('#step3 ul li:eq(1)').html(formData.families02);
		$('#step3 ul li:eq(2)').html(formData.families03);
		$('#step3 ul li:eq(3)').html(formData.families04);
		$('#step3 .dialog span').html(formData.words);
		$('#step3 .number').html(formData.number);
		$('#step3 .road-name').html(formData.street);
		$('#step3 .me .dot').css('background-position', positionX + 'px ' + positionY + 'px');
		$('#step3 .tpl').removeClass('house-home').addClass(randomHouse);
		$('#step4 [name=email]').attr('placeholder',formData.email);
		$.post(apiBaseUrl + '/api/Participants',formData,function(resp){
			serial = resp.id;
			$('#step3 .button').hide();
			colorbox('#step3',function(){
				html2canvas($('#step3 >aside'), {
				    onrendered: function(canvas) {
						addCelebrities();
			    		addPictures(canvas, function(cvs){
						    var img    = cvs.toDataURL('image/png');
						    var capt = document.createElement('img');
						    capt.src=img;
						    TweenMax.set(capt,{
						      position:'absolute',
						      left:0,
						      top:0,
						      display:'none'
						    });
							$.ajax({
							  method:'POST',
							  data :{ base64Url : $(capt).attr('src')},
							  url:apiBaseUrl + '/api/Participants/s/' + serial 
							}).done(function(){
								$('#step3 .button').fadeIn();
								step2Processing = false;
							}).error(function(e,x){
								alert('圖片無法上傳');
							});
						    $(capt).appendTo($('#step3'));

			    		});

				    }
				});
			});

		});
	});	

	$('#step3 .button').on('click',function(){
		ga('send', 'event', 'participants-steps', 'share', 'share-loaded', 1);
		var shareUrl = apiBaseUrl + '/r/' + serial;
		$('#fb-root').hide();
		FB.ui({
		  method: 'share',
		  href: shareUrl
		}, function(response){

		    if (response && !response.error_code) {
				ga('send', 'event', 'participants-steps', 'share', 'share-complete', 1);
				colorbox('#step4');
		    }
		});
	});


	$('#step4 .button.submit').on('click',function(){
		ga('send', 'event', 'participants-steps', 'submit-user-info', 'submit', 1);
		formData.email = $('#step4 [name=email]').val() || formData.email;
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
		  url:apiBaseUrl + '/api/Participants/' + serial
		}).done(function(resp){
			$('.dragon >.page.house').remove();
			colorboxClose();
		});
	});

	//list
	var offset = 0;
	var nextExists = true;
	var freeze = false;
	var friendImported = false;
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


		if(offset === 0){
			updateFirstOne(getFiveMore);
		}else{
			getFiveMore();
		}



		function getFiveMore(){
			ga('send', 'event', 'load-counting', 'infinite-list', 'offset', offset);
			$.get(apiBaseUrl + '/api/Participants',{filter:{limit:5,offset:offset,order:'id DESC'}},function(list){
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
					obj.house = obj.house || houses[0];
					obj.street = obj.street || streets[0];
					var positionX =  (38-500) * (obj.number/100);
					var positionY =  (38-209) * (obj.number/100);
					$('.me span', cur).html(obj.name);
					var pic = new Image();
					pic.src = 'https://graph.facebook.com/'+obj.facebookid+'/picture?type=large';
					$('.me i', cur).html(pic);
					$('.me .dot', cur).css('background-position', positionX + 'px ' + positionY + 'px');
					$('ul li:eq(0)', cur).html(obj.families01);
					$('ul li:eq(1)', cur).html(obj.families02);
					$('ul li:eq(2)', cur).html(obj.families03);
					$('ul li:eq(3)', cur).html(obj.families04);
					$('ul li:eq(4)', cur).html(obj.families05);
					$(cur).attr('data-serial',obj.id);
					$('.number', cur).html(obj.number);
					$('.road-name', cur).html(obj.street);
					$('.dialog span', cur).html(obj.words);
					cur.addClass(obj.house);
					page.append(cur);
					$(cur).css('cursor','pointer').on('click',function(){
						location.href='./?sn=' + $(this).attr('data-serial');
					});
					page.appendTo(dragon);

				});
				$(window).trigger('resize');
				$('.container >.loading').hide();
			});
		}
		function updateFirstOne(callback){
			$.get(apiBaseUrl + '/api/Participants',{filter:{limit:1,offset:0,order:'id DESC'}},function(list){
				offset += list.length;
				$.each(list,function(idx,obj){
					var cur = $('#tpl');
					obj.number = obj.number || 69;
					obj.house = obj.house || houses[0];
					obj.street = obj.street || streets[0];
					var positionX =  (38-500) * (obj.number/100);
					var positionY =  (38-209) * (obj.number/100);
					$('.me span', cur).html(obj.name);
					var pic = new Image();
					pic.src = 'https://graph.facebook.com/'+obj.facebookid+'/picture?type=large';
					$('.me i', cur).html(pic);
					$('.me .dot', cur).css('background-position', positionX + 'px ' + positionY + 'px');
					$('ul li:eq(0)', cur).html(obj.families01);
					$('ul li:eq(1)', cur).html(obj.families02);
					$('ul li:eq(2)', cur).html(obj.families03);
					$('ul li:eq(3)', cur).html(obj.families04);
					$('ul li:eq(4)', cur).html(obj.families05);
					$(cur).attr('data-serial',obj.id);
					$('.number', cur).html(obj.number);
					$('.road-name', cur).html(obj.street);
					$('.dialog span', cur).html(obj.words);
					cur.addClass(obj.house);
					$(cur).css('cursor','pointer').on('click',function(){
						location.href='./?sn=' + $(this).attr('data-serial');
					});
				});
				callback();
			});
		}
	}
	infiniteList();

	function lineBreak(str, width){
    var canvas =  document.createElement('canvas');
		var ctx = canvas.getContext('2d'),        
			offset = 0,
			res = '';
		for(var i in str){
			offset += ctx.measureText(str[i]).width;
			res += str[i];
			if(offset >= width){
				res += '-<br>';
    			offset = 0;
			}
		}
		return res.replace(/([\W])-/ig, '$1');
	}
    function addPictures(canvas, callback)
	{
	    var context = canvas.getContext('2d');
	    context.globalAlpha = 0.3;
		function loadImages(pictures, callback) {
			var images = [];
			var loadedImages = 0;
			var numImages = 0;
			// get num of sources
			for(var idx in pictures) {
			  numImages++;
			}
			$(pictures).each(function(i, d) {
				images[i] = {};
				images[i].target = pictures[i].target;
				images[i].image = new Image();
				images[i].image.onload = function() {
					if(++loadedImages >= numImages) {
						callback(images);
					}
				};
				images[i].image.src = pictures[i].image.src;
			});
		}
	    function roundedImage(x,y,width,height,radius){
	      context.beginPath();
	      context.moveTo(x + radius, y);
	      context.lineTo(x + width - radius, y);
	      context.quadraticCurveTo(x + width, y, x + width, y + radius);
	      context.lineTo(x + width, y + height - radius);
	      context.quadraticCurveTo(x + width, y + height, x + width - radius, y + height);
	      context.lineTo(x + radius, y + height);
	      context.quadraticCurveTo(x, y + height, x, y + height - radius);
	      context.lineTo(x, y + radius);
	      context.quadraticCurveTo(x, y, x + radius, y);
	      context.closePath();
	    }
		loadImages(pictures, function(images) {
			$.each(images,function(i,d){
				var target = d.target,
			  	x = target.offset().left - $('#step3 >aside').offset().left, 
			  	y = target.offset().top - $('#step3 >aside').offset().top,
			  	width = target.width(),
			  	height = target.height(),
			  	radius = target.width() / 2;

			    context.save();
			    roundedImage(x, y, width, height, radius);
			    context.clip();
			    context.drawImage(d.image, x, y,width,height);
			    context.restore();
			});
			callback(canvas);
		});
	}
	$.getJSON('celebrities.json?_='+new Date() * 1,function(r){
		celebrities = r.celebrities;
	});
	function checkCelebrities(input){
		var result = {};
		$.each(celebrities,function(i,cel){
			if(new Date() < new Date(cel.launch)){
				return true;
			}
			var reg = new RegExp(cel.pattern, 'ig');

			if(reg.test(input)){
				result.match = true;
				result.url = cel.url;
				result.name = cel.name;
				result.index = i;
				if(!celebrities[i].dataUrl){
					$.get(apiBaseUrl + '/imgData/' + encodeURIComponent(cel.url) ,function(r){
						celebrities[i].dataUrl = r.dataUrl;
					});	
				}
				return false;
			}

		});
		if(result.match){
			return result;
		}
		return {
			match : false,
			url : null
		};
	}
	$('[name=families01],[name=families02],[name=families03],[name=families04]').on('input',function(){
		var cel = checkCelebrities($(this).val());
		var parent = $(this).parents('#step2,#step3 aside');
		if(cel.match){
			var target = $(this);
			var celebrityPic = document.createElement('i');
			$(celebrityPic).addClass('celebrities')
				.attr('data-target',this.name)
				.attr('data-index',cel.index);
			var img = new Image();
			$(celebrityPic).append(img);
			TweenMax.set(celebrityPic,{
				left: target.offset().left + 
					target.width() +
					target.css('margin-left').replace(/px/,'') * 1 - 
					parent.offset().left,
				top: target.offset().top - parent.offset().top +
					target.height()
			});
			img.onload = function(){
				$('i.celebrities[data-target='+target.attr('name')+']',parent).remove();	
				$(parent).append(celebrityPic);
			};
			img.src = cel.url;
		}else{
			$('i.celebrities[data-target='+this.name+']',parent).remove();			
		}
	});
	function addCelebrities(canvas, callback){
		$('#step3 ul li i').each(function(i,d){
			var img = new Image();
			img.src = celebrities[$(d).attr('data-index')*1].dataUrl;
			pictures.push({
				image : img,
				target : $(d)
			});
		});
	}
	function importFriends(){
		if(friendImported){
			return;
		}
		FB.api('/me/taggable_friends?limit=5000',function(resp){
			$.each(resp.data,function(i,d ){
				celebrities.push({
					'name': d.name,
					'url': d.picture.data.url,
					'pattern':new Date()*1,
					'launch':JSON.stringify(new Date()).replace(/\"/ig,''),
					'expired':'2015-12-31T16:00:00.000Z',
					'facebookId':null,
					'value': (d.name.length <= 10 ? d.name : d.name.replace(/^(\S+).*/i,'$1') )
				});
			});
			var substringMatcher = function() {
			  return function findMatches(q, cb) {
			    var matches;

			    // an array that will be populated with substring matches
			    matches = [];

		        $.each(celebrities,function(i,d){
					var reg = new RegExp(q.replace(/\s/ig,'.*|'), 'ig');

		        	if(reg.test(d.name)){
		        		d.index = i;
		        		matches.push(d);
		        	}
		        });
			    cb(matches);

			  };
			};
			$('[name=families01],[name=families02],[name=families03],[name=families04]').typeahead(null,
			{
				name: 'best-pictures',
				display: 'value',
				source: substringMatcher(),
				templates: {
				    empty: [
				      '<div class="empty-message">',
				        '...',
				      '</div>'
				    ].join('\n'),
				    suggestion: function(item){
      					return '<div><span>'+item.name+'</span> <img src=\''+item.url+'\'></div>';
      				}
      		    }
			}).bind('typeahead:selected', function(obj, datum, name) {
				var parent = $(this).parents('#step2,#step3 aside');
				var target = $(this);
				var celebrityPic = document.createElement('i');
				$(celebrityPic).addClass('celebrities')
					.attr('data-target',this.name)
					.attr('data-index',datum.index);
				var img = new Image();
				$(celebrityPic).append(img);
				TweenMax.set(celebrityPic,{
					left: target.offset().left +
						target.css('margin-left').replace(/px/,'') * 1 - 
						parent.offset().left + 16,
					top: target.offset().top - parent.offset().top +
						target.height() - 5
				});
				img.onload = function(){
					$('i.celebrities[data-target='+target.attr('name')+']',parent).remove();	
					$(parent).append(celebrityPic);
					target.val(datum.value);
					if(!datum.dataUrl){
						$.post(apiBaseUrl + '/imgData', {
								imgUrl : datum.url
							})
							.done(function(r){
								r = $.parseJSON(r);
								celebrities[datum.index].dataUrl = r.dataUrl;
							});	
					}
				};
				img.src = datum.url;
			});
			friendImported = true;
		});
	}
});
window.fbAsyncInit = function() {
	var appId = /localhost/.test(location.href) ? '1649099138703605' : '1645980782348774';
	FB.init({
	  appId 	 : appId,
	  xfbml      : true,
	  version    : 'v2.4'
	});
};

(function(d, s, id){
 var js, fjs = d.getElementsByTagName(s)[0];
 if (d.getElementById(id)) {return;}
 js = d.createElement(s); js.id = id;
 js.src = '//connect.facebook.net/zh_TW/all.js';
 fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

/* jshint ignore:start */
(function(b,o,i,l,e,r){b.GoogleAnalyticsObject=l;b[l]||(b[l]=
function(){(b[l].q=b[l].q||[]).push(arguments)});b[l].l=+new Date;
e=o.createElement(i);r=o.getElementsByTagName(i)[0];
e.src='//www.google-analytics.com/analytics.js';
r.parentNode.insertBefore(e,r)}(window,document,'script','ga'));
ga('create','UA-50961568-3');ga('send','pageview');
/* jshint ignore:end */

