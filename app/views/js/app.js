// Ionic Starter App
angular.module('mt_h5', ['ionic', 'pasvaz.bindonce'])

    //.run(function($ionicPlatform) {
    //    $ionicPlatform.ready(function() {
    //        // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    //        // for form inputs)
    //        if (window.cordova && window.cordova.plugins.Keyboard) {
    //            cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
    //        }
    //        if (window.StatusBar) {
    //            // org.apache.cordova.statusbar required
    //            StatusBar.styleDefault();
    //        }
    //    });
    //})

    .config(function($stateProvider, $urlRouterProvider) {

        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        $stateProvider


            .state('index', {
                url: "/mantou/index",
                templateUrl: "views/js/pages/index/index.html",
                controller: 'IndexCtrl'
            })

            .state('creatgroup', {
                url: '/mantou/creatgroup',
                templateUrl: 'views/js/pages/creatgroup/creatgroup.html',
                controller: 'CreatGroupCtrl'
            })

            .state('welcome', {
                url: '/mantou/welcome',
                templateUrl: 'views/js/pages/welcome/welcome.html',
                controller: 'WelcomeCtrl'
            })

            .state('group', {
                url: '/mantou/group/:groupid',
                templateUrl: 'views/js/pages/group/group.html',
                controller: 'GroupCtrl'
            })

            // Each tab has its own nav history stack:

            //.state('mantou.home', {
            //    url: '/home',
            //    views: {
            //        'mantou-home': {
            //            templateUrl: 'views/js/pages/home/home.html',
            //            controller: 'HomeCtrl'
            //        }
            //    }
            //})
            //
            //.state('mantou.group', {
            //    url: '/group',
            //    views: {
            //        'mantou-group': {
            //            templateUrl: 'views/js/pages/group/group.html',
            //            controller: 'GroupCtrl'
            //        }
            //    }
            //})
            //.state('mantou.find', {
            //    url: '/find',
            //    views: {
            //        'mantou-find': {
            //            templateUrl: 'views/js/pages/find/find.html',
            //            controller: 'FindCtrl'
            //        }
            //    }
            //})
            //
            //.state('mantou.message', {
            //    url: '/message',
            //    views: {
            //        'mantou-message': {
            //            templateUrl: 'views/js/pages/message/message.html',
            //            controller: 'MessageCtrl'
            //        }
            //    }
            //})
            //
            //.state('mantou.user', {
            //    url: '/user',
            //    views: {
            //        'mantou-user': {
            //            templateUrl: 'views/js/pages/user/user.html',
            //            controller: 'UserCtrl'
            //        }
            //    }
            //})

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/mantou/index');


    })

    //.run(function($rootScope, $urlRouter,$state,AuthenticationService,$window) {
    //    $rootScope.$on('$locationChangeStart', function(evt) {
    //        if(!AuthenticationService.isLogged){
    //            evt.preventDefault();
    //            $window.location.href="#/mantou/welcome";
    //            $state.go("welcome");
    //        }
    //    });
    //});


