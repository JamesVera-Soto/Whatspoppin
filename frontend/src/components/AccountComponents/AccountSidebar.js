import React, {useContext, useState} from 'react';
import {Link} from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate } from '../../AuthApi';
import axios from 'axios';
import useWindowSize from '../../useWindowSize';

function AccountSidebar() {

    const authUser = useAuthApi()
    const authUserUpdate = useAuthApiUpdate()

    const [height, width] = useWindowSize()

    const [sideToggle, setSideToggle] = useState(width < 800 ? false : true)

    const SignOut = async () => {
        await axios.post('http://localhost:3001/signout').then(authUserUpdate())
    }

    return sideToggle ? <div className='account-side'>
        {width < 900 && <button className='side-toggle-btn' type='button' onClick={() => {setSideToggle(sideToggle ? false : true)}} >Side Menu<i class="fa fa-bars"></i></button>}
        <img src='/person-placeholder.png' className='account-avatar' alt=''></img>
        <p>{authUser.currentUser.username}</p>

        <ul className='account-side-list'>
            <li className='account-side-item'><Link className='nav-txt' to="/account">Account Info</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/create-event">Create Event</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/my-events">My Events</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/followers">Followers</Link></li>

            <li className='account-side-item'><Link className='nav-txt' to="/account/following">Following</Link></li>

            <li className="account-side-item">
                <Link className='nav-txt' onClick={SignOut} to='/'>Sign Out</Link>
            </li>
        </ul>
    </div>
    : <div className='account-side-colapsed'>
        <button className='side-toggle-btn' type='button' onClick={() => {setSideToggle(sideToggle ? false : true)}} >Side Menu<i class="fa fa-bars"></i></button>
    </div>
}

export default AccountSidebar;
