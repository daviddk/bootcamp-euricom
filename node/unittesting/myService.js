var Q = require('q');

function MyService() {
    this.find = function(query, callback) {
        var deferred = Q.defer();
        setTimeout(function() {
            if (!query) {
                deferred.reject('bad value');
            }
            deferred.resolve('abc');
        }, 150);
        return deferred.promise;
    }
}
module.exports = new MyService()
