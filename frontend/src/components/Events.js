import React, {useEffect, useState} from 'react';
import Search from './Search';
import DisplayMap from './DisplayMap';
import DisplayEvents from './DisplayEvents';
import './Events.css';
import {useLoadScript} from "@react-google-maps/api";

const libraries = ['places'];

function Events() {

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [searchValues, setSearchValues] = useState({address: "", lat: 0, lng: 0, zoom: 1});

  const [events, setEvents] = useState([{
      name: "",
      address: "",
      lat: 0,
      lng: 0,
      description: "",
      imgs: [],
      startDatetime: "2022-01-26T06:00:00.000Z",
      endDatetime: "2022-01-26T06:00:00.000Z",
  }]);

  useEffect(() => {
    fetch('http://localhost:3001/events').then(res => {
      if(res.ok) {
        return res.json();
      }
    }).then(jsonRes => setEvents(jsonRes));
  }, [searchValues]);

  console.log(events);

  
  if (loadError) return "Error";
  if (!isLoaded) return "Loading..";

  return (
    <div>
      <h4 className='pageTitle events-title'>Events</h4>
      
      <div className='events-parent'>
        <div className='position-fix'>
          <div className='events-child-map'>
            <div className='events-search'>
              <Search setSearchValues={setSearchValues} />
            </div>
            <DisplayMap events={events} setSearched={setSearchValues} searched={searchValues} />
          </div>
          <div className='events-child-events'>
            <DisplayEvents events={events} />
          </div>
        </div>
      </div>

    </div>);
}

export default Events;


