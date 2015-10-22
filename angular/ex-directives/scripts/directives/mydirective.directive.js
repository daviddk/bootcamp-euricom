(function(angular) {
    'use strict';

    angular
        .module('directiveApp')
        .directive('myDirective', init)
        .controller('myDirectiveController', myDirectiveController);

    function init() {
        return {
            restrict: 'EA',
            transclude: true,
            template: function(element, attrs) {
                console.log(attrs.href);
                if(attrs.href) {
                    var link = attrs.href;
                    return '<a ng-transclude></a>';
                }
                return '<button ng-transclude></button>'
            },
            //templateUrl: 'templates/mydirective.html',
            replace: true,
            controller: 'myDirectiveController',
            controllerAs: 'vm'
        }
    }

    myDirectiveController.$inject = ['$scope', '$element', '$attrs'];
    function myDirectiveController($scope, $element, $attrs) {
        var vm = this;

        vm.message = "hello world";

        activate();

        function activate() {
            console.log($element);
            console.log($attrs.myAttr);
        }
    }

})(angular);
