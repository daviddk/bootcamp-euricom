var expect = chai.expect;

describe('module to test', function() {
    //lange versie, deze laadt de angular-mock module in
    //beforeEach(function() {
    //   angular.mock.module('app');
    //});

    //dit is hetzelfde als de code hierboven maar korter
    beforeEach(module('myApp'));

    beforeEach(inject(function(_upperFilter_){
        upperFilter = _upperFilter_;
    }));

    it('should make input uppercase', function() {
        expect(upperFilter('hello')).to.equal('HELLO');
    });

    ////var $scope, $rootScope;
    //beforeEach(inject(function(_$rootScope_) {
    //    this.$rootScope = _$rootScope_;
    //    this.$scope = this.$rootScope.$new();
    //    this.$scope.name = 'test';
    //    this.$rootScope.message = 'hello';
    //}));
    //
    //it('should return true', function() {
    //    expect(this.$scope.name).to.equal('test');
    //});
    //
    //it('test', function() {
    //    expect(this.$rootScope.message).to.equal('hello');
    //})
});