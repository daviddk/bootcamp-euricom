(function() {
	'use strict';

	angular.module('myApp', [])
		.filter('upper', function() {
			return function(input) {
                return input.toUpperCase();
            }
		});
})();
