import React from 'react';
import './AccountHome.css'
import AccountSidebar from './AccountSidebar';

function AccountHome() {
  return <div>
    <h4 className='pageTitle'>Account Home</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Username</p>
        <p>email</p>
        <p>Joined:</p>
        <p>Change Password:</p>
        <p>New password</p>
        <p>Confirm password</p>
      </div>


    </div>
  </div>;
}

export default AccountHome;
