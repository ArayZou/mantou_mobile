angular.module('mt_h5')

    .controller('GroupCtrl', function($scope,$ionicActionSheet,$state) {
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