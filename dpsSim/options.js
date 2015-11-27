var whOptions = {
	1:[
		{name:"烟霞",desc:"“阳明指”的会心几率提高10%，会心效果提高10%。",skill:"阳明指",icon:4219,active:true},
		{name:"弹指",desc:"“快雪时晴”的会心几率提高10%，会心效果提高10%。",skill:"快雪时晴",icon:4564,active:false},
		{name:"少阳指",desc:"少阳指",skill:"少阳指",icon:1517,active:false}
	],
	2:[
		{name:"寒碧",desc:"若目标身上没有“钟林毓秀”效果，则阳明指附带“钟林毓秀”，该效果每12秒触发一次。",skill:"阳明指",icon:408,active:true},
		{name:"寒血",desc:"“施展“商阳指”立刻造成伤害",skill:"商阳指",icon:1514,active:false},
		{name:"花语酥心",desc:"花语酥心",skill:"花语酥心",icon:407,active:false}
	],
	3:[
		{name:"青歌",desc:"“快雪时晴”每0.6秒造成一次伤害，持续3秒。",skill:"快雪时晴",icon:2999,active:false},
		{name:"风烟翠",desc:"“阳明指”命中附带自身持续伤害效果的目标，可将该效果添加给目标半径8尺内的最多5个目标",skill:"阳明指",icon:3016,active:true},
		{name:"倚天",desc:"“钟林毓秀”每跳降低玩家目标1%内力，并回复自身1%内力。",skill:"钟林毓秀",icon:404,active:false},
		{name:"清风垂露",desc:"清风垂露",skill:"清风垂露",icon:1523,active:false}
	],
	4:[
		{name:"束发",desc:"“快雪时晴”作用目标增加3个。",skill:"快雪时晴",icon:4573,active:false},
		{name:"列宿",desc:"运功不会被打退。",skill:"",icon:3015,active:false},
		{name:"潜催",desc:"“玉石俱焚”可以吞噬目标半径8尺内额外5个目标身上属于自身的持续伤害。",skill:"玉石俱焚",icon:3012,active:true},
		{name:"厥阴指",desc:"厥阴指",skill:"厥阴指",icon:1513,active:false}
	],
	5:[
		{name:"焚玉",desc:"“玉石俱焚”成功吞噬持续伤害效果，使阳明指伤害提高10%，每额外吞噬一个效果，持续时间增加5秒。",skill:"玉石俱焚",icon:411,active:true},
		{name:"弹梦",desc:"“春泥护花”不会被消耗，持续8秒",skill:"春泥护花",icon:4501,active:false},
		{name:"轻弃",desc:"“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。",skill:"芙蓉并蒂",icon:398,active:false},
		{name:"星影",desc:"“春泥护花”施展给队友，则下一次“春泥护花”调息时间降低6秒",skill:"春泥护花",icon:413,active:false}
	],
	6:[
		{name:"放歌",desc:"“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。",skill:"",icon:3015,active:false},
		{name:"踏歌",desc:"“快雪时晴”命中有自身持续伤害效果的目标，每次伤害有15%几率使持续伤害效果增加2跳，每个持续效果最多作用一次",skill:"快雪时晴",icon:4510,active:false},
		{name:"青冠",desc:"“阳明指”命中有自身混元持续伤害效果的目标，每个效果使“阳明指”会心几率提高5%。",skill:"阳明指",icon:4492,active:true},
		{name:"闲垂影",desc:"“玉石俱焚”每吞噬一个持续伤害效果，有35%几率使目标定身，持续4秒",skill:"玉石俱焚",icon:411,active:false}
	],
	7:[
		{name:"夜思",desc:"“水月无间”额外使1个招式无需运功，并立刻回复自身10%内力值。",skill:"水月无间",icon:1522,active:false},
		{name:"青致",desc:"被“太阴指”命中的目标，锁足3秒。",skill:"太阴指",icon:1515,active:false},
		{name:"雪月",desc:"“快雪时晴”对定身锁足目标造成的会心几率提高50%。",skill:"快雪时晴",icon:3403,active:false},
		{name:"乱洒青荷",desc:"乱洒青荷",skill:"乱洒青荷",icon:3001,active:true}
	],
	8:[
		{name:"旋落",desc:"“玉石俱焚”每吞噬一个持续伤害效果，调息时间降低1.5秒。",skill:"玉石俱焚",icon:410,active:true},
		{name:"雪弃",desc:"“快雪时晴”若只命中一个目标，伤害提高20%。",skill:"快雪时晴",icon:2999,active:false},
		{name:"金屋",desc:"施展“太阴指”后，受到的伤害降低30%，持续6秒。",skill:"太阴指",icon:4546,active:false},
		{name:"少明指",desc:"少明指",skill:"少明指",icon:1516,active:false}
	],
	9:[
		{name:"生息",desc:"混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。",skill:"",icon:3016,active:true},
		{name:"流离",desc:"“玉石俱焚”命中目标后使自身下一个“兰摧玉折”无需运功",skill:"玉石俱焚",icon:3002,active:false},
		{name:"金针",desc:"“毫针”每层的回复效果提高到6%，受到攻击消耗掉所有层数后，定身周围6尺的5个目标。",skill:"毫针",icon:1521,active:false},
		{name:"浮花浪蕊",desc:"浮花浪蕊",skill:"浮花浪蕊",icon:400,active:false}
	],
	10:[
		{name:"梦歌",desc:"施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高1%，持续30秒，最多叠加5层。",skill:"阳明指|快雪时晴",icon:4528,active:true},
		{name:"生脉",desc:"“水月无间”效果期间使自身免疫控制和封内效果的影响，且运功不会被打断，持续6秒。",skill:"水月无间",icon:399,active:false},
		{name:"砚悬",desc:"“水月无间”效果期间下一个伤害或治疗招式必定会心",skill:"水月无间",icon:7242,active:false},
		{name:"傍花随柳",desc:"傍花随柳",skill:"傍花随柳",icon:405,active:false}
	],
	11:[
		{name:"雪中行",desc:"“阳明指”会心后刷新目标身上所有混元持续伤害效果。",skill:"阳明指",icon:4519,active:true},
		{name:"踏莲",desc:"“芙蓉并蒂”调息时间降低5秒，定身效果持续时间延迟1秒。",skill:"芙蓉并蒂",icon:7252,active:false},
		{name:"星移",desc:"“星楼月影”调息时间降低2秒，不受招式控制效果持续时间增加1秒。",skill:"星楼月影",icon:1520,active:false},
		{name:"摇柳",desc:"听风吹雪”可在花间游心法下施展，但调息时间增加60秒。",skill:"听风吹雪",icon:7226,active:false}
	],
	12:[
		{name:"涓流",desc:"施展伤害招式命中气血值低于35%的目标，自身会心几率提高20%，会心效果提高20%，每次造成伤害，该效果降低2%。",skill:"",icon:7468,active:true},
		{name:"同宿",desc:"对友方目标施展“毫针”，被攻击后消失的层数效果会再次作用到释放者本身。",skill:"毫针",icon:7474,active:false},
		{name:"池月",desc:"“太阴指”调息时间降低5秒，解除自身受到的减速和锁足效果。",skill:"太阴指",icon:7234,active:false},
		{name:"南风吐月",desc:"南风吐月",skill:"南风吐月",icon:7510,active:false}
	]
}

// var whOptions = {
// 	1:[
// 		{name:"烟霞",desc:"“阳明指”的会心几率提高10%，会心效果提高10%。",skill:"阳明指",icon:4219,active:false},
// 		{name:"弹指",desc:"“快雪时晴”的会心几率提高10%，会心效果提高10%。",skill:"快雪时晴",icon:4564,active:true},
// 		{name:"少阳指",desc:"少阳指",skill:"少阳指",icon:1517,active:false}
// 	],
// 	2:[
// 		{name:"寒碧",desc:"若目标身上没有“钟林毓秀”效果，则阳明指附带“钟林毓秀”，该效果每12秒触发一次。",skill:"阳明指",icon:408,active:true},
// 		{name:"寒血",desc:"“施展“商阳指”立刻造成伤害",skill:"商阳指",icon:1514,active:false},
// 		{name:"花语酥心",desc:"花语酥心",skill:"花语酥心",icon:407,active:false}
// 	],
// 	3:[
// 		{name:"青歌",desc:"“快雪时晴”每0.6秒造成一次伤害，持续3秒。",skill:"快雪时晴",icon:2999,active:true},
// 		{name:"风烟翠",desc:"“阳明指”命中附带自身持续伤害效果的目标，可将该效果添加给目标半径8尺内的最多5个目标",skill:"阳明指",icon:3016,active:false},
// 		{name:"倚天",desc:"“钟林毓秀”每跳降低玩家目标1%内力，并回复自身1%内力。",skill:"钟林毓秀",icon:404,active:false},
// 		{name:"清风垂露",desc:"清风垂露",skill:"清风垂露",icon:1523,active:false}
// 	],
// 	4:[
// 		{name:"束发",desc:"“快雪时晴”作用目标增加3个。",skill:"快雪时晴",icon:4573,active:false},
// 		{name:"列宿",desc:"运功不会被打退。",skill:"",icon:3015,active:false},
// 		{name:"潜催",desc:"“玉石俱焚”可以吞噬目标半径8尺内额外5个目标身上属于自身的持续伤害。",skill:"玉石俱焚",icon:3012,active:true},
// 		{name:"厥阴指",desc:"厥阴指",skill:"厥阴指",icon:1513,active:false}
// 	],
// 	5:[
// 		{name:"焚玉",desc:"“玉石俱焚”成功吞噬持续伤害效果，使阳明指伤害提高10%，每额外吞噬一个效果，持续时间增加5秒。",skill:"玉石俱焚",icon:411,active:false},
// 		{name:"弹梦",desc:"“春泥护花”不会被消耗，持续8秒",skill:"春泥护花",icon:4501,active:false},
// 		{name:"轻弃",desc:"“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。",skill:"芙蓉并蒂",icon:398,active:true},
// 		{name:"星影",desc:"“春泥护花”施展给队友，则下一次“春泥护花”调息时间降低6秒",skill:"春泥护花",icon:413,active:false}
// 	],
// 	6:[
// 		{name:"放歌",desc:"“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。",skill:"",icon:3015,active:false},
// 		{name:"踏歌",desc:"“快雪时晴”命中有自身持续伤害效果的目标，每次伤害有15%几率使持续伤害效果增加2跳，每个持续效果最多作用一次",skill:"快雪时晴",icon:4510,active:true},
// 		{name:"青冠",desc:"“阳明指”命中有自身混元持续伤害效果的目标，每个效果使“阳明指”会心几率提高5%。",skill:"阳明指",icon:4492,active:false},
// 		{name:"闲垂影",desc:"“玉石俱焚”每吞噬一个持续伤害效果，有35%几率使目标定身，持续4秒",skill:"玉石俱焚",icon:411,active:false}
// 	],
// 	7:[
// 		{name:"夜思",desc:"“水月无间”额外使1个招式无需运功，并立刻回复自身10%内力值。",skill:"水月无间",icon:1522,active:false},
// 		{name:"青致",desc:"被“太阴指”命中的目标，锁足3秒。",skill:"太阴指",icon:1515,active:false},
// 		{name:"雪月",desc:"“快雪时晴”对定身锁足目标造成的会心几率提高50%。",skill:"快雪时晴",icon:3403,active:false},
// 		{name:"乱洒青荷",desc:"乱洒青荷",skill:"乱洒青荷",icon:3001,active:true}
// 	],
// 	8:[
// 		{name:"旋落",desc:"“玉石俱焚”每吞噬一个持续伤害效果，调息时间降低1.5秒。",skill:"玉石俱焚",icon:410,active:false},
// 		{name:"雪弃",desc:"“快雪时晴”若只命中一个目标，伤害提高20%。",skill:"快雪时晴",icon:2999,active:true},
// 		{name:"金屋",desc:"施展“太阴指”后，受到的伤害降低30%，持续6秒。",skill:"太阴指",icon:4546,active:false},
// 		{name:"少明指",desc:"少明指",skill:"少明指",icon:1516,active:false}
// 	],
// 	9:[
// 		{name:"生息",desc:"混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。",skill:"",icon:3016,active:true},
// 		{name:"流离",desc:"“玉石俱焚”命中目标后使自身下一个“兰摧玉折”无需运功",skill:"玉石俱焚",icon:3002,active:false},
// 		{name:"金针",desc:"“毫针”每层的回复效果提高到6%，受到攻击消耗掉所有层数后，定身周围6尺的5个目标。",skill:"毫针",icon:1521,active:false},
// 		{name:"浮花浪蕊",desc:"浮花浪蕊",skill:"浮花浪蕊",icon:400,active:false}
// 	],
// 	10:[
// 		{name:"梦歌",desc:"施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高1%，持续30秒，最多叠加5层。",skill:"阳明指|快雪时晴",icon:4528,active:true},
// 		{name:"生脉",desc:"“水月无间”效果期间使自身免疫控制和封内效果的影响，且运功不会被打断，持续6秒。",skill:"水月无间",icon:399,active:false},
// 		{name:"砚悬",desc:"“水月无间”效果期间下一个伤害或治疗招式必定会心",skill:"水月无间",icon:7242,active:false},
// 		{name:"傍花随柳",desc:"傍花随柳",skill:"傍花随柳",icon:405,active:false}
// 	],
// 	11:[
// 		{name:"雪中行",desc:"“阳明指”会心后刷新目标身上所有混元持续伤害效果。",skill:"阳明指",icon:4519,active:false},
// 		{name:"踏莲",desc:"“芙蓉并蒂”调息时间降低5秒，定身效果持续时间延迟1秒。",skill:"芙蓉并蒂",icon:7252,active:true},
// 		{name:"星移",desc:"“星楼月影”调息时间降低2秒，不受招式控制效果持续时间增加1秒。",skill:"星楼月影",icon:1520,active:false},
// 		{name:"摇柳",desc:"听风吹雪”可在花间游心法下施展，但调息时间增加60秒。",skill:"听风吹雪",icon:7226,active:false}
// 	],
// 	12:[
// 		{name:"涓流",desc:"施展伤害招式命中气血值低于35%的目标，自身会心几率提高20%，会心效果提高20%，每次造成伤害，该效果降低2%。",skill:"",icon:7468,active:true},
// 		{name:"同宿",desc:"对友方目标施展“毫针”，被攻击后消失的层数效果会再次作用到释放者本身。",skill:"毫针",icon:7474,active:false},
// 		{name:"池月",desc:"“太阴指”调息时间降低5秒，解除自身受到的减速和锁足效果。",skill:"太阴指",icon:7234,active:false},
// 		{name:"南风吐月",desc:"南风吐月",skill:"南风吐月",icon:7510,active:false}
// 	]
// }