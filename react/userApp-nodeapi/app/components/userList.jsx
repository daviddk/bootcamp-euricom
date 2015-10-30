var React = require('react');

var userList = React.createClass({
    render: function() {
        return (
            <tbody>
                {this._renderUsers()}
            </tbody>
        )
    },
    _renderUsers: function() {
        var self = this;
        if(this.props.users && this.props.users.length > 0) {
            return this.props.users.map(function(user, index) {
                return (
                    <tr key={index}>
                        <td>{user.id}</td>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.age}</td>
                        <td>{user.birthday}</td>
                        <td>{self._renderMarried(user.married)}</td>
                        <td>
                            <button className="btn btn-info" onClick={self.props.onEdit.bind(null, user.id)}>edit</button>
                            <button className="btn btn-danger" onClick={self.props.onDelete.bind(null, user.id)}>delete</button><
                        /td>
                    </tr>
                )
            });
        }

        return (
            <tr>
                <td colSpan='7'>No users found</td>
            </tr>
        )
    },
    _renderMarried: function(userMarried) {
        if(userMarried) return <span className="glyphicon glyphicon-ok"></span>;
        else return <span className=""></span>;
    }
});

module.exports = userList;
