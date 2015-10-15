var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var userApi = require('./routes/users');
var authApi = require('./routes/auth');
var authorize = require('./middleware/authorize');
var globalErrorHandler = require('./middleware/globalErrorHandler');
var checkToken = require('./middleware/checkToken');
var cors = require('cors');
var mongoose = require('mongoose');
var mongooseq = require('mongoose-q')(require('mongoose'));
var cfg = require('./config');
var User = require('./models/user');
var dataGenerator = require('./config/dataGenerator');

// app setup
var app = express();
//middleware to check if a token exists and if its valid, save validToken in req
app.use(checkToken());
app.use(cors());
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());

//setup db
mongoose.connect('mongodb://localhost/demo');
User.findOne(null, function(err, user){
    if(!user){
        // create inital data
        dataGenerator.fillDb();
    }
});

// middleware
// app.use(authorize('12345'));

// routes
app.use('/api/users', userApi);
app.use('/api/auth', authApi);

// middleware - error handlers
app.use(globalErrorHandler());

// listen for incomming request
var server = app.listen(cfg.port, function(){
    console.log('Express server listening on port ' + server.address().port);
});
