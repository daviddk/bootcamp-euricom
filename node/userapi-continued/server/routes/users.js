var express = require('express');
var router = express.Router();
var _ = require('underscore');
var User = require('../models/user');
var userMapper = require('../mappers/userMapper');

// GET /api/users?page=0&pageSize=20&sort=-age
router.get('/', function(req, res, next){
    var pageSize = req.query.pageSize || 100;
    var page = req.query.page || 0;

    // query db with paging and sorting
    User.find()
        .limit(pageSize)
        .skip(pageSize * page)
        .sort(req.query.sort)
        .exec(function(err, users){
            if(err){
                return res.status(500).send('Internal server error: ' + err);
            }

            // map users list to resource list
            var result = _.map(users, function(user){
                return userMapper.map(user);
            });

            // and respond with all users (as resource)
            return res.status(200).send(result);
        });
});

// GET /api/users/123
router.get('/:id', function(req, res, next){
    User.findOne({ _id: req.params.id }, function(err, user){
        if(err){
            return res.status(500).send('Internal server error: ' + err);
        }
        if(!user){
            return res.status(404).send('This user does not exists.');
        }

        // when found, return the user
        var resource = userMapper.map(user);
        return res.status(200).send(resource);
    });
});

// PUT /api/users/123
router.put('/:id', function(req, res, next){
    // validate request
    var resource = req.body;
    if(!resource.name || !resource.email){
        return res.status(400).send("Bad request");
    }

    // find user based on the id
    User.findOne({ _id: req.params.id}, function(err, user){
        if(err){
            return res.status(500).send('Internal server error: ' + err);
        }
        if(!user){
            return res.status(404).send('Resource not found!');
        }

        // when found, update it
        var names = resource.name.split(" ");
        user.firstName = names[0] ? names[0] user.firstName;
        user.lastName = names[1] ? names[0] user.lastName;
        user.age = resource.age ? resource.age : user.age;
        user.email = resource.email ? resource.email : user.email;
        user.homeAddress.addressLine = resource.address ? resource.address : user.homeAddress.addressLine;
        user.homeAddress.city = resource.city ? resource.city : user.homeAddress.city;
        user.homeAddress.zip = resource.zip ? resource.zip : user.homeAddress.zip;

        // and save to db
        user.save(function(err){
            if(err){
                return res.status(500).send('Internal server error: ' + err);
            }

            // respond with updated user model
            var resource = userMapper.map(user);
            res.status(200).send(resource);
        });
    });
});

// POST /api/users
router.post('/', function(req, res, next){
    // validate request
    var resource = req.body;
    if(!resource.name || !resource.email){
        return res.status(400).send("Bad request");
    }

    // create new user
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

    // save user to db
    user.save(function(err){
        if(err){
            return res.status(500).send('Internal server error: ' + err);
        }

        // respond with new created user model
        res.set('location', `http://localhost:3000/api/users/${user._id}`)
        var resource = userMapper.map(user);
        res.status(201).send(resource);
    });
});

// DELETE /api/users/12213
router.delete('/:id', function(req, res, next){
    // find user based on the id
    User.findOne({ _id: req.params.id }, function(err, user){
        if(err){
            return res.status(500).send('Internal server error: ' + err);
        }
        if(!user){
            return res.status(204).send('No content');
        }

        // when found, remove it
        user.remove(function(err){
            if(err){
                return res.status(500).send('Internal server error: ' + err);
            }
            var resource = userMapper.map(user);
            return res.status(200).send(resource);
        })
    });
});

module.exports = router;
