var React = require('react');

var home = React.createClass({
    render: function() {
        return (
            <div className='col-md-10 col-md-offset-1'>
                <h1>User app</h1>
                <p>Welcome to our user app</p>
            </div>
        )
    }
});

module.exports = home;
