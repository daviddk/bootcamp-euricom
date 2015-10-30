var expect = chai.expect;

describe('Alert test', function() {
    beforeEach(module('myApp'));
    beforeEach(module('euAlert.tpl.html'));

    var element, $compile;
    beforeEach(inject(function(_$compile_, $rootScope) {
        $scope = $rootScope;
        $compile = _$compile_;
    }));

    it('should render content', function() {
        var element = createElement('<eu-alert>ok</eu-alert');
        console.log(element.prop('outerHTML'));
        expect(element.find('span').text()).to.equal('ok');
    });

    it('should render warning', function() {
        var element = createElement('<eu-alert type="warning"></eu-alert');
        console.log(element.prop('outerHTML'));
        expect(element).to.have.class('alert-warning');
    });

    function createElement(string) {
        var element = angular.element(string);
        $compile(element)($scope);
        $scope.$digest();
        return element;
    }
});
