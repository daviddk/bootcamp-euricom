(function(angular) {
    'use strict';

    angular
        .module('directiveApp')
        .directive('myDirective', init)
        .controller('myDirectiveController', myDirectiveController);

    function init() {
        return {
            restrict: 'EA',
            // transclude: true,
            // template: function(element, attrs) {
            //     console.log(attrs.href);
            //     if(attrs.href) {
            //         var link = attrs.href;
            //         return '<a ng-transclude></a>';
            //     }
            //     return '<button ng-transclude></button>'
            // },
            templateUrl: 'templates/mydirective.html',
            replace: false,
            // link: function(scope, element, attrs, controller) {
            //     element.text("hello");
            //     controller.callMe();
            // },
            scope: {
                boundfn: '&'
            },
            controller: 'myDirectiveController',
            controllerAs: 'vm'
        }
    }

    myDirectiveController.$inject = ['$scope', '$element', '$attrs'];
    function myDirectiveController($scope, $element, $attrs) {
        var vm = this;
        vm.doThis = doThis;

        vm.message = "hello world";

        activate();

        this.callMe = function() {
            console.log('callme');
        }

        function activate() {
            console.log($element);
            console.log($attrs.myAttr);
        }

        function doThis() {
            console.log("doing this");
            $scope.boundfn();
        }
    }

})(angular);
