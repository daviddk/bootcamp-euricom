(function() {
	'use strict';

	angular
		.module("myApp")
		.controller("MainControllerAs", MainControllerAs);

	function MainControllerAs($location, customerService) {
	    var vm = this;
        vm.message = 'hello world';
        vm.customers = [];
        vm.addCustomer = addCustomer;

	    activate();

        //////

	    function activate() {
	        customerService.getCustomers()
                .then(function(customers) {
                   $scope.customers = customers;
                });
	    }

	    function addCustomer() {
			vm.customers.push( {
				name: vm.newCustomer.name,
				city: vm.newCustomer.city,
			});
            $location.path('/');
	    };
	};

})();
