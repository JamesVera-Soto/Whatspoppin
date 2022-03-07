import React from 'react';
import AccountSidebar from './AccountSidebar';

function Followers() {

  document.title = "Followers - Whats Poppin"

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>followers go here</p>
      </div>


    </div>
  </div>;
}

export default Followers
