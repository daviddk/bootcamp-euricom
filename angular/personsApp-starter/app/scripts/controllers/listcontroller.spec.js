 describe('Test listcontroller and service', function() {

    beforeEach(module('app'));

    var people = [
        {
            id: 1,
            name: 'David Test',
            email: 'david@test.com',
            age: 26,
            birthDate: new Date(1988, 10, 3),
            married: false
        }
    ];

    var $httpBackend,ctrl;
    beforeEach(inject(function($controller, _$httpBackend_, personService) {
        $httpBackend = _$httpBackend_;
        ctrl = $controller('ListController', {
            personService: personService
        });
        //$httpBackend.flush();
    }));

    afterEach(function () {
        $httpBackend.verifyNoOutstandingExpectation();
        $httpBackend.verifyNoOutstandingRequest();
    });

    it('should place people on scope', function() {
        //arrange
        $httpBackend.whenGET("http://localhost:8080/api/persons").respond(people);
        $httpBackend.flush();
        //act

        //assert
        expect(ctrl.persons).to.be.a('array');
        expect(ctrl.persons).to.deep.equal(people);
    });

    it('should remove person from db', function() {
        $httpBackend.whenGET("http://localhost:8080/api/persons").respond(people);
        $httpBackend.whenDELETE("http://localhost:8080/api/persons/" + people[0].id).respond(people[0]);
        ctrl.removePerson(people[0]);
        $httpBackend.flush();

        expect(ctrl.persons.length).to.equal(0);
    });
});
