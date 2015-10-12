'use strict';
var _ = require('underscore');

class Todos {
    constructor() {
        this.todoList = [
            {
              "id": "318ad3ba-3f85-4ea6-9259-2bf5df7921a8",
              "title": "todotest1",
              "completed": false
            },
            {
              "id": "a812c70c-9fce-4c2a-a544-f3157fd57bd1",
              "title": "todotest2",
              "completed": false
            }
        ];
    }

    getList() {
        return this.todoList;
    }

    get(id) {
        var singleTodo = _.find(this.todoList, function(todo) {
            return todo.id == id;
        });
        return singleTodo;
    }

    uuid() {
        var i, random;
        var uuid = '';

        for (i = 0; i < 32; i++) {
            random = Math.random() * 16 | 0;
            if (i === 8 || i === 12 || i === 16 || i === 20) {
                uuid += '-';
            }
            uuid += (i === 12 ? 4 : (i === 16 ? (random & 3 | 8) : random)).toString(16);
        }

        return uuid;
    }

    add(obj) {
        this.todoList.push(obj);
    }


    put(obj) {
        return obj;
    }

    remove(obj) {
        this.todoList = _.without(this.todoList, obj);

        return this.todoList;
    }
}

var todos = new Todos();
module.exports = todos;

