angular.module('mt_h5').factory('AuthenticationService', function($window,MTCommonStorage) {
    var auth = {
        isLogged: false
    };

    var userStorage = MTCommonStorage.GetLocalStorage('USER');
    if (userStorage && userStorage.Token) {
        auth.isLogged = true;
    }

    return auth;
});

angular.module('mt_h5').factory('UserService', function($http) {
    return {
        logIn: function(username, password) {
            return $http.post('http://localhost:3000/api/user/Login', {username: username, password: password});
        },

        logOut: function() {

        }
    }
});

angular.module('mt_h5').factory('TokenInterceptor', function ($q, $window,MTCommonStorage) {
    return {
        request: function (config) {
            config.headers = config.headers || {};
            var userStorage = MTCommonStorage.GetLocalStorage('USER');
            if (userStorage && userStorage.Token) {
                config.headers.Authorization = 'Bearer ' + userStorage.Token;
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
