import React from 'react';
import {Link} from 'react-router-dom';

function AccountSidebar() {
  return <div className='account-side'>
        <img src='/Screenshot_2021.png' className='account-avatar' alt=''></img>
        <p>Username</p>

        <ul className='account-side-list'>
            <li className='account-side-item'><Link className='nav-txt' to="/account">Account Info</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/my-events">My Events</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/friends">Friends</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/subscriptions">Subscriptions</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/notifications">Notifications</Link></li>
        </ul>
    </div>;
}

export default AccountSidebar;
