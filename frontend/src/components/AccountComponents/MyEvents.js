import React, { useState, useEffect, useContext } from 'react';
import AccountSidebar from './AccountSidebar';
import AuthApi from '../../AuthApi';
import EventItem from './EventItem';
import './EventItem.css'
import axios from 'axios'

function MyEvents() {

  const [events, setEvents] = useState([]);
  const [updated, setUpdated] = useState(false)

  const authUser = useContext(AuthApi)

  console.log("username",authUser.currentUser.username)

  var url = new URL('http://localhost:3000/account/my-events')
  var params = {organizer: authUser.currentUser.currentUser}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch('http://localhost:3001/account/my-events/' + authUser.currentUser.username).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).then(jsonRes => setEvents(jsonRes));
  }, [updated]);

  async function deleteEvent(id) {
    var result = window.confirm("Are you sure you want to delete this event?")
    if(result) {
        console.log("deleting")
        const mes = await axios.post('/account/my-events/delete', {id: id})
        console.log(mes)
        setUpdated(!updated)
    }
  }

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>My Events</p>
        {events.map(event => {
          return(
            <EventItem event={event} onDelete={deleteEvent} />
          )
        })}
      </div>


    </div>
  </div>;
}

export default MyEvents;
