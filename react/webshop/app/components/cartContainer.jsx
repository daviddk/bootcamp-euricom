import React from 'react';
import cartStore from '../stores/cartStore';

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
                            <th>Artikel</th>
                            <th>Aantal</th>
                            <th>Prijs</th>
                            <th></th>
                            <th>Subtotaal</th>
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
        console.log(this.state.cartItems);
        if(this.state.cartItems && this.state.cartItems.length > 0) {
            return this.state.cartItems.map(function(item, index) {
                return (
                    <tr key={index}>
                        <td>
                            <button className='btn btn-danger'>
                                <span className='glyphicon glyphicon-trash'></span>
                            </button>
                        </td>
                        <td>
                            {item.title}
                        </td>
                        <td>
                            amount
                        </td>
                        <td>
                            price
                        </td>
                        <td>
                            <button className='btn btn-default'>+</button>
                            <button className='btn btn-default'>-</button>
                        </td>
                        <td>
                            subtotal
                        </td>
                    </tr>
                )
            })
        }
        return <tr><td colSpan='7'>No items in your cart</td></tr>
    },
    componentDidMount: function() {
        this.setState({
            cartItems: cartStore.getCart()
        })
    },

});

export default cartContainer;
