(function(angular) {
    'use strict';
    angular.module('userApp', [
            'controllers',
            'ui.router',
            'ui.bootstrap',
            'ngResource',
            'ngSanitize',
            'toaster',
            'ngRoute'
        ])
        .constant('CONFIG', {
            urlBase: '/api',
            timeout: 5000,
            pageSize: 10
        })
        // Angular UI Router
        .config(function($stateProvider, $urlRouterProvider) {
            $stateProvider
                .state('alert', {
                    url: '/alert',
                    templateUrl: '../alert.html',
                    controller: 'userController',
                    controllerAs: 'vm',
                    resolve: {
                        users: function(userService) {
                            return userService.getUsers();
                        }
                    }

                })
                .state('list', {
                    url: '/list',
                    templateUrl: '../list.html',
                    controller: 'userController',
                    controllerAs: 'vm',
                    resolve: {
                        users: function(userService) {
                            return userService.getUsers();
                        }
                    }
                })
                .state('add', {
                    url: '/add',
                    templateUrl: '../edit.html',
                    controller: 'editUser',
                    controllerAs: 'vm'
                })
                .state('edit', {
                    url: '/edit/:userid?',
                    templateUrl: '../edit.html',
                    controller: 'editUser',
                    controllerAs: 'vm'
                });

            $urlRouterProvider.otherwise("list");
        })
        // Angular default router
        // .config(function($routeProvider, $locationProvider){
        //     $routeProvider
        //         .when('/alert', {
        //             templateUrl: '/alert.html',
        //             controller: 'userController as vm'
        //         })
        //         .when('/add', {
        //             templateUrl: '/edit.html',
        //             controller: 'editUser as vm'
        //         })
        //         .when('/edit/:userid', {
        //             templateUrl: '/edit.html',
        //             controller: 'editUser as vm'
        //         })
        //         .when('/list', {
        //             templateUrl: 'list.html',
        //             controller: 'userController as vm',
        //             resolve: {
        //                 users: function(userService) {
        //                     return userService.getUsers();
        //                 }
        //             }
        //         })
        //         .otherwise({
        //             redirectTo: '/list',
        //         });
        //     $locationProvider.html5Mode(true);
        // })
        // .config(function(userServiceProvider) {
        //     userServiceProvider.setBasePath('api/', 20);
        // })
        .factory('_', function($window) {
            return $window._;
        })
        .factory('logInterceptor', function logInterceptor($q, toaster) {
            return {
                request: function(request) {
                    //toaster.pop('success', "Request succesful", "request to " + request.url + " was succesful");
                    return $q.when(request);
                }
            };
        })
        .factory('errorInterceptor', function logInterceptor($q, toaster) {
            return {
                responseError: function(rejection) {
                    //toaster.pop('error', "Request unsuccesfull", "request to " + rejection.url + " was unsuccesfull");
                    return $q.reject(rejection);
                }
            };
        })
        .config(function($httpProvider) {
            $httpProvider.interceptors.push('logInterceptor');
            $httpProvider.interceptors.push('errorInterceptor');
        });
})(angular);
