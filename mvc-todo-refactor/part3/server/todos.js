var express = require('express');
var _ = require('underscore');

var router = express.Router();

var todos = [
   {
       id : 1,
       title: "Feest met Joris",
       complete: false
   },
   {
       id : 2,
       title: "Wandelen met Babs",
       complete: false
   }
];

router.get('/todos/:id', function(req, res, next) {
    console.log(req.params.id);
    var todo = _.findWhere(todos, {id: + req.params.id})
    if(!todo) {
        return res.send(404, "not found");
    }

    return res.send(todo);
});

//put verder afwerken
router.put('/todos/:id', function(req, res, next) {
    var resource = {
    }
})

router.get('/todos', function(req, res, next) {
    res.send(todos);
});

//get title from body, create ID for it, save it to todos array
router.post('/todos', function(req, res, next) {
    console.log(req.body);
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
