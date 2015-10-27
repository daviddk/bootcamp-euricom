var UserAppContainer = React.createClass({
    getInitialState: function() {
        return {
            users: [
                {
                    id: 1,
                    name: "Frederik",
                    email: "frederik.bouillon@euri.com",
                    age: 28,
                    birthday: "16/04/1987",
                    married: false
                },
                {
                    id: 2,
                    name: "Peter",
                    email: "peter.cosemans@euri.com",
                    age: 51,
                    birthday: "06/10/1964",
                    married: true
                }
            ],
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
                        </tr>
                    </thead>
                    <UserList users={this.state.users} onChange="" />
                </table>

                <AddUserForm    newUser={this.state.newUser}
                                onChange={this._handleChange}
                                onSave={this._addUser}
                                errors={this.state.errors} />
            </div>
        )
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
            this.setState({
                users: this.state.users.concat(this.state.newUser),
                newUser: this._generateUser()
            });
        }
        else {
            console.log(this.state.errors);
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

var UserList = React.createClass({
    propTypes: {
        newUser: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            age: React.PropTypes.number,
            birthday: React.PropTypes.string,
            married: React.PropTypes.bool
        })
    },
    render: function() {
        return (
            <tbody>
                {this._renderUsers()}
            </tbody>
        )
    },
    _renderUsers: function() {
        var self = this;
        return this.props.users.map(function(user, index) {
            return (
                <tr key={index}>
                    <td>{user.id}</td>
                    <td>{user.name}</td>
                    <td>{user.email}</td>
                    <td>{user.age}</td>
                    <td>{user.birthday}</td>
                    <td>{self._renderMarried(user.married)}</td>
                </tr>
            )
        })
    },
    _renderMarried: function(userMarried) {
        if(userMarried) return <span className="glyphicon glyphicon-ok"></span>;
        else return <span className=""></span>;
    }
});

var AddUserForm = React.createClass({
    propTypes: {
        newUser: React.PropTypes.shape({
            name: React.PropTypes.string.isRequired,
            email: React.PropTypes.string.isRequired,
            age: React.PropTypes.number,
            birthday: React.PropTypes.string,
            married: React.PropTypes.bool
        }),
        onChange: React.PropTypes.func.isRequired,
        onSave: React.PropTypes.func.isRequired
    },
    render: function() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter name"
                        name="name" className="form-control"
                        onChange={this.props.onChange}
                        value={this.props.newUser.name} />
                    <div style={{'color': 'red'}}>{this.props.errors.name}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Enter email"
                        name="email" className="form-control"
                        onChange={this.props.onChange}
                        value={this.props.newUser.email} />
                    <div style={{'color': 'red'}}>{this.props.errors.email}</div>
                </div>
                    <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" placeholder="Enter age"
                        name="age" className="form-control"
                        onChange={this.props.onChange}
                        value={parseInt(this.props.newUser.age, 10)} />
                    <div style={{'color': 'red'}}>{this.props.errors.age}</div>
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" placeholder="Enter birthday"
                        name="birthday" className="form-control"
                        onChange={this.props.onChange}
                        value={this.props.newUser.birthday} />
                    <div style={{'color': 'red'}}>{this.props.errors.birthday}</div>
                </div>
                <div className="checkbox">
                    <label htmlFor="married">
                        <input type="checkbox" name="married"
                            onChange={this.props.onChange}
                            value={this.props.newUser.married} />
                        Married</label>
                </div>
                <input type="submit" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        )
    }
});

ReactDOM.render(<UserAppContainer />, document.getElementById('userApp'));
