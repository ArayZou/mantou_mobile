angular.module('mt_h5').controller('BackCtrl',function($scope,$window,$ionicHistory) {
    $scope.myGoBack = function() {
        if($ionicHistory.backView().url.indexOf('/mantou/index')>-1){
            $ionicHistory.nextViewOptions({
                disableBack: true,
                historyRoot: true
            });
        }
        $window.history.back();
    };
});