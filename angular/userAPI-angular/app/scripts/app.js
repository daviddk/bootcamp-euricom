(function(angular) {
    'use strict';
    angular.module('userApp', [
            'controllers',
            'ui.bootstrap',
            'ngResource',
            'toaster'
        ])
        .constant('CONFIG', {
            urlBase: '/api',
            timeout: 5000,
            pageSize: 10
        })
        // .config(function(userServiceProvider) {
        //     userServiceProvider.setBasePath('api/', 20);
        // })
        .factory('_', function($window) {
            return $window._;
        })
        .factory('logInterceptor', function logInterceptor($q, toaster) {
            return {
                request: function(request) {
                    toaster.pop('success', "Request succesful", "request to " + request.url + " was succesful");
                    return $q.when(request);
                }
            };
        })
        .factory('errorInterceptor', function logInterceptor($q, toaster) {
            return {
                responseError: function(rejection) {
                    toaster.pop('error', "Request unsuccesfull", "request to " + rejection.url + " was unsuccesfull");
                    return $q.reject(rejection);
                }
            };
        })
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('logInterceptor');
            $httpProvider.interceptors.push('errorInterceptor');
        });



})(angular);
