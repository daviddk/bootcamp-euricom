var chai = require('chai');
var sinon = require('sinon');
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
var expect = chai.expect;

var calc = require('./calc');

describe('calc', function() {
    it('test', function() {
        var spy = sinon.spy(console, 'log');
        calc.add(1,2);
        expect(spy).to.have.been.calledWith(3);
    });

    it('test', function() {
        var stub = sinon.stub(repository, 'getUser').returns({id: 12, name: '333'});
        var result = repository.getUser();
        expect(result).to.deep.equal({id: 12, name: '333'});
    });
});

