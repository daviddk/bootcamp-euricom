'use strict';

//import {userService} from 'userService.js';
require('./css/style.sass');
var userService = require('./services/userService');
var $ = require('jquery');

let users = userService.getAll();

users.forEach(user => {
    $('#list').append('<li>' + user.name + '</li>')
});

$('#img').attr('src', require('./img/sad-pug.jpg'));


/*var userService = require('./services/userService');
var $ = require('jquery');
var users = userService.getAll();

users.forEach(function(user) {
    $('#list').append('<li>' + user.name + '</li>')
    console.log(user.id, user.name);
});
*/

/*// ES 6
users.forEach(user => {
    console.log(user.id, user.name);
});*/
