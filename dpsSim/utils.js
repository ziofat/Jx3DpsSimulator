function logln(s){
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

var globalDamage = 0;
function calcDamage(d){
	globalDamage = -1*globalDamage - d;
	globalDamage = -1*globalDamage;
}

function hasteCalc(haste,extraHaste,frame){
	var hasteCof = 47.17425;
	var baseHaste = haste/hasteCof*10.24;
	var totalHaste = Math.floor(baseHaste) + Math.floor(extraHaste);
	var a = totalHaste/1024 + 1024;
	var nowFrame = Math.floor(frame * 1024 / (totalHaste + 1024));
	return nowFrame;
}

function dotRefresh(buff, buffController, attr){
	if(buff.id in buffController.targetBuffs){
		var buffIn = buffController.targetBuffs[buff.id];
		var refreshTime = buffIn.remain%buffIn.interval;
		buffController.targetBuffs[buff.id].remain = (buffIn.duration/buffIn.interval-1) * hasteCalc(attr.haste,attr.extraHaste,buff.interval) + hasteCalc(attr.haste,attr.extraHaste,refreshTime);
		buffController.targetBuffs[buff.id].interval = hasteCalc(attr.haste,attr.extraHaste,buff.interval);
		buffController.targetBuffs[buff.id].duration = hasteCalc(attr.haste,attr.extraHaste,buff.duration);
		if(buff.recipeName!="none"){
			for (var i = 0; i < whRecipes[buff.recipeName].length; i++) {
				if(whRecipes[buff.recipeName][i].active&&whRecipes[buff.recipeName][i].effect=="debuffAdd"){
					addDebuff(angular.copy(buffList[whRecipes[buff.recipeName][i].value]),buffController,attr)
				}
			};
		}
	}
}

function addDot(buff, buffController, attr){
	if(buff.id in buffController.targetBuffs){
		dotRefresh(buff, buffController, attr)
	}else{
		buffController.targetBuffs[buff.id] = angular.copy(buff);
		buffController.targetBuffs[buff.id].remain = hasteCalc(attr.haste,attr.extraHaste,buff.duration);
		buffController.targetBuffs[buff.id].interval = hasteCalc(attr.haste,attr.extraHaste,buff.interval);
		buffController.targetBuffs[buff.id].duration = hasteCalc(attr.haste,attr.extraHaste,buff.duration);
	}
}

function addBuff(buff, buffController, attr){
	if(buff.id in buffController.selfBuffs){
		buffController.selfBuffs[buff.id].remain = buff.duration;
		if(buff.canStack&&buffController.selfBuffs[buff.id].level<buffController.selfBuffs[buff.id].maxLevel)
			buffController.selfBuffs[buff.id].level++;
	}else{
		buffController.selfBuffs[buff.id] = angular.copy(buff);
		buffController.selfBuffs[buff.id].remain = buff.duration;
		if(!('level' in buffController.selfBuffs[buff.id])){
			buffController.selfBuffs[buff.id].level = 1;
		}
	}
}

function addDebuff(buff, buffController, attr){
	if(buff.id in buffController.targetBuffs){
		buffController.targetBuffs[buff.id].remain = buff.duration;
		if(buff.canStack&&buffController.targetBuffs[buff.id].level<buffController.targetBuffs[buff.id].maxLevel)
			buffController.targetBuffs[buff.id].level++;
	}else{
		buffController.targetBuffs[buff.id] = angular.copy(buff);
		buffController.targetBuffs[buff.id].remain = buff.duration;
		buffController.targetBuffs[buff.id].level = 1;
	}
}