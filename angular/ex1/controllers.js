(function() {
    'use strict';

    // old syntax
    // var app = angular.module('myApp');
    // app.controller("MyController", function($scope) {
    //     $scope.quantity = 100;
    //     $scope.cost = 10;
    // });

    // betere notatie
    angular
        .module('myApp')
        .controller("MyController", myController);

    function myController($scope, myService) {
        $scope.quantity = 100;
        $scope.cost = 10;
        $scope.message = "hello angular";
        $scope.showMessage = true;
        myService.getCustomers()
            .then(function(response) {
                if(!response) {
                    next("error");
                }
                $scope.customers = response.data;
            })
            .catch(function(err) {
                console.log(err);
            });
        //$scope.customers = myService.getCustomers();
        $scope.computeMessage = function() {
            $scope.message = "hello " + $scope.quantity;
        }
        $scope.addCustomer = function() {
            $scope.customers.push({
                name: $scope.name,
                city: $scope.city
            });
        }

        $scope.toggle = function() {
            $scope.showMessage = !$scope.showMessage;
            $scope.showAlert = !$scope.showAlert;
        }

        $scope.messageStyle = {
            "background-color": "red",
            "font-size": "2em"
        }
    }
})();

