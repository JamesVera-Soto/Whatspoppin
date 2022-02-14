import React from 'react';
import AccountSidebar from './AccountSidebar';

function Subscriptions() {
  return <div>
    <h4 className='pageTitle'>Subscriptions</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Subscriptions go here</p>
      </div>


    </div>
  </div>;
}

export default Subscriptions;
