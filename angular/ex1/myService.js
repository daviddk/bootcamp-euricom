(function() {
    angular
        .module('myApp')
        .factory('myService', myService);

    function myService($http) {
        var customers = [
            {name: 'David', city: 'Hulshout'},
            {name: 'Joris', city: 'Schoten'},
            {name: 'Seeger', city: 'Heist op den Berg'},
        ];

        function getCustomers() {
            return $http.get('customers.json');
            // return customers;
        }

        return {
            getCustomers: getCustomers
        }
    }
})();
