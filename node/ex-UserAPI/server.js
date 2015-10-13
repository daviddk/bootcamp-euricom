var express = require('express');
var path = require('path');
var bodyParser = require('body-parser');
var logger = require('morgan');
var mongoose = require('mongoose');
var faker = require('faker');
var apiUsers = require('./routes/users.js');


var app = express();

//config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

//middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded(
    { extended: true }
));

//routes
app.use('/api/users', apiUsers);

//setup db
mongoose.connect('mongodb://localhost/userdemo');

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

//listen
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port: '
                    + server.address().port);
});
