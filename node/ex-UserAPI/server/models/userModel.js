var mongoose = require('mongoose');

var User = mongoose.model('User', {
    firstName: String,
    lastName: String,
    age: Number,
    email: String,
    homeAddress: {
        addressLine: String,
        city: String,
        zip: String
    }
});

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

module.exports = User;
