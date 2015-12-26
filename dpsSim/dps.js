var fs = require('fs');
var gui = require('nw.gui');

var app = angular.module('J3DPS', ['ngAnimate','datatables','ui.bootstrap','cfp.hotkeys']);
app.controller('AppCtrl', ['$scope','$rootScope', function($scope,$rootScope){
	$scope.pageSwitch = function(page){
		$scope.pageShow = {
			home:false,
			setting:false,
			guide:false
		}
		$scope.pageShow[page]=true;
	}
	$scope.pageShow = {
		home:true,
		setting:false,
		guide:false
	}

	var win = gui.Window.get();
	var ini = require("ini")

	// 载入配置文件
	$rootScope.settings = JSON.parse(fs.readFileSync('./userdata/default.json'));
	$rootScope.macroText = 
		"/cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀] 乱洒青荷" + "\n" +
		"/cast [tnobuff:兰摧玉折&tnobuff:钟林毓秀&buff:乱洒青荷] 阳明指" + "\n" +
		"/cast [tnobuff:兰摧玉折] 兰摧玉折" + "\n" +
		"/cast [tnobuff:商阳指] 商阳指" + "\n" +
		"/cast [tnobuff:钟林毓秀] 阳明指" + "\n" +
		"/cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 水月无间" + "\n" +
		"/cast [bufftime:焚玉<2|nobuff:焚玉&tbuff:钟林毓秀&tbuff:兰摧玉折&tbuff:商阳指] 玉石俱焚" + "\n" +
		"/cast 阳明指";
	$rootScope.macroProgram = $rootScope.macroText.split("\n");
	var filename = './userdata/'+ $rootScope.settings.macro;
	fs.readFile(filename, 'utf8', function(err, data) {
		if (err) throw err;
		$rootScope.macroText = data;
		// $rootScope.macroProgram = $rootScope.macroText.split("\n");
		// for (var i = 0; i < $rootScope.macroProgram.length; i++) {
		// 	$rootScope.macroProgram[i] = $.trim($rootScope.macroProgram[i]);
		// 	$rootScope.macroProgram[i] = macroTranslateToJs($rootScope.macroProgram[i]);
		// };
	});
	fs.writeFileSync('./userdata/config.ini', ini.stringify($rootScope.settings, { whitespace : true }))
	// 应用配置文件
	$rootScope.skillRecipe = angular.copy(whRecipes);
	angular.forEach($rootScope.skillRecipe,function(value,key){
		for (var i = 0; i < $rootScope.settings.recipe[key].length; i++) {
			value[$rootScope.settings.recipe[key][i]].active=true;
		};
	});
	$rootScope.skillOption = angular.copy(whOptions);
	for (var i = 1; i <= 12; i++) {
		$rootScope.skillOption[i][$rootScope.settings.qixue[i-1]].active = true;
	};
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
			gcd:0
		}
	}
	// win.setTransparent(!win.isTransparent);
	// win.setTransparent(!win.isTransparent);

	// 添加菜单项，label为菜单项的显示名
	// menu.append(new gui.MenuItem({ label: '开始循环' , click:function(){$scope.$broadcast("start");} }));
	// menu.append(new gui.MenuItem({ type: 'separator' }));
	// menu.append(new gui.MenuItem({ label: '奇穴设置' , click:function(){$scope.$broadcast("qixue");}}));
	// menu.append(new gui.MenuItem({ label: '秘籍设置' , click:function(){$scope.$broadcast("recipe");}}));
	// menu.append(new gui.MenuItem({ label: '目标设置' , click:function(){$scope.$broadcast("target");}}));
	// menu.append(new gui.MenuItem({ label: '特效设置' , click:function(){$scope.$broadcast("effect");}}));
	// menu.append(new gui.MenuItem({ label: '宏设置' , click:function(){$scope.$broadcast("macro");}}));

	// document.body.addEventListener('contextmenu', function(ev) { 
	// 	ev.preventDefault();
	// 	// 在你点击后弹出
	// 	menu.popup(ev.x, ev.y);
	// 	return false;
	// }, false);

	$scope.closeApp = function(){
		win.close();
	}

	$scope.minimizeApp = function(){
		win.minimize();
	}

	win.on('close', function() {
		this.hide();
		fs.writeFileSync('./userdata/default.json',JSON.stringify($rootScope.settings));
		this.close(true);
	});

	win.on('new-win-policy',function(frame, url, policy){
		gui.Shell.openExternal(url);
		policy.ignore();
	})
}]);

function macroTranslateToJs(s){
	var lineArr = s.split(" ");
	var action = lineArr[0].split("/")[1];
	if(lineArr[1].indexOf("[")<0){
		// 无条件
		var condition = true;
		var skill = lineArr[1];
		var program = 'if($scope.nocd("'+skill+'")){var s=$scope.'+action+'("'+skill+'");if(s) return;}';
	}else{
		// 有条件
		var conditionProgram = "";
		var conditions = lineArr[1].slice(lineArr[1].indexOf("[")+1,lineArr.indexOf("]"));
		var skill = lineArr[2];
		var conditionArr = conditions.split(/(\&|\|)/);
		var condition = true;
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
			if(checkArr.length==3){
				var result = '$scope.'+funcName+'("'+checkArr[1]+'",'+checkArr[2]+',"'+sign+'")';
			}else if(checkArr.length==2){
				var result = '$scope.'+funcName+'("'+checkArr[1]+'")';
				if(funcName=="life"||funcName=="mana") result = '$scope.'+funcName+'("'+checkArr[1]+',"'+sign+'")';
			}else if(checkArr.length==1){
				var result = '$scope.'+funcName+'()';
			}
			if(i>1) conditionProgram = conditionProgram+logic+logic+result;
			else conditionProgram = result;
		};
		var program = 'if($scope.nocd("'+skill+'")&&('+conditionProgram+')){var s=$scope.'+action+'("'+skill+'");if(s) return;};';
	}
	return program;
}