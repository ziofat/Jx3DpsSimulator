app.controller('MainCtrl', ['$scope','$rootScope','$timeout','$interval', function($scope,$rootScope,$timeout,$interval){
	$rootScope.target = {
		life:5000000,
		curLife:5000000,
		mana:1000000,
		hitRequire:105,
		strainRequire:20,
		shield:25
	}
	$rootScope.buffController = {
		selfBuffs:{},
		targetBuffs:{}
	};
	$rootScope.myself = {
		attributes:{
			basicAttack:2748,
			spunk:706,
			crit:15.15,
			critEff:211.77,
			hit:106.76,
			haste:321,
			strain:20.09,
			overcome:900,
			delay:100
		},
		extra:{
			damage:0,
			attackAddPercent:0,
			attackAddBase:0,
			critAddPercent:0,
			critAddBase:0,
			hitAddPercent:0,
			hitAddBase:0,
			critEffAddPercent:0,
			critEffAddBase:0,
			overcomeAddPercent:0,
			overcomeAddBase:0,
			strainAddPercent:0,
			strainAddBase:0,
			haste:0
		},
		states:{
			life:27166,
			mana:32000,
			ota:false,
			otaRemain:0,
			curOta:0,
			gcd:0
		}
	}
	$rootScope.skillRecipe = angular.copy(whRecipes);
	$rootScope.skillOption = angular.copy(whOptions);
	$rootScope.skillController = {
		list:skillList,
		curSkill:null
	};
	$rootScope.macroMode = false;
	$scope.digest = function(){
		if($rootScope.macroMode&&frameCount%(Math.ceil($rootScope.myself.attributes.delay/1000*16)+1)==0){
			$scope.macro();
		}
		// 读条 时间控制
		if($rootScope.myself.states.ota){
			$rootScope.myself.states.otaRemain--;
			var skill = $rootScope.skillController.curSkill;
			if($rootScope.myself.states.otaRemain<=0){
				$rootScope.myself.states.curOta = 0;
				$rootScope.myself.states.ota = false;
				skill.calc($rootScope.myself,$rootScope.target,$rootScope.buffController,$rootScope.skillRecipe,$rootScope.skillOption);
				skill.onSkillFinish($rootScope.myself,$rootScope.target,$rootScope.buffController,$rootScope.skillRecipe,$rootScope.skillOption);
			}else if(skill.type=="channel"){
				if(($rootScope.myself.states.curOta-$rootScope.myself.states.otaRemain)%$rootScope.myself.states.curInterval==0){
					skill.calc($rootScope.myself,$rootScope.target,$rootScope.buffController,$rootScope.skillRecipe,$rootScope.skillOption);
				}
			}
		}
		// 公共CD 时间控制
		if($rootScope.myself.states.gcd>0){
			$rootScope.myself.states.gcd--;
		}
		// 技能CD 时间控制
		angular.forEach($rootScope.skillController.list,function(value,key){
			if(value.cdRemain>0){
				value.cdRemain--;
				this[key] = value;
			}
			if(value.cdRemain<0){
				value.cdRemain=0;
				this[key] = value;
			}
		},$rootScope.skillController.list);
		
		// buff 时间控制
		angular.forEach($rootScope.buffController.targetBuffs,function(value,key){
			value.remain--;
			this[key] = value;
			if((value.duration - value.remain)%value.interval==0&&value.type=="dot"){
				value.calc($rootScope.myself,$rootScope.target,$rootScope.buffController,1,$rootScope.skillRecipe,$rootScope.skillOption);
			}
			if(value.remain<=0){
				delete this[key];
			}
		},$rootScope.buffController.targetBuffs);
		$rootScope.myself.extra = {
			damage:0,
			attackAddPercent:0,
			attackAddBase:0,
			critAddPercent:0,
			critAddBase:0,
			hitAddPercent:0,
			hitAddBase:0,
			critEffAddPercent:0,
			critEffAddBase:0,
			overcomeAddPercent:0,
			overcomeAddBase:0,
			strainAddPercent:0,
			strainAddBase:0,
			haste:0
		}
		angular.forEach($rootScope.buffController.targetBuffs,function(value,key){
			if(value.type == "buff"){
				angular.forEach(value.data,function(buffNumber,index){
					$rootScope.myself.extra[index]+=buffNumber*value.level;
				});
			}
		},$rootScope.buffController.targetBuffs);
		
		angular.forEach($rootScope.buffController.selfBuffs,function(value,key){
			value.remain--;
			this[key] = value;
			if(value.remain<=0){
				delete this[key];
			}
			if(value.type == "buff"){
				angular.forEach(value.data,function(buffNumber,key){
					$rootScope.myself.extra[key]+=buffNumber*value.level;
				});
			}
		},$rootScope.buffController.selfBuffs);
		// dps 计算
		$rootScope.time++;
		if($rootScope.time%16==0){
			$rootScope.dps = globalDamage/$rootScope.time*16;
			$rootScope.target.curLife = $rootScope.target.life-globalDamage;
			if($rootScope.target.curLife<=0){
				$scope.stop();
			}
		}
		if(!$rootScope.kill&&$rootScope.time%80==0){
			$rootScope.target.curLife = $rootScope.target.life;
		}
		frameCount++;
	}
	var loopInterval;
	var frameCount = 0;
	$rootScope.time = 0;
	$rootScope.debug = true;
	$rootScope.kill = true;
	$scope.start = function(){
		$scope.clear();
		globalDamage = 0;
		frameCount = 0;
		$rootScope.time = 0;
		var b = new Date();
		$rootScope.buffController = {
			selfBuffs:{},
			targetBuffs:{}
		};
		$rootScope.skillController = {
			list:skillList,
			curSkill:null
		};
		$rootScope.myself.states = {
			life:27166,
			mana:32000,
			ota:false,
			otaRemain:0,
			curOta:0,
			gcd:0
		}
		if($rootScope.debug){
			$interval.cancel(loopInterval);
			loopInterval = $interval($scope.digest,62.5);
		}else{
			function updateLater() {
				for (; $rootScope.time < 3600; ) {
					$scope.digest();
					$timeout(updateLater,0);
				};
			}
			updateLater();
		}
		var e = new Date();
		console.log(e.getTime()-b.getTime());
	}
	$scope.stop = function(){
		$interval.cancel(loopInterval);
	}
	$scope.clear = function(){
		$('#log').html("");
	}

	$scope.cast = function(skillName){
		var skill;
		angular.forEach($rootScope.skillController.list,function(value,key){
			if(value.name == skillName){
				skill = angular.copy($rootScope.skillController.list[key]);
			}
		})
		if(skill.cdRemain>0) return;
		skill.onSkillPrepare($rootScope.myself,$rootScope.target,$rootScope.buffController,$rootScope.skillRecipe,$rootScope.skillOption);
		// 水月免读条
		if(shuiYueBuff.id in $rootScope.buffController.selfBuffs&&skill.type=="ota"){
			skill.ota = 0;
			skill.type = "instant";
			$rootScope.buffController.selfBuffs[shuiYueBuff.id].level--;
			if($rootScope.buffController.selfBuffs[shuiYueBuff.id].level==0) delete $rootScope.buffController.selfBuffs[shuiYueBuff.id];
		}
		if(skill.hasRecipes) skill.applyRecipe($rootScope.skillRecipe[skill.recipeName],$rootScope.buffController);
		if(skill.type=="ota"&&!$rootScope.myself.states.ota&&$rootScope.myself.states.gcd==0){
			$rootScope.myself.states.ota = true;
			$rootScope.skillController.curSkill = skill;
			$rootScope.myself.states.curOta = hasteCalc($rootScope.myself.attributes.haste,$rootScope.myself.extra.haste,skill.ota);
			$rootScope.myself.states.otaRemain = hasteCalc($rootScope.myself.attributes.haste,$rootScope.myself.extra.haste,skill.ota);
			$rootScope.myself.states.gcd = hasteCalc($rootScope.myself.attributes.haste,$rootScope.myself.extra.haste,24);
		}else if(skill.type=="instant"&&!$rootScope.myself.states.ota&&$rootScope.myself.states.gcd==0){
			$rootScope.myself.states.ota = false;
			$rootScope.myself.states.gcd = hasteCalc($rootScope.myself.attributes.haste,$rootScope.myself.extra.haste,24);
			var damage = skill.calc($rootScope.myself,$rootScope.target,$rootScope.buffController,$rootScope.skillRecipe,$rootScope.skillOption);
		}else if(skill.type=="channel"&&!$rootScope.myself.states.ota&&$rootScope.myself.states.gcd==0){
			$rootScope.myself.states.ota = true;
			$rootScope.skillController.curSkill = skill;
			$rootScope.myself.states.curOta = hasteCalc($rootScope.myself.attributes.haste,$rootScope.myself.extra.haste,skill.interval)*(skill.ota/skill.interval);
			$rootScope.myself.states.otaRemain = $rootScope.myself.states.curOta;
			$rootScope.myself.states.curInterval = hasteCalc($rootScope.myself.attributes.haste,$rootScope.myself.extra.haste,skill.interval);
			$rootScope.myself.states.gcd = hasteCalc($rootScope.myself.attributes.haste,$rootScope.myself.extra.haste,24);
		}
	}

	$scope.macro = function(){
		if($scope.tnobuff("兰摧玉折")&&$scope.tnobuff("钟林毓秀")&&$scope.nocd("乱洒青荷")){
			$scope.cast("乱洒青荷");
			return;
		}
		if($scope.tnobuff("兰摧玉折")&&$scope.tnobuff("钟林毓秀")&&$scope.buff("乱洒青荷")){
			$scope.cast("阳明指");
			return;
		}
		if($scope.tnobuff("兰摧玉折")&&$scope.nocd("兰摧玉折")){
			$scope.cast("兰摧玉折");
			return;
		}
		if($scope.tnobuff("商阳指")&&$scope.nocd("商阳指")){
			$scope.cast("商阳指");
			return;
		}
		if($scope.tnobuff("钟林毓秀")){
			$scope.cast("阳明指");
			return;
		}
		if($scope.tbuff("钟林毓秀")&&$scope.tbuff("兰摧玉折")&&$scope.tbuff("商阳指")&&$scope.nocd("水月无间")&&$scope.nocd("玉石俱焚")&&($scope.bufftime("焚玉",2,"<")||$scope.nobuff("焚玉"))){
			$scope.cast("水月无间");
			return;
		}
		if($scope.tbuff("钟林毓秀")&&$scope.tbuff("兰摧玉折")&&$scope.tbuff("商阳指")&&$scope.nocd("玉石俱焚")&&($scope.bufftime("焚玉",2,"<")||$scope.nobuff("焚玉"))){
			$scope.cast("玉石俱焚");
			return;
		}
		$scope.cast("阳明指");
	}

	$scope.tbuff = function(buffName,level,sign){
		// 判断目标身上是否存在某增益或减益buff
		// 或者判断目标身上的某增益或减益buff是否大于，小于或等于几层
		if(!level) level = 1;
		if(!sign) sign = "=";
		var returnValue = false;
		angular.forEach($rootScope.buffController.targetBuffs,function(value,key){
			if(value.name==buffName){
				switch(sign){
					case ">":
						if(value.level>level) returnValue = true;
						break;
					case "<":
						if(value.level<level) returnValue = true;
						break;
					case "=":
						if(value.level==level) returnValue = true;
						break;
				}
			}
		});
		return returnValue;
	}
	$scope.buff = function(buffName,level,sign){
		// 判断自己身上是否存在某增益或减益buff
		// 或者判断自己身上的某增益或减益buff是否大于，小于或等于几层
		if(!level) level = 1;
		if(!sign) sign = "=";
		var returnValue = false;
		angular.forEach($rootScope.buffController.selfBuffs,function(value,key){
			if(value.name==buffName){
				switch(sign){
					case ">":
						if(value.level>level) returnValue = true;
						break;
					case "<":
						if(value.level<level) returnValue = true;
						break;
					case "=":
						if(value.level==level) returnValue = true;
						break;
				}
			}
		});
		return returnValue;
	}

	$scope.tnobuff = function(buffName){
		// 判断目标身上无某增益或减益buff
		var returnValue = true;
		angular.forEach($rootScope.buffController.targetBuffs,function(value,key){
			if(value.name==buffName){
				returnValue = false;
			}
		});
		return returnValue;
	}

	$scope.nobuff = function(buffName){
		// 判断自己身上无某增益或减益buff
		var returnValue = true;
		angular.forEach($rootScope.buffController.selfBuffs,function(value,key){
			if(value.name==buffName){
				returnValue = false;
			}
		});
		return returnValue;
	}

	$scope.tbufftime = function(buffName,seconds,sign){
		// 判断目标身上某增益或减益buff 持续时间大于，小于或等于多少秒
		var returnValue = false;
		angular.forEach($rootScope.buffController.targetBuffs,function(value,key){
			if(value.name==buffName){
				var timeRemain = Math.floor(value.remain/16);
				switch(sign){
					case ">":
						if(timeRemain>seconds) returnValue = true;
						break;
					case "<":
						if(timeRemain<seconds) returnValue = true;
						break;
					case "=":
						if(timeRemain==seconds) returnValue = true;
						break;
				}
			}
		});
		return returnValue;
	}

	$scope.bufftime = function(buffName,seconds,sign){
		// 判断自己身上某增益或减益buff 持续时间大于，小于或等于多少秒
		var returnValue = false;
		angular.forEach($rootScope.buffController.selfBuffs,function(value,key){
			if(value.name==buffName){
				var timeRemain = Math.floor(value.remain/16);
				switch(sign){
					case ">":
						if(timeRemain>seconds) returnValue = true;
						break;
					case "<":
						if(timeRemain<seconds) returnValue = true;
						break;
					case "=":
						if(timeRemain==seconds) returnValue = true;
						break;
				}
			}
		});
		return returnValue;
	}

	$scope.nocd = function(skillName){
		// 判断自身技能是否没有CD
		var returnValue = true;
		angular.forEach($rootScope.skillController.list,function(value,key){
			if(value.name == skillName){
				returnValue = !value.cdRemain>0;
			}
		})
		return returnValue;
	}
	$rootScope.settings = false;
	$scope.settings = function(){
		$rootScope.settings = !$rootScope.settings;
	}
}]);

app.controller('SettingsCtrl', ['$rootScope','$scope', function($rootScope,$scope){
	$scope.recipeList = [
		{name:"阳明指",id:"yangMing"},
		{name:"商阳指",id:"shangYang"},
		{name:"兰摧玉折",id:"lanCui"},
		{name:"钟林毓秀",id:"zhongLin"},
		{name:"快雪时晴",id:"kuaiXue"}
	];
	$scope.options = [];
	angular.forEach($rootScope.skillOption,function(value,key){
		for (var i = 0; i < value.length; i++) {
			if(value[i].active){
				var opt = {id:key,name:value[i].name};
				$scope.options.push(opt);
			}
		};
	})
	$scope.toggleOption = function(name, id){
		var subid = 0;
		for (var i = 0; i < $rootScope.skillOption[id].length; i++) {
			$rootScope.skillOption[id][i].active=false;
			if($rootScope.skillOption[id][i].name == name){
				$rootScope.skillOption[id][i].active=true;
				subid = i;
			}
		};
		$scope.options[id-1] = {id:id,name:$rootScope.skillOption[id][subid].name};
	}
	$scope.recipeLCtrl = {
		yangMing:0,
		shangYang:0,
		lanCui:0,
		zhongLin:0,
		kuaiXue:0
	};
	angular.forEach($rootScope.skillRecipe,function(value,key){
		for (var i = 0; i < value.length; i++) {
			if(value[i].active){
				$scope.recipeLCtrl[key]++;
			}
			
		};
	})
	$scope.toggleRecipe = function(id){
		$scope.recipeLCtrl[id] = 0;
		for (var i = 0; i < $rootScope.skillRecipe[id].length; i++) {
			if($rootScope.skillRecipe[id][i].active){
				$scope.recipeLCtrl[id]++;
			}
			
		};
	}
}]);	