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

        $scope.deleteUser = function(id) {
            console.log('deleting', id);

            userService.deleteUser(id)
                .then(function(response) {
                    console.log(response);
                    scope.$apply();
                })
        }
    }
})();

