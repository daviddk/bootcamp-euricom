var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var userApi = require('./routes/users');
var cors = require('cors');
var mongoose = require('mongoose');
var cfg = require('./config');
var User = require('./models/user');
var dataGenerator = require('./config/dataGenerator');
var auth = require('./middleware/auth');
var errorHandler = require('./middleware/errorHandler');

// app setup
var app = express();

var password = '12345';

//app.use(auth(password));

app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//setup db
mongoose.connect('mongodb://localhost/demo');

User.collection.count(function(err, count) {
    if(!err && count === 0){
        dataGenerator.fillDb();
    }
});

// routes
app.use('/api/users', userApi);

app.use(errorHandler());

// listen for incomming request
var server = app.listen(cfg.port, function() {
    console.log('Express server listening on port ' + server.address().port);
});
