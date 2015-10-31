import React from 'react';
import ReactDOM from 'react-dom';

import createBrowserHistory from 'history/lib/createBrowserHistory';

import {Router, Route, IndexRoute} from 'react-router';

import NavBar from './components/navbar.jsx';
import ShopOverview from './components/shopContainer.jsx';
import Cart from './components/cartContainer.jsx';
import Item from './components/item.jsx';

var WebShopApp = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                <div    className='col-md-10 col-md-offset-1'
                        style={{'paddingTop': 75}}>
                    {this.props.children}
                </div>
            </div>
        )
    }
});

//ReactDOM.render(<WebShopApp />, document.getElementById('webShopApp'));

ReactDOM.render(
(
    <Router history={createBrowserHistory()}>
        <Route path='/' component={WebShopApp}>
            <IndexRoute component={ShopOverview}/>
            <Route path="/cart" component={Cart}/>
            <Route path="/cart/:id" component={Item}/>
        </Route>
    </Router>
), document.getElementById('webShopApp'));
