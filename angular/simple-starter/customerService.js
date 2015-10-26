(function() {
	"use strict"

	angular
		.module("myApp")
		.factory("customerService", customerService);

	function customerService($http) {
		return {
    		getCustomers: getCustomers,
            postCustomers:  postCustomers
        };

        function getCustomers() {
            return $http.get("data.json")
				.then(function(response) {
					return response.data;
				});
        };

        function postCustomers() {
            // noop
        }
	};

})();
