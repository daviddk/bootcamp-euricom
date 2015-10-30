import React from 'react';
import ReactDOM from 'react-dom';

import NavBar from './components/navbar.jsx';
import ShopOverview from './components/shopContainer.jsx';
import Cart from './components/cartContainer.jsx';

var WebShopApp = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <h1>Test</h1>
            </div>
        )
    }
});

ReactDOM.render(<WebShopApp />, document.getElementById('webShopApp'));
