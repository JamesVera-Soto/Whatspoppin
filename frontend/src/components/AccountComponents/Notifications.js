import React from 'react';
import AccountSidebar from './AccountSidebar';

function Notifications() {
  return <div>
    <h4 className='pageTitle'>Notifications</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Notifications go here</p>
      </div>


    </div>
  </div>;
}

export default Notifications;
