var React = require('react'),
    UserList = require('./userList.jsx'),
    userStore = require('../stores/userStore.js'),
    userActions = require('../actions/userActions.js'),
    Link = require('react-router').Link,
    _ = require('lodash');

var userAppContainer = React.createClass({
    getInitialState: function() {
        return {
            users: userStore.getUsers(),
        }
    },
    render: function() {
        return (
            <div className="col-md-10 col-md-offset-1">
                <Link to='/user/add'
                        onClick={this._activateLink}
                        name='adduser'
                        className='btn btn-success pull-right'>
                        Add user
                </Link>
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
                    <UserList users={this.state.users} onDelete={this._removeUser} onEdit={this._editUser} />
                </table>
            </div>
        )
    },
    componentDidMount: function() {
        userActions.getUsers();
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
    _removeUser: function(userid) {
        userActions.deleteUser(userid);
    },
    _editUser: function(userid) {
        this.props.history.pushState(null, '/user/' + userid);
    }
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
