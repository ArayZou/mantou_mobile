angular.module('mt_h5').controller('WelcomeCtrl',function($scope, $location, $window, UserService, AuthenticationService,$http,$state,$ionicPopup,$ionicHistory) {
    console.log(AuthenticationService.isLogged)
    // 注册
    $scope.SignIn = function SignIn(username, password) {
        if(username && password){
            $http({
                method: 'POST',
                data: {
                    name:username,
                    password:password
                },
                url: 'http://localhost:3000/api/user/Sign'
            }).success(function(data) {
                console.log(data);
                $scope.filterResultDate = data;
            });
        }
    };
    // 登陆
    $scope.logIn = function logIn(username, password) {
        if (username !== undefined && password !== undefined) {

            UserService.logIn(username, password).success(function(data) {
                console.log(data)
                if(data.status == 200){
                    AuthenticationService.isLogged = true;
                    var userStorage = {
                        Value:data.user
                    }
                    $window.localStorage.setItem("USER", angular.toJson(userStorage));
                    console.log($window.localStorage.USER);
                    $ionicHistory.nextViewOptions({
                        disableAnimate: true,
                        disableBack: true,
                        historyRoot: true
                    });
                    $state.go("index");
                }else{
                    $ionicPopup.alert({
                        title: '登陆失败'
                    });
                }
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
    };

});