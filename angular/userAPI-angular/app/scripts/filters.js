(function(angular) {
    'use strict';

    angular.module('userApp')
        .filter('toUpper', function() {
            return function(input, upperBool) {
                if(upperBool) {
                    input = input.toUpperCase();
                }
                else {
                    input = input.toLowerCase();
                }
                return input;
            }
        })
        .filter('gmailFilter', function($log) {
            return function(input) {
                return _.filter(input, function(item) {
                    return (item.email.indexOf('gmail') !== -1);
                });
            }
        })

        //filter mails gmail
})(angular);
