"use strict";$(function(){if($("html.desktop").length){!function(e){$(e).on("scroll resize",function(){var t=$(e).width(),n=$(e).height()>530?$(e).height():530;$("body").width(t),$("body").height(n),$(".home").width(t)}).trigger("resize")}(window),$(".text-muted a").on("click",function(){return TweenMax.to($(".dragon"),.3,{left:60,onComplete:function(){$(window).trigger("mousewheel")}}),!1}),$(".dragon").on("mousewheel",function(e){var t=0,n=$(".dragon"),o=$(".page.home").width()+1+$(".page.rule").width()+1+$(".page.go").width()+1+($(".page.house").width()+2)*$(".page.house").length;$(".dragon").width(o);var a=$(".dragon").width(),i=$(window).width()-a;if(e.deltaY<0?t=-1:e.deltaY>0&&(t=1),+n.css("left").replace(/px/,"")>=0&&t>=0)return TweenMax.to(n,.25,{left:0}),!1;if(+n.css("left").replace(/px/,"")<=i&&0>=t)return TweenMax.to(n,.25,{left:i+"px"}),!1;var r=12e3/$(window).width(),d=+$(".cross").attr("data-zfact"),l=+$(".road").attr("data-zfact");return TweenMax.to(n,.3,{left:"+="+e.deltaY*r+"%"}),TweenMax.to($(".cross"),.3,{left:"+="+e.deltaY*r/d+"%"}),TweenMax.to($(".road"),.3,{left:"+="+e.deltaY*r/l+"%"}),!1});{var e,t,n;new Draggabilly(".dragon",{axis:"x"}).on("dragStart",function(t){e=t.clientX}).on("pointerUp",function(o){t=o.clientX;var a=e-t,i=$(".dragon");try{n.kill()}catch(o){}n=TweenMax.to(i,1,{left:"-="+a/2,onComplete:function(){$(".dragon").trigger("mousewheel")}})})}}$("html.mobile").length&&!function(e){$(e).on("scroll resize",function(){var t=$(e).width(),n=$(e).height()>530?$(e).height():530;$("body").width(t),$("body").height(n),$(".home").width(t),$(".pageSizeHeight").length||$("<style></style>").addClass("pageSizeHeight").appendTo($("head")),$(".pageSizeHeight").html(".home{height:"+n+"px!important}")}).trigger("resize")}(window);var o=$("#tpl").clone().removeAttr("id"),a=$(".dragon"),i=["house-home","house-happiness","house-equality","house-plurality"];o.removeClass(i[0]);for(var r=0;20>r;r++){var d=Math.floor(Math.random()*+new Date%i.length),l=i[d],h=document.createElement("section");h=$(h).addClass("page house");var s=o.clone();$(".number",s).html(r+1),s.addClass(l),h.append(s),h.appendTo(a)}}),window.fbAsyncInit=function(){FB.init({appId:"887313441322816",xfbml:!0,version:"v2.4"})},function(e,t,n){var o,a=e.getElementsByTagName(t)[0];e.getElementById(n)||(o=e.createElement(t),o.id=n,o.src="//connect.facebook.net/en_US/sdk.js",a.parentNode.insertBefore(o,a))}(document,"script","facebook-jssdk");