var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../appDispatcher.js');
var userActions = require('../actions/userActions');

var users = [];

var deleteUser = function(userid) {
    userActions.getUsers();
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
        case 'USERS_LOADED':
            users = action.data;
            userStore.emit('CHANGE_EVENT');
            break;
        case 'ADD_USER':
            userStore.emit('CHANGE_EVENT');
            break;
        case 'DELETE_USER':
            deleteUser();
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
