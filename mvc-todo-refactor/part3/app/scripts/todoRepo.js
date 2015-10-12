var TodoRepo = (function() {
    'use strict'

    // private const
    const STORE_KEY = 'todos-jquery';

    class TodoRepo {

        constructor() {
            this.todos = util.store(STORE_KEY);
        }

        add(item){
            var todo = {
                id: util.uuid(),
                title: item,
                completed: false
            };
            this.todos.push(todo);
            return todo;
        }

        remove(id){
            // this.todos = _.reject(this.todos, function(todo) {
            //     return todo.id === id;
            // });
            this.todos = _.reject(this.todos, todo => todo.id === id);
        }

        get(id){
            return _.find(this.todos, todo => todo.id === id);
        }


        getList(callback) {
            $.get('http://localhost:8080/api/todos', function(data) {
                callback(data);
            });
        }

        addAjax(title, callback) {
            var newObj = {
                title: title,
                complete: false
            };
            $.post('http://localhost:8080/api/todos', newObj, function(data) {
                callback(data);
            }, "json");
        }

        removeAjax(id, callback) {
            $.ajax({
                url: 'http://localhost:8080/api/todos/' + id,
                type: 'DELETE',
                success: callback,
                data: id,
                contentType: 'json'
            });
        }

        getAjax(id, callback) {
            $.get('http://localhost:8080/api/todos/' + id, function(data) {
               callback(data);
           });
        }

        //ophalen - wijzigen - terugsturen (stringify gebruiken voor bool)
        toggle(id, todo, callback) {
            var obj = {completed: !todo.completed};
            $.ajax({
                url: 'http://localhost:8080/api/todos/' + id,
                type: 'PUT',
                data: JSON.stringify(obj),
                contentType: 'json',
                success: callback
            });
        }

/*        getList(filter){
            if (filter === 'active') {
                return this._getActiveTodos();
            }

            if (filter === 'completed') {
                return this._getCompletedTodos();
            }

            return this.todos;
        }*/

        _getActiveTodos () {
            return this.todos.filter(function (todo) {
                return !todo.completed;
            });
        }

        _getCompletedTodos () {
            return this.todos.filter(function (todo) {
                return todo.completed;
            });
        }

        setCompleted(completed){
            this.todos.forEach(function (todo) {
                todo.completed = completed;
            });
        }

        removeCompleted(){
            this.todos = this._getActiveTodos();
        }

        store(){
            util.store(STORE_KEY, this.todos);
        }
    }

    return TodoRepo;
})();
