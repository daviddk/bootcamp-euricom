(function(angular) {
    'use strict';

    angular
        .module('controllers', [])
        .controller("userController", userController)
        .controller("editUser", editUser);

    function editUser($stateParams, $log, $scope, userService) {
        var vm = this;
        vm.submit = submit;
        vm.user = {};

        vm.message = "Adding new user"
        if($stateParams.userid) {
            activate();
            vm.message = "Edit user: " + $stateParams.userid;
        }

        function activate() {
            userService.getUser($stateParams.userid)
                .then(function(user) {
                    vm.user = user;
                })
        }

        function submit(valid) {
            if(!valid)
                return;

            $scope.myForm.submitting = true;
            $log.info(vm.user.name);
            $log.info(vm.user.age)

            userService.saveUser(vm.user)
                .then(function(user){
                    vm.user = user;
                });
        }

    }

    function userController(_, $interval, $log, $filter, users) {
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
        vm.text = "Test: <script>window.alert('hello')</script>";

        activate();
        //countDown();

        function activate() {
            vm.users = users;
            // var gmailFilter = $filter('gmailFilter');
            // userService.getUsers(vm.page, vm.sort)
            //     .then(function(users) {
            //         if(!users) {
            //             next("error");
            //         }
            //         var filteredUsers = gmailFilter(users);
            //         vm.users = filteredUsers;
            //     })
            //     .catch(function(err) {
            //         console.log(err);
            //     });
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

