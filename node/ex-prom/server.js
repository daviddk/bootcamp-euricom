var Q = require('q');

function find(query, callback) {
    setTimeout(function() {
        if (!query) {
           return callback("bad value");
        }
        callback(null, "abc")
    }, 2000);
}

function findQ(query, callback) {
    var deferred = Q.defer();
    setTimeout(function() {
        if (!query) {
           return deferred.reject("bad value");
        }
        deferred.resolve("abc")
    }, 2000);

    return deferred.promise;
}

find("test1", function(err, result) {
    if(err) {
        console.log('error 1: ' + err);
    }
    else {
        console.log('ok: 1' + result);

        find("test2", function(err, result) {
            if(err) {
                console.log('error: 2' + err);
            }
            else {
                console.log('ok: 2' + result);
                find("test3", function(err, result) {
                    if(err) {
                        console.log('error: 3' + err);
                    }
                    else {
                        console.log('ok: 3' + result);
                    }
                });
            }
        });
    }
});

findQ('query1')
    .then(function(result) {
        console.log('ok q: ' + result);
        return findQ(null);
    })
    .then(function(result) {
        console.log('ok q 2: ' + result);
        return findQ('query3');
    })
    .then(function(result) {
        console.log('ok q 3: ' + result);
    })
    .catch(function(err) {
        console.log('error: ' + err);
    });
