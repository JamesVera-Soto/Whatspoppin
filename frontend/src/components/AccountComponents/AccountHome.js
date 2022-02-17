import React, {useContext} from 'react';
import './AccountHome.css'
import { format } from 'date-fns'
import AccountSidebar from './AccountSidebar';
import AuthApi from '../../AuthApi';

function AccountHome() {

  const authUser = useContext(AuthApi)

  return <div>
    <h4 className='pageTitle'>Account Home</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Username: {authUser.currentUser.username}</p>
        <p>email: {authUser.currentUser.email}</p>
        <p>Joined: {format(new Date(authUser.currentUser.memberSince), 'MMMM dd, yyyy, p')}</p>
        <p>Change Password:</p>
        <p>New password</p>
        <p>Confirm password</p>
      </div>


    </div>
  </div>;
}

export default AccountHome;
