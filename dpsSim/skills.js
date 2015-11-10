var skillList = {};
app.controller('SkillCtrl', ['$scope','$rootScope','$timeout', function($scope,$rootScope,$timeout){
	var yangMingZhi_WH = Skill.createNew({
		id:0,
		icon:1527,
		name:"阳明指",
		type:0,
		cof:1.02,
		min:155,
		max:183,
		ota:28,
		damageInstant:true,
		cd:0,
		interval:24,
		target:true,
		hasRecipes:true,
		recipeName:"yangMing",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			// 阳明指命中后添加一层恣游buff
			addBuff(ziYouBuff, buffController, attr);
			// 乱撒添加DOT
			if(luanSaBuff.id in buffController.selfBuffs){
				// 添加钟林毓秀
				var dot = angular.copy(zhongLinDot);
				for (var i = 0; i < recipes.zhongLin.length; i++) {
					if(recipes.zhongLin[i].active&&recipes.zhongLin[i].effect=="durationAdd"){
						dot.duration = dot.duration+recipes.zhongLin[i].value;
					}
					if(recipes.zhongLin[i].active&&recipes.zhongLin[i].effect=="debuffAdd"){
						addDebuff(angular.copy(buffList[recipes.zhongLin[i].value]),buffController,attr)
					}
				};
				addDot(dot,buffController,attr);
				// 添加兰摧玉折
				var dot = angular.copy(lanCuiDot);
				for (var i = 0; i < recipes.lanCui.length; i++) {
					if(recipes.lanCui[i].active&&recipes.lanCui[i].effect=="durationAdd"){
						dot.duration = dot.duration+recipes.lanCui[i].value;
					}
				};
				addDot(dot,buffController,attr);
			}
			// 寒碧奇穴：若目标身上没有“钟林毓秀”效果，则阳明指附带“钟林毓秀”，该效果每12秒触发一次。
			if(options[2][0].active){
				if(!(hanBiCD.id in buffController.selfBuffs)&&!(zhongLinDot.id in buffController.targetBuffs)){
					var dot = angular.copy(zhongLinDot);
					for (var i = 0; i < recipes.zhongLin.length; i++) {
						if(recipes.zhongLin[i].active&&recipes.zhongLin[i].effect=="durationAdd"){
							dot.duration = dot.duration+recipes.zhongLin[i].value;
						}
						if(recipes.zhongLin[i].active&&recipes.zhongLin[i].effect=="debuffAdd"){
							addDebuff(angular.copy(buffList[recipes.zhongLin[i].value]),buffController,attr)
						}
					};
					addDot(dot,buffController,attr);
					addBuff(hanBiCD, buffController, attr);
				}
			}
			// 梦歌奇穴：施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高1%，持续30秒，最多叠加5层。
			if(options[10][0].active){
				addBuff(mengGeBuff,buffController,attr);
			}
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			// 雪中行奇穴：“阳明指”会心后刷新目标身上所有混元持续伤害效果。
			if(options[11][0].active){
				dotRefresh(shangYangDot,buffController,attr);
				dotRefresh(lanCuiDot,buffController,attr);
				dotRefresh(zhongLinDot,buffController,attr);
			}
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 烟霞奇穴：“阳明指”的会心几率提高10%，会心效果提高10%。
			if(options[1][0].active){
				this.extraAttr.critAddPercent+=10;
				this.extraAttr.critEffAddPercent+=10;
			}
			// 放歌奇穴：“商阳指”“钟林毓秀”“兰摧玉折”每跳有25%几率使下一个阳明指无需运功，持续30秒，可叠加3层。
			if(fangGeBuff.id in buffController.selfBuffs){
				this.ota = 0;
				this.type = "instant";
				buffController.selfBuffs[fangGeBuff.id].level--;
				if(buffController.selfBuffs[fangGeBuff.id].level==0){
					delete buffController.selfBuffs[fangGeBuff.id];
				}
			}
			// 焚玉buff使阳明指提高10%伤害
			if(fenYuBuff.id in buffController.selfBuffs){
				if(buffController.selfBuffs[fenYuBuff.id].remain>=this.ota){
					this.extraAttr.damage += 10;
				}
			}
			// 青冠奇穴：“阳明指”命中有自身混元持续伤害效果的目标，每个效果使“阳明指”会心几率提高5%。
			if(options[6][2].active){
				var dotCount = 0;
				if(shangYangDot.id in buffController.targetBuffs&&buffController.targetBuffs[shangYangDot.id].remain>=this.ota) dotCount++;
				if(zhongLinDot.id in buffController.targetBuffs&&buffController.targetBuffs[zhongLinDot.id].remain>=this.ota) dotCount++;
				if(lanCuiDot.id in buffController.targetBuffs&&buffController.targetBuffs[lanCuiDot.id].remain>=this.ota) dotCount++;
				this.extraAttr.critAddPercent += parseInt(5*dotCount);
			}
			// 落凤
			this.extraAttr.damage += 5;
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	skillList[0]=yangMingZhi_WH;
	
	var shangYangZhi_WH = Skill.createNew({
		id:1,
		icon:1514,
		name:"商阳指",
		type:1,
		cof:0.27,
		min:50,
		max:50,
		ota:0,
		damageInstant:false,
		cd:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"shangYang",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			//添加商阳指dot
			var dot = angular.copy(shangYangDot);
			for (var i = 0; i < recipes.shangYang.length; i++) {
				if(recipes.shangYang[i].active&&recipes.shangYang[i].effect=="durationAdd"){
					dot.duration = dot.duration+recipes.shangYang[i].value;
				}
				if(recipes.shangYang[i].active&&recipes.shangYang[i].effect=="debuffAdd"){
					addDebuff(angular.copy(buffList[recipes.shangYang[i].value]),buffController,attr)
				}
			};
			// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
			if(options[9][0].active){
				dot.extraAttr.damage += 10;
			}
			addDot(dot,buffController,attr);
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 寒血奇穴：“施展“商阳指”立刻造成伤害
			if(options[2][1].active){
				this.damageInstant = true;
			}
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	})
	skillList[1]=shangYangZhi_WH;
	
	var yuShiJuFen_WH = Skill.createNew({
		id:2,
		icon:411,
		name:"玉石俱焚",
		type:1,
		cof:0.33,
		min:81,
		max:91,
		ota:0,
		damageInstant:true,
		cd:272,
		interval:0,
		target:true,
		hasRecipes:false,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			//吞噬dot
			var dotCount = 0;
			if(shangYangDot.id in buffController.targetBuffs){
				var dot = buffController.targetBuffs[shangYangDot.id];
				var remainHit = Math.floor(dot.remain/dot.interval)+1;
				var damage = dot.calc($rootScope.myself,target,buffController,remainHit, recipes, options);
				delete buffController.targetBuffs[shangYangDot.id];
				dotCount++;
			}
			if(zhongLinDot.id in buffController.targetBuffs){
				var dot = buffController.targetBuffs[zhongLinDot.id];
				var remainHit = Math.floor(dot.remain/dot.interval)+1;
				var damage = dot.calc($rootScope.myself,target,buffController,remainHit, recipes, options);
				delete buffController.targetBuffs[zhongLinDot.id];
				dotCount++;
			}
			if(lanCuiDot.id in buffController.targetBuffs){
				var dot = buffController.targetBuffs[lanCuiDot.id];
				var remainHit = Math.floor(dot.remain/dot.interval)+1;
				var damage = dot.calc($rootScope.myself,target,buffController,remainHit, recipes, options);
				delete buffController.targetBuffs[lanCuiDot.id];
				dotCount++;
			}
			// 焚玉奇穴：“玉石俱焚”成功吞噬持续伤害效果，使阳明指伤害提高10%，每额外吞噬一个效果，持续时间增加5秒。
			if(options[5][0].active&&dotCount>0){
				var buff = angular.copy(fenYuBuff);
				buff.duration = dotCount * 80;
				addBuff(buff, buffController, attr);
			}
			// 旋落奇穴：“玉石俱焚”每吞噬一个持续伤害效果，调息时间降低1.5秒。
			if(options[8][0].active&&dotCount>0){
				this.cd = 272 - dotCount * 24;
			}
			// 流离奇穴：“玉石俱焚”命中目标后使自身下一个“兰摧玉折”无需运功。
			if(options[9][1].active){
				var buff = angular.copy(liuLiBuff);

			}
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	skillList[2]=yuShiJuFen_WH;
	
	var kuaiXueShiQing_WH = Skill.createNew({
		id:3,
		icon:2999,
		name:"快雪时晴",
		type:2,
		cof:0.39,
		min:65,
		max:75,
		ota:80,
		damageInstant:true,
		cd:0,
		interval:16,
		target:true,
		hasRecipes:true,
		recipeName:"kuaiXue",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			for (var i = 0; i < recipes.kuaiXue.length; i++) {
				if(recipes.kuaiXue[i].active&&recipes.kuaiXue[i].effect=="debuffAdd"){
					addDebuff(angular.copy(buffList[recipes.kuaiXue[i].value]),buffController,attr)
				}
			};
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 弹指奇穴：“快雪时晴”的会心几率提高10%，会心效果提高10%。
			if(options[1][1].active){
				this.extraAttr.critAddPercent+=10;
				this.extraAttr.critEffAddPercent+=10;
			}
			// 青歌奇穴：“快雪时晴”每0.6秒造成一次伤害，持续3秒。
			if(options[2][0].active){
				this.ota = 50;
				this.interval = 10;
			}
			// 雪弃奇穴：“快雪时晴”若只命中一个目标，伤害提高20%。
			if(options[8][1].active){
				this.extraAttr.damage+=20;
			}
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
			// 梦歌奇穴：施展“阳明指”或“快雪时晴”运功结束时均获得“梦歌”气劲，每层使加速率提高1%，持续30秒，最多叠加5层。
			if(options[10][0].active){
				addBuff(mengGeBuff,buffController,attr);
			}
		}
	});
	skillList[3]=kuaiXueShiQing_WH;
	
	var zhongLinYuXiu_WH = Skill.createNew({
		id:4,
		icon:404,
		name:"钟林毓秀",
		type:0,
		cof:0.29,
		ota:32,
		min:38,
		max:38,
		damageInstant:false,
		cd:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"zhongLin",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			//添加钟林毓琇dot
			var dot = angular.copy(zhongLinDot);
			for (var i = 0; i < recipes.zhongLin.length; i++) {
				if(recipes.zhongLin[i].active&&recipes.zhongLin[i].effect=="durationAdd"){
					dot.duration = dot.duration+recipes.zhongLin[i].value;
				}
				if(recipes.zhongLin[i].active&&recipes.zhongLin[i].effect=="debuffAdd"){
					addDebuff(angular.copy(buffList[recipes.zhongLin[i].value]),buffController,attr)
				}
			};
			// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
			if(options[9][0].active){
				dot.extraAttr.damage += 10;
			}
			addDot(dot,buffController,attr);
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	skillList[4]=zhongLinYuXiu_WH;
	
	var lanCuiYuZhe_WH = Skill.createNew({
		id:5,
		icon:390,
		name:"兰摧玉折",
		type:0,
		cof:0.26,
		min:30,
		max:30,
		ota:28,
		damageInstant:false,
		cd:96,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"lanCui",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			//添加兰摧dot
			var dot = angular.copy(lanCuiDot);
			for (var i = 0; i < recipes.lanCui.length; i++) {
				if(recipes.lanCui[i].active&&recipes.lanCui[i].effect=="durationAdd"){
					dot.duration = dot.duration+recipes.lanCui[i].value;
				}
			};
			// 生息奇穴：混元性持续伤害提高10%，持续伤害效果被卸除后，每个持续伤害使目标1.5秒内无法受到治疗效果，最多叠加4.5秒。
			if(options[9][0].active){
				dot.extraAttr.damage += 10;
			}
			addDot(dot,buffController,attr);
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 流离奇穴使兰摧不需运功
			if(liuLiBuff.id in buffController.selfBuffs){
				this.ota = 0;
				this.type = "instant";
				delete buffController.selfBuffs[liuLiBuff.id];
			}
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	skillList[5]=lanCuiYuZhe_WH;

	var fuRongBingDi_WH = Skill.createNew({
		id:6,
		icon:398,
		name:"芙蓉并蒂",
		type:1,
		cof:0.33,
		min:76,
		max:81,
		ota:0,
		damageInstant:true,
		cd:320,
		interval:0,
		target:true,
		hasRecipes:false,
		recipeName:"",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			// 轻弃奇穴：“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。
			if(options[5][2].active){
				dotRefresh(shangYangDot,buffController,attr);
				dotRefresh(lanCuiDot,buffController,attr);
				dotRefresh(zhongLinDot,buffController,attr);
			}
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 轻弃奇穴：“芙蓉并蒂”的伤害提高100%，命中目标后刷新目标身上的所有混元持续伤害效果。
			if(options[5][2].active){
				this.extraAttr.damage += 100;
			}
			// 踏莲奇穴：“芙蓉并蒂”调息时间降低5秒，定身效果持续时间延迟1秒。
			if(options[11][1].active){
				this.cd = 240;
			}
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	skillList[6]=fuRongBingDi_WH;

	var shuiYueWuJian_WH = Skill.createNew({
		id:7,
		icon:398,
		name:"水月无间",
		type:1,
		cof:0,
		min:0,
		max:0,
		ota:0,
		damageInstant:false,
		cd:960,
		interval:0,
		target:false,
		hasRecipes:false,
		recipeName:"",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			var buff = shuiYueBuff;
			// 夜思奇穴：“水月无间”额外使1个招式无需运功，并立刻回复自身10%内力值。 
			if(options[7][0].active){
				buff.canStack = true;
				buff.maxLevel = true;
				buff.level = 2;
			}
			addBuff(buff, buffController, attr);
			addBuff(buSanBuff, buffController, attr);
			// 砚悬奇穴：“水月无间”效果期间下一个伤害或治疗招式必定会心。 
			if(options[10][2].active){
				addBuff(yanXuanBuff, buffController, attr);
			}
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	skillList[7]=shuiYueWuJian_WH;

	var luanSaQingHe_WH = Skill.createNew({
		id:8,
		icon:3001,
		name:"乱洒青荷",
		type:1,
		cof:0,
		min:0,
		max:0,
		ota:0,
		damageInstant:false,
		cd:1440,
		interval:0,
		target:false,
		hasRecipes:false,
		recipeName:"",
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			// 重置玉石俱焚CD
			$rootScope.skillController.list[2].cdRemain = 0;
			// 添加乱撒buff
			addBuff(luanSaBuff,buffController,attr);
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 奇穴技能检测
			if(!options[7][3].active){
				this.type = "invalid";
			}
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	skillList[8]=luanSaQingHe_WH;
}]);

