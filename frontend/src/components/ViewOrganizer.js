import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

function ViewOrganizer() {

    const { id } = useParams()
    const [organizer, setOrganizer] = useState({
      username: "Loading...",
      success: false
    })
    
    var url = new URL('http://localhost:3000/organizer')
    var params = {id: id}
    url.search = new URLSearchParams(params).toString()

    useEffect(() => {
      fetch('http://localhost:3001/organizer/' + id).then(res => {
        if(res.ok) {
          return res.json()
        }
        else {
          setOrganizer({name: "Sorry something went wrong"})
        }
      }).then(jsonRes => setOrganizer(jsonRes))
    }, []);

    console.log(organizer)

  if(organizer.success === false) return <div>
    <h4 className='pageTitle'>View organizer here: {id}</h4>
    <div>
      <p>{organizer.username}</p>
    </div>
  </div>;

  else return <div>
    <h4 className='pageTitle'>{organizer.username}</h4>
    <p>{organizer.email}</p>
    {organizer.userEvents.map(event => {
      return <p>{event}</p>
    })}
  </div>
}

export default ViewOrganizer;
