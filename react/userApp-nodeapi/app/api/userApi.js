//var request = require('superagent');
import request from 'superagent';

var api = {
    getUsers: function(cb) {
        request
            .get('http://localhost:3000/api/persons')
            .end(function(err, res) {
                cb(err, res);
            });
    },
    addUser: function(body, cb) {
        request
            .post('http://localhost:3000/api/persons')
            .send(body)
            .end(function(err, res) {
                cb(err, res);
            });
    },
    deleteUser: function(id, cb) {
        request
            .del('http://localhost:3000/api/persons/' + id)
            .end(function(err, res) {
                cb(err, res);
        });
    },
    updateUser: function(user, cb) {
        request
            .put('http://localhost:3000/api/persons/' + user.id)
            .send(user)
            .end(function(err, res) {
                cb(err, res);
        });
    }
}

//module.exports = api;
export default api;
