angular.module('mt_h5').controller('GroupCtrl', function(
    $scope,
    $http,
    $state,
    $ionicActionSheet,
    $ionicPopover
) {
    var groupId = $state.params.groupid;

    $http({
        method: 'POST',
        url: 'http://localhost:3000/api/group/GetGroupIndex',
        data:{
            groupId : groupId
        }
    }).success(function(data) {
        if(data.status===200) {
            console.log(data);
            $scope.thisGroup = data.group;
            actionSheetInit(data.ifFollower);
        }
    });

    //右上角more按钮
    var actionSheetInit = function(ifFollow){
        var actionButton = [];
        if (ifFollow) {
            actionButton = [
                {text: '取消关注'}
            ];
        } else {
            actionButton = [
                {text: '关注'}
            ];
        }
        // group page
        $scope.showMoreGroup = function(){
            var ShowGroupIndexAction = $ionicActionSheet.show({
                buttons: actionButton,
                cancelText: '取消',
                cancel: function() {
                },
                buttonClicked: function(index) {
                    switch(index){
                        case 0:
                            if(ifFollow){
                                actionSheetInit(false);
                                console.log('取消关注')
                            }else{
                                actionSheetInit(true);
                                console.log('关注')
                            }
                            ShowGroupIndexAction();
                        //actionShowMoreGroup
                    }
                }
            });
        };
    };

    //写文章view
    //$ionicPopover.fromTemplateUrl('my-popover.html', {
    //    scope: $scope
    //}).then(function(popover) {
    //    $scope.popover = popover;
    //});
    //
    //$scope.openPopover = function($event) {
    //    $scope.popover.show($event);
    //};
});