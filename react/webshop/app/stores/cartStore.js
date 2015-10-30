import objectAssign from 'react/lib/Object.assign';
var EventEmitter = require('events').EventEmitter;

var _catalog = [];

for (var i=1; i<9; i++) {
    _catalog.push({
        'id': i,
        'title': 'Artikel #' + i,
        'summary': 'Dit is een speciaal artikel!',
        'description': 'Artikel omschrijving',
        'cost': i
    });
}


var cartStore = {};

export default cartStore;
