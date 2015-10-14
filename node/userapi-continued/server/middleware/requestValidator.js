var ins
var http
var _

module.exports = function validate(schema, custom) {
    return validateRequest function(req, res, next) {
        var resource = req.body;

        var schema = {
            type: 'object',
            properties: {
                name: {type: 'string', minLength: 10, optional: false },
                email: { type: 'string', pattern: 'email' },
            }
        };

        var result = inspector.validate(schema, resource);
        console.log(result);

        if(!result.valid) {
            console.log('error', result);
            var errors = _.map(result.error, function(error))
        }

        next();
    }
}