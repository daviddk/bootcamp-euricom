var config = require('./config');
var express = require('express');
var path = require('path');
var logger = require('morgan');
var bodyParser = require("body-parser");
var todos = require('./todos.js');
var cors = require('cors');

var app = express();

//config
//app.set('port', process.env.PORT || 8080);

app.use(cors());
app.use(logger('dev'));
app.use(express.static(path.join(__dirname, "public")));
app.use(bodyParser.urlencoded(
    { extended: true }
));
app.use(bodyParser.json());

// routes
app.use('/api/todos', todos);

// listening
var server = app.listen(config.port, function() {
  console.log('Express server listening on port: '
                    + server.address().port);
});
