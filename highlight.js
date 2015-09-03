module.exports = (function(){
<<<<<<< HEAD
	var path = function (name){
		return 'images/celebrities/' + name + '.jpg';
	};
	var highlights = [
		{
			name 				: 	'白素貞',
			families01 			: 	'許仙',
			families02 			: 	'小青',
			families03 			: 	'',
			words 				: 	'有緣來相會，無緣手難牽，十世同船渡，百世共枕眠。',
			launch 				: 	new Date('2015/8/1'),
			expired 			: 	new Date('2015/9/2'),
			families01Picture	:	path('0828-B'),
			families02Picture	:	path('0828-C'),
			profilePicture		: 	path('0828-A'),
			street				: 	'西湖大道', 
		},
		{
			name 				: 	'黑魔女',
			families01 			: 	'歐若拉',
			words 				: 	'小怪物，我發誓只要妳還活著，我一定會好好守護著妳。',
			launch 				: 	new Date('2015/9/2'),
			expired 			: 	new Date('2015/9/3'),
			families01Picture	:	path('0829-B'),
			profilePicture		: 	path('0829-A'),
			street				: 	'黑森林', 
		},
		{
			name 				: 	'老皮',
			families01 			: 	'阿寶',
			families02 			: 	'彩虹姐姐',
			words 				: 	'猴塞雷啊！阿寶！',
			launch 				: 	new Date('2015/9/3'),
			expired 			: 	new Date('2015/9/4'),
			families01Picture	:	path('0830-B'),
			families02Picture	:	path('0830-C'),
			profilePicture		: 	path('0830-A'),
			street				: 	'哇賽二路', 
		},
		{
			name 				: 	'天王遙',
			families01 			: 	'海王滿',
			families02 			: 	'冥王雪奈',
			families03 			: 	'土萌螢',
			words 				: 	'在那裏有奇怪想法的你，我要代替月亮懲罰你！',
			launch 				: 	new Date('2015/9/4'),
			expired 			: 	new Date('2015/9/5'),
			families01Picture	:	path('0831-B'),
			families02Picture	:	path('0831-C'),
			families03Picture	:	path('0831-D'),
			profilePicture		: 	path('0831-A'),
			street				: 	'水手路', 
		},
		{
			name 				: 	'戈伯',
			words 				: 	'小葛嗝，我不結婚是有原因的。',
			launch 				: 	new Date('2015/9/5'),
			expired 			: 	new Date('2015/9/6'),
			profilePicture		: 	path('0901-A'),
			street				: 	'博克島', 
		},
		{
			name 				: 	'魯夫',
			families01 			: 	'艾斯',
			families02 			: 	'薩波',
			words 				: 	'這樣一來，我們從今天起就是兄弟了喔！！！',
			launch 				: 	new Date('2015/9/6'),
			expired 			: 	new Date('2015/9/7'),
			families01Picture	:	path('0902-B'),
			families02Picture	:	path('0902-C'),
			profilePicture		: 	path('0902-A'),
			street				: 	'達坦路', 
		},
		{
			name 				: 	'艾莎',
			families01 			: 	'安娜',
			families02 			: 	'雪寶',
			words 				: 	'想不想要堆個雪人，或一起去狂奔。',
			launch 				: 	new Date('2015/9/7'),
			expired 			: 	new Date('2015/9/8'),
			families01Picture	:	path('0903-B'),
			families02Picture	:	path('0903-C'),
			profilePicture		: 	path('0903-A'),
			street				: 	'艾倫戴爾', 
		},
		{
			name 				: 	'洪秀柱',
			families01 			: 	'中華民國',
			words 				: 	'我要嫁給中華民國，就職典禮穿新娘禮服！',
			launch 				: 	new Date('2015/9/8'),
			expired 			: 	new Date('2015/9/9'),
			families01Picture	:	path('0904-B'),
			profilePicture		: 	path('0904-A'),
			street				: 	'台灣大道', 
		},
		{
			name 				: 	'多啦 A 夢',
			families01 			: 	'大雄',
			words 				: 	'大雄，就算全世界都不要你了，我也會不離不棄！',
			launch 				: 	new Date('2015/9/9'),
			expired 			: 	new Date('2015/9/10'),
			families01Picture	:	path('0905-B'),
			profilePicture		: 	path('0905-A'),
			street				: 	'練馬區', 
		},
		{
			name 				: 	'蘭莉',
			families01 			: 	'莉蘿',
			families02 			: 	'史迪奇',
			families03 			: 	'強霸博士',
			families04 			: 	'獨眼霹靂',
			words 				: 	'歐哈那代表家人，家人意味著沒有人被落在後面，或是被遺忘。',
			launch 				: 	new Date('2015/9/10'),
			expired 			: 	new Date('2015/9/11'),
			families01Picture	:	path('0910-B'),
			families02Picture	:	path('0910-C'),
			families03Picture	:	path('0910-D'),
			families04Picture	:	path('0910-E'),
			profilePicture		: 	path('0910-A'),
			street				: 	'夏威夷島', 
		},
		{
			name 				: 	'卡娜',
			families01 			: 	'泰山',
			families02 			: 	'布珍妮',
			families03 			: 	'布教授',
			words 				: 	'閉上你的眼睛，瞧見了嗎？我們是一樣的，你永遠是我的泰山。',
			launch 				: 	new Date('2015/9/11'),
			expired 			: 	new Date('2015/9/12'),
			families01Picture	:	path('0911-B'),
			families02Picture	:	path('0911-C'),
			families03Picture	:	path('0911-D'),
			profilePicture		: 	path('0911-A'),
			street				: 	'深密叢林', 
		},
		{
			name 				: 	'李逍遙',
			families01 			: 	'林月如',
			families02 			: 	'趙靈兒',
			words 				: 	'靈兒，月如，我永遠是你們的逍遙哥哥。',
			launch 				: 	new Date('2015/9/12'),
			expired 			: 	new Date('2015/9/13'),
			families01Picture	:	path('0912-B'),
			families02Picture	:	path('0912-C'),
			profilePicture		: 	path('0912-A'),
			street				: 	'大理大道', 
		},
		{
			name 				: 	'彩依',
			families01 			: 	'劉晉元',
			words 				: 	'是癡也好，是傻也好。相公，我會一直守著你的。',
			launch 				: 	new Date('2015/9/13'),
			expired 			: 	new Date('2015/9/14'),
			families01Picture	:	path('0913-B'),
			profilePicture		: 	path('0913-A'),
			street				: 	'後花園', 
		},
		{
			name 				: 	'模擬市民 A',
			families01 			: 	'模擬市民 B',
			families02 			: 	'模擬市民 C',
			families03 			: 	'模擬市民 D',
			families04 			: 	'模擬市民 E',
			words 				: 	'你知道嗎？在我們歡樂谷同性婚姻領養正常不過了。',
			launch 				: 	new Date('2015/9/14'),
			expired 			: 	new Date('2015/9/15'),
			families01Picture	:	path('0914-B'),
			families02Picture	:	path('0914-C'),
			families03Picture	:	path('0914-D'),
			families04Picture	:	path('0914-E'),
			profilePicture		: 	path('0914-A'),
			street				: 	'歡樂谷', 
		}
	];

	return highlights;


=======

	var houses = ['house-home','house-happiness','house-equality', 'house-plurality'];

	var ret =[];
	ret.push({
		"words":"有緣來相會，無緣手難牽，十世同船渡，百世共枕眠。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/1'),
		"expired": new Date('2015/9/2'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0828-A.jpg",
		"name": "白素貞",
		"families01": "許仙",
		"families01Picture": "images/celebrities/0828-B.jpg",
		"families02": "小青",
		"families02Picture": "images/celebrities/0828-C.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"西湖大道"
	});

	ret.push({
		"words":"小怪物，我發誓只要妳還活著，我一定會好好守護著妳。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/2'),
		"expired": new Date('2015/9/3'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0829-A.jpg",
		"name": "黑魔女",
		"families01": "歐若拉",
		"families01Picture": "images/celebrities/0829-B.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"黑森林"
	});

	ret.push({
		"words":"猴塞雷啊！阿寶！",
		"timestamp": new Date(),
		"launch":new Date('2015/9/3'),
		"expired": new Date('2015/9/4'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0830-A.jpg",
		"name": "老皮",
		"families01": "阿寶",
		"families01Picture": "images/celebrities/0830-B.jpg",
		"families02": "彩虹姐姐",
		"families02Picture": "images/celebrities/0830-C.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"哇賽二路"
	});

	ret.push({
		"words":"在那裏有奇怪想法的你，我要代替月亮懲罰你！",
		"timestamp": new Date(),
		"launch":new Date('2015/9/4'),
		"expired": new Date('2015/9/5'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0831-A.jpg",
		"name": "天王遙",
		"families01": "海王滿",
		"families01Picture": "images/celebrities/0831-B.jpg",
		"families02": "冥王雪奈",
		"families02Picture": "images/celebrities/0831-C.jpg",
		"families03": "土萌螢",
		"families03Picture": "images/celebrities/0831-D.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"水手路"
	});

	ret.push({
		"words":"小葛嗝，我不結婚是有原因的。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/5'),
		"expired": new Date('2015/9/6'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0901-A.jpg",
		"name": "戈伯",
		"number": Math.floor(Math.random() * 99),
		"street":"博克島"
	});

	ret.push({
		"words":"這樣一來，我們從今天起就是兄弟了喔！！！",
		"timestamp": new Date(),
		"launch":new Date('2015/9/6'),
		"expired": new Date('2015/9/7'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0902-A.jpg",
		"name": "魯夫",
		"families01": "艾斯",
		"families01Picture": "images/celebrities/0902-B.jpg",
		"families02": "薩波",
		"families02Picture": "images/celebrities/0902-C.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"達坦路"
	});

	ret.push({
		"words":"想不想要堆個雪人，或一起去狂奔。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/7'),
		"expired": new Date('2015/9/8'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0903-A.jpg",
		"name": "艾莎",
		"families01": "安娜",
		"families01Picture": "images/celebrities/0903-B.jpg",
		"families02": "雪寶",
		"families02Picture": "images/celebrities/0903-C.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"艾倫戴爾"
	});

	ret.push({
		"words":"我要嫁給中華民國，就職典禮穿新娘禮服！",
		"timestamp": new Date(),
		"launch":new Date('2015/9/8'),
		"expired": new Date('2015/9/9'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0904-A.jpg",
		"name": "洪秀柱",
		"families01": "中華民國",
		"families01Picture": "images/celebrities/0904-B.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"台灣大道"
	});

	ret.push({
		"words":"大雄，就算全世界都不要你了，我也會不離不棄！",
		"timestamp": new Date(),
		"launch":new Date('2015/9/9'),
		"expired": new Date('2015/9/10'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0905-A.jpg",
		"name": "多啦 A 夢",
		"families01": "大雄",
		"families01Picture": "images/celebrities/0905-B.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"練馬區"
	});

	ret.push({
		"words":"歐哈那代表家人，家人意味著沒有人被落在後面，或是被遺忘。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/10'),
		"expired": new Date('2015/9/11'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0906-A.jpg",
		"name": "蘭莉",
		"families01": "莉蘿",
		"families01Picture": "images/celebrities/0906-B.jpg",
		"families02": "史迪奇",
		"families02Picture": "images/celebrities/0906-C.jpg",
		"families03": "強霸博士",
		"families03Picture": "images/celebrities/0906-D.jpg",
		"families04": "獨眼霹靂",
		"families04Picture": "images/celebrities/0906-E.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"夏威夷島"
	});

	ret.push({
		"words":"閉上你的眼睛，瞧見了嗎？我們是一樣的，你永遠是我的泰山。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/11'),
		"expired": new Date('2015/9/12'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0907-A.jpg",
		"name": "卡娜",
		"families01": "泰山",
		"families01Picture": "images/celebrities/0907-B.jpg",
		"families02": "布珍妮",
		"families02Picture": "images/celebrities/0907-C.jpg",
		"families03": "布教授",
		"families03Picture": "images/celebrities/0907-D.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"深密叢林"
	});

	ret.push({
		"words":"靈兒，月如，我永遠是你們的逍遙哥哥。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/12'),
		"expired": new Date('2015/9/13'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0908-A.jpg",
		"name": "李逍遙",
		"families01": "林月如",
		"families01Picture": "images/celebrities/0908-B.jpg",
		"families02": "趙靈兒",
		"families02Picture": "images/celebrities/0908-C.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"大理大道"
	});

	ret.push({
		"words":"是癡也好，是傻也好。相公，我會一直守著你的。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/13'),
		"expired": new Date('2015/9/14'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0909-A.jpg",
		"name": "彩依",
		"families01": "劉晉元",
		"families01Picture": "images/celebrities/0909-B.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"後花園"
	});

	ret.push({
		"words":"你知道嗎？在我們歡樂谷同性婚姻領養正常不過了。",
		"timestamp": new Date(),
		"launch":new Date('2015/9/14'),
		"expired": new Date('2015/9/15'),
		"house": houses[Math.floor(Math.random() * houses.length)],
		"profilePicture":"images/celebrities/0910-A.jpg",
		"name": "模擬市民 A",
		"families01": "模擬市民 A",
		"families01Picture": "images/celebrities/0910-B.jpg",
		"families02": "模擬市民 B",
		"families02Picture": "images/celebrities/0910-C.jpg",
		"families03": "模擬市民 C",
		"families03Picture": "images/celebrities/0910-D.jpg",
		"families04": "模擬市民 D",
		"families04Picture": "images/celebrities/0910-E.jpg",
		"number": Math.floor(Math.random() * 99),
		"street":"歡樂谷"
	});


	return ret;
>>>>>>> fe233bad0419a838fc19e2c239d7399c34c5dd1f
}());