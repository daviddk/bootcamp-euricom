import React from 'react';
import cartStore from '../stores/cartStore.js';
import Item from './item.jsx';
import {Link} from 'react-router';

var shopContainer = React.createClass({
    getInitialState: function() {
        return {
            item: cartStore.getItemById(this.props.params.id)
        }
    },
    render: function() {
        return (
            <div>
                <h1>Item details</h1>
                <Item item={this.state.item} />
                <Link to='/'>Back to shop</Link>
            </div>
        )
    }
});

export default shopContainer;
