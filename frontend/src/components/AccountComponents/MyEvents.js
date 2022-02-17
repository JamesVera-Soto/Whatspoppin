import React, { useState, useEffect, useContext } from 'react';
import AccountSidebar from './AccountSidebar';
import AuthApi from '../../AuthApi';

function MyEvents() {

  const [events, setEvents] = useState([]);

  const authUser = useContext(AuthApi)

  console.log("username",authUser.currentUser.username)

  var url = new URL('http://localhost:3000/account/my-events')
  var params = {organizer: authUser.currentUser.currentUser}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch('/account/my-events/' + authUser.currentUser.userEvents[0]).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).then(jsonRes => setEvents([jsonRes]));
    console.log("events",events)
  }, []);

  return <div>
    <h4 className='pageTitle'>My Events</h4>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>user events go here</p>
        {events.map(event => {
          return(
            <div>{event.name}</div>
          )
        })}
      </div>


    </div>
  </div>;
}

export default MyEvents;
