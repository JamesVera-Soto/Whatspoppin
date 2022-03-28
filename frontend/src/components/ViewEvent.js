import React, { useEffect, useState } from 'react';
import { Link, useParams} from 'react-router-dom'
import { format } from 'date-fns'
import Carousel from 'react-bootstrap/Carousel'
import './ViewEvent.css'

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

  var multipleImages = true
  if(event.success !== false && event.imgs.length === 0) event.imgs = ['placeholder-image.png']
  if(event.success !== false && event.imgs.length === 1) multipleImages = false
  

  if(event.success === false) return <div>
    <h4 className='pageTitle'>View event here: {id}</h4>
    <div>
      <p>{event.name}</p>
    </div>
  </div>;

  else return <div className='event-container'>
    <h4 className='pageTitle'>{event.name}</h4>
    <h4>Description</h4>
    <p>{event.description}</p>
    <h4>Address</h4>
    <p>{event.address}</p>
    <h4>Time</h4>
    <p>{format(new Date(event.startDatetime), 'MMMM dd, yyyy, p')} - {format(new Date(event.endDatetime), 'MMMM dd, yyyy, p')}</p>
    <Carousel controls={multipleImages} interval={null}>
        {event.imgs.map(img => {
            return(
            <Carousel.Item className='DEcarousel-item'>
                <img
                className="d-block w-100 DEcarousel-img"
                src={'/eventImages/' + img}
                alt="First slide"
                />
                <Carousel.Caption>
                </Carousel.Caption>
            </Carousel.Item>)
        })}
    </Carousel>
    <p>Organizer: <Link to={"/organizer/" + event.organizer}>{event.organizer}</Link></p>
    <iframe name="gMap" src={`https://www.google.com/maps/embed/v1/place?q=${event.lat},${ event.lng}&key=${process.env.REACT_APP_GOOGLE_MAPS_API_KEY}`} width="400px" height="400px"></iframe>
  </div>
}


export default ViewEvent;
