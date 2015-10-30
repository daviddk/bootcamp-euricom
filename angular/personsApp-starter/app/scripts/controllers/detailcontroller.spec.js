describe('Test detail controller', function() {

    beforeEach(module('app'));

    var person = {
        id: 1,
        name: 'David Test',
        email: 'david@test.com',
        age: 26,
        birthDate: new Date(1988, 10, 3),
        married: false
    };

    var $httpBackend, $routeParams, $location, personService;
    beforeEach(inject(function(_$routeParams_, _$location_, _$httpBackend_, personService) {
        $httpBackend = _$httpBackend_;
        controller = $controller('DetailController', {
            personService; personService
        });
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('Should return null if no params are submitted', function() {
        $httpBackend.whenGET("http://localhost:8080/api/persons").respond(400);
        expect(controller).to.throw(400);
    });

    it('Should return one user if params.id is 1', function() {
        $httpBackend.whenGET("http://localhost:8080/api/persons/" + people[0].id).respond(people[0]);
        $httpBackend.flush();
        expect(controller.person).to.deep.equal(person);
    });
});
