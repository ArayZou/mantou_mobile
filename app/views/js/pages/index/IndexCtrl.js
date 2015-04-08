angular.module('mt_h5').controller('IndexCtrl',function(
    $scope,
    $location,
    $window,
    UserService,
    AuthenticationService,
    $http,
    $state,
    $ionicActionSheet,
    $ionicHistory,
    $ionicTabsDelegate,
    $timeout
) {
    console.log('ctrl')
    var locationChangeInit = function(){
        var locationObj = $location.search();
        switch(locationObj.tab){
            case 'home':
                //console.log(1);
                $scope.tabsPage = 'home';
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(0);
                break;
            case 'group':
                //console.log(2);
                $scope.tabsPage = 'group';
                $scope.ifShowMoreGroup = true;
                $ionicTabsDelegate.select(1);
                $http({
                    method: 'POST',
                    url: 'http://localhost:3000/api/user/GetFollowGroups'
                }).success(function(data) {
                    console.log('group'+data);
                    $scope.followGroups = data.group;
                });
                break;
            case 'find':
                //console.log(3);
                $scope.tabsPage = 'find';
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(2);
                break;
            case 'message':
                //console.log(4);
                $scope.tabsPage = 'message';
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(3);
                break;
            case 'user':
                //console.log(5);
                $scope.tabsPage = 'user';
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(4);
                break;
            default:
                //console.log(1);
                $scope.tabsPage = 'home';
                $scope.ifShowMoreGroup = false;
                $ionicTabsDelegate.select(0);
                break;
        }
    };
    $timeout(function(){
        locationChangeInit();
    },1);
    $scope.$on('$locationChangeSuccess', function() {
        if(window.location.href.indexOf('/mantou/index')>-1){
            locationChangeInit();
        }
    });

    // group page
    $scope.showMoreGroup = function(){
        var actionShowMoreGroup = $ionicActionSheet.show({
            buttons: [
                { text: '关注新群组' },
                { text: '新建群组' }
            ],
            cancelText: '取消',
            cancel: function() {
            },
            buttonClicked: function(index) {
                switch(index){
                    case 0:
                        $window.location.href = '#/mantou/index?tab=find';
                        actionShowMoreGroup();
                        break;
                    case 1:
                        $state.go('creatgroup');
                        break
                }
            }
        });
    };

    // user page
    $scope.logout = function(){
        //if (AuthenticationService.isLogged) {
            AuthenticationService.isLogged = false;
            delete $window.localStorage.USER;

            $ionicHistory.nextViewOptions({
                disableAnimate: true,
                disableBack: true,
                historyRoot: true
            });
            $state.go("welcome");
        //}
    };
});