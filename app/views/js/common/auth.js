angular.module('mt_h5').factory('AuthenticationService', function($window) {
    var auth = {
        isLogged: false
    };

    if ($window.sessionStorage.token) {
        auth.isLogged = true;
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

angular.module('mt_h5').factory('TokenInterceptor', function ($q, $window) {
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
