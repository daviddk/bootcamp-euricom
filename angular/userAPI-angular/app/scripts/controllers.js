(function(angular) {
    'use strict';

    angular
        .module('controllers', [])
        .controller("userController", userController);

    function userController(userService, _, $interval, $log) {
        var vm = this;
        vm.users = [];
        vm.message = "User table";
        vm.orderByField = 'name';
        vm.reverseSort = false;
        vm.page = 1;
        vm.sort = '';
        vm.alert = "Apollo has been launched succesfully.";
        vm.showAlerts = false;
        vm.counter = "Waiting for launch codes...";
        vm.countDown = countDown;

        activate();
        //countDown();

        function activate() {
            userService.getUsers(vm.page, vm.sort)
                .then(function(users) {
                    if(!users) {
                        next("error");
                    }
                    vm.users = users;
                })
                .catch(function(err) {
                    console.log(err);
                });
        }

        function countDown() {
            vm.counter = 10;
            $interval(function() {
                vm.counter--;
                if(vm.counter == 0) {
                    vm.showAlert();
                }
            }, 1000, vm.counter);
        }

        vm.showAlert = function() {
            vm.showAlerts = !vm.showAlerts;
        }

        vm.deleteUser = function(user) {
            console.log('deleting', user.id);

            userService.deleteUser(user)
                .then(function(deletedUser) {
                    vm.users = _.without(vm.users, user);
                })
        }

        vm.loadMore = function() {
            vm.page += 1;
            userService.getUsers(vm.page, vm.sort)
                .then(function (users) {
                    console.log(users);
                    vm.users = vm.users.concat(users);
                    //vm.users = response.data;
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
})(angular);

