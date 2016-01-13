app.controller('SkillCtrl', ['$scope','$rootScope','Utils','Skill','Buff', function($scope,$rootScope,Utils,Skill,Buff){
	$rootScope.originalSkillList=[];
	var dunDao_FS = Skill.createNew({
		id:0,
		icon:6327,
		name:"盾刀",
		type:1,
		posture:"shield"
		cof:0.72,
		min:130,
		max:145,
		ota:0,
		damageInstant:true,
		cd:16,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"dunDao",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[0]=dunDao_FS;
	
	var dunJi_FS = Skill.createNew({
		id:1,
		icon:6339,
		name:"盾击",
		type:1,
		cof:0.72,
		posture:"shield",
		min:104,
		max:114,
		ota:0,
		damageInstant:true,
		cd:48,
		stack:3,
		interval:0,
		target:true,
		hasRecipes:false,
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 无视目标 50% 防御处理
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	})
	$rootScope.originalSkillList[1]=dunJi_FS;
	
	var dunMeng_FS = Skill.createNew({
		id:2,
		icon:6324,
		name:"盾猛",
		type:1,
		cof:1.04,
		posture:"shield",
		min:130,
		max:142,
		ota:0,
		damageInstant:true,
		cd:192,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:false,
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[2]=dunMeng_FS;
	
	var dunYa_FS = Skill.createNew({
		id:3,
		icon:6332,
		name:"盾压",
		type:1,
		cof:1.29,
		posture:"shield",
		min:202,
		max:220,
		ota:0,
		damageInstant:true,
		cd:192,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"dunYa",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
			
		}
	});
	$rootScope.originalSkillList[3]=dunYa_FS;
	
	var jieDao_FS = Skill.createNew({
		id:4,
		icon:6312,
		name:"劫刀",
		type:0,
		cof:1.20,
		posture:"saber",
		ota:0,
		min:110,
		max:139,
		damageInstant:true,
		cd:0,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"jieDao",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[4]=jieDao_FS;
	
	var jueDao_FS = Skill.createNew({
		id:5,
		icon:6317,
		name:"绝刀",
		type:0,
		posture:"saber",
		cof:0.26,
		min:30,
		max:30,
		ota:0,
		damageInstant:true,
		cd:160,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"jueDao",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			// 怒气消耗处理			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[5]=jueDao_FS;

	var zhanDao_FS = Skill.createNew({
		id:6,
		icon:6318,
		name:"斩刀",
		type:1,
		cof:1.29,
		posture:"saber",
		min:228,
		max:238,
		ota:0,
		damageInstant:true,
		cd:240,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"zhanDao",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[6]=zhanDao_FS;

	var shanDao_FS = Skill.createNew({
		id:7,
		icon:6354,
		name:"闪刀",
		type:1,
		cof:1,
		posture:"saber",
		min:150,
		max:165,
		ota:0,
		damageInstant:true,
		cd:128,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:false,
		recipeName:"",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[7]=shanDao_FS;

	var dunWu_FS = Skill.createNew({
		id:8,
		icon:6343,
		name:"盾舞",
		type:1,
		cof:0.21,
		posture:"normal",
		min:325,
		max:355,
		ota:0,
		damageInstant:true,
		cd:128,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"dunWu",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[8]=dunWu_FS;

	var dunFei_FS = Skill.createNew({
		id:9,
		icon:6344,
		name:"盾飞",
		type:1,
		cof:0.27,
		posture:"normal",
		min:24,
		max:26,
		ota:0,
		damageInstant:true,
		cd:288,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:true,
		recipeName:"dunFei",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[9]=dunFei_FS;

	var dunQiang_FS = Skill.createNew({
		id:10,
		icon:6336,
		name:"盾墙",
		type:1,
		cof:0,
		posture:"shield",
		min:0,
		max:0,
		ota:0,
		damageInstant:false,
		cd:560,
		stack:0,
		interval:0,
		target:false,
		hasRecipes:true,
		recipeName:"dunQiang",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[10]=dunQiang_FS;

	var dunYi_FS = Skill.createNew({
		id:11,
		icon:6336,
		name:"盾毅",
		type:1,
		cof:0.21,
		posture:"shield",
		min:36,
		max:39,
		ota:0,
		damageInstant:true,
		cd:720,
		stack:0,
		interval:0,
		target:true,
		hasRecipes:false,
		recipeName:"",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[11]=dunYi_FS;

	var xueNu_FS = Skill.createNew({
		id:12,
		icon:6336,
		name:"血怒",
		type:1,
		cof:0,
		posture:"normal",
		min:0,
		max:0,
		ota:0,
		damageInstant:false,
		cd:400,
		stack:3,
		interval:0,
		target:false,
		hasRecipes:true,
		recipeName:"xueNu",
		cdRemain:0,
		onSkillHitEvent:function(attr, target, buffController, recipes, options){
			
		},
		onSkillCritEvent:function(attr, target, buffController, recipes, options){
			this.onSkillHitEvent(attr, target, buffController, recipes, options);
		},
		onSkillPrepare:function(attr, target, buffController, recipes, options){
			
		},
		onSkillFinish:function(attr, target, buffController, recipes, options){
		}
	});
	$rootScope.originalSkillList[12]=xueNu_FS;

	$rootScope.skillController = {
		list:$rootScope.originalSkillList,
		curSkill:null
	};
}]);

