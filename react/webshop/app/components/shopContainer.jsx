import React from 'react';
import cartStore from '../stores/cartStore.js';
import ItemList from './itemList.jsx';

var shopContainer = React.createClass({
    getInitialState: function() {
        return {
            items: cartStore.getItems()
        }
    },
    render: function() {
        return (
            <div>
                <h1>Webshop</h1>
                <ItemList items={this.state.items} />
            </div>
        )
    }
});

export default shopContainer;
