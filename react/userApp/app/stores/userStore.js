var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../appDispatcher.js');

var users = [
    {
        id: 1,
        name: "Frederik",
        email: "frederik.bouillon@euri.com",
        age: 28,
        birthday: "16/04/1987",
        married: false
    },
    {
        id: 2,
        name: "Peter",
        email: "peter.cosemans@euri.com",
        age: 51,
        birthday: "06/10/1964",
        married: true
    }
]

var addUser = function(user) {
    users.push(user);
}

var deleteUser = function(userid) {
    users = _.reject(users, 'id', userid);
}

var updateUser = function(user) {
    var index = _.indexOf(users, user.id);
    users[index] = user;
}

var userStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
        this.on('CHANGE_EVENT', cb)
    },
    removeChangeListener: function(cb) {
        this.removeListener('CHANGE_EVENT', cb);
    },
    getUsers: function() {
        return users;
    },
    getUserById: function(id) {
        var res = _.findWhere(users, {'id': parseInt(id)});
        return res;
    },
    getUserCount: function() {
        return users.length;
    }
});

appDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case 'ADD_USER':
            addUser(action.data);
            userStore.emit('CHANGE_EVENT');
            break;
        case 'DELETE_USER':
            deleteUser(action.data);
            userStore.emit('CHANGE_EVENT');
            break;
        case 'UPDATE_USER':
            updateUser(action.data);
            userStore.emit('CHANGE_EVENT');
            break;
        default:
            return true
    }
});

module.exports = userStore;
