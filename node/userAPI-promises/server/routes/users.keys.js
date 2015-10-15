var express = require('express');
var router = express.Router();

// #create APIkey API

// POST /api/users/123/keys
// {
//     name: 'myKeyName',
// }

// DELETE /api/users/123/keys/name
// GET /api/users/1223/keys
// [
//     {
//         name: 'myKeyName'
//     }
// ]


// #Authenticate key API
// Finder user by apiKey
// POST /api/auth/authenticate
// {
//     apiKey: 'api12874623786473826483146936'
// }

// response:

// {
//     accessToken: '3847847837483787589437578439758943789578349758943759830'
//     type: 'bearer'
// }
