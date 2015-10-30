import React from 'react';

var cartList = React.createClass({
    render: function() {
        return (
            <tbody>
                {this._renderItems()}
            </tbody>
        )
    },
    _renderItems: function() {
        var self = this;
        if(this.props.items && this.props.items.length > 0) {
            return this.props.items.map(function(item, index) {
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
                            0
                        </td>
                        <td>
                            0
                        </td>
                        <td>
                            <button className='btn btn-default'>+</button>
                            <button className='btn btn-default'>-</button>
                        </td>
                        <td>
                        </td>
                    </tr>
                )
            })
        }

        <tr>
            <td colSpan='5'>Total:</td>
            <td>0</td>
        </tr>
    }
});

export default cartList;
