import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate, useRouteAddress } from '../../AuthApi';
import AccountSidebar from './AccountSidebar';
import './Follow.css'

function Following() {

  document.title = "Following - Whats Poppin"

  const navigate = useNavigate();

  const authUser = useAuthApi()
  const authUserUpdate = useAuthApiUpdate()
  const routeAddress = useRouteAddress()

  var folder = "/avatars/"

  const [userFollowing, setUserFollowing] = useState(authUser.currentUser !== null ? authUser.currentUser.following : [])

  var url = new URL(routeAddress + '/api/basicUserInfo/')
  var params = {usernames: userFollowing}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch(url).then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        console.log("oops idk")
      }
    }).then(jsonRes => {setUserFollowing(jsonRes)})
  }, []);

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <h4>Following</h4>

        {userFollowing.map(following => {
          return (
            <div className='follow-box' onClick={() => {navigate('/organizer/' + following.username)}}>
              <img src={folder + following.avatar} className='small-avatar-img' alt=''></img>
              <p>{following.username}</p>
            </div>
          )
        })}
      </div>


    </div>
  </div>;
}

export default Following
