var React = require('react');

var AddEmployee = React.createClass({
    render: function() {
        return (
            <div>
                <div>Add new employee</div>
                <input  type="text"
                                value={this.props.newEmployee}
                                onChange={this.props.onChange}/>
                <button onClick={this.props.addNew}>add new</button>
                <div style={{color: 'red'}}>{this.props.errors.newEmployee}</div>
            </div>
        )
    }
});

module.exports = AddEmployee;
