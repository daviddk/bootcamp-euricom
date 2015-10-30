import React from 'react';
import cartStore from '../stores/cartStore';

var cartCounter = React.createClass({
    getInitialState: function() {
        return {
            itemCount: cartStore.getCartCount(),
            itemTotal: cartStore.getCartTotal()
        }
    },
    render: function() {
        return (
            <button className='btn btn-success'>
                Cart ({this.state.itemCount}) - € {this.state.itemTotal}
            </button>
        )
    },
    componentDidMount: function() {
        cartStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        cartStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            itemCount: cartStore.getCartCount(),
            itemTotal: cartStore.getCartTotal()
        });
    },
});

export default cartCounter;
