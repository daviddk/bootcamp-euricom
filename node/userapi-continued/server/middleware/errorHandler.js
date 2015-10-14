var HTTPStatus = require('http-status');

module.exports = function errorHandler() {
    return function(err, req, res, next) {
        if(err.status) {
            var errorObject = {
                code: err.status,
                message: HTTPStatus[err.status],
                details: err
            }

            return res.status(err.status).send(errorObject);
        }

        return res.status(500).send({
                code: 500,
                message: 'internal server error',
                details: err
            });
    }
}
