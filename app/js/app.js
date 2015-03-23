// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.services' is found in services.js
// 'starter.controllers' is found in controllers.js
angular.module('mt_h5', ['ionic','pasvaz.bindonce'])

    //.run(function ($ionicPlatform) {
    //    $ionicPlatform.ready(function () {
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

    .config(function ($stateProvider, $urlRouterProvider) {
        // Ionic uses AngularUI Router which uses the concept of states
        // Learn more here: https://github.com/angular-ui/ui-router
        // Set up the various states which the app can be in.
        // Each state's controller can be found in controllers.js
        $stateProvider

            // setup an abstract state for the tabs directive
            .state('mantou', {
                url: "/mantou",
                abstract: true,
                templateUrl: "js/pages/mantou.html"
            })

            // Each tab has its own nav history stack:

            .state('mantou.home', {
                url: '/home',
                templateUrl: 'js/pages/home/home.html',
                controller: function($scope){
                    console.log($scope)
                }
            })

            .state('mantou.group', {
                url: '/group',
                templateUrl: 'js/pages/group/group.html',
                controller: 'GroupCtrl'
            })
            .state('mantou.find', {
                url: '/find',
                templateUrl: 'js/pages/find/find.html',
                controller: 'FindCtrl'
            })

            .state('mantou.message', {
                url: '/message',
                templateUrl: 'js/pages/message/message.html',
                controller: 'MessageCtrl'
            })

            .state('mantou.me', {
                url: '/me',
                templateUrl: 'js/pages/me/me.html',
                controller: 'MeCtrl'
            });

        // if none of the above states are matched, use this as the fallback
        $urlRouterProvider.otherwise('/mantou/home');

    });
