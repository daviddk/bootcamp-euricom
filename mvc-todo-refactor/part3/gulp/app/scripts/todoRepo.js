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

        getList(filter){
            if (filter === 'active') {
                return this.getActiveTodos();
            }

            if (filter === 'completed') {
                return this.getCompletedTodos();
            }

            return this.todos;
        }

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
