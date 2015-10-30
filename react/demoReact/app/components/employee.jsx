var React = require('react');

var employee = React.createClass({
    render: function() {
        console.log(this.props);
        return (
            <div>
                <h1>Hello</h1>
                {this.props.params.name}
            </div>
        )
    }
});

module.exports = employee;
