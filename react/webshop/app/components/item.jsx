import cartStore from '../stores/cartStore'


var Item = React.createClass({
    render: function() {
        return (
            <div>
                {this._renderItem()}
            </div>
        )
    },
    _renderItem: function() {
        return (
            <h1>title</h1>
            <p>description</p>
            <p>price</p>
            <button className='btn btn-default'>add to cart</button>
        )
    }
})
