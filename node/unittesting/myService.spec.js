var chai = require('chai');
var expect = chai.expect;
var myService = require('./myService');
var Q = require('q');
chai.use(require('chai-as-promised'));

describe('myService', function() {
    it('test', function(done) {
        var promise = myService.find('query');

        expect(promise)
            .to.eventually.equal('abc')
            .notify(done);

        // oplossing ZONDER chai as promised:
        // myService.find('query')
        //     .then(function(data) {
        //         expect(data).to.equal('abc');
        //         done();
        //     })
        //     .catch(function(err) {
        //         done(err);
        //     });
    });

    it('should fail when query is empty', function(done) {
        myService.find('')
            .then(function(data) {
                done('no succes');
            })
            .catch(function(err) {
                if(err != 'bad value') {
                    done('invalid error');
                }
                else {
                    done();
                }
            });
    });
});
