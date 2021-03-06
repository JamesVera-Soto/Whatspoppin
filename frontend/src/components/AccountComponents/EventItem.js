import React from 'react';
import './EventItem.css'
import { format } from 'date-fns'
import Carousel from 'react-bootstrap/Carousel'

function EventItem(props) {

    var multipleImages = true
    if(props.event.imgs.length === 0) props.event.imgs = ['placeholder-image.png']
    if(props.event.imgs.length === 1) multipleImages = false

    function handleOnClickDelete() {
        props.onDelete(props.event._id)
    }

    function handleOnClickView() {
        props.onView(props.event._id)
    }

    function handleOnClickEdit() {
        props.onEdit(props.event._id)
    }


  return <div className='event-item'>
    <span title='delete'>
        <button className='event-item-del-btn' onClick={handleOnClickDelete}><i className="fas fa-ban"></i></button>
    </span>
    <span title='view'>
        <button className='event-item-view-btn' onClick={handleOnClickView}><i className="fas fa-eye"></i></button>
    </span>
    <span title='edit'>
        <button className='event-item-edit-btn' onClick={handleOnClickEdit}><i className="fas fa-edit"></i></button>
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
                                <h3>{props.event.name.substr(0,35)}</h3>
                                <p>{props.event.description.substr(0, 50)}</p>
                                </Carousel.Caption>
                            </Carousel.Item>)
                        })}
                    </Carousel>
  </div>;
}

export default EventItem;
