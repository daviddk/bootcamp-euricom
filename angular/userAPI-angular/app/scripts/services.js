(function(angular) {
    'use strict';

    angular
        .module('userApp')
        .service('userService', userService);

    function userService($http, CONFIG, $resource) {

        var User = $resource('sdapi/users/:id', {id: '@id'});

        this.getUser = function(id) {
            return User.get(id).$promise
                .then(function(user) {
                    return user;
                })
        }

        this.getUsers = function(page, sort) {
            return User.query().$promise
                .then(function(users) {
                    return users;
                });
            // /api/users?page=0&pageSize=20&sort=+age
            // return $http.get(CONFIG.urlBase + '/users?pageSize=' + CONFIG.pageSize + '&page=' + page + '&sort=' + sort)
            //             .then(function(response) {
            //                 return response.data
            //             })
        }

        this.deleteUser = function(user) {
            return User.remove(user).$promise;
            //return $http.delete('/api/users/' + user.id);
        }
    }

    // ALS KLASSE; werkt nog niet
    // class UserService {
    //     constructor($http) {
    //         this.http = $http;
    //     }

    //     getUsers(page, pageSize) {
    //         return this.http.get('/api/users?pageSize=10&page=' + page + '&sort=' + sort)
    //                     .then(function(response) {
    //                         return response.data
    //                     })
    //     }

    //     deleteUser(user) {
    //         return this.http.delete('/api/users/' + user.id);
    //     }
    // }
})(angular);
