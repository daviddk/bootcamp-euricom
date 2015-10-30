import React from 'react';
import cartStore from '../stores/cartStore';
import cartActions from '../actions/cartActions';

var cartContainer = React.createClass({
    getInitialState: function() {
        return {
            cartItems: cartStore.getCart(),
            cartTotal: cartStore.getCartTotal()
        }
    },
    render: function() {
        return (
            <div>
                <h1>Cart</h1>
                <table className="table table-striped table-hover table-borders">
                    <thead>
                        <tr>
                            <th></th>
                            <th>Article</th>
                            <th>Quantity</th>
                            <th>Price</th>
                            <th></th>
                            <th>Subtotal</th>
                        </tr>
                    </thead>
                    <tbody>
                        {this._renderItems()}
                        <tr>
                            <td colSpan='5' className='text-right'>Total:</td>
                            <td>€ {this.state.cartTotal}</td>
                        </tr>
                    </tbody>
                </table>
            </div>
        )
    },
    _renderItems: function() {
        var self = this;
        if(this.state.cartItems && this.state.cartItems.length > 0) {
            return this.state.cartItems.map(function(item, index) {
                return (
                    <tr key={index}>
                        <td>
                            <button
                                className='btn btn-danger'
                                onClick={self._deleteOrderLine.bind(null, item)} >
                                <span className='glyphicon glyphicon-trash'></span>
                            </button>
                        </td>
                        <td>
                            {item.title}
                        </td>
                        <td>
                            {item.quantity}
                        </td>
                        <td>
                            € {parseFloat(item.cost).toFixed(2)}
                        </td>
                        <td>
                            <button className='btn btn-default'
                                    onClick={self._increment.bind(null, item)}>+</button>
                            <button className='btn btn-default'
                                    onClick={self._decrement.bind(null, item)}>-</button>
                        </td>
                        <td>
                            € {parseFloat(item.cost * item.quantity).toFixed(2)}
                        </td>
                    </tr>
                )
            })
        }
        return <tr><td colSpan='7'>No items in your cart</td></tr>
    },
    componentDidMount: function() {
        cartStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        cartStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            cartItems: cartStore.getCart(),
            cartTotal: cartStore.getCartTotal()
        });
    },
    _deleteOrderLine: function(item) {
        cartActions.deleteLine(item);
    },
    _increment: function(item) {
        cartActions.add(item);
    },
    _decrement: function(item) {
        cartActions.delete(item);
    }
});

export default cartContainer;
