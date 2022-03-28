import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate, useRouteAddress } from '../../AuthApi';
import AccountSidebar from './AccountSidebar';
import './Follow.css'

function Followers() {

  document.title = "Followers - Whats Poppin"

  const navigate = useNavigate();

  const authUser = useAuthApi()
  const authUserUpdate = useAuthApiUpdate()
  const routeAddress = useRouteAddress()

  var folder = "/avatars/"

  const [userFollowers, setUserFollowers] = useState(authUser.currentUser !== null ? authUser.currentUser.followers : [])

  var url = new URL(routeAddress + '/api/basicUserInfo/')
  var params = {usernames: userFollowers}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch(url).then(res => {
      console.log(res)
      if(res.ok) {
        return res.json()
      }
      else {
        console.log("oops idk")
      }
    }).then(jsonRes => {setUserFollowers(jsonRes)})
  }, []);

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <h4>Followers</h4>

        {userFollowers.map((follower) => {
          return (
            <div className='follow-box' onClick={() => {navigate('/organizer/' + follower.username)}}>
              <img src={folder + follower.avatar} className='small-avatar-img' alt=''></img>
              <p>{follower.username}</p>
            </div>
          )
        })}
      </div>


    </div>
  </div>;
}

export default Followers
