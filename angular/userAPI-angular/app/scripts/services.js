(function() {
    angular
        .module('userApp')
        .factory('userService', userService);

    function userService($http) {
        var page = 10,
            pageSize = 5;

        function getUsers(page, sort) {
            // /api/users?page=0&pageSize=20&sort=+age
            return $http.get('/api/users?pageSize=10&page=' + page + '&sort=' + sort);
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
