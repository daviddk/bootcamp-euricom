import objectAssign from 'react/lib/Object.assign';
//var EventEmitter = require('events').EventEmitter;
import {EventEmitter} from 'events';
import appDispatcher from '../appDispatcher';
import _ from 'lodash';

var _catalog = [];
var _cart = [];

for (var i=1; i<9; i++) {
    _catalog.push({
        'id': i,
        'title': 'Artikel #' + i,
        'summary': 'Dit is een speciaal artikel!',
        'description': 'Artikel omschrijving',
        'imgUrl': 'assets/product.jpg',
        'cost': i
    });
}

var calculateTotal = function() {
    if(_cart && _cart.length > 0) {
        let total = 0;
        _cart.map(function(orderLine) {
            total = total + orderLine.cost;
        });
        return parseFloat(total).toFixed(2);
    }

    return 0;
}

var addToCart = function(item) {
    //check if item already exists in array, of so add amount property

    _cart.push(item);
}

var cartStore = objectAssign({}, EventEmitter.prototype, {
    addChangeListener: function(cb) {
        this.on('CHANGE_EVENT', cb);
    },
    removeChangeListener: function(cb) {
        this.removeListener('CHANGE_EVENT', cb);
    },
    getItems: function() {
        return _catalog;
    },
    getCart: function() {
        return _cart;
    },
    getCartCount: function() {
        return _cart.length;
    },
    getCartTotal: function() {
        return calculateTotal();
    }
});

appDispatcher.register(function(payload) {
    var action = payload.action;
    switch(action.actionType) {
        case 'ADD_TO_CART':
            addToCart(action.data);
            console.log(_cart);
            cartStore.emit('CHANGE_EVENT');
            break;
        default:
            return true
    }
});

export default cartStore;
