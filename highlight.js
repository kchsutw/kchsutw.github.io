module.exports = (function(){
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
			expired 			: 	new Date('2015/10/7'),
			families01Picture	:	path('0828-B'),
			families02Picture	:	path('0828-C'),
			profilePicture		: 	path('0828-A'),
			street				: 	'西湖大道', 
		},
		{
			name 				: 	'黑魔女',
			families01 			: 	'歐若拉',
			words 				: 	'小怪物，我發誓只要妳還活著，我一定會好好守護著妳。',
			launch 				: 	new Date('2015/10/8'),
			expired 			: 	new Date('2015/10/9'),
			families01Picture	:	path('0829-B'),
			profilePicture		: 	path('0829-A'),
			street				: 	'黑森林', 
		},
		{
			name 				: 	'老皮',
			families01 			: 	'阿寶',
			families02 			: 	'彩虹姐姐',
			words 				: 	'猴塞雷啊！阿寶！',
			launch 				: 	new Date('2015/10/9'),
			expired 			: 	new Date('2015/10/10'),
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
			launch 				: 	new Date('2015/10/10'),
			expired 			: 	new Date('2015/10/11'),
			families01Picture	:	path('0831-B'),
			families02Picture	:	path('0831-C'),
			families03Picture	:	path('0831-D'),
			profilePicture		: 	path('0831-A'),
			street				: 	'水手路', 
		},
		{
			name 				: 	'戈伯',
			words 				: 	'小葛嗝，我不結婚是有原因的。',
			launch 				: 	new Date('2015/10/11'),
			expired 			: 	new Date('2015/10/12'),
			profilePicture		: 	path('0901-A'),
			street				: 	'博克島', 
		},
		{
			name 				: 	'魯夫',
			families01 			: 	'艾斯',
			families02 			: 	'薩波',
			words 				: 	'這樣一來，我們從今天起就是兄弟了喔！！！',
			launch 				: 	new Date('2015/10/12'),
			expired 			: 	new Date('2015/10/13'),
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
			launch 				: 	new Date('2015/10/13'),
			expired 			: 	new Date('2015/10/14'),
			families01Picture	:	path('0903-B'),
			families02Picture	:	path('0903-C'),
			profilePicture		: 	path('0903-A'),
			street				: 	'艾倫戴爾', 
		},
		{
			name 				: 	'洪秀柱',
			families01 			: 	'中華民國',
			words 				: 	'我要嫁給中華民國，就職典禮穿新娘禮服！',
			launch 				: 	new Date('2015/10/14'),
			expired 			: 	new Date('2015/10/15'),
			families01Picture	:	path('0904-B'),
			profilePicture		: 	path('0904-A'),
			street				: 	'台灣大道', 
		},
		{
			name 				: 	'多啦 A 夢',
			families01 			: 	'大雄',
			words 				: 	'大雄，就算全世界都不要你了，我也會不離不棄！',
			launch 				: 	new Date('2015/10/15'),
			expired 			: 	new Date('2015/10/16'),
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
			launch 				: 	new Date('2015/10/16'),
			expired 			: 	new Date('2015/10/17'),
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
			launch 				: 	new Date('2015/10/17'),
			expired 			: 	new Date('2015/10/18'),
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
			launch 				: 	new Date('2015/10/18'),
			expired 			: 	new Date('2015/10/19'),
			families01Picture	:	path('0912-B'),
			families02Picture	:	path('0912-C'),
			profilePicture		: 	path('0912-A'),
			street				: 	'大理大道', 
		},
		{
			name 				: 	'彩依',
			families01 			: 	'劉晉元',
			words 				: 	'是癡也好，是傻也好。相公，我會一直守著你的。',
			launch 				: 	new Date('2015/10/19'),
			expired 			: 	new Date('2015/10/20'),
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
			launch 				: 	new Date('2015/10/20'),
			expired 			: 	new Date('2016/10/20'),
			families01Picture	:	path('0914-B'),
			families02Picture	:	path('0914-C'),
			families03Picture	:	path('0914-D'),
			families04Picture	:	path('0914-E'),
			profilePicture		: 	path('0914-A'),
			street				: 	'歡樂谷', 
		}
	];

	return highlights;


}());
