"use strict";$(function(){!function(e){$(e).on("scroll resize",function(){var t=$(e).width(),a=$(e).height();$("body").width(t),$("body").height(a),$(".home").width(t)}).trigger("resize")}(window),$(".text-muted a").on("click",function(){return TweenMax.to($(".dragon"),.3,{marginLeft:0}),!1}),$(window).on("mousewheel",function(e){var t=1,a=$(".dragon"),n=$(".page.home").width()+$(".page.rule").width()+$(".page.house").width()*$(".page.house").length,o=$(window).width()-n;if(e.deltaY<0&&(t=-1),+a.css("margin-left").replace(/px/,"")>=0&&1===t)return TweenMax.to(a,.25,{marginLeft:0}),!1;if(+a.css("margin-left").replace(/px/,"")<=o&&-1===t)return TweenMax.to(a,.25,{marginLeft:o+"px"}),!1;var r=12e3/$(window).width(),i=+$(".cross").attr("data-zfact"),d=+$(".road").attr("data-zfact");return TweenMax.to(a,.3,{marginLeft:"+="+e.deltaY*r+"%"}),TweenMax.to($(".cross"),.3,{marginLeft:"+="+e.deltaY*r/i+"%"}),TweenMax.to($(".road"),.3,{marginLeft:"+="+e.deltaY*r/d+"%"}),!1});var e=$("#tpl").clone().removeAttr("id"),t=$(".dragon"),a=["house-home","house-happiness","house-equality","house-plurality"];e.removeClass(a[0]);for(var n=0;200>n;n++){var o=Math.floor(Math.random()*+new Date%a.length),r=a[o],i=document.createElement("section");i=$(i).addClass("page house");var d=e.clone();d.addClass(r),i.append(d),i.appendTo(t)}});