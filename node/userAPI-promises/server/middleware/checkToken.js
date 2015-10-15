var HttpError = require('../HttpError');
var jwt = require('jwt-simple');

module.exports = function checkToken() {
    return function validateToken(req, res, next) {
        var encToken = req.headers.accessToken;
        var decoded = jwt();
        next();
    }
}
