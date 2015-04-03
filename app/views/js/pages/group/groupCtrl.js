angular.module('mt_h5').controller('GroupCtrl', function(
    $scope,
    $location,
    $ionicNavBarDelegate,
    $ionicTabsDelegate,
    indexTabsInit,
    $timeout,
    $ionicActionSheet,
    $ionicHistory,
    $state
) {
    console.log('group')
    // tabsInit

    $scope.jump = function(page){
        $ionicHistory.nextViewOptions({
            disableAnimate: true,
            disableBack: true
        });

        switch (page) {
            case 'home':
                console.log(1);
                $ionicNavBarDelegate.title('home');
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(0);
                break;
            case 'group':
                console.log(2);
                $ionicNavBarDelegate.title('group');
                $scope.ifShowMoreGroup = true;
                $ionicTabsDelegate.select(1);
                break;
            case 'find':
                console.log(3);
                $ionicNavBarDelegate.title('find');
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(2);
                break;
            case 'message':
                console.log(4);
                $ionicNavBarDelegate.title('message');
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(3);
                break;
            case 'user':
                console.log(5);
                $ionicNavBarDelegate.title('user');
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(4);
                break;
            default:
                console.log(1);
                $ionicNavBarDelegate.title('home');
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(0);
                break;
        }

        $state.go(page);

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