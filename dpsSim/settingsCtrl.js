app.controller('QixueCtrl', ['$rootScope','$scope','$modalInstance', function($rootScope,$scope,$modalInstance){
	$scope.options = [];
	angular.forEach($rootScope.skillOption,function(value,key){
		for (var i = 0; i < value.length; i++) {
			if(value[i].active){
				var opt = {id:key,name:value[i].name,icon:value[i].icon,desc:value[i].desc};
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
		var value = $rootScope.skillOption[id][subid];
		$scope.options[id-1] = {id:id,name:value.name,icon:value.icon,desc:value.desc};
	}
	$scope.close = function() {
		$modalInstance.dismiss();
	}
}]);

app.controller('RecipeCtrl', ['$rootScope','$scope','$modalInstance', function($rootScope,$scope,$modalInstance){
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
	$scope.close = function() {
		$modalInstance.dismiss();
	}
}]);

app.controller('TargetCtrl', ['$rootScope','$scope','$modalInstance', function($rootScope,$scope,$modalInstance){
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
	}
	$scope.close = function() {
		$modalInstance.dismiss();
	}
}]);

app.controller('MacroCtrl', ['$rootScope','$scope','$modalInstance', function($rootScope,$scope,$modalInstance){
	$rootScope.macroProgram = [];
	$scope.setMacro = function(){
		$rootScope.macroProgram = $rootScope.macroText.split("\n");
	}
	$scope.close = function() {
		$scope.setMacro();
		$modalInstance.dismiss();
	}
}]);

app.controller('EffectCtrl', ['$rootScope','$scope','$modalInstance', function($rootScope,$scope,$modalInstance){
	$scope.cw = [
		{id:0,name:"无"},
		{id:1,name:"小橙武"},
		{id:2,name:"落凤"}
	]
	$scope.water = [
		{id:0,name:"无"},
		{id:15,name:"水·灭虚"},
		{id:16,name:"水·无双"},
	]
	$scope.thunder = [
		{id:0,name:"无"},
		{id:17,name:"雷·激流"},
		{id:18,name:"雷·灭气"},
		{id:19,name:"雷·痛切"}
	]
	$scope.close = function() {
		$modalInstance.dismiss();
	}
}]);