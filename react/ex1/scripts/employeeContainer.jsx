var EmployeeContainer = React.createClass({
    getInitialState: function() {
        return {
            company: 'Euricom',
            employees: ['David', 'Peter', 'Robbert'],
            newEmployee: ''
        }
    },
    render: function() {
        return (
            <div>
                <h1>{this.state.company}</h1>
                <AddEmployee newEmployee={this.state.newEmployee} onChange={this._handleChange} onSave={this._addNewEmployee} />
                <EmployeeList employees={this.state.employees} />
            </div>
        )
    },
    _handleChange: function(field, e) {
        this.setState({
            newEmployee.field: e.target.value
        });
    },
    _addNewEmployee: function() {
        this.setState({
            employees: this.state.employees.concat(this.state.newEmployee),
            newEmployee: ''
        });
    }
});

var EmployeeList = React.createClass({
    render: function() {
        return (
            <ul>
                {this._renderEmployees()}
            </ul>
        )
    },
    _renderEmployees: function() {
        return this.props.employees.map(function(employee, index) {
            return (
                <li key={index}>{employee}</li>
            )
        });
    }
});

var AddEmployee = React.createClass({
    render: function() {
        return (
            <div>
                <h1>Add a new employee</h1>
                <input type="text" value={this.props.newEmployee} onChange={this.props.onChange} />
                <button onClick={this.props.onSave}>Add</button>
            </div>
        )
    }
})

ReactDOM.render(<EmployeeContainer />, document.getElementById('app'))
