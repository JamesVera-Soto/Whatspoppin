import React, {useEffect, useState} from 'react';
import Search from './Search';
import DisplayMap from './DisplayMap';
import DisplayEvents from './DisplayEvents';
import './Events.css';
import {useLoadScript} from "@react-google-maps/api";
import useWindowSize from '../useWindowSize'

const libraries = ['places'];

function Events() {

  document.title = "Events - Whats Poppin"

  const {isLoaded, loadError} = useLoadScript({
    googleMapsApiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
    libraries,
  });

  const [height, width] = useWindowSize()

  const [searchValues, setSearchValues] = useState({address: "", lat: 0, lng: 0, zoom: 1});
  const [mapZIndex, setMapZIndex] = useState(0)

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
    fetch('http://localhost:3001/api/events').then(res => {
      if(res.ok) {
        return res.json();
      }
    }).then(jsonRes => setEvents(jsonRes));
  }, [searchValues]);

  
  if (loadError) return "Error";
  if (!isLoaded) return "Loading..";

  return (
      <div className='events-parent'>
        <div className='position-fix'>
          {width < 800 ? 
            <span title='Toggle map'>
              <button className='mapToggleBtn' onClick={() => {setMapZIndex(mapZIndex === 1 ? 0 : 1)}} >Map<i class="fa fa-map"></i></button>
            </span> : null}
          <div className='events-child-map' style={{zIndex: mapZIndex}}>
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
  )
}

export default Events;


