var express = require('express');
var _ = require('underscore');

var router = express.Router();

var todos = [
       {
           id : 1,
           task: "1234",
           state: "1234"
       },
       {
           id : 2,
           task: "1234",
           state: "1234"
       }
   ];

router.get('/todos', function(req, res, next) {

    // return all resource
    res.send(todos);
});

router.get('/todos/:id', function(req, res, next) {

    // find todo
    var todo = _.findWhere(todos, { id: +req.params.id})
    if (!todo) {
        return res.send(404, "not found");
    }

    // return resource
    return res.send(todo);
});

router.post('/todos', function(req, res, next) {
    // Get resource
    var resource = req.body;

    // Assign number
    resource.id = new Date().valueOf();

    // Add to todo's
    todos.push(resource)

    // return resource
    res.status(200).send(resource);
});

router.put('/todos/:id', function(req, res, next) {
    // Get resource
    var resource = req.body;

    // Find and update
    var todo = _.findWhere(todos, { id: Number(req.params.id)})
    if (!todo) {
        return res.send(404, "not found");
    }

    todo.task = resource.task;
    todo.state = resource.state;
    return res.status(200).send(todo);
});

router.delete('/todos/:id', function(req, res, next) {
    var todo = _.findWhere(todos, { id: Number(req.params.id)})
    if (!todo) {
        return res.status(204);
    }

    todos = _.without(todos, todo);
    return res.status(200).send(todo);

});

module.exports = router;
