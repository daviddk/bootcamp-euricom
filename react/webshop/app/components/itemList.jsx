import React from 'react';
import Item from './item.jsx';

var itemList = React.createClass({
    render: function() {
        return (
            <div>
                {this._renderItems()}
            </div>
        )
    },
    _renderItems: function() {
        var self = this;
        if(this.props.items && this.props.items.length > 0) {
            return this.props.items.map(function(item, index) {
                return (
                    <Item
                        item={item}
                        key={index} />
                )
            });
        }

        return <p>No items found</p>
    }
});

export default itemList;
