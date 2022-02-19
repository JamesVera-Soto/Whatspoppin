import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import AuthApi from '../../AuthApi';

function AccountSidebar() {

    const authUser = useContext(AuthApi)

    const SignOut = () => {
        authUser.setAuth(false)
        authUser.setCurrentUser(null)
    }

  return <div className='account-side'>
        <img src='/person-placeholder.png' className='account-avatar' alt=''></img>
        <p>{authUser.currentUser.username}</p>

        <ul className='account-side-list'>
            <li className='account-side-item'><Link className='nav-txt' to="/account">Account Info</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/create-event">Create Event</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/my-events">My Events</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/friends">Friends</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/subscriptions">Subscriptions</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/notifications">Notifications</Link></li>

            <li className="account-side-item">
                <Link className='nav-txt' onClick={SignOut} to='/'>Sign Out</Link>
            </li>
        </ul>
    </div>;
}

export default AccountSidebar;
