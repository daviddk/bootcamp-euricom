var express = require('express');
var router = express.Router();
var _ = require('underscore');
var User = require('../models/user');
var userMapper = require('../mappers/userMapper');
var inspector = require('schema-inspector');
var Q = require('q');

var repository = {
    findOne: function(query) {
        var deferred = Q.defer();

        User.findOne(query, function(err, user) {
            if(err) deferred.resolve(null);
            else deferred.resolve(user);
        });

        return deferred.promise;
    },
    findAll: function(pageSize, page, sort) {
        var deferred = Q.defer();

        User.find()
            .limit(pageSize)
            .skip(pageSize * page)
            .sort(sort)
            .exec(function(err, users) {
                if(err) deferred.resolve(null);
                else deferred.resolve(users);
            });

        return deferred.promise;
    },
    remove: function(model) {
        var deferred = Q.defer();

        model.remove(function(err) {
            if(err) deferred.reject(err);
            else deferred.resolve();
        });

        return deferred.promise;
    },
    save: function(model) {
        var deferred = Q.defer();

        model.save(function(err) {
            if(err) deferred.reject(err);
            else deferred.resolve();
        });

        return deferred.promise;
    }
}

// GET /api/users?page=0&pageSize=20&sort=-age
router.get('/', function(req, res, next){
    //console.log(req.user.username);
    var pageSize = req.query.pageSize || 100;
    var page = req.query.page || 0;
    var sort = req.query.sort;

    // query db with paging and sorting
    repository.findAll(pageSize, page, sort)
        .then(function(users) {
            var result = _.map(users, function(user){
                return userMapper.map(user);
            });

            return res.status(200).send(result);
        })
        .catch(function() {
            next(err);
        });
});

// GET /api/users/123
router.get('/:id', function(req, res, next){
    repository.findOne({_id: req.params.id})
        .then(function(user) {
            if(!user) return next(error(404));
            res.status(200).send(userMapper.map(user));
        })
        .catch(function(err){
            next(err);
        });
});

// PUT /api/users/123
router.put('/:id', function(req, res, next){
    // validate request
    var resource = req.body;
    var updatedUser;

    repository.findOne({ _id: req.params.id})
        .then(function(user) {
            if(!user) return next(error(404));

            var names = resource.name.split(" ");
            user.firstName = names[0] ? names[0] : user.firstName;
            user.lastName = names[1] ? names[1] : user.lastName;
            user.age = resource.age ? resource.age : user.age;
            user.email = resource.email ? resource.email : user.email;
            user.homeAddress.addressLine = resource.address ? resource.address : user.homeAddress.addressLine;
            user.homeAddress.city = resource.city ? resource.city : user.homeAddress.city;
            user.homeAddress.zip = resource.zip ? resource.zip : user.homeAddress.zip;

            updatedUser = user;
            console.log(updatedUser);
            return repository.save(user);
        })
        .then(function(){
            var resource = userMapper.map(updatedUser);
            res.status(200).send(resource);
        })
        .catch(function(err) {
            return next(err);
        });
});


router.post('/', /*validator(userSchema),*/ function(req, res, next){
    var resource = req.body;
    var names = resource.name.split(" ");
    var user = new User({
        firstName: names[0],
        lastName: names[1],
        age: resource.age,
        email: resource.email,
        homeAddress: {
                addressLine: resource.address,
                city: resource.city,
                zip: resource.zip
            }
        });

    repository.save(user)
        .then(function() {
            res.set('location', `http://localhost:3000/api/users/${user._id}`);
            var resource = userMapper.map(user);
            res.status(201).send(resource);
        })
        .catch(function(err) {
            return next(err);
        });
});

// DELETE /api/users/12213
router.delete('/:id', function(req, res, next){
    repository.findOne({_id: req.params.id})
        .then(function(user) {
            if(!user) return next(error(404));
            return repository.remove(user);
        })
        .then(function(user) {
            var resource = userMapper.map(user);
            return res.status(200).send(resource);
        })
        .catch(function(err){
            next(err);
        });

    //User.findOne({ _id: req.params.id }, function(err, user){
    //    if(err){
    //        return res.status(500).send('Internal server error: ' + err);
    //    }
    //    if(!user){
    //        return res.status(204).send('No content');
    //    }
    //
    //    // when found, remove it
    //    user.remove(function(err){
    //        if(err){
    //            return res.status(500).send('Internal server error: ' + err);
    //        }
    //        var resource = userMapper.map(user);
    //        return res.status(200).send(resource);
    //    })
    //});
});

function error(status) {
    var error = new Error('an error occured');
    error.status = status;
    return error;
}

module.exports = router;
