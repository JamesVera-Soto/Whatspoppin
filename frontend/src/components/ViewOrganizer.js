import React, { useEffect, useState, useContext } from 'react';
import { useParams } from 'react-router-dom';
import AuthApi from '../AuthApi';
import axios from 'axios';

function ViewOrganizer() {

  const authUser = useContext(AuthApi)

  const { id } = useParams()
  const [organizer, setOrganizer] = useState({
    username: "Loading...",
    success: false
  })

  const currentlyFollowing = authUser.currentUser !== null && authUser.currentUser.following.includes(id)

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

  function handleFollow() {
    if(!currentlyFollowing){
      axios.all([
        axios.post('http://localhost:3001/api/updateUser', {
          findByField: "_id", 
          findByValue: authUser.currentUser._id, 
          field: "following", 
          action: "push",
          value: id
        }),
        axios.post('http://localhost:3001/api/updateUser', {
          findByField: "username", 
          findByValue: id, 
          field: "followers", 
          action: "push",
          value: authUser.currentUser.username
        })
      ])
      .then(axios.spread((res1, res2) => {
        console.log("res1: ", res1, "res2: ", res2)
      }))

      
    }
    else {
      console.log("unfollowing...")
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
    <h4 className='pageTitle'>{organizer.username}</h4>
    <button onClick={authUser.auth ? handleFollow : () => {console.log("must be logged in")}}>{currentlyFollowing ? "Unfollow" : "Follow"}</button>
    <p>{organizer.email}</p>
    {organizer.userEvents.map(event => {
      return <p>{event}</p>
    })}
  </div>
}

export default ViewOrganizer;
