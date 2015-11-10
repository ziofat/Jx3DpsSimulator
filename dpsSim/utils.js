app.service('Utils',['$rootScope',function($rootScope){
	this.logln = function(s){
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
		// $('#log').html(logText);
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