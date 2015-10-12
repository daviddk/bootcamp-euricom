var express = require('express');
var app = express();

app.get('/', function(req, res, next) {
    res.send('Hello, David.');
});

var server = app.listen(3000, function() {
    console.log('Express server listening on port 3000');
});
