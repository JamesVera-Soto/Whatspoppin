import React from 'react';
import AccountSidebar from './AccountSidebar';

function Notifications() {

  document.title = "Notifications - Whats Poppin"

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Notifications go here</p>
      </div>


    </div>
  </div>;
}

export default Notifications;
