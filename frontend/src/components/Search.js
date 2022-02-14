import React from 'react'
import './Search.css'

import usePlacesAutocomplete, {
    getGeocode,
    getLatLng,
} from "use-places-autocomplete";

import {
    Combobox,
    ComboboxInput,
    ComboboxPopover,
    ComboboxList,
    ComboboxOption,
    ComboboxOptionText,
} from "@reach/combobox";
import "@reach/combobox/styles.css";


function Search(props) {
    
    const {
        ready, 
        value, 
        suggestions: {status, data}, 
        setValue, 
        clearSuggestions,
    } = usePlacesAutocomplete({
        requestOptions: {
            location: {lat: () => 43.653225, lng: () => -79.383186},
            radius: 200 * 1000,
        },
    });



    return (
            <Combobox id='search'
                onSelect={async (address) => {
                    try {
                        const results = await getGeocode({address});
                        const {lat, lng} = await getLatLng(results[0]);
                        setValue(address, false);
                        clearSuggestions();
                        props.setSearchValues({address: address, lat, lng, zoom: 10});
                    } catch(error) {
                        console.log(error);
                    }
                }}
            >
                <ComboboxInput id='search' autoComplete='off' name='address'
                    value={value} 
                    onChange={(e) => {
                        setValue(e.target.value);
                    }}
                    disabled={!ready}
                    placeholder="Enter an address"
                />
                <ComboboxPopover>
                    <ComboboxList>
                        {status === "OK" && data.map(({id, description}) => (
                            <ComboboxOption key={id} value={description} />
                        ))} 
                    </ComboboxList>    
                </ComboboxPopover>
            </Combobox>
    )
}

export default Search
