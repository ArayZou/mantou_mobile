angular.module('mt_h5').controller('CreatGroupCtrl',function($scope,$http) {
    $scope.creatGroup = function(groupname,groupManager,groupinfo){
        $http({
            method: 'POST',
            data: {
                name:groupname,
                password:groupManager
                groupinfo:groupinfo
            },
            url: 'http://localhost:3000/api/userSign'
        }).success(function(data) {
            console.log(data);
            $scope.filterResultDate = data;
        });
    }
});