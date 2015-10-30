// var expect = chai.expect;

// describe('test name', function() {

//     beforeEach(module('myApp'));

//     beforeEach(inject(function($controller, $rootScope, $location, $q) {
//         $scope = $rootScope.$new();

//         var customers = [
//             { "name": "Dave Jones", "city": "Phoenix"},
//             { "name": "Jamie Riley", "city": "Atlanta"},
//             { "name": "Heedy Wahlin", "city": "Chandler"},
//             { "name": "Thomas Winter", "city": "Seattle"}
//         ]

//         var stub = sinon.stub(customerService, getCustomers)
//                         .returns($q.resolve(customers));

//         var ctrl = $controller('MainController', {
//             $scope: $scope,
//             $location: $location
//         }
//     }));

//     it('should place message on scope', function() {
//         expect($scope.message).to.equal('hello world');
//     });

//     it('should place customers on scope', function() {
//         $scope.$digest();
//         expect($scope.customers).to.be.a('array');
//         expect($scope.customers.length).to.equal(4);
//     })

//     it('should place new customer on customer list', function() {
//         // arrange
//         $scope.newCustomer = {
//             name: 'David',
//             city: 'Antwerp'
//         }

//         // act
//         $scope.addCustomer();

//         // assert
//         expect($scope.customers).to.be.a('array');
//         expect($scope.customers.length).to.equal(1);
//     });
// });
