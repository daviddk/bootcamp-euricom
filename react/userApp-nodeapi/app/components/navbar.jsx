var React = require('react');
var ReactRouter = require('react-router');
var Link = ReactRouter.Link;
var userStore = require('../stores/userStore');
var userCounterStore = require('../stores/userCounterStore');

var navBar = React.createClass({
    getInitialState: function() {
        return {
            active: 'home',
            userCount: userCounterStore.getUserCount()
        }
    },
    render: function() {
        return (
            <nav className='navbar navbar-default'>
                <div className='container-fluid'>
                    <ul className='nav navbar-nav'>
                        <a className='navbar-brand'>
                            <img alt='Pug' src='/assets/pug.gif' style={{height: 25}}/>
                        </a>
                        <li className={this.state.active === 'home' ? 'active' : ''}>
                            <Link to='/'
                                onClick={this._activateLink}
                                name='home'>
                                Home
                            </Link>
                        </li>
                        <li className={this.state.active === 'users' ? 'active' : ''}>
                            <Link to='/users'
                                    onClick={this._activateLink}
                                    name='users'>
                                    User list <span>({this.state.userCount})</span>
                            </Link>
                        </li>
                        <li className={this.state.active === 'adduser' ? 'active' : ''}>
                            <Link to='/user/add'
                                    onClick={this._activateLink}
                                    name='adduser'>
                                    Add user
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    },
    _activateLink: function(e) {
        var name = e.target.name;
        this.setState({
            active: name
        });
    },
    componentDidMount: function() {
        userStore.addChangeListener(this._onStoreChange);
    },
    componentWillUnmount: function() {
        userStore.removeChangeListener(this._onStoreChange);
    },
    _onStoreChange: function() {
        this.setState({
            userCount: userStore.getUserCount()
        });
    },
});

module.exports = navBar;
