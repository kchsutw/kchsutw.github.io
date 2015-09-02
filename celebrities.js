var _ = require('lodash');

module.exports = (function(){

	var ret =[{
		//選單上顯示名稱
		name: "阿寶", 
		//圖片網址 
		url:"http://mla-s2-p.mlstatic.com/taza-de-adventure-tima-hora-de-aventura-finn-jake-6694-MLA5096428226_092013-O.jpg", 
		//開始時間
		launch:new Date('2015/8/15'), 
		//結束時間
		expired:new Date('2016/8/15'), 
		//facebookid
		facebookId:"",
		//選中後名稱
		value:"阿寶" 
	},{
		name: "老皮", 
		url:"https://i1.sndcdn.com/avatars-000034827507-77rewh-t500x500.jpg", 
		pattern:"老皮", 
		launch:new Date('2015/8/15'), 
		expired:new Date('2016/8/15'), 
		facebookId:"",
		value:"老皮"
	},{
		name: "郭美江", 
		url:"https://graph.facebook.com/Linda6123/picture", 
		pattern:"郭美江", 
		launch:new Date('2015/8/15'), 
		expired:new Date('2016/8/15'), 
		facebookId:"Linda6123",
		value:"郭美江"
	},{
		name: "James Franco", 
		url:"https://graph.facebook.com/JamesFranco/picture?type=large", 
		pattern:"James|Franco|JamesFranco", 
		launch:new Date('2015/8/15'), 
		expired:new Date('2016/8/15'), 
		facebookId:"Linda6123",
		value:"James Franco"
	}];

	_(ret).each(function(element,index){
		console.log('已加入\'' +element.name+ '\'')
	})

	return ret;
}());