var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;

var EmployeeList = React.createClass({
    render: function() {
        return (
            <div>
                <h3>Employees 123</h3>
                <ul>
                    {this._renderItems()}
                </ul>
            </div>
        )
    },

    _renderItems: function() {
        return this.props.employees.map(function(employee, index) {
            return (
                <li key={index}>
                    <Link to={'/employee/' + employee}>{employee}</Link>
                </li>
            )
        })
    }
});

module.exports = EmployeeList;
