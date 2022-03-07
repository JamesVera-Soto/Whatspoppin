import React, { useState, useEffect } from 'react'
import mapStyles from './mapStyles';
import './DisplayMap.css';

import {
    GoogleMap,
    Marker,
    InfoWindow
} from "@react-google-maps/api";


function DisplayMap(props) {

    
    const mapContainerStyle = {
        width: '60vw',
        height: 'calc(100vh - 108px)',
    }
    const [center, setCenter] = useState({
        lat: props.searched.lat,
        lng: props.searched.lng,
        zoom: 1
    })

    useEffect(() => {
        setCenter({
            lat: props.searched.lat,
            lng: props.searched.lng,
            zoom: props.searched.lat === 0 ? 2 : 10
        })
    }, [props.searched])

    const options = {
        styles: mapStyles,
        disableDefaultUI: true,
        zoomControl: true,
    }

    const [markers, setMarkers] = useState([]);
    const [selected, setSelected] = useState(null);


    const mapRef = React.useRef();
    const onMapLoad = React.useCallback((map) => {
        mapRef.current = map;
    }, []);

    useEffect(() => {
        props.events.map((event) => {
            if(event.name === "") return;
            setMarkers(current => [...current, {
                name: event.name,
                description: event.description,
                lat: event.lat,
                lng: event.lng,
            }])
        })
    }, [props.events]);

    function handleCenterChanged() {
        if (!mapRef.current) return;
        const newPos = mapRef.current.getCenter().toJSON();
        setCenter(newPos);
      }

    return (
        <div className='map-container'>
            <GoogleMap 
            onDragEnd={handleCenterChanged}
            mapContainerStyle={mapContainerStyle} 
            zoom={center.zoom} 
            center={center}
            options={options}
            onLoad={onMapLoad}
            >
                {markers.map((marker, i) => 
                    <Marker 
                        key={i} 
                        position={{lat: marker.lat, lng: marker.lng}} // come back and set up unique key
                        icon={{
                            url: "/pink-marker.svg",
                            scaledSize: new window.google.maps.Size(22, 33),
                        }}
                        onClick={() => {
                            setSelected(marker);
                        }}
                    />
                )} 

                {selected ? (
                    <InfoWindow position={{lat: selected.lat, lng: selected.lng}} onCloseClick={() => {
                        setSelected(null);
                    }}>
                        <div>
                            <h2>{selected.name}</h2>
                            <p>{selected.description}</p>
                        </div>
                    </InfoWindow>
                    ) : null}
            </GoogleMap>
        </div>
    )
}

export default DisplayMap
