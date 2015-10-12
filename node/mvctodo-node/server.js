var express = require('express');
var morgan = require('morgan');
var path = require('path')
var bodyParser = require('body-parser');
var _ = require('underscore');
var todos = require('./app/scripts/app.js');

var app = express();

console.log(todos.getList());

app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(bodyParser.json());
app.use(morgan('dev'));

app.use(express.static(path.join(__dirname, 'app')));

app.get('/api/todos', function(req, res, next) {
    res.send(todos.getList());
});

app.get('/api/todos/:id', function(req, res, next) {
    res.send(todos.get(req.params.id));
});

app.post('/api/todos', function(req, res, next) {
    var todo = {
        id: todos.uuid(),
        title: req.body.title,
        completed: req.body.completed
    };
    todos.add(todo);
    res.send(todo);
});

/*app.put('/api/todos/:id', function(req, res, next) {
    console.log(req.param.id);
    console.log(req.body);
    res.send({id: 12, name: 'david'});
});*/

app.delete('/api/todos/:id', function(req, res, next) {
    console.log(req.params.id);
    var todo = todos.get(req.params.id);
    console.log(todo);
    todos.remove(todo);
    res.send(todo);
});

var port = process.env.PORT || 3000;

var server = app.listen(port, function() {
    console.log('Express server listening on port: ' + server.address().port);
});
