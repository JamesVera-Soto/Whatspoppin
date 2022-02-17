import React from 'react';
import CreateEvent from '../CreateEvent';
import AccountSidebar from './AccountSidebar';

function AccountCreateEvent() {
    return <div>
    <h4 className='pageTitle'>Create Event</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <CreateEvent />
      </div>


    </div>
  </div>;
}

export default AccountCreateEvent;
