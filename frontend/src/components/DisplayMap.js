import React, { useState, useEffect } from 'react'
import mapStyles from './mapStyles';
import './DisplayMap.css';
import useWindowSize from '../useWindowSize';

import {
    GoogleMap,
    Marker,
    InfoWindow
} from "@react-google-maps/api";


function DisplayMap(props) {

    const [height, width] = useWindowSize()

    console.log(props)

    
    const [mapContainerStyle, setMapContainerStyle] = useState({
        width: width < 600 ? '10vw' : '60vw',
        height: 'calc(100vh - 70px)',
    })

    useEffect(() => {
        console.log(width)
        setMapContainerStyle({
            width: width < 600 ? '100vw' : '60vw',
            height: 'calc(100vh - 70px)',
        })
    }, [width])

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

    function Locate(props){
        return(
            <button 
                className='locate'
                onClick={() => {
                    navigator.geolocation.getCurrentPosition(
                        (position) => {
                            setCenter({
                                lat: position.coords.latitude,
                                lng: position.coords.longitude,
                                zoom: 10,
                            });
                        },
                        () => null
                    );
                }}
            >
                <i className="fas fa-compass fa-2x"></i>
            </button>
        );
    }

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
            <span title='Find your location'>
                <Locate setSearched={props.setSearched} />
            </span>
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
