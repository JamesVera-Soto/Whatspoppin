import React, {useEffect, useState, useContext} from 'react';
import Search from './Search';
import './CreateEvent.css';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import axios from 'axios';
import { useAuthApi, useAuthApiUpdate, useRouteAddress } from '../AuthApi';
import {useLoadScript} from "@react-google-maps/api";
import { useNavigate } from 'react-router-dom'

const libraries = ['places'];

function CreateEvent() {

    const navigate = useNavigate()

    const routeAddress = useRouteAddress()

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const authUser = useAuthApi()

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

    const [incorrectField, setIncorrectField] = useState({
		status: false,
		hint: "",
        success: false
	})

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

        if(name === "imgs") {
            value = event.target.files;
        }

        setEventInput(prevInput => {
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    async function handleClick(event){
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

        const mes = await axios.post(routeAddress + '/create-event', formData);

        if(mes.status === 201){
            setIncorrectField({
                status: true,
                hint: "Event created successfully!",
                success: true
            })
        }
        else{
            setIncorrectField({
              status: true,
              hint: mes.data.hint,
              success: false
            })
        }
    }

    if (loadError) return "Error";
    if (!isLoaded) return "Loading..";

  return <div className='create-event-container'>
      <div className='create-event-form'>
      <h4 className='pageTitle'>Create Event</h4>
        <form onSubmit={handleClick} className='p-5' encType='multipart/form-data'>
            <div className='form-group mb-3'>
            <input name='name' onChange={handleChange} autoComplete='off' className='form-control' placeholder='name' value={eventInput.name} required></input>
            </div>

            <textarea name='description' onChange={handleChange} autoComplete='off' className='form-control form-control mb-3' rows={3} placeholder='description' value={eventInput.description} required></textarea>

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

            {incorrectField.status ? 
					<div>
						<p className='errorHint' style={{color: [incorrectField.success ? 'green' : 'red']}}>{incorrectField.hint}</p>
					</div> : null}

            <button type='submit' className='btn btn-lg btn-info btn-pink'>Add Event</button>
        </form>
    </div>
  </div>;
}

export default CreateEvent;
