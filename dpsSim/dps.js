var app = angular.module('J3DPS', ['ngAnimate','datatables','ui.bootstrap']);
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
		home:false,
		setting:false,
		guide:false
	}

	// var gui = require('nw.gui');
	// var win = gui.Window.get();
	// var menu = new gui.Menu();

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

	// $scope.closeApp = function(){
	// 	win.close();
	// }

	// $scope.minimizeApp = function(){
	// 	win.minimize();
	// }

	// $scope.devMode = function(){
	// 	if(win.isDevToolsOpen()) win.showDevTools();
	// 	else win.closeDevTools();
	// }

	angular.element(document).ready(function () {
        $scope.pageShow.home = true;
    });
}]);