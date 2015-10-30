// var appDispatcher = require('../appDispatcher.js');
// var userApi = require('../api/userApi.js');

import appDispatcher from '../appDispatcher';
import userApi from '../api/userApi';

var userActions = {
    getUsers: function() {
        userApi.getUsers(function(err, res) {
            if(res && res.status === 200) {
                appDispatcher.handleAction({
                    actionType: 'USERS_LOADED',
                    data: JSON.parse(res.text)
                });
            }
        })
    },
    addUser: function(user) {
        userApi.addUser(user, function(err, res) {
            if(res && res.status === 200) {
                appDispatcher.handleAction({
                    actionType: 'ADD_USER',
                    data: user
                });
            }
        })
    },
    deleteUser: function(userid) {
        userApi.deleteUser(userid, function(err, res) {
            if(res && res.status === 200) {
                appDispatcher.handleAction({
                    actionType: 'DELETE_USER',
                    data: userid
                });
            }
        })
    },
    updateUser: function(user) {
        userApi.updateUser(user, function(err, res) {
            if(res && res.status === 200) {
                appDispatcher.handleAction({
                    actionType: 'UPDATE_USER',
                    data: user
                });
            }
        })
    }
};

export default userActions;
