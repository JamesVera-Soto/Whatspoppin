import React, {useContext} from 'react';
import './AccountHome.css'
import { format } from 'date-fns'
import AccountSidebar from './AccountSidebar';
import { useAuthApi, useAuthApiUpdate } from '../../AuthApi';
    

function AccountHome() {

  document.title = "Account - Whats Poppin"

  const authUser = useAuthApi()
  const authUserUpdate = useAuthApiUpdate()

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Username: {authUser.currentUser.username}</p>
        <p>email: {authUser.currentUser.email}</p>
        <p>Joined: {format(new Date(authUser.currentUser.memberSince), 'MMMM dd, yyyy, p')}</p>
        <p>Change Password:</p>
        <p>New password</p>
        <p>Confirm password</p>
        <p>Delete Account</p>
      </div>


    </div>
  </div>;
}

export default AccountHome;
