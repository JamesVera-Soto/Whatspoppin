import React, {useContext, useState} from 'react';
import {Link, useNavigate} from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate } from '../../AuthApi';
import axios from 'axios';
import useWindowSize from '../../useWindowSize';
import './AvatarSelect.css'

function AccountSidebar() {

    const navigate = useNavigate()

    const authUser = useAuthApi()
    const authUserUpdate = useAuthApiUpdate()

    var folder = "/avatars/"
    var files = [
        "different-people-avatars_52683-3451.png",
        "different-people-avatars1.png",
        "different-people-avatars3.png",
        "different-people-avatars4.png",
        "different-people-avatars5.png",
        "different-people-avatars6.png",
        "happy-people-avatars.png",
        "multiracial-people-avatars.png",
        "person-placeholder.png"
    ]

    const [height, width] = useWindowSize()

    const [sideToggle, setSideToggle] = useState(width < 800 ? false : true)
    const [avatarToggle, setAvatarToggle] = useState(false)
    const [successMes, setSuccessMes] = useState(null)

    async function handleClick(file) {
        axios.post('http://localhost:3001/api/updateUser', {
            findByField: "_id", 
            findByValue: authUser.currentUser._id, 
            field: "avatar", 
            action: '$set',
            value: file
        }).then(res => {
            authUserUpdate()
            setAvatarToggle(false)
        })
    }

    const SignOut = async () => {
        await axios.post('http://localhost:3001/signout').then(authUserUpdate())
    }

    return sideToggle ? <div className='account-side'>
        {avatarToggle ? <div className='bg-modal'>
            <div className='modal-content'>
                <button type='button' onClick={() => {setAvatarToggle(!avatarToggle)}} className='avatar-toggle-btn' ><i class="fa-solid fa-circle-arrow-up"></i></button>
                {files.map(file => {
                    return <img src={folder + file} onClick={() => {handleClick(file)}} className='account-avatar-select' alt=''></img>
                })}
            </div>
        </div> : null}
        
        {width < 900 && <button className='side-toggle-btn' type='button' onClick={() => {setSideToggle(sideToggle ? false : true)}} >Side Menu <i class="fa-solid fa-circle-arrow-left"></i></button>}
        <span title='choose avatar' style={{cursor:"pointer"}} >
            <img src={folder + authUser.currentUser.avatar} onClick={() => {setAvatarToggle(!avatarToggle)}} className='account-avatar' alt='user-avatar'></img>
        </span>
        <p className='account-side-username' onClick={() => {navigate('/organizer/' + authUser.currentUser.username)}}>{authUser.currentUser.username}</p>

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
        <button className='side-toggle-btn' type='button' onClick={() => {setSideToggle(sideToggle ? false : true)}} >Side Menu <i class="fa-solid fa-circle-arrow-right"></i></button>
    </div>
}

export default AccountSidebar;
