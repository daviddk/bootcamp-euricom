var express = require('express');
var _ = require('underscore');
var mongoose = require('mongoose');
var cfg = require('./config')
//var db = mongoose.createConnection(cfg.mongo.uri, cfg.mongo.db);

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

router.get('/:id', function(req, res, next) {
    var todo = _.findWhere(todos, {id: + req.params.id})
    if(!todo) {
        return res.send(404, "not found");
    }

    return res.send(todo);
});

router.put('/:id', function(req, res, next) {
    //console.log('body: ' + JSON.stringify(req.body));

    var todo = _.findWhere(todos, {id: Number(req.params.id)});
    var result = _.extend(todo, req.body);
    //console.log('todo:' + JSON.stringify(todo));
    //console.log('result: ' + JSON.stringify(result));

    res.status(201).send(result);
});

router.put('/toggleAll', function (req, res, next) {
    var toggle = req.body;

    _.each(todos, function(todo) {
        todo.completed = toggle.checked
    });

    return res.status(200).send(todos);
});

router.get('/', function(req, res, next) {
    res.send(todos);
});

//get title from body, create ID for it, save it to todos array
router.post('/', function(req, res, next) {
    var resource = {
        id: new Date().valueOf(),
        title: req.body.title,
        complete: false
    }
    todos.push(resource);
    res.status(201).send(resource);
});

router.delete('/:id', function(req, res, next) {
    var todo = _.findWhere(todos, { id: Number(req.params.id)});
    if(!todo) {
        return res.status(204);
    }

    todos = _.without(todos, todo);
    return res.status(200).send(todo);
});

module.exports = router;
