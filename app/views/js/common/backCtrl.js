angular.module('mt_h5').controller('BackCtrl',function($scope,$window) {
    $scope.myGoBack = function() {
        $window.history.back();
    };
});