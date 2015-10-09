var todoRepo = (function () {
    'use strict';

    var todos = [];

    function init() {
        todos = util.store('todos-jquery');
    }

    function add(item) {
        todos.push({
            id: util.uuid(),
            title: item,
            completed: false
        });
        console.log(todos);
    }

    function remove(index) {
        console.log(index);
        todos.splice(index, 1);
        console.log(todos);
    }

    function arrayObjectIndexOf(array, term, property) {
        for(var i = 0, len = array.length; i < len; i++) {
            if (array[i][property] === term) return i;
        }
        return -1;
    }

    function get(id) {
        //return todos.indexOf(id);
        return arrayObjectIndexOf(todos, id, "id");
    }

    function getList(filter) {
        //filter todos and return the filtered list

        if(true) {
            return todos;
        }
        else {
            return todos;
        }
    }

    function toggleAll(active) {
        if(active) {
            return;
        }
        else {
            return;
        }
    }

    return {
        init: init,
        add: add,
        remove: remove,
        get: get,
        getList: getList,
        toggleAll: toggleAll
    }
})();
