(function(angular) {
    'use strict';

    angular.module('navApp', [
        //angular
        'ngRoute',

        //3rd party

        //app
        'app.controllers'
    ])
    .config(function($routeProvider){
        $routeProvider
            .when('/view1', {
                templateUrl: './view1.html',
                controller: 'view1Controller as vm'
            })
            .when('/view2/:userid?', {
                templateUrl: './view2.html',
                controller: 'view2Controller as vm'
            })
            .otherwise({
                redirectTo: '/'
            });
    });
})(angular);
