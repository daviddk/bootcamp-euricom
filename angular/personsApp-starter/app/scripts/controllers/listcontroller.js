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

        vm.removePerson = function (id) {
            personService.remove(id)
                .then(function(person){
                    vm.persons.splice(persons.indexOf(person), 1);
                });
        };
    };
})();
