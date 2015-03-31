angular.module('mt_h5').factory('AuthenticationService', function() {
    var auth = {
        isLogged: false
    }

    return auth;
});

angular.module('mt_h5').factory('UserService', function($http) {
    return {
        logIn: function(username, password) {
            return $http.post('http://localhost:3000/api/userLogin', {username: username, password: password});
        },

        logOut: function() {

        }
    }
});

angular.module('mt_h5').factory('TokenInterceptor', function ($q, $window, AuthenticationService) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            if ($window.sessionStorage.token) {
                config.headers.Authorization = 'Bearer ' + $window.sessionStorage.token;
            }
            return config;
        },

        response: function (response) {
            return response || $q.when(response);
        }
    };
});

angular.module('mt_h5').config(function ($httpProvider) {
    $httpProvider.interceptors.push('TokenInterceptor');
});
