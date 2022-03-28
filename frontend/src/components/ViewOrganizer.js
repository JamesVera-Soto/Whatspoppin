import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate } from '../AuthApi';
import axios from 'axios';
import DisplayEvents from './DisplayEvents';
import './ViewOrganizer.css'

function ViewOrganizer() {

  const authUser = useAuthApi()
  const authUserUpdate = useAuthApiUpdate()

  const { id } = useParams()
  const [organizer, setOrganizer] = useState({
    username: "Loading...",
    success: false
  })

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

  const currentlyFollowing = authUser.currentUser !== null && authUser.currentUser.following.includes(id)

  var url = new URL('http://localhost:3000/api/organizer')
  var params = {id: id}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch('http://localhost:3001/api/organizer/' + id).then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        setOrganizer({name: "Sorry something went wrong"})
      }
    }).then(jsonRes => setOrganizer(jsonRes))

    fetch('http://localhost:3001/api/events').then(res => {
      if(res.ok) {
        return res.json()
      }
    }).then(jsonRes => setEvents(jsonRes));
  }, []);


  function handleFollow() {
    if(!currentlyFollowing){
      axios.all([
        axios.post('http://localhost:3001/api/updateUser', {
          findByField: "_id", 
          findByValue: authUser.currentUser._id, 
          field: "following", 
          action: '$push',
          value: id
        }),
        axios.post('http://localhost:3001/api/updateUser', {
          findByField: "username", 
          findByValue: id, 
          field: "followers", 
          action: '$push',
          value: authUser.currentUser.username
        })
      ])
      .then(axios.spread((res1, res2) => {
        authUserUpdate()
      }))

      
    }
    else {
      axios.all([
        axios.post('http://localhost:3001/api/updateUser', {
          findByField: "_id", 
          findByValue: authUser.currentUser._id, 
          field: "following", 
          action: '$pull',
          value: id
        }),
        axios.post('http://localhost:3001/api/updateUser', {
          findByField: "username", 
          findByValue: id, 
          field: "followers", 
          action: '$pull',
          value: authUser.currentUser.username
        })
      ])
      .then(axios.spread((res1, res2) => {
        authUserUpdate()
      }))
    }

  }

  console.log(organizer)

  if(organizer.success === false) return <div>
    <h4 className='pageTitle'>View organizer here: {id}</h4>
    <div>
      <p>{organizer.username}</p>
    </div>
  </div>;

  else return <div>
    <div className='organizerPane'>
      <h4>{organizer.username}</h4>
      <img src='/person-placeholder.png' className='organizer-avatar' alt=''></img>
      <p>{organizer.email}</p>
      <button onClick={authUser.auth ? handleFollow : () => {console.log("must be logged in")}}>{currentlyFollowing ? "Unfollow" : "Follow"}</button>
    </div>
    
    <div className='eventsPane'>
      <DisplayEvents events={events.filter(event => {return event.organizer === id})} />
    </div>
    
  </div>
}

export default ViewOrganizer;
