var chai = require('chai');
var sinon = require('sinon');
chai.use(require('chai-as-promised'));
chai.use(require('sinon-chai'));
var expect = chai.expect;

var mailSystem = require('./mailSystem.js');
var smtpTransport = require('./smtpTransport.js');

describe('sendWelcomeMail', function() {
    // var sandbox;
    // beforeEach(function () {
    //     sandbox = sinon.sandbox.create();
    //     sandbox.stub(smtpTransport, 'send').yields();
    // });
    // afterEach(function () {
    //     sandbox.restore();
    // });

    it('should test our email arguments', function() {
        var spy = sinon.stub(smtpTransport, "send");
        //test properties from email
        mailSystem.sendWelcomeMail("testto", "testsub", {name: 'testname'});

        expect(spy).to.have.been.called;
        var mail = spy.args[0][0];
        expect(mail.toAddress).to.equal("testto");
        expect(mail.subject).to.equal("testsub");
        expect(mail.body).to.contain("testname");
    });

    it('should catch our error', function() {
        // var spy = sinon.stub(smtpTransport, "send");
        // mailSystem.sendWelcomeMail("", "testsub", {name: 'testname'});
        // expect(spy).to.throw(new Error('to is required'));

        mailSystem.init('info@euri.com');

        expect(function() {
            mailSystem.sendWelcomeMail('',
            'Welcome to...',
            { name: 'peter'})
        }).to.throw(Error);
    });
})



