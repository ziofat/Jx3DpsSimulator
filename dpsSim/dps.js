var app = angular.module('J3DPS', ['ui.bootstrap','toastr','ngAnimate'])
.config(['toastrConfig',function(toastrConfig) {
	angular.extend(toastrConfig, {
		maxOpened: 5,	
		positionClass: 'toast-bottom-right',
		timeOut: 3000
	});
}]);
app.directive('icheck', ['$timeout', '$parse', function($timeout, $parse) {
	return {
		require: 'ngModel',
		link: function($scope, element, $attrs, ngModel) {
			$scope.safeApply = function(fn){
				var phase = this.$root.$$phase;
				if(phase == '$apply' || phase == '$digest') {
					if(fn && (typeof(fn) === 'function')) {
						fn();
					}
				} else {
					this.$apply(fn);
				}
			}
			return $timeout(function() {
				var value;
				value = $attrs['value'];
				$scope.$watch($attrs['ngModel'], function(newValue){
					$(element).icheck('updated');
				})
				$scope.$watch($attrs['ngDisabled'], function(newValue){
					if(newValue==true) $(element).icheck('disabled');
					else if(newValue==false) $(element).icheck('enabled');
				})

				return $(element).icheck({
					checkboxClass: 'icheckbox_flat-blue',
					radioClass: 'iradio_flat-blue'

				}).on('ifChanged', function(event) {
					if ($(element).attr('type') === 'checkbox' && $attrs['ngModel']) {
						$scope.safeApply(function() {
							return ngModel.$setViewValue(event.target.checked);
						});
					}
					if ($(element).attr('type') === 'radio' && $attrs['ngModel']) {
						return $scope.safeApply(function() {
							return ngModel.$setViewValue(value);
						});
					}
				});
			});
		}
	};
}]);
app.controller('AppCtrl', ['$scope','$http','toastr','$modal','$rootScope','$httpParamSerializerJQLike', function($scope,$http,toastr,$modal,$rootScope,$httpParamSerializerJQLike){
	var gui = require('nw.gui');
	var win = gui.Window.get();
	var menu = new gui.Menu();

	win.setTransparent(!win.isTransparent);
	win.setTransparent(!win.isTransparent);

	// 添加菜单项，label为菜单项的显示名
	menu.append(new gui.MenuItem({ label: '开始循环' , click:function(){$scope.$broadcast("start");} }));
	menu.append(new gui.MenuItem({ type: 'separator' }));
	menu.append(new gui.MenuItem({ label: '奇穴设置' , click:function(){$scope.$broadcast("qixue");}}));
	menu.append(new gui.MenuItem({ label: '秘籍设置' , click:function(){$scope.$broadcast("recipe");}}));
	menu.append(new gui.MenuItem({ label: '目标设置' , click:function(){$scope.$broadcast("target");}}));
	menu.append(new gui.MenuItem({ label: '特效设置' , click:function(){$scope.$broadcast("effect");}}));
	menu.append(new gui.MenuItem({ label: '宏设置' , click:function(){$scope.$broadcast("macro");}}));

	document.body.addEventListener('contextmenu', function(ev) { 
		ev.preventDefault();
		// 在你点击后弹出
		menu.popup(ev.x, ev.y);
		return false;
	}, false);

	$scope.closeApp = function(){
		win.close();
	}

	$scope.minimizeApp = function(){
		win.minimize();
	}

	$scope.devMode = function(){
		if(win.isDevToolsOpen()) win.showDevTools();
		else win.closeDevTools();
	}
}]);