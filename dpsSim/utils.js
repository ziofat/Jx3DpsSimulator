app.service('Utils',['$rootScope',function($rootScope){
	$rootScope.dpsLog = {
		skillList:[],
		skillDetails:[]
	};
	this.logln = function(s){
		if($rootScope.debug){
			var logText = $('#log').html();
			var time = new Date();
			var hours = time.getHours();
			if(hours<10) hours = "0"+hours;
			var minutes = time.getMinutes();
			if(minutes<10) minutes = "0"+minutes;
			var seconds = time.getSeconds();
			if(seconds<10) seconds = "0"+seconds;
			var timeText = "["+hours+":"+minutes+":"+seconds+"] ";
			logText = timeText + s + "<br>" + logText;
			$('#log').html(logText);
		}
		var logArr = s.split(" ");
		if(logArr.length>2){
			var skillName = logArr[0];
			var skillStatus = logArr[1];
			var skillDamage = parseInt(logArr[2]);
			var id = $rootScope.dpsLog.skillList.indexOf(skillName);
			var firstHit = false;
			if(id<0){
				var skillDetail = {
					count:0,
					name:skillName,
					damage:0,
					hit:{
						count:0,
						max:0,
						min:999999,
						damage:0
					},
					insight:{
						count:0,
						max:0,
						min:999999,
						damage:0
					},
					miss:{
						count:0,
						max:0,
						min:999999,
						damage:0
					},
					crit:{
						count:0,
						max:0,
						min:999999,
						damage:0
					}
				}
				$rootScope.dpsLog.skillList.push(skillName);
				id = $rootScope.dpsLog.skillDetails.push(skillDetail);
				id--;
				firstHit = true;
			}
			var key = "miss";
			switch(skillStatus){
				case "命中":
					key = "hit";
					break;
				case "识破":
					key = "insight";
					break;
				case "偏离":
					key = "miss";
					break;
				case "会心":
					key = "crit";
					break;
			}
			$rootScope.dpsLog.skillDetails[id].count++;
			$rootScope.dpsLog.skillDetails[id].damage += skillDamage;
			$rootScope.dpsLog.skillDetails[id][key].count++;
			$rootScope.dpsLog.skillDetails[id][key].damage += skillDamage;
			
			if(skillDamage<=$rootScope.dpsLog.skillDetails[id][key].min) $rootScope.dpsLog.skillDetails[id][key].min = skillDamage;
			if(skillDamage>$rootScope.dpsLog.skillDetails[id][key].max) $rootScope.dpsLog.skillDetails[id][key].max = skillDamage;
			
		}
	}

	this.calcDamage = function(d){
		$rootScope.globalDamage = -1 * $rootScope.globalDamage - d;
		$rootScope.globalDamage = -1 * $rootScope.globalDamage;
	}

	this.hasteCalc = function(haste,extraHaste,frame){
		var hasteCof = 47.17425;
		var baseHaste = haste/hasteCof*10.24;
		var totalHaste = Math.floor(baseHaste) + Math.floor(extraHaste);
		var a = totalHaste/1024 + 1024;
		var nowFrame = Math.floor(frame * 1024 / (totalHaste + 1024));
		return nowFrame;
	}
	
	this.dotRefresh = function(buff, attr){
		if(buff.id in $rootScope.buffController.targetBuffs){
			var buffIn = $rootScope.buffController.targetBuffs[buff.id];
			var refreshTime = buffIn.remain%buffIn.interval;
			$rootScope.buffController.targetBuffs[buff.id].remain = (buffIn.duration/buffIn.interval-1) * this.hasteCalc(attr.haste,attr.extraHaste,buff.interval) + this.hasteCalc(attr.haste,attr.extraHaste,refreshTime);
			$rootScope.buffController.targetBuffs[buff.id].interval = this.hasteCalc(attr.haste,attr.extraHaste,buff.interval);
			$rootScope.buffController.targetBuffs[buff.id].duration = this.hasteCalc(attr.haste,attr.extraHaste,buff.duration);
			if("addedInterval" in buffIn) buffIn.addedInterval = false;
			if(buff.recipeName!="none"){
				for (var i = 0; i < whRecipes[buff.recipeName].length; i++) {
					if(whRecipes[buff.recipeName][i].active&&whRecipes[buff.recipeName][i].effect=="debuffAdd"){
						this.addDebuff(angular.copy($rootScope.buffList[whRecipes[buff.recipeName][i].value]),$rootScope.buffController,attr)
					}
				};
			}
		}
	}

	this.dotAddInterval = function(buff, attr, times){
		if(buff.id in $rootScope.buffController.targetBuffs){
			if("addedInterval" in buff&&buff.addedInterval) return;
			$rootScope.buffController.targetBuffs[buff.id].remain += times * this.hasteCalc(attr.haste,attr.extraHaste,buff.interval);
			$rootScope.buffController.targetBuffs[buff.id].addedInterval = true;
			if(buff.recipeName!="none"){
				for (var i = 0; i < whRecipes[buff.recipeName].length; i++) {
					if(whRecipes[buff.recipeName][i].active&&whRecipes[buff.recipeName][i].effect=="debuffAdd"){
						this.addDebuff(angular.copy($rootScope.buffList[whRecipes[buff.recipeName][i].value]),$rootScope.buffController,attr)
					}
				};
			}

		}
	}
	
	this.addDot = function(buff, attr){
		if(buff.id in $rootScope.buffController.targetBuffs){
			this.dotRefresh(buff, attr);
		}else{
			$rootScope.buffController.targetBuffs[buff.id] = angular.copy(buff);
			$rootScope.buffController.targetBuffs[buff.id].remain = this.hasteCalc(attr.haste,attr.extraHaste,buff.duration);
			$rootScope.buffController.targetBuffs[buff.id].interval = this.hasteCalc(attr.haste,attr.extraHaste,buff.interval);
			$rootScope.buffController.targetBuffs[buff.id].duration = this.hasteCalc(attr.haste,attr.extraHaste,buff.duration);
		}
	}
	
	this.addBuff = function(buff, attr){
		if(buff.id in $rootScope.buffController.selfBuffs){
			$rootScope.buffController.selfBuffs[buff.id].remain = buff.duration;
			if(buff.canStack&&$rootScope.buffController.selfBuffs[buff.id].level<$rootScope.buffController.selfBuffs[buff.id].maxLevel)
				$rootScope.buffController.selfBuffs[buff.id].level++;
		}else{
			$rootScope.buffController.selfBuffs[buff.id] = angular.copy(buff);
			$rootScope.buffController.selfBuffs[buff.id].remain = buff.duration;
			if(!('level' in $rootScope.buffController.selfBuffs[buff.id])){
				$rootScope.buffController.selfBuffs[buff.id].level = 1;
			}
		}
	}
	
	this.addDebuff = function(buff, attr){
		if(buff.id in $rootScope.buffController.targetBuffs){
			$rootScope.buffController.targetBuffs[buff.id].remain = buff.duration;
			if(buff.canStack&&$rootScope.buffController.targetBuffs[buff.id].level<$rootScope.buffController.targetBuffs[buff.id].maxLevel)
				$rootScope.buffController.targetBuffs[buff.id].level++;
		}else{
			$rootScope.buffController.targetBuffs[buff.id] = angular.copy(buff);
			$rootScope.buffController.targetBuffs[buff.id].remain = buff.duration;
			$rootScope.buffController.targetBuffs[buff.id].level = 1;
		}
	}
}]);