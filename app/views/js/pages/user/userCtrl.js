angular.module('mt_h5')

    .controller('UserCtrl', function($scope,AuthenticationService,$location,$window) {
        $scope.logout = function logout() {
            console.log(AuthenticationService.isLogged)
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $location.path("/welcome");
            }
        };
    });