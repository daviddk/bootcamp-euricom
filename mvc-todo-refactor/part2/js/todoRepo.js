import {util} from './';

class TodoRepo {
    constructor() {
        this.todos = util.store('todos-jquery');
    }

    add(item) {
        this.todos.push({
            id: util.uuid(),
            title: item,
            completed: false
        });
    }

    remove(index) {
        this.todos.splice(index, 1);
    }

    get(id) {
        return this.todos[id];
    }

    getList(filter) {
        if(filter === 'completed') {
            return this.todos.filter(function (todo) {
                return todo.completed;
            });
        }
        if(filter === 'active') {
            return this.todos.filter(function (todo) {
                return !todo.completed;
            });
        }
        return this.todos;
    }

    store() {
        return util.store('todos-jquery', this.todos);
    }

    toggleAll(isChecked) {
        todos.forEach(function (todo) {
            todo.completed = isChecked;
        });
    }
}

var todoRepo = new TodoRepo();

export{todoRepo};

// var todoRepo = (function () {
//     'use strict';

//     var todos = [];

//     function init() {
//         todos = util.store('todos-jquery');
//     }

//     function add(item) {
//         todos.push({
//             id: util.uuid(),
//             title: item,
//             completed: false
//         });
//     }

//     function remove(index) {
//         todos.splice(index, 1);
//     }

//     function arrayObjectIndexOf(array, term, property) {
//         for(var i = 0, len = array.length; i < len; i++) {
//             if (array[i][property] === term) return i;
//         }
//         return -1;
//     }

//     function get(id) {
//         return todos[id];
//         //return arrayObjectIndexOf(todos, id, "id");
//     }

//     function getList(filter) {
//         if(filter === 'completed') {
//             return todos.filter(function (todo) {
//                 return todo.completed;
//             });
//         }
//         if(filter === 'active') {
//             return todos.filter(function (todo) {
//                 return !todo.completed;
//             });
//         }
//         return todos;
//     }

//     function store() {
//         return util.store('todos-jquery', todos);
//     }

//     function toggleAll(isChecked) {
//         todos.forEach(function (todo) {
//             todo.completed = isChecked;
//         });
//     }

//     return {
//         init: init,
//         add: add,
//         remove: remove,
//         get: get,
//         getList: getList,
//         store: store,
//         toggleAll: toggleAll
//     }
// })();
