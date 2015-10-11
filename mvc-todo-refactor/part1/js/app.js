/*global jQuery, Handlebars, Router */
(function ($, util, todoRepo) {
    'use strict';

    Handlebars.registerHelper('eq', function (a, b, options) {
        return a === b ? options.fn(this) : options.inverse(this);
    });

    var ENTER_KEY = 13;
    var ESCAPE_KEY = 27;



    var App = {
        init: function () {
            todoRepo.init();
            //this.todos = util.store('todos-jquery');
            this.cacheElements();
            this.bindEvents();

            new Router({
                '/:filter': function (filter) {
                    this.filter = filter;
                    this.render();
                }.bind(this)
            }).init('/all');
        },
        cacheElements: function () {
            this.todoTemplate = Handlebars.compile($('#todo-template').html());
            this.footerTemplate = Handlebars.compile($('#footer-template').html());
            this.$todoApp = $('#todoapp');
            this.$header = this.$todoApp.find('#header');
            this.$main = this.$todoApp.find('#main');
            this.$footer = this.$todoApp.find('#footer');
            this.$newTodo = this.$header.find('#new-todo');
            this.$toggleAll = this.$main.find('#toggle-all');
            this.$todoList = this.$main.find('#todo-list');
            this.$count = this.$footer.find('#todo-count');
            this.$clearBtn = this.$footer.find('#clear-completed');
        },
        bindEvents: function () {
            var list = this.$todoList;
            this.$newTodo.on('keyup', this.create.bind(this));
            this.$toggleAll.on('change', this.toggleAll.bind(this));
            this.$footer.on('click', '#clear-completed', this.destroyCompleted.bind(this));
            list.on('change', '.toggle', this.toggle.bind(this));
            list.on('dblclick', 'label', this.edit.bind(this));
            list.on('keyup', '.edit', this.editKeyup.bind(this));
            list.on('focusout', '.edit', this.update.bind(this));
            list.on('click', '.destroy', this.destroy.bind(this));
        },
        render: function () {
            //this.$todoList.html(todoRepo.getList(this.filter));
            //this.renderFooter();
            var todos = todoRepo.getList(this.filter);
            this.$todoList.html(this.todoTemplate(todos));
            this.$main.toggle(todos.length > 0);
            this.$toggleAll.prop('checked', todoRepo.getList('active').length === 0);
            //this.$toggleAll.prop('checked', this.getActiveTodos().length === 0);
            this.renderFooter();
            this.$newTodo.focus();
            todoRepo.store();
            //util.store('todos-jquery', this.todos);
        },
        renderFooter: function () {
            var todoCount = todoRepo.getList().length;
            var activeTodoCount = this.getActiveTodos().length;
            var template = this.footerTemplate({
                activeTodoCount: activeTodoCount,
                activeTodoWord: util.pluralize(activeTodoCount, 'item'),
                completedTodos: todoCount - activeTodoCount,
                filter: this.filter
            });

            this.$footer.toggle(todoCount > 0).html(template);
        },
        toggleAll: function (e) {
            var isChecked = $(e.target).prop('checked');

            /*this.todos.forEach(function (todo) {
                todo.completed = isChecked;
            });*/
            todoRepo.toggleAll(isChecked);

            this.render();
        },
        filter: function (filter) {
            return this.todos.filter(function() {
                todoRepo.getList(filter);
            });
        },
        getActiveTodos: function () {
            return todoRepo.getList('active');
        },
        getCompletedTodos: function () {
            return todoRepo.getList('completed');
        },
/*        getFilteredTodos: function () {
            if (this.filter === 'active') {
                return this.getActiveTodos();
            }

            if (this.filter === 'completed') {
                return this.getCompletedTodos();
            }

            return this.todos;
        },*/
        destroyCompleted: function () {
            this.todos = this.getActiveTodos();
            this.filter = 'all';
            this.render();
        },
        // accepts an element from inside the `.item` div and
        // returns the corresponding index in the `todos` array
        indexFromEl: function (el) {
            var id = $(el).closest('li').data('id');
            var todos = todoRepo.getList();
            var i = todos.length;

            while (i--) {
                if (todos[i].id === id) {
                    return i;
                }
            }
        },
        //refactored to todoRepo.add
        create: function (e) {
            var $input = $(e.target);
            var val = $input.val().trim();

            if (e.which !== ENTER_KEY || !val) {
                return;
            }

            todoRepo.add(val);

            /*this.todos.push({
                id: util.uuid(),
                title: val,
                completed: false
            });*/

            $input.val('');

            this.render();
        },
        toggle: function (e) {
            var i = this.indexFromEl(e.target);
            var todo = todoRepo.get(i);
            todo.completed = !todo.completed;
            this.render();
        },
        edit: function (e) {
            var $input = $(e.target).closest('li').addClass('editing').find('.edit');
            $input.val($input.val()).focus();
        },
        editKeyup: function (e) {
            if (e.which === ENTER_KEY) {
                e.target.blur();
            }

            if (e.which === ESCAPE_KEY) {
                $(e.target).data('abort', true).blur();
            }
        },
        update: function (e) {
            var el = e.target;
            var $el = $(el);
            var val = $el.val().trim();

            if ($el.data('abort')) {
                $el.data('abort', false);
                this.render();
                return;
            }

            var i = this.indexFromEl(el);

            if (val) {
                this.todos[i].title = val;
            } else {
                this.todos.splice(i, 1);
            }

            this.render();
        },
        destroy: function (e) {
            todoRepo.remove(this.indexFromEl(e.target));
            //this.todos.splice(this.indexFromEl(e.target), 1);
            this.render();
        }
    };
    App.init();
})(jQuery, util, todoRepo);
