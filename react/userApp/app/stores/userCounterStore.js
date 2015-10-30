var objectAssign = require('react/lib/Object.assign');
var EventEmitter = require('events').EventEmitter;
var appDispatcher = require('../appDispatcher.js');

var userCounter = 2; //this normally comes from a backend but for our example we set it ourselves

var increment = function() {
    return userCounter++;
}

var decrement = function() {
    return userCounter--;
}

var userCounterStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
        this.on('COUNTER_EVENT', cb)
    },
    removeChangeListener: function(cb) {
        this.removeListener('COUNTER_EVENT', cb);
    },
    getUserCount: function() {
        return userCounter;
    }
});

appDispatcher.register(function(payload) {
    var action = payload.action;

    switch(action.actionType) {
        case 'ADD_USER':
            increment();
            userCounterStore.emit('COUNTER_EVENT');
            break;
        case 'DELETE_USER':
            decrement();
            userCounterStore.emit('COUNTER_EVENT');
        default:
            return true
    }
});

module.exports = userCounterStore;
