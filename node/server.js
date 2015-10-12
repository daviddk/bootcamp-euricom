var express = require('express');
var path = require('path')
var app = express();

app.use(express.static(path.join(__dirname, 'public')));

app.get('/sub', function(req, res, next) {
    res.send('Hello, David. How are you doing?');
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    console.log('Express server listening on port: ' + server.address().port);
});
