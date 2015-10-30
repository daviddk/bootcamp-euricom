import React from 'react';
import cartActions from '../actions/cartActions';

var item = React.createClass({
    render: function() {
        return (
            <div>
                {this._renderItem()}
            </div>
        )
    },
    _renderItem: function() {
        var item = this.props.item;
        return (
            <div className='col-xs-12 col-md-3'>
                <h1>{item.title}</h1>
                <img src={item.imgUrl} alt='product image' style={{width: 100}}/>
                <p>{item.summary}</p>
                <p>€ {parseFloat(item.cost).toFixed(2)}</p>
                <button className='btn btn-default' onClick={this._addToCart.bind(null, item)}>add to cart</button>
            </div>
        )
    },
    _addToCart: function(item) {
        cartActions.add(item);
    }
})

export default item;
