angular.module('mt_h5').controller('HomeCtrl', function(
    $scope,
    $location,
    $ionicNavBarDelegate,
    $ionicTabsDelegate,
    indexTabsInit,
    $ionicHistory,
    $state,
    $timeout
){
    console.log('home')
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
});
