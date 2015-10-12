var express = require('express');
var morgan = require('morgan');
var path = require('path')
var bodyParser = require('body-parser');

var app = express();

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'public')));

app.get('/api/users', function(req, res, next) {
    var users = [
        {
            id: 12, name: "david"
        },
        {
            id: 13, name: "annelien"
        },
        {
            id: 13, name: "babs"
        }
    ]
    res.send(users);
});

app.get('/api/users/:id', function(req, res, next) {
    console.log(req.params.id);
    var users = [
        {
            id: 12, name: "david"
        },
        {
            id: 13, name: "annelien"
        },
        {
            id: 13, name: "babs"
        }
    ]
    res.send(users);
});

app.post('/api/users', function(req, res, next) {
    var user = req.body;
    user.id = 222;
    res.send(user);
});

app.put('/api/users/:id', function(req, res, next) {
    console.log(req.param.id);
    console.log(req.body);
    res.send({id: 12, name: 'david'});
});

app.delete('/api/users/:id', function(req, res, next) {
    console.log(req.param.id);
    console.log(req.body);
    res.send({id: 12, name: 'david'});
});

app.get('/api/products', function(req, res, next) {
    res.send('Hello, David. Here are our products');
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    console.log('Express server listening on port: ' + server.address().port);
});
