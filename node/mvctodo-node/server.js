var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require("body-parser");
var apiTest = require('./routes/test')
var apiTodos = require('./routes/todos')

// create app
var app = express();

// config
app.set('port', process.env.PORT || 3000);
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'hbs');

// middleware
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded(
    { extended: true }
));
app.use(bodyParser.json());

// routes
app.use('/api', apiTest);
app.use('/api', apiTodos);

// sample view route
app.get('/demo', function(req, res, next) {
    res.render('index', { name: 'peter'});
});

// listening
var server = app.listen(app.get('port'), function() {
  console.log('Express server listening on port: '
                    + server.address().port);
});
