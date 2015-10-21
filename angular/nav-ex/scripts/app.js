(function(angular) {
    'use strict';

    angular.module('navApp', [
        //angular
        'ngRoute',

        //3rd party
        'ui.router',

        //app
        'app.controllers'
    ])
    .config(function($stateProvider, $urlRouterProvider) {
        $stateProvider
            .state('view1', {
                url: '/view1',
                templateUrl: './view1.html',
                controller: 'view1Controller',
                controllerAs: 'vm'
            })
            .state('view2', {
                url: '/view2/:userid?',
                templateUrl: './view2.html',
                controller: 'view2Controller',
                controllerAs: 'vm'
            });

        $urlRouterProvider.otherwise("view1");
    })
    .run(function($rootScope, $log) {
        $rootScope.$on('$stateChangeError',
            function(event, toState, toParams, fromState, fromParams, error) {
                $log.error('route error', error);
            });
    });
    // .config(function($routeProvider){
    //     $routeProvider
    //         .when('/view1', {
    //             templateUrl: './view1.html',
    //             controller: 'view1Controller as vm'
    //         })
    //         .when('/view2/:userid?', {
    //             templateUrl: './view2.html',
    //             controller: 'view2Controller as vm'
    //         })
    //         .otherwise({
    //             redirectTo: '/'
    //         });
    // })
    // .run(function($rootScope, $log){
    //     $rootScope.$on('$routeChangeStart', function(next, current) {
    //         $log.info('route change start', next, current);
    //     });
    //     $rootScope.$on('$routeChangeSuccess', function(current, previous) {
    //         $log.info('route changed succesfully', current, previous);
    //     });
    //     $rootScope.$on('$routeChangeError', function(current, previous) {
    //         $log.error('route change error', current, previous);
    //     });
    // });
})(angular);
