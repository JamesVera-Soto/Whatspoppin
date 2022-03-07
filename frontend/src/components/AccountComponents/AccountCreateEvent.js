import React from 'react';
import CreateEvent from '../CreateEvent';
import AccountSidebar from './AccountSidebar';

function AccountCreateEvent() {

    document.title = "Create Event - Whats Poppin"

    return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <CreateEvent />
      </div>


    </div>
  </div>;
}

export default AccountCreateEvent;
