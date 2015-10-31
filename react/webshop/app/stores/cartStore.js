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
        'imgUrl': '/assets/product.jpg',
        'cost': i
    });
}

var calculateTotal = function() {
    if(_cart && _cart.length > 0) {
        let total = 0;
        _cart.map(function(orderLine) {
            total += orderLine.cost * orderLine.quantity;
        });
        return parseFloat(total).toFixed(2);
    }
    return 0;
}

var calculateTotalQuantity = function() {
    if(_cart && _cart.length > 0) {
        let total = 0;
        _cart.map(function(orderLine) {
            total += orderLine.quantity;
        });
        return total;
    }
    return 0;
}

var addToCart = function(item) {
    if(_.findIndex(_cart, {'id': item.id}) >= 0) {
        item.quantity++;
    }
    else {
        item.quantity = 1;
        _cart.push(item);
    }
}

var delFromCart = function(item) {
    var index = _.findIndex(_cart, {'id': item.id});
    if(index >= 0) {
        item.quantity--;
        if(item.quantity <= 0) {
            _cart.splice(index, 1);
        }
    }
}

var deleteLine = function(item) {
    var index = _.findIndex(_cart, {'id': item.id});
    _cart.splice(index, 1);
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
    getItemById: function(id) {
        var item = _.findWhere(_catalog, {'id': parseInt(id)});
        return item;
    },
    getCart: function() {
        return _cart;
    },
    getCartCount: function() {
        return calculateTotalQuantity();
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
            cartStore.emit('CHANGE_EVENT');
            break;
        case 'DEL_FROM_CART':
            delFromCart(action.data);
            cartStore.emit('CHANGE_EVENT');
            break;
        case 'DELETE_LINE_FROM_CART':
            deleteLine(action.data);
            cartStore.emit('CHANGE_EVENT');
            break;
        default:
            return true
    }
});

export default cartStore;
