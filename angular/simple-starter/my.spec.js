var expect = chai.expect;

describe('Directive to test', function() {
    beforeEach(module('myApp'));

    var element;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        $scope.message = 'Hello';
        element = angular.element('<div eh-simple>{{message}}</div>');
        $compile(element)($scope);
        $rootScope.$digest();
    }));

    it('should equal "hello"', function() {
        console.log(element.prop('outerHTML'));
        expect(element.html()).to.equal('Hello');
    });
});

describe('ehTempl', function() {
    beforeEach(module('myApp'));
    beforeEach(module('ehTempl.tpl.html'));

    var element;
    beforeEach(inject(function($compile, $rootScope) {
        $scope = $rootScope;
        $scope.message = 'Hello';
        element = angular.element('<eh-templ>{{message}}</eh-templ>');
        $compile(element)($scope);
        $rootScope.$digest();
    }));

    it('should equal "hello"', function() {
        console.log(element.prop('outerHTML'));
        expect(element.find('div').text()).to.equal('-- Hey David --');
    });
})

// describe('module to test', function() {
//     //lange versie, deze laadt de angular-mock module in
//     //beforeEach(function() {
//     //   angular.mock.module('myApp');
//     //});

//     //dit is hetzelfde als de code hierboven maar korter
//     beforeEach(module('myApp'));

//     beforeEach(inject(function(_upperFilter_){
//         upperFilter = _upperFilter_;
//     }));

//     it('should make input uppercase', function() {
//         expect(upperFilter('hello')).to.equal('HELLO');
//     });

//     ////var $scope, $rootScope;
//     //beforeEach(inject(function(_$rootScope_) {
//     //    this.$rootScope = _$rootScope_;
//     //    this.$scope = this.$rootScope.$new();
//     //    this.$scope.name = 'test';
//     //    this.$rootScope.message = 'hello';
//     //}));
//     //
//     //it('should return true', function() {
//     //    expect(this.$scope.name).to.equal('test');
//     //});
//     //
//     //it('test', function() {
//     //    expect(this.$rootScope.message).to.equal('hello');
//     //})
// });

// describe('service', function() {

//     beforeEach(module('myApp'));

//     var customerService, $httpBackend;
//     beforeEach(inject(function(_customerService_, _$httpBackend_){
//         cusomerService = _customerService_;
//         $httpBackend = _$httpBackend_;
//     }));

//     it('should return customers', function() {
//         //arrange
//         var customers = [
//             { "name": "Dave Jones", "city": "Phoenix"},
//             { "name": "Jamie Riley", "city": "Atlanta"},
//             { "name": "Heedy Wahlin", "city": "Chandler"},
//             { "name": "Thomas Winter", "city": "Seattle"}
//         ];

//         $httpBackend.whenGET('data.json').respond(customers);

//         //act
//         customerService.getCustomers()
//             .then(function(customers) {
//                 expect(customers).to.be.a('array');
//                 expect(customers.length).to.equal(4);
//             });

//         //assert
//         $httpBackend.flush();
//     });
// });

// describe('test name', function() {

    // beforeEach(module('myApp'));

    // beforeEach(inject(function($controller, $rootScope, $location, $q) {
    //     $scope = $rootScope.$new();

    //     var customers = [
    //         { "name": "Dave Jones", "city": "Phoenix"},
    //         { "name": "Jamie Riley", "city": "Atlanta"},
    //         { "name": "Heedy Wahlin", "city": "Chandler"},
    //         { "name": "Thomas Winter", "city": "Seattle"}
    //     ]

    //     var stub = sinon.stub(customerService, getCustomers)
    //                     .returns($q.resolve(customers));

    //     var ctrl = $controller('MainController', {
    //         $scope: $scope,
    //         $location: $location
    //     }
    // });

    // it('should place message on scope', function() {
    //     expect($scope.message).to.equal('hello world');
    // });

    // it('should place customers on scope', function() {
    //     $scope.$digest();
    //     expect($scope.customers).to.be.a('array');
    //     expect($scope.customers.length).to.equal(4);
    // })

    // it('should place new customer on customer list', function() {
    //     // arrange
    //     $scope.newCustomer = {
    //         name: 'David',
    //         city: 'Antwerp'
    //     }

    //     // act
    //     $scope.addCustomer();

    //     // assert
    //     expect($scope.customers).to.be.a('array');
    //     expect($scope.customers.length).to.equal(1);
    // });
// });
