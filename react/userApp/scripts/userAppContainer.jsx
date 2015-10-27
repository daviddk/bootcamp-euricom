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
            newUser: this._generateUser()
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

                <AddUserForm newUser={this.state.newUser} onChange={this._handleChange} onSave={this._addUser} />
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
        this.setState({
            users: this.state.users.concat(this.state.newUser),
            newUser: this._generateUser()
        });
    },
    _generateUser: function(e) {
        return {
            id: '',
            name: '',
            email: '',
            age: '',
            birthday: '',
            married: ''
        };
    }
});

var UserList = React.createClass({
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
        if(userMarried) return "true";
        else return "false";
    }
});

var AddUserForm = React.createClass({
    render: function() {
        return (
            <form>
                <div className="form-group">
                    <label htmlFor="name">Name</label>
                    <input type="text" placeholder="Enter name"
                        name="name" className="form-control"
                        onChange={this.props.onChange}
                        value={this.props.newUser.name} />
                </div>
                <div className="form-group">
                    <label htmlFor="email">Email</label>
                    <input type="text" placeholder="Enter email"
                        name="email" className="form-control"
                        onChange={this.props.onChange}
                        value={this.props.newUser.email} />
                </div>
                    <div className="form-group">
                    <label htmlFor="age">Age</label>
                    <input type="number" placeholder="Enter age"
                        name="age" className="form-control"
                        onChange={this.props.onChange}
                        value={this.props.newUser.age} />
                </div>
                <div className="form-group">
                    <label htmlFor="birthday">Birthday</label>
                    <input type="text" placeholder="Enter birthday"
                        name="birthday" className="form-control"
                        onChange={this.props.onChange}
                        value={this.props.newUser.birthday} />
                </div>
                <div className="form-group">
                    <label htmlFor="married">Married</label><br />
                    <input type="checkbox" name="married"
                        onChange={this.props.onChange}
                        value={this.props.newUser.married} />
                </div>
                <input type="submit" className="btn btn-default" onClick={this.props.onSave} />
            </form>
        )
    }
});

ReactDOM.render(<UserAppContainer />, document.getElementById('userApp'));
