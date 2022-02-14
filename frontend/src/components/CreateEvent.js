import React, {useEffect, useState} from 'react';
import Search from './Search';
import './CreateEvent.css';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import axios from 'axios';

function CreateEvent() {

    const [searchValues, setSearchValues] = useState({address: "", lat: 0, lng: 0, zoom: 1});

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
    }

    const [eventInput, setEventInput] = useState(blankEvent)

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
        for(let img of eventInput.imgs){
            formData.append("imgs[]", img)
        }

        axios.post('http://localhost:3001/create-event', formData);

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
