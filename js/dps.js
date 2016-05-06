var app = angular.module('J3DPS', ['ngAnimate','datatables','ui.bootstrap','cfp.hotkeys']);
app.controller('AppCtrl', ['$scope','$rootScope', function($scope,$rootScope){
	$scope.pageSwitch = function(page){
		$scope.pageShow = {
			home:false,
			setting:false,
			guide:false
		};
		$scope.pageShow[page]=true;
	};
	$scope.pageShow = {
		home:true,
		setting:false,
		guide:false
	};

	$rootScope.macroText = 
		"/cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀] 乱洒青荷" + "\n" +
		"/cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀&buff:乱洒青荷] 阳明指" + "\n" +
		"/cast [tnobuff:兰摧玉折] 兰摧玉折" + "\n" +
		"/cast [tnobuff:商阳指] 商阳指" + "\n" +
		"/cast [tnobuff:钟林毓秀] 阳明指" + "\n" +
		"/cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 水月无间" + "\n" +
		"/cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 玉石俱焚" + "\n" +
		"/cast 阳明指";
	
	var ls = localStorage.getItem("simulator_default");
	var configVersion = localStorage.getItem("config_version");
	var configVersionCur = 0.3;
	if(!ls||!configVersion||configVersion<configVersionCur){
		ls = {"school":"huajian","attribute":{"basicAttack":"2748","spunk":"706","crit":"15.15","critEff":"211.77","hit":"106.76","haste":"321","strain":"20.09","overcome":"900","delay":"100"},"delay":50,"maxTime":225,"effects":{"cw":0,"water":0,"thunder":0,"setEffect":0},"qixue":[0,0,1,2,0,2,3,0,0,0,0,0],"recipe":{"yangMing":[0,1,6,7],"shangYang":[3,4,5,6],"lanCui":[0,1,2,6],"zhongLin":[0,1,2,5],"kuaiXue":[0,1,2,3]},"target":1,"macro":"1","skillOrder":[5,4,1,0,2,3,8,7,6],"hotkeys":['1','2','3','q','e','r','z','x','c']};
		ls = JSON.stringify(ls);
		localStorage.setItem("simulator_default",ls);
		localStorage.setItem("macro_1",$rootScope.macroText);
		localStorage.setItem("config_version",configVersionCur);
	}

	// 载入配置文件
	$rootScope.settings = JSON.parse(ls);
	$rootScope.macroProgram = $rootScope.macroText.split("\n");
	$rootScope.macroText = localStorage.getItem("macro_"+$rootScope.settings.macro);

	$rootScope.$watch("settings",function(){
		ls = JSON.stringify($rootScope.settings);
		localStorage.setItem("simulator_default",ls);
	},true);
	// 应用配置文件
	$rootScope.skillRecipe = angular.copy(whRecipes);
	angular.forEach($rootScope.skillRecipe,function(value,key){
		for (var i = 0; i < $rootScope.settings.recipe[key].length; i++) {
			value[$rootScope.settings.recipe[key][i]].active=true;
		}
	});
	$rootScope.skillOption = angular.copy(whOptions);
	for (var i = 1; i <= 12; i++) {
		$rootScope.skillOption[i][$rootScope.settings.qixue[i-1]].active = true;
	}
	$rootScope.myself = {
		attributes:$rootScope.settings.attribute,
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
			gcd:0,
			posture:"normal",
			angry:0
		}
	};
}]);

function macroTranslateToJs(s){
	var lineArr = s.split(" ");
	var action = lineArr[0].split("/")[1];
	var program = "";
	var condition = true;
	var skill = "";
	if(lineArr[1].indexOf("[")<0){
		// 无条件
		condition = true;
		skill = lineArr[1];
		program = 'if($scope.nocd("'+skill+'")){var s=$scope.'+action+'("'+skill+'");if(s) return;}';
	}else{
		// 有条件
		var conditionProgram = "";
		var conditions = lineArr[1].slice(lineArr[1].indexOf("[")+1,lineArr.indexOf("]"));
		skill = lineArr[2];
		var conditionArr = conditions.split(/(\&|\|)/);
		condition = true;
		conditionArr.push("&");
		conditionArr.unshift("&");
		for (var i = 1; i < conditionArr.length; i=i+2) {
			var checkArr = conditionArr[i].split(/:|>=|<=|=|>|</);
			var funcName = checkArr[0];
			var logic = conditionArr[i-1];
			var sign = "=";
			if(conditionArr[i].indexOf(">=")>=0) sign = ">=";
			else if(conditionArr[i].indexOf("<=")>=0) sign = "<=";
			else if(conditionArr[i].indexOf("<")>=0) sign = "<";
			else if(conditionArr[i].indexOf(">")>=0) sign = ">";
			else if(conditionArr[i].indexOf("=")>=0) sign = "=";
			var result = "";
			if(checkArr.length==3){
				result = '$scope.'+funcName+'("'+checkArr[1]+'",'+checkArr[2]+',"'+sign+'")';
			}else if(checkArr.length==2){
				result = '$scope.'+funcName+'("'+checkArr[1]+'")';
				if(funcName=="life"||funcName=="mana") result = '$scope.'+funcName+'("'+checkArr[1]+',"'+sign+'")';
			}else if(checkArr.length==1){
				result = '$scope.'+funcName+'()';
			}
			if(i>1) conditionProgram = conditionProgram+logic+logic+result;
			else conditionProgram = result;
		}
		program = 'if($scope.nocd("'+skill+'")&&('+conditionProgram+')){var s=$scope.'+action+'("'+skill+'");if(s) return;};';
	}
	return program;
}