import React from 'react';
import AccountSidebar from './AccountSidebar';

function MyEvents() {
  return <div>
    <h4 className='pageTitle'>My Events</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>user events go here</p>
      </div>


    </div>
  </div>;
}

export default MyEvents;
