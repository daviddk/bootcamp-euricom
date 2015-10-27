(function() {
	'use strict';

	angular.module('myApp', [])
        .directive('ehSimple', function() {
            return {
                link: function(scope, element) {
                    element.addClass('plain');
                }
            }
        })
        .directive('ehTempl', function() {
            return {
                templateUrl: 'ehTempl.tpl.html',
                controller: function($scope) {
                    $scope.message = "Hey David"
                }
            }
        })
        .directive('euAlert', function() {
            return {
                templateUrl: 'euAlert.tpl.html',
                replace: true,
                transclude: true,
                scope: {
                    type: '@'
                },
                link: function(scope, element) {
                    if(scope.type) {
                        element.addClass('alert-' + scope.type);
                    }
                    else {
                        element.addClass('alert-info');
                    }
                }
            }
        })
		.filter('upper', function() {
			return function(input) {
                return input.toUpperCase();
            }
		});
})();
