app.service('Buff', ['$rootScope','Utils', function($rootScope,Utils){
	this.createNew=function(buffData) {
		var buff = {};
		var buffTypeList = ["dot","buff"];
		/* 数据 */
		buff = buffData;
		buff.type = buffTypeList[buffData.type];
		buff.level = 1;
		buff.extraAttr = {
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
			strainAddBase:0
		};
		buff.calc = function(self,target,buffController,level,recipes,options){
			var onFightAttr = {
				basicAttack: parseInt(self.attributes.basicAttack),
				attack: parseInt(self.attributes.basicAttack)+self.attributes.spunk*1.95*(1+this.extraAttr.attackAddPercent/100 + self.extra.attackAddPercent/100)+this.extraAttr.attackAddBase+self.extra.attackAddBase,
				crit: parseFloat(self.attributes.crit) + (this.extraAttr.critAddBase + self.extra.critAddBase)/41.43925 + this.extraAttr.critAddPercent + self.extra.critAddPercent,
				critEff: parseFloat(self.attributes.critEff) + (this.extraAttr.critEffAddBase + self.extra.critEffAddBase)/15.066 + this.extraAttr.critEffAddPercent + self.extra.critEffAddPercent,
				hit: parseFloat(self.attributes.hit) + (this.extraAttr.hitAddBase + self.extra.hitAddBase)/34.24725 + this.extraAttr.hitAddPercent + self.extra.hitAddPercent,
				strain: parseFloat(self.attributes.strain) + (this.extraAttr.strainAddBase + self.extra.strainAddBase)/25.6835 + this.extraAttr.strainAddPercent + self.extra.strainAddPercent,
				haste: parseInt(self.attributes.haste),
				extraHaste: parseInt(self.extra.haste),
				overcome: parseInt(self.attributes.overcome) + (self.attributes.overcome - self.attributes.spunk * 0.34) * (this.extraAttr.overcomeAddPercent/100 + self.extra.overcomeAddPercent) + parseInt(this.extraAttr.overcomeAddBase) + parseInt(self.extra.overcomeAddBase),
				damageAddPercent: this.extraAttr.damage + parseInt(self.extra.damage)
			}
			var damage = 0;
			var strainRequire = target.strainRequire;
			var insightRate = strainRequire - onFightAttr.strain;
			insightRate = parseFloat(insightRate<0?0:insightRate);
			var roll = Math.random()*100;
			var flag = {
				insight:0,
				crit:0,
				hit:0
			}
			if(roll<=insightRate){
				flag.insight = 1;
			}else if(roll<=insightRate+parseFloat(onFightAttr.crit)){
				flag.crit = 1;
				buff.onSkillCritEvent(onFightAttr,target,buffController,recipes,options);
			}else{
				flag.hit = 1;
				buff.onSkillHitEvent(onFightAttr,target,buffController,recipes,options);
			}
			// 涓流buff斩杀控制
			if((!flag.miss)&&(target.curLife/target.life)<0.35){
				var juanLiuBuff = $rootScope.originalBuffList.juanLiuBuff;
				if(juanLiuBuff.id in buffController.selfBuffs){
					buffController.selfBuffs[juanLiuBuff.id].level--;
					if(buffController.selfBuffs[juanLiuBuff.id].level==0){
						delete buffController.selfBuffs[juanLiuBuff.id];
					}
				}else{
					Utils.addBuff(juanLiuBuff,onFightAttr)
					buffController.selfBuffs[juanLiuBuff.id].level = 10;
				}
			}
		
			damage = (onFightAttr.attack * buff.cof + (buff.max-buff.min)*Math.random() + buff.min) * (0.25 * flag.insight + onFightAttr.critEff/100 * flag.crit + 1 * flag.hit);
			damage = damage * (1 + onFightAttr.overcome/3616.925) * (1 - target.shield/100) * (1 + onFightAttr.damageAddPercent/100);
			damage = damage.toFixed(0) * level;
			var s = buff.name+"(buff) " + (flag.insight>0?"识破 ":"")+(flag.crit>0?"会心 ":"")+(flag.hit>0?"命中 ":"") + damage;
			Utils.logln(s);
			Utils.calcDamage(damage);
			return damage;
		}
		return buff;
	}
	this.getBuffByName = function(name){
		var buffList = $rootScope.originalBuffList;
		angular.forEach(buffList,function(value,key){
			if(value.name == name) return value;
		})
	}

	this.getBuffById = function(id){
		var buffList = $rootScope.originalBuffList;
		var returnObj;
		angular.forEach(buffList,function(value,key){
			if(value.id == id){
				returnObj = value;
			}
		});
		return returnObj;
	}

	function getBuffByName(name){
		var buffList = $rootScope.originalBuffList;
		angular.forEach(buffList,function(value,key){
			if(value.name == name) return value;
		})
	}

	function getBuffById(id){
		var buffList = $rootScope.originalBuffList;
		var returnObj;
		angular.forEach(buffList,function(value,key){
			if(value.id == id){
				returnObj = value;
			}
		});
		return returnObj;
	}
}]);
