(function() {
    'use strict';

    angular
        .module('userApp')
        .controller("userController", userController);

    function userController($scope, userService) {
        $scope.users = [];
        $scope.message = "User table";
        $scope.orderByField = 'name';
        $scope.reverseSort = false;

        userService.getUsers()
            .then(function(response) {
                if(!response) {
                    next("error");
                }
                $scope.users = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });

        $scope.deleteUser = function(user) {
            console.log('deleting', user.id);

            userService.deleteUser(user.id)
                .then(function(response) {
                    $scope.users = _.without($scope.users, user);
                })
        }
    }
})();

