import React, { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import './EditEvent.css'
import axios from 'axios';

function EditEvent() {

    const { id } = useParams()
    const [event, setEvent] = useState({
        name: "Loading...",
        success: false
    })

    useEffect(() => {
        fetch('http://localhost:3001/event/' + id).then(res => {
            if(res.ok) {
                return res.json();
            }
            else {
                setEvent({name: "Sorry something went wrong"})
            }
        }).then(jsonRes => setEvent(jsonRes));
    }, []);


    if(event.success === false) return <div>
        <h4 className='pageTitle'>View event here: {id}</h4>
        <div>
        <p>{event.name}</p>
        </div>
    </div>;

    else return <div className='edit-event-container'>
        <h4 className='pageTitle'>Edit event: "{event.name}"</h4>

        <h5>Title</h5>
        <p>{event.name}</p>

        <h5>Description</h5>
        <p>{event.description}</p>

        <h5>Address</h5>
        <p>{event.address}</p>

        <h5>Starting Date and Time</h5>
        <p>{event.startDatetime}</p>

        <h5>Ending Date and Time</h5>
        <p>{event.endDatetime}</p>

        <button>Update Event</button>

    </div>
    
}

export default EditEvent