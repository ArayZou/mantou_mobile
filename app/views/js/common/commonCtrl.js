angular.module('mt_h5').controller('CommonCtrl',function(
    $scope,
    MTCommonStorage,
    AuthenticationService
) {
    console.log('AuthenticationService.isLogged:'+AuthenticationService.isLogged)
    //console.log('CommonCtrl');
    if(MTCommonStorage.GetLocalStorage('USER')){
        $scope.USER = MTCommonStorage.GetLocalStorage('USER');
    }
});