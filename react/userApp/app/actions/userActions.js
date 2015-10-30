var appDispatcher = require('../appDispatcher.js');

var userActions = {
    addUser: function(user) {
        appDispatcher.handleAction({
            actionType: 'ADD_USER',
            data: user
        });
    },
    deleteUser: function(userid) {
        appDispatcher.handleAction({
            actionType: 'DELETE_USER',
            data: userid
        });
    },
    updateUser: function(user) {
        appDispatcher.handleAction({
            actionType: 'UPDATE_USER',
            data: user
        })
    }
};

module.exports = userActions;
