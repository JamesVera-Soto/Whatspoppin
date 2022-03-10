import React, {useState} from 'react';
import './AccountHome.css'
import { format } from 'date-fns'
import AccountSidebar from './AccountSidebar';
import { useAuthApi, useAuthApiUpdate } from '../../AuthApi';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
    

function AccountHome() {

  const navigate = useNavigate()

  const blankInput = {
    password: "",
    confirmPassword: ""
  }

  const [changePassword, setChangePassword] = useState(blankInput)
  const [successMes, setSuccessMes] = useState("")

  document.title = "Account - Whats Poppin"

  const authUser = useAuthApi()
  const authUserUpdate = useAuthApiUpdate()

  async function handleClick(event) {
    event.preventDefault();
    if(changePassword.password !== changePassword.confirmPassword) console.log("passwords don't match")
    else{
      const mes = await axios.post('http://localhost:3001/api/updateUser', {
          findByField: "_id", 
          findByValue: authUser.currentUser._id, 
          field: "password", 
          action: '$set',
          value: changePassword.password
      })
      setSuccessMes(mes.data)
      setChangePassword({
        password: "",
        confirmPassword: ""
      })
    }
  }

  function handleChange(event) {
    let {name, value} = event.target;

    setChangePassword(prevInput => {
        return {
            ...prevInput,
            [name]: value,
        }
    })
  }

  async function deleteAccount() {
    var result = window.confirm("Are you sure you want to delete your account?")
    if(result) {
      console.log("deleting account...")
      const mes = await axios.post('http://localhost:3001/api/deleteAccount', {
        id: authUser.currentUser._id,
        username: authUser.currentUser.username
      })
      console.log(mes)
      if(mes.data === 'success') {
        navigate('/')
        authUserUpdate()
      }
    }
  }

  return <div>
    <div className='account-container'>
      <AccountSidebar />

      <div className='account-content'>
        <p>Username: {authUser.currentUser.username}</p>
        <p>email: {authUser.currentUser.email}</p>
        <p>Joined: {format(new Date(authUser.currentUser.memberSince), 'MMMM dd, yyyy, p')}</p>
        
          <span>Change Password</span>
          <form onSubmit={handleClick} >
            <div data-validate="Enter password">
              <input onChange={handleChange} type="password" name="password" placeholder="Password" value={changePassword.password}/>
            </div>

            <div data-validate="Enter password">
              <input onChange={handleChange} type="password" name="confirmPassword" placeholder="Confirm Password" value={changePassword.confirmPassword}/>
            </div>
            <div>
            <button type="submit">
              Update
            </button>
          </div>
          </form>
          {successMes !== "" ? 
					<div>
						<p className='errorHint' style={{color: 'green'}}>{successMes}</p>
					</div> : null}

        <span>Delete Account</span><br></br>
        <button onClick={deleteAccount} >Delete Account</button>
      </div>


    </div>
  </div>;
}

export default AccountHome;
