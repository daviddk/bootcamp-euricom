var _ = require('underscore');
var userModel = require('../models/user');
var HttpError = require('../httpError');
var userRepository = require('../data/userRepository');
var keygen = require("randomstring");
var sha256 = require('js-sha256');

module.exports = {
    create: function(req, res, next) {
        var keyItem = {
            name: req.body.name,
            key: null
        }
        userRepository.findOne({ _id: req.params.id })
            .then(function(user) {
                if (!user) next(new HttpError(404));
                keyItem.key = "userAPIkey" + keygen.generate(32);
                var apiKeyEnc = sha256(keyItem.key);

                //console.log(apiKey + " has been encrypted to:" + apiKeyEnc);

                user.apiKeys.push({
                    "name": keyItem.name,
                    "encryptedKey": apiKeyEnc
                });

                return userRepository.save(user);
             })
             .then(function(){
                res.status(201).send(keyItem);
              })
             .catch(function(err) {
                 next(err);
             })
    },
    delete: function(req, res, next) {
        var key;
        userRepository.findOne({ _id: req.params.id })
            .then(function(user) {
                if (!user) next(new HttpError(404));

                key = _.findWhere(user.apiKeys, {name: req.params.name})
                if (!key) next(new HttpError(204));

                user.apiKeys = _.without(user.apiKeys, key);

                return userRepository.save(user);
            })
            .then(function (user) {
               res.status(200).send({
                    name : key.name
               });
            })
            .catch(function() {
                next(err);
            });
    },
    findAll: function(req, res, next) {
        userRepository.findOne({ _id: req.params.id })
            .then(function(user) {
                if (!user) next(new HttpError(404));

                return res.status(200).send(user.apiKeys);
            })
            .catch(function() {
                next(err);
            });
    }
}
