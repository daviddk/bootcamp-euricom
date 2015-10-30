var React = require('react');
var ReactDOM = require('react-dom');

var createBrowserHistory = require('history/lib/createBrowserHistory');

var ReactRouter = require('react-router');
var Router = ReactRouter.Router;
var Route = ReactRouter.Route;
var IndexRoute = ReactRouter.IndexRoute;

var Home = require('./components/home.jsx');
var About = require('./components/about.jsx');
var EmployeeContainer = require('./components/employeeContainer.jsx');
var Employee = require('./components/employee.jsx');
var Navbar = require('./components/navbar.jsx');

var App = React.createClass({
    render: function() {
        return (
            <div>
                <Navbar />
                {this.props.children}
            </div>
        )
    }
});

ReactDOM.render((
    <Router history={createBrowserHistory()}>
        <Route path="/" component={App}>
            <IndexRoute component={Home} />
            <Route path="about" component={About} />
            <Route path="employees" component={EmployeeContainer} />
            <Route path="employee/:id" component={Employee} />
        </Route>
    </Router>), document.getElementById('app'));
