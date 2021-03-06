import React, {useState} from 'react'
import './DisplayEvents.css'
import { format } from 'date-fns'
import Carousel from 'react-bootstrap/Carousel'
import { Link } from 'react-router-dom';
import useWindowSize from '../useWindowSize';

function DisplayEvents(props) {

    const [height, width] = useWindowSize()
    
    return props.events.length === 0 ? <div className='displayEvents'>No events found</div> :
    (
        <ul className='displayEvents'>
        {props.events.map((event, i) => {

            var multipleImages = true
            if(event.imgs.length === 0) event.imgs = ['placeholder-image.png']
            if(event.imgs.length === 1) multipleImages = false
            
            return (
                <li key={i} className='event'>
                    
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
                    <h2 className='title-text'><Link className='DEtitle-txt' to={"/event/" + event._id} >{event.name}</Link></h2>
                    
                    <p className='address'>{event.address}</p>
                    <p>{event.description}</p>
                    <p>{format(new Date(event.startDatetime), 'MMMM dd, yyyy, p')} - {format(new Date(event.endDatetime), 'MMMM dd, yyyy, p')}</p>
                    <p>Organizer: <Link to={"/organizer/" + event.organizer} >{event.organizer}</Link></p>
                </li>
            )}
        )}
        </ul>
    )
}

export default DisplayEvents
