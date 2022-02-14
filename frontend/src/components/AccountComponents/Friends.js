import React from 'react';
import AccountSidebar from './AccountSidebar';

function Friends() {
  return <div>
    <h4 className='pageTitle'>Friends</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>friends go here</p>
      </div>


    </div>
  </div>;
}

export default Friends
;
