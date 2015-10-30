(function(angular) {
    'use strict';

    angular
        .module('tabsApp')
        .directive('tabs', tabsDirective)
        .controller('tabsController', tabsController);

    function tabsDirective() {
        return {
            restrict: 'EA',
            transclude: true,
            templateUrl: 'templates/tabs.tpl.html',
            replace: true,
            controller: 'tabsController',
            controllerAs: 'vm'
            //I WANT MY TABS
        }
    }

    tabsController.$inject = ['$scope', '$element', '$attrs'];
    function tabsController($scope, $element, $attrs) {
        var vm = this;
        vm.tabs = [];
        vm.tabActivated = tabActivated;

        activate();

        function activate() {
        }

        function tabActivated(tab) {
            //hide all tabs
            vm.tabs.forEach(function(tmpTab) {
                if(tab === tmpTab) {
                    //console.log('showing active tab');
                    tab.show();
                }
                else {
                    tmpTab.hide();
                }
            });
        }

        this.register = function(tab) {

            if(vm.tabs.length === 0) {
                tab.show();
            }

            vm.tabs.push(tab);
        }


        //populate link list with tabs
    }

})(angular);
