import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuthApi, useAuthApiUpdate } from '../../AuthApi';
import AccountSidebar from './AccountSidebar';
import './Follow.css'

function Followers() {

  document.title = "Followers - Whats Poppin"

  const navigate = useNavigate();

  const authUser = useAuthApi()
  const authUserUpdate = useAuthApiUpdate()

  const userFollowers = authUser.currentUser !== null && authUser.currentUser.followers

  var url = new URL('http://localhost:3001/api/basicUserInfo/')
  var params = {usernames: userFollowers}
  url.search = new URLSearchParams(params).toString()

  useEffect(() => {
    fetch(url).then(res => {
      if(res.ok) {
        return res.json()
      }
      else {
        console.log("oops idk")
      }
    }).then(jsonRes => {console.log(jsonRes)})
  }, []);

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <h4>Followers</h4>

        {userFollowers.map(follower => {
          return (
            <div className='follow-box' onClick={() => {navigate('/organizer/' + follower)}}>
              <img src='/person-placeholder.png' className='small-avatar-img' alt=''></img>
              <p>{follower}</p>
            </div>
          )
        })}
      </div>


    </div>
  </div>;
}

export default Followers
