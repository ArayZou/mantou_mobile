angular.module('mt_h5').controller('GroupCtrl', function(
    $scope,
    $http,
    $state,
    $ionicNavBarDelegate
) {
    var groupId = $state.params.groupid;
    // tabsInit
    $http({
        method: 'POST',
        url: 'http://localhost:3000/api/group/GetGroupIndex',
        data:{
            groupId : groupId
        }
    }).success(function(data) {
        if(data.status===200){
            console.log(data);
            $scope.thisGroup = data.group;
        }
    });
});