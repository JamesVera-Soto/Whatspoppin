import React, { useState, useEffect, useContext } from 'react';
import AccountSidebar from './AccountSidebar';
import { useAuthApi, useAuthApiUpdate, useRouteAddress } from '../../AuthApi';
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
  const routeAddress = useRouteAddress()

  var url = new URL(routeAddress + '/api/account/my-events')
  var params = {organizer: authUser.currentUser.currentUser}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch(routeAddress + '/api/account/my-events/' + authUser.currentUser._id).then(res => {
      if(res.ok) {
        return res.json();
      }
    }).then(jsonRes => setEvents(jsonRes));
  }, [updated, routeAddress]);

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
