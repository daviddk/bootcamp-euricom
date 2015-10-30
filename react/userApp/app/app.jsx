var React = require('react');
var ReactDOM = require('react-dom');

var createBrowserHistory = require('history/lib/createBrowserHistory');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Home = require('./components/home.jsx');
var NavBar = require('./components/navbar.jsx');
var UserListContainer = require('./components/userListContainer.jsx');
var AddUserContainer = require('./components/addUserContainer.jsx');
var EditUserContainer = require('./components/editUserContainer.jsx');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <NavBar />
                {this.props.children}
            </div>
        )
    }
});

ReactDOM.render(
(
    <Router history={createBrowserHistory()}>
        <Route path='/' component={App}>
            <IndexRoute component={Home}/>
            <Route path='users' component={UserListContainer}/>
            <Route path='user/add' component={AddUserContainer}/>
            <Route path='user/:id' component={EditUserContainer}/>
        </Route>
    </Router>
), document.getElementById('userApp'));
