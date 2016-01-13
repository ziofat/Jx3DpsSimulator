app.controller('QixueCtrl', ['$rootScope','$scope', function($rootScope,$scope){
	$scope.options = [];
	angular.forEach($rootScope.skillOption,function(value,key){
		for (var i = 0; i < value.length; i++) {
			if(value[i].active){
				var opt = {id:key,name:value[i].name,icon:value[i].icon,desc:value[i].desc};
				$scope.options.push(opt);
			}
		}
	});
	$scope.toggleOption = function(name, id){
		var subid = 0;
		for (var i = 0; i < $rootScope.skillOption[id].length; i++) {
			$rootScope.skillOption[id][i].active=false;
			if($rootScope.skillOption[id][i].name == name){
				$rootScope.skillOption[id][i].active=true;
				subid = i;
			}
		}
		var value = $rootScope.skillOption[id][subid];
		$rootScope.settings.qixue[id-1] = subid;
		$scope.options[id-1] = {id:id,name:value.name,icon:value.icon,desc:value.desc};
	};
}]);

app.controller('RecipeCtrl', ['$rootScope','$scope', function($rootScope,$scope){
	$scope.recipeList = [
		{name:"阳明指",id:"yangMing"},
		{name:"商阳指",id:"shangYang"},
		{name:"兰摧玉折",id:"lanCui"},
		{name:"钟林毓秀",id:"zhongLin"},
		{name:"快雪时晴",id:"kuaiXue"}
	];
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
		}
	});
	$scope.toggleRecipe = function(id){
		$scope.recipeLCtrl[id] = 0;
		$rootScope.settings.recipe[id] = [];
		for (var i = 0; i < $rootScope.skillRecipe[id].length; i++) {
			if($rootScope.skillRecipe[id][i].active){
				$scope.recipeLCtrl[id]++;
				$rootScope.settings.recipe[id].push(i);
			}
		}
	};
}]);

app.controller('TargetCtrl', ['$rootScope','$scope', function($rootScope,$scope){
	$scope.targetList = [
		{id:0,level:96,name:"初级试炼木桩(96)",life:5000000,mana:5000000,curLife:5000000,hitRequire:102.5,strainRequire:15,shield:15},
		{id:1,level:97,name:"中级试炼木桩(97)",life:5000000,mana:5000000,curLife:5000000,hitRequire:105,strainRequire:20,shield:25},
		{id:2,level:98,name:"高级试炼木桩(98)",life:5000000,mana:5000000,curLife:5000000,hitRequire:110,strainRequire:30,shield:35},
		{id:3,level:99,name:"极境试炼木桩(99)",life:5000000,mana:5000000,curLife:5000000,hitRequire:115,strainRequire:40,shield:40}
	];
	$scope.targetSelectId = $rootScope.target.id;
	$scope.setTarget = function(target){
		$scope.targetSelectId = target;
		$rootScope.target = $scope.targetList[target];
		$rootScope.settings.target = target;
	};
}]);

app.controller('MacroCtrl', ['$rootScope','$scope', function($rootScope,$scope){
	$rootScope.$watch("macroText",function(){
		$scope.setMacro();
	});
	$scope.setMacro = function(){
		$rootScope.macroProgram = $rootScope.macroText.split("\n");
		for (var i = 0; i < $rootScope.macroProgram.length; i++) {
			$rootScope.macroProgram[i] = $.trim($rootScope.macroProgram[i]);
			$rootScope.macroProgram[i] = macroTranslateToJs($rootScope.macroProgram[i]);
		}
		evalPro = $rootScope.macroProgram.join(" ");
		expression = new String(evalPro);
		expression = expression.toString();
		localStorage.setItem("macro_1",$rootScope.macroText);
	};
}]);

app.controller('EffectCtrl', ['$rootScope','$scope', function($rootScope,$scope){
	$scope.cw = [
		{id:0,name:"无"},
		{id:1,name:"小橙武"},
		{id:2,name:"落凤"}
	];
	$scope.water = [
		{id:0,name:"无"},
		{id:15,name:"水·灭虚"},
		{id:16,name:"水·无双"},
	];
	$scope.thunder = [
		{id:0,name:"无"},
		{id:17,name:"雷·激流"},
		{id:18,name:"雷·灭气"},
		{id:19,name:"雷·痛切"}
	];

	$rootScope.$watch("effects",function(){
		$rootScope.settings.effects = $rootScope.effects;
	},true);
}]);

app.controller('HotkeyCtrl', ['$rootScope','$scope','hotkeys', function($rootScope,$scope,hotkeys){
	$scope.hotkeySetting = angular.copy($rootScope.hotkeyList);
	$scope.hotkeyChange = function(id){
		var oldKey = $rootScope.hotkeyList[id];
		var newKey = $scope.hotkeySetting[id];
		oldId = $rootScope.hotkeyList.indexOf(newKey);
		if(oldId>=0){
			$scope.hotkeySetting[oldId] = "";
		}
		hotkeys.del(oldKey);
		hotkeys.del(newKey);

		var skill = $rootScope.originalSkillList[$rootScope.settings.skillOrder[id]];
		hotkeys.add({
			combo: newKey,
			description: skill.name,
			callback: function(event, hotkey) {
				event.preventDefault();
				var skillName = hotkey.description;
				var skill;
				angular.forEach($rootScope.skillController.list,function(value,key){
					if(value.name == skillName){
						skill = angular.copy($rootScope.skillController.list[key]);
					}
				});
				if(!skill) return false;
				if(skill.type!="channel") $scope.cast(skill.name);
				else $scope.fcast(skill.name);
			}
		});
		$rootScope.hotkeyList = angular.copy($scope.hotkeySetting);
		$rootScope.settings.hotkeys = angular.copy($scope.hotkeySetting);
	};
	$scope.emptyKeys = function(){
		for (var i = 0; i < $rootScope.settings.hotkeys.length; i++) {
			hotkeys.del($rootScope.settings.hotkeys[i]);
		}
	};
}]);