angular.module('mt_h5').controller('WelcomeCtrl',function($scope, $location, $window, UserService, AuthenticationService,$http,$state) {
    console.log(AuthenticationService.isLogged)
    // ×¢²á
    $scope.SignIn = function SignIn(username, password) {
        if(username && password){
            $http({
                method: 'POST',
                data: {
                    name:username,
                    password:password
                },
                url: 'http://localhost:3000/api/userSign'
            }).success(function(data) {
                console.log(data);
                $scope.filterResultDate = data;
            });
        }
    };
    // µÇÂ½
    $scope.logIn = function logIn(username, password) {
        if (username !== undefined && password !== undefined) {

            UserService.logIn(username, password).success(function(data) {
                if(data.status == 200){
                    AuthenticationService.isLogged = true;
                    $window.sessionStorage.token = data.token;
                    console.log($window.sessionStorage.token)
                    $state.go("mantou.home");
                }else{
                    $window.alert('ÃÜÂë´íÎó');
                }
            }).error(function(status, data) {
                console.log(status);
                console.log(data);
            });
        }
    };

});