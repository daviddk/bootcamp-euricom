import React from 'react';
import {Link} from 'react-router';
import CartCounter from './cartCounter.jsx';

var navBar = React.createClass({
    render: function() {
        return (
            <nav className='navbar navbar-inverse navbar-fixed-top'>
                <div className='container-fluid'>
                    <ul className='nav navbar-nav'>
                        <Link to='/' className='navbar-brand'>
                            <img alt='Pug' src='/assets/pug.gif' style={{height: 25}}/>
                        </Link>
                        <li className='navbar-right'>
                            <Link to='/cart'>
                                <CartCounter />
                            </Link>
                        </li>
                    </ul>
                </div>
            </nav>
        )
    }
});

export default navBar;
