(function(angular) {
    'use strict';

    angular
        .module('userApp')
        .provider('userService', function() {

            var basePath;
            var pageSize;

            this.setBasePath = function(path, pageSize) {
                basePath = path;
                pageSize = pageSize;
            }

            this.$get = function($http) {
                function getUsers(page, sort) {
                    // /api/users?page=0&pageSize=20&sort=+age
                    return $http.get(basePath + '/users?pageSize=' + pageSize + '&page=' + page + '&sort=' + sort)
                        .then(function(response) {
                            return response.data
                        })
                }

                function deleteUser(user) {
                    return $http.delete('/api/users/' + user.id);
                }

                return {
                    getUser: getUsers,
                    deleteUser: deleteUser
                }
            }
        })
})(angular);
