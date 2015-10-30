var React = require('react');

var userForm = React.createClass({
    getInitialState: function() {
        return {
            users: this.props.users,
            newUser: this.props.newUser
        }
    },
    render: function() {
        return (
            <form className="col-md-10 col-md-offset-1">
                {this._renderForm()}
            </form>
        )
    },
    propTypes: {
        newUser: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            age: React.PropTypes.number,
            birthday: React.PropTypes.string,
            married: React.PropTypes.bool
        }),
        onSave: React.PropTypes.func.isRequired
    },
    _renderForm: function() {
        return (
            <div>
                <div className={this.props.errors.name ? "form-group has-error" : "form-group"}>
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter name"
                        name="name" className="form-control"
                        onChange={this._handleChange}
                        value={this.props.newUser.name} />
                    <div style={{'color': 'red'}}>{this.props.errors.name}</div>
                </div>
                <div className={this.props.errors.email ? "form-group has-error" : "form-group"}>
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Enter email"
                        name="email" className="form-control"
                        onChange={this._handleChange}
                        value={this.props.newUser.email} />
                    <div style={{'color': 'red'}}>{this.props.errors.email}</div>
                </div>
                    <div className={this.props.errors.age ? "form-group has-error" : "form-group"}>
                    <label htmlFor="age">Age</label>
                    <input type="number" placeholder="Enter age"
                        name="age" className="form-control"
                        onChange={this._handleChange}
                        value={parseInt(this.props.newUser.age, 10)} />
                    <div style={{'color': 'red'}}>{this.props.errors.age}</div>
                </div>
                <div className={this.props.errors.birthday ? "form-group has-error" : "form-group"}>
                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" placeholder="Enter birthday"
                        name="birthday" className="form-control"
                        onChange={this._handleChange}
                        value={this.props.newUser.birthday} />
                    <div style={{'color': 'red'}}>{this.props.errors.birthday}</div>
                </div>
                <div className="checkbox">
                    <label htmlFor="married">
                        <input type="checkbox" name="married"
                            onChange={this._handleChange}
                            value={this.props.newUser.married} />
                        Married</label>
                </div>
                <input type="submit" className="btn btn-default" onClick={this.props.onSave} />
            </div>
        )
    },
    _handleChange: function(e) {
        var tmpUser = this.props.newUser;
        tmpUser.id = this.props.newUser.id;
        tmpUser[e.target.name] = e.target.value;
        if(e.target.name === 'married') {
            if(e.target.checked) tmpUser.married = true;
            else tmpUser.married = false;
        }
        this.setState({
            newUser: tmpUser
        });
    }
});

module.exports = userForm;
