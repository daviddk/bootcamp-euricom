(function(angular) {
    'use strict';

    angular
        .module('tabsApp')
        .directive('tab', tabDirective)
        .controller('tabController', tabController);

    function tabDirective() {
        return {
            restrict: 'EA',
            require: ['^tabs', 'tab'],
            transclude: true,
            templateUrl: 'templates/tab.tpl.html',
            replace: true,
            controller: 'tabController',
            controllerAs: 'vm',
            scope: {
                title: '@'
            },
            link: function(scope, element, attrs, controllers) {
                //link stuff
                var tabsCtrl = controllers[0];
                var myCtrl = controllers[1];
                myCtrl.init(tabsCtrl);
            }
        }
    }

    tabController.$inject = ['$scope', '$element', '$attrs'];
    function tabController($scope, $element, $attrs) {
        var vm = this;
        vm.showTab = false;

        activate();

        function activate() {
        }

        this.title = function() {
            return $scope.title;
        }

        this.hide = function() {
            vm.showTab = false;
        }

        this.show = function() {
            vm.showTab = true;
        }

        this.init = function(tabsCtrl) {
            tabsCtrl.register(this);
        }
    }

})(angular);
