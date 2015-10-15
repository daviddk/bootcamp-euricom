// #Authenticate key API
// {
//   "name": "davids key",
//   "key": "userAPIkeyA8lud4TNFPsCnUyd7eT8NVzXpyg5IFr3"
// }

// POST /api/auth/authenticate
// {
//     apiKey: 'api12874623786473826483146936'
// }

// response:

// {
//     accessToken: '3847847837483787589437578439758943789578349758943759830'
//     type: 'bearer'
// }

var _ = require('underscore');
var userModel = require('../models/user');
var HttpError = require('../httpError');
var userRepository = require('../data/userRepository');
var sha256 = require('js-sha256');
var jwt = require('jwt-simple');

module.exports = {
    authenticate: function(req, res, next) {
        //get Api Key from body
        var apiKeyEnc = sha256(req.body.apiKey);

        //find encrypted key in db and return user for this key
        userRepository.findOne({'apiKeys.encryptedKey': apiKeyEnc})
            .then(function(user){
                //if APIkey is found return a token
                var tokenPayload = {
                    "sub": 12242344,
                    "iat": 1232312,
                    "iis": "euri:bootcamp",
                    "name": `${user.firstName} ${user.lastName}`,
                    "userId": user._id
                }
                var secret = "thisisasecret123"

                var token = jwt.encode(tokenPayload, secret);
                return res.status(200).send({
                    "accessToken": token,
                    "tokenType": "bearer"
                });
            })
            .catch(function(err){
                next(err);
            });
    }
}
