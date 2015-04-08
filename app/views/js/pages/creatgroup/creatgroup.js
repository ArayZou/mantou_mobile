angular.module('mt_h5').controller('CreatGroupCtrl',function(
    $scope,
    $http,
    $ionicHistory,
    AuthenticationService,
    $state,
    MTCommonStorage
) {
    $scope.creatGroup = function(groupName,groupIntro){
        $http({
            method: 'POST',
            data: {
                groupName:groupName,
                groupIntro:groupIntro
            },
            url: 'http://localhost:3000/api/group/Creat'
        }).success(function(data) {
            console.log(data);
            if(data.status == 401){
                AuthenticationService.isLogged = false;

                $ionicHistory.nextViewOptions({
                    disableAnimate: true,
                    disableBack: true,
                    historyRoot: true
                });
                $state.go("welcome");
            }
        }).error(function(data){
            console.log('error')
        });
    }
});