angular.module('mt_h5').controller('CommonCtrl',function(
    $scope,
    MTCommonStorage,
    AuthenticationService
) {
    console.log('AuthenticationService.isLogged:'+AuthenticationService.isLogged)
});