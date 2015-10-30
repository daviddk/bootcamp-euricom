var React = require('react'),
    UserForm = require('./userForm.jsx'),
    userStore = require('../stores/userStore.js'),
    userActions = require('../actions/userActions.js');

var editUserContainer = React.createClass({
    getInitialState: function() {
        return {
            users: userStore.getUsers(),
            newUser: userStore.getUserById(this.props.params.id),
            errors: {}
        }
    },
    render: function() {
        return (
            <UserForm   newUser={this.state.newUser}
                        onSave={this._addUser}
                        errors={this.state.errors} />
        )
    },
    // _handleChange: function(e) {
    //     var tmpUser = this.state.newUser;
    //     tmpUser.id = this.state.newUser.id;
    //     tmpUser[e.target.name] = e.target.value;
    //     if(e.target.name === 'married') {
    //         if(e.target.checked) tmpUser.married = true;
    //         else tmpUser.married = false;
    //     }
    //     this.setState({
    //         newUser: tmpUser
    //     });
    // },
    _addUser: function(e) {
        e.preventDefault();
        if(this._isInputValid(this.state.newUser)) {
            userActions.updateUser(this.state.newUser);
            this.props.history.pushState(null, '/users');
            this.setState({
                newUser: this._generateUser()
            });
        }
    },
    _generateUser: function(e) {
        return {
            id: '',
            name: '',
            email: '',
            age: null,
            birthday: '',
            married: null
        };
    },
    _isInputValid: function() {
        var isValid = true;
        var errors = {};

        if(this.state.newUser.name.length < 3) {
            isValid = false;
            errors.name = 'Name must be at least 3 characters long.';
        }

        var emailRegex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        if(!this.state.newUser.email.match(emailRegex)) {
            isValid = false;
            errors.email = 'Not a valid email adres.';
        }

        if(this.state.newUser.age < 18) {
            isValid = false;
            errors.age = 'A user should be 18 years or older.'
        }

        if(this.state.newUser.birthday.length < 1) {
            isValid = false;
            errors.birthday = 'this field is required'
        }

        this.setState({
            errors: errors
        });

        return isValid;
    }
});

module.exports = editUserContainer;
