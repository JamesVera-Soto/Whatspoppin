import React, {useEffect, useState, useContext} from 'react';
import Search from './Search';
import './CreateEvent.css';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import axios from 'axios';
import AuthApi from '../AuthApi';
import {useLoadScript} from "@react-google-maps/api";

const libraries = ['places'];

function CreateEvent() {


    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const authUser = useContext(AuthApi)

    const blankEvent = {
        id: 1,
        name: "",
        address: "",
        lat: 0,
        lng: 0,
        description: "",
        imgs: "",
        startDatetime: "",
        endDatetime: "",
        organizer: authUser.currentUser.username,
    }

    const [searchValues, setSearchValues] = useState({address: "", lat: 0, lng: 0, zoom: 1});
    const [eventInput, setEventInput] = useState(blankEvent)

    useEffect(() => {
        setEventInput(prevInput => {
            return {
                ...prevInput,
                address: searchValues.address,
                lat: searchValues.lat,
                lng: searchValues.lng,
            }
        })
    }, [searchValues]);

    function handleChange(event){
        let {name, value} = event.target;

        console.log(event);

        if(name === "imgs") {
            value = event.target.files;
        }

        setEventInput(prevInput => {
            console.log(prevInput);
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    function handleClick(event){
        event.preventDefault();

        const formData = new FormData();

        formData.append("name", eventInput.name);
        formData.append("description", eventInput.description);
        formData.append("address", eventInput.address);
        formData.append("lat", searchValues.lat);
        formData.append("lng", searchValues.lng);
        formData.append("startDatetime", eventInput.startDatetime);
        formData.append("endDatetime", eventInput.endDatetime);
        formData.append("organizer", authUser.currentUser.username);
        formData.append("organizerId", authUser.currentUser._id);
        for(let img of eventInput.imgs){
            formData.append("imgs[]", img)
        }

        axios.post('/create-event', formData);

        setEventInput(blankEvent);
    }

  return <div className='create-event-container'>
      <div className='create-event-form'>
      <h4 className='pageTitle'>Create Event</h4>
        <form onSubmit={handleClick} className='p-5' encType='multipart/form-data'>
            <div className='form-group mb-3'>
            <input name='name' onChange={handleChange} autoComplete='off' className='form-control' placeholder='name' value={eventInput.name}></input>
            </div>

            <textarea name='description' onChange={handleChange} autoComplete='off' className='form-control form-control mb-3' rows={3} placeholder='description' value={eventInput.description}></textarea>

            <div className="custom-file mb-3">
                <Search onChange={handleChange} setSearchValues={setSearchValues} value={eventInput.address} />
            </div>

            <div className="custom-file mb-3">
                <div className='event-dateTimePicker'>From: <DateTimePickerComponent onChange={handleChange} name='startDatetime' id="datetimepicker" placeholder='Select starting date and time' width={300} value={eventInput.startDatetime} /></div>
                <div className='event-dateTimePicker'>To: <DateTimePickerComponent onChange={handleChange} name='endDatetime' id="datetimepicker" placeholder='Select ending date and time' width={300} value={eventInput.endDatetime} /></div>
            </div>

            <div className="custom-file mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Select images to upload</label>
                <input name='imgs' filename='imgs' onChange={handleChange} className="form-control" type="file" id="formFileMultiple" multiple />
            </div>

            

            <button type='submit' className='btn btn-lg btn-info btn-pink'>Add Event</button>
        </form>
    </div>
  </div>;
}

export default CreateEvent;
