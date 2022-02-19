import React from 'react';
import './EventItem.css'
import { format } from 'date-fns'
import Carousel from 'react-bootstrap/Carousel'
import axios from 'axios'

function EventItem(props) {

    var multipleImages = true
    if(props.event.imgs.length === 0) props.event.imgs = ['placeholder-image.png']
    if(props.event.imgs.length === 1) multipleImages = false

    function deleteEvent() {
        axios.post('/account/my-events/delete', {id: props.event._id})
    }

  return <div className='event-item'>
    <span title='delete'>
        <button className='event-item-del-btn' onClick={() => {
            var result = window.confirm("Are you sure you want to delete this event?")
            if(result) {
                console.log("deleting")
                console.log(deleteEvent())
                props.changeOccured(prevVal => {return prevVal+1})
            }
        }}><i className="fas fa-ban"></i></button>
    </span>
    <span title='view'>
        <button className='event-item-view-btn'><i className="fas fa-eye"></i></button>
    </span>
    <span title='edit'>
        <button className='event-item-edit-btn'><i className="fas fa-edit"></i></button>
    </span>
    <Carousel controls={multipleImages} interval={null}>
                        {props.event.imgs.map(img => {
                            return(
                            <Carousel.Item className='carousel-event-item'>
                                <img
                                className="d-block w-100 carousel-event-img"
                                src={'/eventImages/' + img}
                                alt="img slide"
                                />
                                <Carousel.Caption>
                                <h3>{props.event.name}</h3>
                                <p>{props.event.description}</p>
                                </Carousel.Caption>
                            </Carousel.Item>)
                        })}
                    </Carousel>
  </div>;
}

export default EventItem;
