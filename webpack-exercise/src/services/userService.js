'use strict';

class UserService {
    getById(id) {
        return {
            id: 123,
            name: 'lien'
        }
    }

    getAll() {
        return [
            {id: '123', name: 'lien'},
            {id: '124', name: 'david'},
        ]
    }
}

module.exports = new UserService();
/*var userService = new UserService();
export{userService}*/


/*
CommonJS
function UserService() {
    this.getById = function() {
        return {
            id: 123,
            name: 'lien'
        }
    }


    this.getAll = function() {
        return [
            {id: '123', name: 'lien'},
            {id: '124', name: 'david'},
        ]
    }
}

module.exports = new UserService();*/
