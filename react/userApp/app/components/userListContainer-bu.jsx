var React = require('react'),
    AddUserContainer = require('./addUserContainer.jsx'),
    UserList = require('./userList.jsx'),
    userStore = require('../stores/userStore.js'),
    userActions = require('../actions/userActions.js'),
    _ = require('lodash');

var userAppContainer = React.createClass({
    getInitialState: function() {
        return {
            users: userStore.getUsers(),
            newUser: this._generateUser(),
            errors: {}
        }
    },
    render: function() {
        return (
            <div className="col-md-10 col-md-offset-1">
                <table className="table table-striped table-hover table-borders">
                    <thead>
                        <tr>
                            <th>id</th>
                            <th>name</th>
                            <th>email</th>
                            <th>age</th>
                            <th>birthday</th>
                            <th>married</th>
                            <th></th>
                        </tr>
                    </thead>
                    <UserList users={this.state.users} onDelete={this._removeUser} />
                </table>

                <AddUserContainer   newUser={this.state.newUser}
                                    onChange={this._handleChange}
                                    onSave={this._addUser}
                                    errors={this.state.errors} />
            </div>
        )
    },
    componentDidMount: function() {
        userStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        userStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            users: userStore.getUsers()
        });
    },
    _handleChange: function(e) {
        var tmpUser = this.state.newUser;
        tmpUser.id = this._generateUserId(this.state.users);
        tmpUser[e.target.name] = e.target.value;
        if(e.target.name === 'married') {
            if(e.target.checked) tmpUser.married = true;
            else tmpUser.married = false;
        }
        this.setState({
            newUser: tmpUser
        });
    },
    _generateUserId: function(users) {
        if (users.length > 0) {
            var lastUser = users[users.length - 1];
            return lastUser.id + 1;
        }
        return 1;
    },
    _addUser: function(e) {
        e.preventDefault();
        if(this._isInputValid(this.state.newUser)) {
            userActions.addUser(this.state.newUser);
            this.setState({
                newUser: this._generateUser()
            });
        }
    },
    _removeUser: function(userid) {
        userActions.deleteUser(userid);
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
    },
    //react component lifecycles:
    // Invoked once before first render
    // componentWillMount: function() {
    //     // Calling setState here does not cause a re-render
    //     console.log('component will mount fired');
    // },
    // //invoked once after initial render
    // componentDidMount: function() {
    //     console.log('component did mount fired');
    // }
});

module.exports = userAppContainer;
