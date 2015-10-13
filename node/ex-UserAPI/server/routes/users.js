var express = require('express');
var _ = require('underscore');
var router = express.Router();
var bodyParser = require('body-parser');
var mongoose = require('mongoose');
var User = require('../models/userModel.js');
var userMapper = require('../mappers/userMapper.js');

router.get('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if(!user) {
            return res.status(404).send('user not found');
        }

        res.status(200).send(userMapper.map(user));
    });
});

router.get('/', function(req, res, next) {
     User.find(function(err, users) {
        if(err) {
            return console.log(err);
        }

        var result = _.map(users, function(user) {
            return userMapper.map(user)
        });

        res.status(200).send(result);
     });
});

router.delete('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if(!user) {
            return res.status(204).send('no content');
        }
        user.remove(function(err) {
            if(err) {
                return res.status(500).send('failed to remove resource:' + err);
            }
            res.status(200).send(userMapper.map(user));
        });
    });
});

router.post('/', function(req, res, next) {

    if(req.body.name || req.body.email) {
        return res.status(400).send('no name or email provided');
    }

    var name = req.body.name.split(" ");
    var user = new User({
        firstName: name[0],
        lastName: name[1],
        age: req.body.age,
        email: req.body.email,
        homeAddress: {
            addressLine: req.body.address,
            city: req.body.city,
            zip: req.body.zip
        }
    });

    user.save(function(err) {
        res.status(201).send(userMapper.map(user));
    });
});

router.put('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {

        var name = req.body.name.split(" ");
        var tempUser = User({
            firstName: name[0],
            lastName: name[1],
            age: req.body.age,
            email: req.body.email,
            homeAddress: {
                addressLine: req.body.address,
                city: req.body.city,
                zip: req.body.zip
            }
        });

        var result = _.extend(user, tempUser);

        result.update({_id: req.params.id}, function(err) {
            res.status(201).send(userMapper.map(result));
        });
    });
});

module.exports = router;

