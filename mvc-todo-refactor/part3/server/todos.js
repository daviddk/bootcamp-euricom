var express = require('express');
var _ = require('underscore');

var router = express.Router();

var todos = [
   {
       id : 1,
       title: "Feest met Joris",
       completed: false
   },
   {
       id : 2,
       title: "Wandelen met Babs",
       completed: false
   }
];

router.get('/todos/:id', function(req, res, next) {
    var todo = _.findWhere(todos, {id: + req.params.id})
    if(!todo) {
        return res.send(404, "not found");
    }

    return res.send(todo);
});

//put verder afwerken
router.put('/todos/:id', function(req, res, next) {
    var resource = req.body;

    var todo = _.findWhere(todos, {id: Number(req.params.id)});
    var result = _.extend(todo, res.data);
    console.log(result);
    res.status(201).send(result);
});

router.get('/todos', function(req, res, next) {
    res.send(todos);
});

//get title from body, create ID for it, save it to todos array
router.post('/todos', function(req, res, next) {
    var resource = {
        id: new Date().valueOf(),
        title: req.body.title,
        complete: false
    }
    todos.push(resource);
    res.status(201).send(resource);
});

router.delete('/todos/:id', function(req, res, next) {
    var todo = _.findWhere(todos, { id: Number(req.params.id)});
    if(!todo) {
        return res.status(204);
    }

    todos = _.without(todos, todo);
    return res.status(200).send(todo);
});

module.exports = router;
