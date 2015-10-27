(function() {
    'use strict';

    angular
        .module('app')
        .controller('ListController', ListController);

    function ListController(personService) {
        var vm = this;

        // persons are retrieved by controller via service
        personService.get()
            .then(function(persons) {
                vm.persons = persons;
            });

        vm.removePerson = function (person) {
            personService.remove(person)
                .then(function(person){
                    vm.persons.splice(vm.persons.indexOf(person), 1);
                });
        };
    };
})();
