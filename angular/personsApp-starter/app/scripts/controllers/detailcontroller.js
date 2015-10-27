(function() {
    'use strict';

    angular
        .module('app')
        .controller('DetailController', DetailController);

    function DetailController($routeParams, $location, personService) {
        var vm = this;
        vm.person = {};
        vm.submitForm = submitForm;

        activate();

        /////////

        function activate() {
            if (!$routeParams.id) {
                return;
            }

            personService.getOne($routeParams.id)
                .then(function(person) {
                    vm.person = person;
                });
        }

        function submitForm(valid){
            if (!valid)
                return;

            vm.errorMessage = null;
            self.submitting = true;

            personService.save(vm.person)
                .then(function() {
                    $location.path('/list');
                })
                .catch(function(err) {
                    console.log(err);
                    vm.errorMessage = "Failed to submit: " + err.data;
                })
                .finally(function() {
                    self.submitting = false;
                });
            };
    }
})();
