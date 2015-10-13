var express = require('express');
var _ = require('underscore');
var router = express.Router();

//mongo DB constructor
// var User = mongoose.model('User', {
//     firstName: String,
//     lastName: String,
//     age: Number,
//     email: String,
//     homeAddress: {
//         addressLine: String,
//         city: String,
//         zip: String
//     }
// });

// // create some dummy data
// var user = new User({
//     firstName: 'David',
//     lastName: 'De Keersmaecker',
//     age: 26,
//     email: 'david.dekeersmaecker@euri.com',
//     homeAddress: {
//         addressLine: 'Kapelstraat 28',
//         city: 'Hulshout',
//         zip: 'B2235'
//     }
// })

// // save that dummy data
// user.save(function(err){
//     if(err) {
//         return console.log('failed');
//     }
//     console.log('saved');
// });

router.get('/', function(req, res, next) {
     User.find(function(err, users) {
        if(err) {
            return console.log(err);
        }
        res.status(200).send(users);
     });
});

router.get('/:id', function(req, res, next) {
    User.findOne({_id: req.params.id}, function(err, user) {
        if(!user) {
            return res.status(404).send('user not found');
        }
        res.status(200).send(user);
    });
});

