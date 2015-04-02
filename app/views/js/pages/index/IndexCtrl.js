angular.module('mt_h5').controller('IndexCtrl',function($scope, $location, $window, UserService, AuthenticationService,$http,$state,$ionicActionSheet) {
    $scope.logout = function logout() {
        console.log(AuthenticationService.isLogged)
        if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.sessionStorage.token;
            $state.go("welcome");
        }
    };

    $scope.showMoreGroup = function(){
        // Show the action sheet
        var hideSheet = $ionicActionSheet.show({
            buttons: [
                { text: '关注新群组' },
                { text: '新建群组' }
            ],
            cancelText: '取消',
            cancel: function() {
                // add cancel code..
            },
            buttonClicked: function(index) {
                switch(index){
                    case 0:
                        $state.go('mantou.find');
                        break;
                    case 1:
                        $state.go('creatgroup');
                        break
                }
            }
        });
    }
});