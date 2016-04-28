app.controller('BuffCtrl', ['$scope','$rootScope','Utils','Buff', function($scope,$rootScope,Utils,Buff){
	$rootScope.originalBuffList = {};
	$rootScope.buffList = [];
	var shangYangDot = Buff.createNew({
		id:0,
		icon:1514,
		name:"商阳指",
		desc:"商阳指",
		type:0,
		conflict:0,
		duration:288,
		interval:48,
		cof:0.27,
		maxLevel:1,
		canStack:false,
		min:50,
		max:50,
		data:{},
		recipeName:"shangYang",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。
			if(options[6][0].active){
				var roll = Math.random();
				if(roll<0.25){
					var buff = angular.copy(fangGeBuff);
					Utils.addBuff(buff, buffController, attr);
				}
			}
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		}
	});
	$rootScope.buffList[0]=shangYangDot;
	$rootScope.originalBuffList.shangYangDot = shangYangDot;

	var zhongLinDot = Buff.createNew({
		id:1,
		icon:404,
		name:"钟林毓秀",
		desc:"钟林毓秀",
		type:0,
		conflict:0,
		duration:288,
		interval:48,
		cof:0.29,
		maxLevel:1,
		canStack:false,
		min:38,
		max:38,
		data:{},
		recipeName:"zhongLin",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。
			if(options[6][0].active){
				var roll = Math.random();
				if(roll<0.25){
					var buff = angular.copy(fangGeBuff);
					addBuff(buff, buffController, attr);
				}
			}
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		}
	});
	$rootScope.buffList[1]=zhongLinDot;
	$rootScope.originalBuffList.zhongLinDot = zhongLinDot;

	var lanCuiDot = Buff.createNew({
		id:2,
		icon:390,
		name:"兰摧玉折",
		desc:"兰摧玉折",
		type:0,
		conflict:0,
		duration:288,
		interval:48,
		cof:0.26,
		maxLevel:1,
		canStack:false,
		min:30,
		max:30,
		data:{},
		recipeName:"lanCui",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。
			if(options[6][0].active){
				var roll = Math.random();
				if(roll<0.25){
					var buff = angular.copy(fangGeBuff);
					addBuff(buff, buffController, attr);
				}
			}
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		}
	});
	$rootScope.buffList[2]=lanCuiDot;
	$rootScope.originalBuffList.lanCuiDot = lanCuiDot;

	var ziYouBuff = Buff.createNew({
		id:3,
		icon:1527,
		name:"恣游",
		desc:"恣游",
		type:1,
		conflict:0,
		duration:320,
		interval:0,
		cof:0,
		maxLevel:5,
		canStack:true,
		min:0,
		max:0,
		data:{
			attackAddPercent:2
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[3]=ziYouBuff;
	$rootScope.originalBuffList.ziYouBuff = ziYouBuff;

	var shiGuBuff = Buff.createNew({
		id:4,
		icon:1672,
		name:"噬骨",
		desc:"噬骨",
		type:1,
		conflict:0,
		duration:240,
		interval:0,
		cof:0,
		maxLevel:5,
		canStack:true,
		min:0,
		max:0,
		data:{
			damage:2
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[4]=shiGuBuff;
	$rootScope.originalBuffList.shiGuBuff = shiGuBuff;

	var hanBiCD = Buff.createNew({
		id:5,
		icon:408,
		name:"寒碧",
		desc:"寒碧",
		type:1,
		conflict:0,
		duration:192,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[5]=hanBiCD;
	$rootScope.originalBuffList.hanBiCD = hanBiCD;

	var fenYuBuff = Buff.createNew({
		id:6,
		icon:411,
		name:"焚玉",
		desc:"焚玉",
		type:1,
		conflict:0,
		duration:80,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[6]=fenYuBuff;
	$rootScope.originalBuffList.fenYuBuff = fenYuBuff;

	var fangGeBuff = Buff.createNew({
		id:7,
		icon:3015,
		name:"放歌",
		desc:"放歌",
		type:1,
		conflict:0,
		duration:480,
		interval:0,
		cof:0,
		maxLevel:3,
		canStack:true,
		min:0,
		max:0,
		data:{},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[7]=fangGeBuff;
	$rootScope.originalBuffList.fangGeBuff = fangGeBuff;

	var shuiYueBuff = Buff.createNew({
		id:8,
		icon:1522,
		name:"水月无间",
		desc:"水月无间",
		type:1,
		conflict:0,
		duration:96,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[8]=shuiYueBuff;
	$rootScope.originalBuffList.shuiYueBuff = shuiYueBuff;

	var buSanBuff = Buff.createNew({
		id:9,
		icon:327,
		name:"布散",
		desc:"布散",
		type:1,
		conflict:0,
		duration:160,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{
			attackAddPercent:30
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[9]=buSanBuff;
	$rootScope.originalBuffList.buSanBuff = buSanBuff;

	var luanSaBuff = Buff.createNew({
		id:10,
		icon:3001,
		name:"乱洒青荷",
		desc:"乱洒青荷",
		type:1,
		conflict:0,
		duration:160,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[10]=luanSaBuff;
	$rootScope.originalBuffList.luanSaBuff = luanSaBuff;

	var liuLiBuff = Buff.createNew({
		id:11,
		icon:3002,
		name:"流离",
		desc:"流离",
		type:1,
		conflict:0,
		duration:480,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[11]=liuLiBuff;
	$rootScope.originalBuffList.liuLiBuff = liuLiBuff;

	var mengGeBuff = Buff.createNew({
		id:12,
		icon:4528,
		name:"梦歌",
		desc:"梦歌",
		type:1,
		conflict:0,
		duration:480,
		interval:0,
		cof:0,
		maxLevel:2,
		canStack:true,
		min:0,
		max:0,
		data:{
			haste:30
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[12]=mengGeBuff;
	$rootScope.originalBuffList.mengGeBuff = mengGeBuff;

	var yanXuanBuff = Buff.createNew({
		id:13,
		icon:1522,
		name:"砚悬",
		desc:"砚悬",
		type:1,
		conflict:0,
		duration:96,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{
			critAddPercent:100
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[13]=yanXuanBuff;
	$rootScope.originalBuffList.yanXuanBuff = yanXuanBuff;

	var juanLiuBuff = Buff.createNew({
		id:14,
		icon:7468,
		name:"涓流",
		desc:"涓流",
		type:1,
		conflict:0,
		duration:96,
		interval:0,
		cof:0,
		maxLevel:10,
		canStack:true,
		min:0,
		max:0,
		data:{
			critAddPercent:2,
			critEffAddPercent:2
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[14]=juanLiuBuff;
	$rootScope.originalBuffList.juanLiuBuff = juanLiuBuff;

	var shuiMieXuBuff = Buff.createNew({
		id:15,
		icon:3412,
		name:"水·灭虚",
		desc:"水·灭虚",
		type:1,
		conflict:1,
		duration:96,
		interval:0,
		cof:0,
		maxLevel:10,
		canStack:true,
		min:0,
		max:0,
		data:{
			attackAddBase:7
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[15]=shuiMieXuBuff;
	$rootScope.originalBuffList.shuiMieXuBuff = shuiMieXuBuff;

	var shuiWuShuangBuff = Buff.createNew({
		id:16,
		icon:3412,
		name:"水·无双",
		desc:"水·无双",
		type:1,
		conflict:1,
		duration:96,
		interval:0,
		cof:0,
		maxLevel:10,
		canStack:true,
		min:0,
		max:0,
		data:{
			strainAddBase:8
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[16]=shuiWuShuangBuff;
	$rootScope.originalBuffList.shuiWuShuangBuff = shuiWuShuangBuff;

	var leiJiLiuBuff = Buff.createNew({
		id:17,
		icon:3406,
		name:"雷·激流",
		desc:"雷·激流",
		type:1,
		conflict:1,
		duration:240,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{
			attackAddBase:94,
			critAddBase:48
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[17]=leiJiLiuBuff;
	$rootScope.originalBuffList.leiJiLiuBuff = leiJiLiuBuff;

	var leiMieQiBuff = Buff.createNew({
		id:18,
		icon:3406,
		name:"雷·灭气",
		desc:"雷·灭气",
		type:1,
		conflict:1,
		duration:240,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{
			overcomeAddBase:112,
			critAddBase:48
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[18]=leiMieQiBuff;
	$rootScope.originalBuffList.leiMieQiBuff = leiMieQiBuff;

	var leiTongQieBuff = Buff.createNew({
		id:19,
		icon:3406,
		name:"雷·痛切",
		desc:"雷·痛切",
		type:1,
		conflict:1,
		duration:240,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{
			critEffAddBase:112,
			critAddBase:48
		},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[19]=leiTongQieBuff;
	$rootScope.originalBuffList.leiTongQieBuff = leiTongQieBuff;

	var leiCD = Buff.createNew({
		id:20,
		icon:3406,
		name:"雷特效CD",
		desc:"雷特效CD",
		type:1,
		conflict:1,
		duration:960,
		interval:0,
		cof:0,
		maxLevel:1,
		canStack:false,
		min:0,
		max:0,
		data:{},
		recipeName:"none",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.buffList[20]=leiCD;
	$rootScope.originalBuffList.leiCD = leiCD;
}]);