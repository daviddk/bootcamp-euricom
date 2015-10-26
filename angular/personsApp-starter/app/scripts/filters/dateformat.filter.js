(function(angular) {
    'use strict'

    angular
        .module('app')
        .filter('dateFormat', function() {
            return function(input) {
                return moment(input).format('DD-MM-YYYY');
            }
        });

})(angular);
