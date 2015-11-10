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
					radioClass: 'iradio_square-blue'

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
	$scope.isLogin = false;
	$scope.user = {
		mail:"",
		password:"",
		name:"",
		isLoading:false
	}
	$http.post('api/loginCertificate.php')
	.success(function(response) {
		if(response.err||!response.isLogin){
			console.log('使用cookies登录失败');
		}else{
			$scope.isLogin = true;
			$scope.user.name = response.name;
			console.log('使用cookies登录成功');
		}
	})
	.error(function(response) {
		console.log('使用cookies过程中连接失败');
	});
	$scope.checkUpdate = function(forceOpen){
		$http.get('api/checkVersion.php')
		.success(function(response){
			if(Number(response.version) > Number(localStorage.edition)||!localStorage.edition||forceOpen){
				$rootScope.updateDesc = response.desc;
				var modalInstance = $modal.open({
					animation: true,
					templateUrl: 'templates/updateDesc.html',
					controller: 'ModalInstanceCtrl',
				});
			}
			try{localStorage.edition=response.version}catch(e){;}
		})
	}
	$scope.checkUpdate();
	$scope.login = function(){
		$scope.user.isLoading = true;
		$http({
			url: 'api/loginCertificate.php',
			method: 'POST',
			data: $httpParamSerializerJQLike({email:$scope.user.mail, pswd:$scope.user.password}),
			headers: {
				'Content-Type': 'application/x-www-form-urlencoded'
			}
		})
		.success(function(response) {
			if(response.err||!response.isLogin){
				toastr.error("登录失败, " + response.errReason);
			}else{
				$scope.isLogin = true;
				$scope.user.name = response.name;
				$scope.user.isLoading = false;
			}
		})
		.error(function(response) {
			toastr.error("连接失败")
		});
	};
	$scope.logout = function(){
		$http.get('api/logout.php');
		$scope.isLogin = false;
		$scope.user = {
			mail:"",
			password:"",
			name:""
		}
	}
	$scope.forgetPass = function(){
		var modalInstance = $modal.open({
			animation: true,
			templateUrl: 'templates/reset.html',
			controller: 'ModalInstanceCtrl',
		});

		modalInstance.result.then(function(email) {
			$http({
				url: 'api/sendMail.php',
				method: 'POST',
				data: $httpParamSerializerJQLike({mail:email}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.success(function(response){ 
				if(response=="noreg"){ 
					toastr.warning('该邮箱没有注册');
				}else{ 
					toastr.success(response); 
				}
			}); 
		},function() {
			console.log('Reset Password Cancelled');
		});
	};
	$scope.loginModal = function(){
		var modalInstance = $modal.open({
	 		animation: $scope.animationsEnabled,
			templateUrl: 'templates/login.html',
			controller: 'LoginModalController',
			size: 'sm',
	 	});
		modalInstance.result.then(function(user) {
			$http({
				url: 'api/loginCertificate.php',
				method: 'POST',
				data: $httpParamSerializerJQLike({email:user.mail, pswd:user.password}),
				headers: {
					'Content-Type': 'application/x-www-form-urlencoded'
				}
			})
			.success(function(response) {
				if(response.err||!response.isLogin){
					toastr.error("登录失败, " + response.errReason);
				}else{
					$scope.isLogin = true;
					$scope.user.name = response.name;
					$scope.user.isLoading = false;
				}
			})
			.error(function(response) {
				toastr.error("登录失败，网络连接不正常");
			});
		},function() {
			console.log('Login Cancelled');
		});
	}
}])

app.controller('ModalInstanceCtrl',['$scope', '$modalInstance','$sce', function ($scope, $modalInstance,$sce) {
	$scope.reset = function (email) {
		$modalInstance.close(email);
	};
	$scope.close = function() {
		$modalInstance.dismiss();
	}
	$scope.getUpdateDesc = function(text){
		return $sce.trustAsHtml(text);
	}
}]);

app.controller('LoginModalController',['$scope', '$modalInstance',function($scope, $modalInstance){
	$scope.login = function (user) {
		$modalInstance.close(user);
	};
	$scope.close = function() {
		$modalInstance.dismiss();
	}
}]);

app.service('Utils',['$rootScope',function($rootScope){
}]);