(function() {
    angular
        .module('userApp')
        .factory('userService', userService);

    function userService($http) {
        function getUsers() {
            return $http.get('/api/users');
        }

        function deleteUser(id) {
            return $http.delete('/api/users/' + id);
        }

        return {
            getUsers: getUsers,
            deleteUser: deleteUser
        }
    }
})();
