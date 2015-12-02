app.service('Skill',['$rootScope','Utils','Buff',function($rootScope,Utils,Buff){
	this.createNew = function(skillData){
		var skill = {};
		var skillTypeList = ["ota","instant","channel"];
		/* 数据 */
		skill = skillData;
		skill.type = skillTypeList[skillData.type];
		skill.cdRemain = 0;
		skill.extraAttr = {
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
		skill.applyRecipe = function(recipes,buffController){
			for (var i = 0; i < recipes.length; i++) {
				if(recipes[i].active){
					switch(recipes[i].effect){
						case "frameMinus":
							this.ota = this.ota-recipes[i].value;
							break;
						case "damageAddPercent":
							this.extraAttr.damage = this.extraAttr.damage + recipes[i].value;
							break;
						case "costMinusPercent":
							//this.cost
							break;
						case "critAddPercent":
							this.extraAttr.critAddPercent = this.extraAttr.critAddPercent + recipes[i].value;
							break;
						case "cdMinus":
							this.cd = this.cd-recipes[i].value;
							break;
						case "hitAddPercent":
							this.extraAttr.hitAddPercent = this.extraAttr.hitAddPercent + recipes[i].value;
							break;
					}
				}
			};
		}
		skill.calc = function(self,target,buffController,recipes,options){
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
			var hitRequire = target.hitRequire;
			var strainRequire = target.strainRequire;
			var missRate = hitRequire - onFightAttr.hit;
			missRate = parseFloat(missRate<0?0:missRate);
			var insightRate = strainRequire - onFightAttr.strain;
			insightRate = parseFloat(insightRate<0?0:insightRate);
			var roll = Math.random()*100;
			var flag = {
				miss:0,
				insight:0,
				crit:0,
				hit:0
			}
			if(this.target){
				if(roll<=missRate){
					flag.miss = 1;
				}else if(roll<=missRate+insightRate){
					flag.insight = 1;
					skill.onSkillHitEvent(onFightAttr,target,buffController,recipes,options);
				}else if(roll<=missRate+insightRate+parseFloat(onFightAttr.crit)){
					flag.crit = 1;
					skill.onSkillCritEvent(onFightAttr,target,buffController,recipes,options);
				}else{
					flag.hit = 1;
					skill.onSkillHitEvent(onFightAttr,target,buffController,recipes,options);
				}
			}else{
				flag.hit = 1;
				skill.onSkillHitEvent(onFightAttr,target,buffController,recipes,options);
			}
			// 删除砚悬buff
			if($rootScope.originalBuffList.yanXuanBuff.id in buffController.selfBuffs) delete buffControlle.selfBuffs[$rootScope.originalBuffList.yanXuanBuff.id];
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
			// 水雷特效触发
			if(!flag.miss&&this.damageInstant){
				// 水特效触发
				if($rootScope.effects.water!=0){
					Utils.addBuff(Buff.getBuffById($rootScope.effects.water),onFightAttr);
				}
				// 雷特效触发
				if($rootScope.effects.thunder!=0){
					var leiCD = $rootScope.originalBuffList.leiCD;
					if(leiCD.id in buffController.selfBuffs){}
					else{
						var roll = Math.random()*100;
						if(roll<10){
							Utils.addBuff(Buff.getBuffById($rootScope.effects.thunder),onFightAttr);
							Utils.addBuff(leiCD,onFightAttr);
						}
					}
				}
			}
			skill.cdRemain = this.cd;
			if(this.damageInstant){
				damage = (onFightAttr.attack * skill.cof + (skill.max-skill.min)*Math.random() + skill.min) * (0 * flag.miss + 0.25 * flag.insight + onFightAttr.critEff/100 * flag.crit + 1 * flag.hit);
				damage = damage * (1 + onFightAttr.overcome/3616.925) * (1 - target.shield/100) * (1 + onFightAttr.damageAddPercent/100);
				damage = damage.toFixed(0);
				var s = skill.name+" " + (flag.miss>0?"偏离":"")+(flag.insight>0?"识破":"")+(flag.crit>0?"会心":"")+(flag.hit>0?"命中":"") +" "+ damage;
				Utils.logln(s);
				Utils.calcDamage(damage);
				return damage;
			}else{
				var s = skill.name+" " + (flag.miss>0?"偏离":"")+(flag.insight>0?"识破":"")+(flag.crit>0?"会心":"")+(flag.hit>0?"命中":"");
				Utils.logln(s);
				return 0;
			}
		}
		return skill;
	}
}]);
