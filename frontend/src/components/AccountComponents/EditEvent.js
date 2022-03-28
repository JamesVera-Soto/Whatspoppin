import React, { useState, useEffect } from 'react'
import { Link, useParams} from 'react-router-dom'
import './EditEvent.css'
import axios from 'axios';
import {DateTimePickerComponent} from '@syncfusion/ej2-react-calendars';
import {useLoadScript} from "@react-google-maps/api";
import Search from '../Search'
import { useRouteAddress } from '../../AuthApi';

const libraries = ['places'];

function EditEvent() {

    const routeAddress = useRouteAddress()

    const {isLoaded, loadError} = useLoadScript({
        googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
        libraries,
    });

    const { id } = useParams()
    const [event, setEvent] = useState({
        name: "Loading...",
        success: false
    })

    const [incorrectField, setIncorrectField] = useState({
		status: false,
		hint: "",
        success: false
	})

    const [changes, setChanges] = useState({
        name: "",
        description: "",
        address: "",
        startDatetime: "",
        endDatetime: ""
    })
    const [searchValues, setSearchValues] = useState({address: "", lat: 0, lng: 0, zoom: 1})
    const [imgActive, setImgActive] = useState()

    useEffect(() => {
        fetch(routeAddress + '/api/event/' + id).then(res => {
            if(res.ok) {
                return res.json();
            }
            else {
                setEvent({name: "Sorry something went wrong"})
            }
        }).then(jsonRes => {
            var actImg = {}
            jsonRes.imgs.map(img => {actImg[img] = true})
            setImgActive(actImg)
            setEvent(jsonRes)
            setChanges(jsonRes)
            setChanges(prevInput => {
                return {
                    ...prevInput,
                    'addedImgs': []
                }
            })
            setSearchValues({
                address: jsonRes.address,
                lat: jsonRes.lat,
                lng: jsonRes.lng
            })
        });
    }, [routeAddress]);

    function handleChange(e){
        let {name, value} = e.target;

        if(name === "addedImgs") {
            value = e.target.files;
        }

        setChanges(prevInput => {
            console.log(prevInput)
            return {
                ...prevInput,
                [name]: value,
            }
        })
    }

    function removeAddImage(img) {
        // update changes using setChanges for imgs
        setChanges(prevInput => {
            var updateImgs = [...prevInput.imgs]
            const index = updateImgs.indexOf(img)
            if (index > -1) {
                updateImgs.splice(index, 1)
            }
            else {
                updateImgs.push(img)
            }
            return {
                ...prevInput,
                imgs: updateImgs
            }
        })

        // toggle img display style
        setImgActive(prevInput => {
            return {
                ...prevInput,
                [img]: !imgActive[img],
            }
        })
    }

    function handleReset() {
        setChanges(event)
        var actImg = {}
        event.imgs.map(img => {actImg[img] = true})
        setImgActive(actImg)

        setChanges(prevInput => {
            return {
                ...prevInput,
                'addedImgs': []
            }
        })
        setSearchValues({
            address: event.address,
            lat: event.lat,
            lng: event.lng
        })
    }

    async function handleClick(e){
        e.preventDefault();

        const formData = new FormData();

        formData.append("eventId", event._id)
        formData.append("name", changes.name);
        formData.append("description", changes.description);
        formData.append("address", searchValues.address);
        formData.append("lat", searchValues.lat);
        formData.append("lng", searchValues.lng);
        formData.append("startDatetime", changes.startDatetime);
        formData.append("endDatetime", changes.endDatetime);
        formData.append("organizer", event.organizer);
        for(let img of changes.imgs){
            formData.append("imgs[]", img)
        }
        for(let img of changes.addedImgs){
            formData.append("addedImgs[]", img)
        }

        const mes = await axios.post(routeAddress + '/api/update-event', formData);

        if(mes.status === 201){
            setIncorrectField({
                status: true,
                hint: "Event updated successfully!",
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


    if(event.success === false) return <div>
        <h4 className='pageTitle'>View event here: {id}</h4>
        <div>
        <p>{event.name}</p>
        </div>
    </div>;

    else return <div className='edit-event-container'>
        <h4 className='pageTitle'>Edit event: "{event.name}"</h4>

        <form onSubmit={handleClick} className='p-5' encType='multipart/form-data'>
            <h5>Title</h5>
            <p>{event.name}</p>
            <div>
                <input name='name' onChange={handleChange} autoComplete='off' className='form-control' placeholder='name' value={changes.name} required></input>
            </div> 


            <h5>Description</h5>
            <p>{event.description}</p>
            <div>
            <textarea name='description' onChange={handleChange} autoComplete='off' className='form-control form-control mb-3' rows={3} placeholder='description' value={changes.description} required></textarea>
            </div> 
                

            <h5>Address</h5>
            <p>{event.address}</p>
            <div>
                <div className="custom-file mb-3">
                    <Search onChange={handleChange} setSearchValues={setSearchValues} value={changes.address} />
                </div>
            </div> 
                

            <h5>Starting Date and Time</h5>
            <p>{event.startDatetime}</p>
            <div>
                <DateTimePickerComponent onChange={handleChange} name='startDatetime' id="datetimepicker" placeholder='Select starting date and time' width={300} value={changes.startDatetime} />
            </div> 


            <h5>Ending Date and Time</h5>
            <p>{event.endDatetime}</p>
            <div>
                <DateTimePickerComponent onChange={handleChange} name='endDatetime' id="datetimepicker" placeholder='Select ending date and time' width={300} value={changes.endDatetime} />
            </div> 
                

            <h5>Images (click image to remove/undo)</h5>
            {event.imgs.map(img => {
                return <img className={imgActive[img] ? 'img-activated' : 'img-deactivated'} onClick={() => removeAddImage(img)} src={'/eventImages/' + img} alt='image' ></img>
            })}
            <br></br>

            <div className="custom-file mb-3">
                <label htmlFor="formFileMultiple" className="form-label">Select images to upload</label>
                <input name='addedImgs' filename='addedImgs' onChange={handleChange} className="form-control" type="file" id="formFileMultiple" multiple />
            </div>

            {incorrectField.status ? 
					<div>
						<p className='errorHint' style={{color: [incorrectField.success ? 'green' : 'red']}}>{incorrectField.hint}</p>
					</div> : null}

            <button type='submit' className='btn btn-lg btn-info btn-pink'>Save Changes</button>
            <button type='button' onClick={handleReset} className='btn btn-lg btn-info'>Reset</button>
        </form>
    </div>
    
}

export default EditEvent
