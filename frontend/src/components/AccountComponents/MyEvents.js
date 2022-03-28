import React, { useState, useEffect, useContext } from 'react';
import AccountSidebar from './AccountSidebar';
import { useAuthApi, useAuthApiUpdate } from '../../AuthApi';
import EventItem from './EventItem';
import './EventItem.css'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

function MyEvents() {

  document.title = "My Events - Whats Poppin"

  const navigate = useNavigate()
  const [events, setEvents] = useState([]);
  const [updated, setUpdated] = useState(false)

  const authUser = useAuthApi()

  var url = new URL('http://localhost:3000/account/my-events')
  var params = {organizer: authUser.currentUser.currentUser}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch('http://localhost:3001/api/account/my-events/' + authUser.currentUser._id).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).then(jsonRes => setEvents(jsonRes));
  }, [updated]);

  async function deleteEvent(id) {
    var result = window.confirm("Are you sure you want to delete this event?")
    if(result) {
        const mes = await axios.post('/account/my-events/delete', {id: id})
        setUpdated(!updated)
    }
  }

  function viewEvent(id) {
    navigate('/event/' + id)
  }

  function onEdit(id) {
    navigate('/account/my-events/' + id)
  }

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <h4>My Events</h4>
        {events.map(event => {
          return(
            <EventItem event={event} onDelete={deleteEvent} onView={viewEvent} onEdit={onEdit} />
          )
        })}
      </div>


    </div>
  </div>;
}

export default MyEvents;
