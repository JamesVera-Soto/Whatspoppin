import React, {useContext} from 'react';
import {Link} from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate } from '../../AuthApi';
import axios from 'axios';

function AccountSidebar() {

    const authUser = useAuthApi()

    const SignOut = async () => {
        authUser.setAuth(false)
        authUser.setCurrentUser(null)
        await axios.post('http://localhost:3001/signout')
    }

  return <div className='account-side'>
        <img src='/person-placeholder.png' className='account-avatar' alt=''></img>
        <p>{authUser.currentUser.username}</p>

        <ul className='account-side-list'>
            <li className='account-side-item'><Link className='nav-txt' to="/account">Account Info</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/create-event">Create Event</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/my-events">My Events</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/followers">Followers</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/following">Following</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/notifications">Notifications</Link></li>

            <li className="account-side-item">
                <Link className='nav-txt' onClick={SignOut} to='/'>Sign Out</Link>
            </li>
        </ul>
    </div>;
}

export default AccountSidebar;
