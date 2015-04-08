angular.module('mt_h5').controller('WelcomeCtrl',function(
    $scope,
    $location,
    $window,
    $http,
    $state,
    $ionicPopup,
    $ionicHistory,
    MTCommonStorage,
    UserService,
    AuthenticationService) {

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
                    MTCommonStorage.SetLocalStorage('USER',data.user,'7d');
                    console.log(MTCommonStorage.GetLocalStorage('USER'));
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