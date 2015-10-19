(function() {
    'use strict';

    angular
        .module('userApp')
        .controller("userController", userController);

    function userController(userService) {
        var vm = this;
        vm.users = [];
        vm.message = "User table";
        vm.orderByField = 'name';
        vm.reverseSort = false;
        vm.page = 1;
        vm.sort = 'name';

        activate();

        function activate() {
            userService.getUsers(vm.page, vm.sort)
                .then(function(response) {
                    if(!response) {
                        next("error");
                    }
                    vm.users = response.data;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

        vm.deleteUser = function(user) {
            console.log('deleting', user.id);

            userService.deleteUser(user.id)
                .then(function(response) {
                    vm.users = _.without(vm.users, user);
                })
        }

        vm.loadMore = function() {
            vm.page += 1;
            userService.getUsers(vm.page, vm.sort)
                .then(function (response) {
                    console.log(response.data);
                    vm.users.push(response.data);
                })
                .catch(function(err) {
                });
        }

        // vm.deleteUser = function(user) {
        //     console.log('deleting', user.id);

        //     userService.deleteUser(user.id)
        //         .then(function(response) {
        //             vm.users = _.without(vm.users, user);
        //         })
        // }
    }
})();

