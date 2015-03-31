angular.module('mt_h5')

    .controller('UserCtrl', function($scope,AuthenticationService,$state,$window) {
        $scope.logout = function logout() {
            console.log(AuthenticationService.isLogged)
            if (AuthenticationService.isLogged) {
                AuthenticationService.isLogged = false;
                delete $window.sessionStorage.token;
                $state.go("welcome.welcome",{},{
                    location :'replace',
                    inherit : true,
                    notify : true,
                    reload: true
                });
            }
        };
    });