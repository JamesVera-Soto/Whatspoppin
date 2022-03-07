import React from 'react';
import AccountSidebar from './AccountSidebar';

function Following() {

  document.title = "Following - Whats Poppin"

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Following go here</p>
      </div>


    </div>
  </div>;
}

export default Following
