var express = require('express');
var cors = require('cors');
var bodyParser = require('body-parser');
var _ = require('underscore');

// setup server
var app = express();

app.use(cors());
app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());

var persons = [{
    id: 1,
    name: 'Foo Bar',
    email: 'foo.bar@baz.com',
    age: 26,
    birthDate: new Date(1988, 9, 13),
    married: false
}];

// 'GET api/persons' - get all persons
app.get('/api/persons', function(req, res, next) {
    res.send(persons);
});

// 'GET api/persons/:id' - get one todo
app.get('/api/persons/:id', function(req, res, next) {
    var todo = _.findWhere(persons, { id: Number(req.params.id)});

    if (todo) {
        return res.send(todo);
    }

    res.status(404).send('Not found');
});

// 'POST api/persons' - create a new todo
app.post('/api/persons', function(req, res, next) {

    var resource = req.body;

    // simulate error
    if (resource.name.indexOf('bad') > -1) {
        return res.status(400).send('bad request');
    };

    resource.id = new Date().valueOf();
    persons.push(resource);
    res.status(200).send(resource);
});

// 'PUT api/persons' - update a existing todo
app.put('/api/persons/:id', function(req, res, next) {

    var resource = req.body;

    // simulate error
    if (resource.name.indexOf('bad') > -1) {
        return res.status(400).send('bad request');
    };

    var person = _.findWhere(persons, { id: Number(req.params.id)});
    if (person) {
        person.name = resource.name;
        person.email = resource.email;
        person.age = resource.age;
        person.birthDate = resource.birthDate;
        person.married = resource.married;
        return res.status(200).send(person);
    }

    res.status(404).send('not found');
});

// 'DELETE api/persons/:id' - delete a todo
app.delete('/api/persons/:id', function(req, res, next) {
    var person = _.findWhere(persons, { id: Number(req.params.id)});
    persons = _.without(persons, person);
    res.status(200).send(person);
});

// static content to host out angular app
app.use(express.static(__dirname + '/app'));

// Start server
var server = app.listen(8080, 'localhost', function () {
    console.log('Express server listening on %d, in %s mode', 8080, 'localhost');
});
