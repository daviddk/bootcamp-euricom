(function() {
    'use strict';

    angular
        .module('app')
        .service('personService', personService);

    function personService($http, $q) {
        var baseUrl = 'http://localhost:8080/api';

        this.get = function() {
            return $http.get(baseUrl + '/persons')
                .then(function (response) {
                    var persons = response.data;
                    return persons.map(function(person) {
                        person.birthDate = new Date(person.birthDate);
                        return person;
                    })
                });
        }

        this.getOne = function(id) {
            return $http.get(baseUrl + '/persons/' + id)
                .then(function (response) {
                    var person = response.data;
                    person.birthDate = new Date(person.birthDate);
                    return person;
                });
        }

        this.save = function(person) {
            if(person.id){
                return update(person);
            }
            return insert(person);
        }

        this.remove = function(person) {
            return $http.delete(baseUrl + '/persons/' + person.id)
                .then(function success(reponse) {
                    return reponse.data;
                });
        }

        // private function
        function insert(person) {
            return $http.post(baseUrl + '/persons', person)
                .then(function success(response) {
                    return response.data;
                });
        }

        function update(person) {
            return $http.put(baseUrl + '/persons/' + person.id, person)
                .then(function success(response) {
                    return response.data;
                });
        }

    }

})();
