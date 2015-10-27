(function(angular) {
    'use strict'

    angular
        .module('app')
        .filter('dateFormat', function() {
            return function(input) {
                if (!input)
                   return input;

               if(!angular.isDate(input) && !angular.isString(input))
                   return input;

               var momentDate = moment(input);

               if(!momentDate.isValid())
                   return input;

               return momentDate.format('DD-MM-YYYY');
            }
        });

})(angular);
