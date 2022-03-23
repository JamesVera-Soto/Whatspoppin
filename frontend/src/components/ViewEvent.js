import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom'
import axios from 'axios';

function ViewEvent() {

  const { id } = useParams()
  const [event, setEvent] = useState({
    name: "Loading...",
    success: false
  })

  useEffect(() => {
    fetch('http://localhost:3001/api/event/' + id).then(res => {
      if(res.ok) {
        return res.json();
      }
      else {
        setEvent({name: "Sorry something went wrong"})
      }
    }).then(jsonRes => setEvent(jsonRes));
  }, []);

  console.log(event)
  

  if(event.success === false) return <div>
    <h4 className='pageTitle'>View event here: {id}</h4>
    <div>
      <p>{event.name}</p>
    </div>
  </div>;

  else return <div>
    <h4 className='pageTitle'>{event.name}</h4>
    <p>{event.description}</p>
    <p>{event.address}</p>
    <p>{event.startDatetime}</p>
    <p>{event.endDatetime}</p>
    <p>Organizer: <Link to={"/organizer/" + event.organizer}>{event.organizer}</Link></p>
    <iframe name="gMap" src={`https://www.google.com/maps/embed/v1/place?q=${event.lat},${ event.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} width="400px" height="400px"></iframe>
  </div>
}


export default ViewEvent;
