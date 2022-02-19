import React, {useState} from 'react';
import './LoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

function Signup() {

  const navigate = useNavigate();

  const blankInput = {
    username: "",
    email: "",
    password: "",
    confirmPassword: ""
  }

  const [signupInput, setSignupInput] = useState(blankInput)
  const [incorrectField, setIncorrectField] = useState({
		status: false,
		hint: ""
	})

  function handleChange(event){
      let {name, value} = event.target;

      console.log(event);

      setSignupInput(prevInput => {
          console.log(prevInput);
          return {
              ...prevInput,
              [name]: value,
          }
      })
  }

  async function handleClick(event){
      event.preventDefault();
      console.log(signupInput);

      if(signupInput.password !== signupInput.confirmPassword || signupInput.password === "") {
        alert("passwords do not match");
      } 
      else {

        const newUser = signupInput;

        const mes = await axios.post('/signup', newUser);

        console.log(mes)

        if(mes.status === 201){
          navigate('/login');
        }
        else{
          setIncorrectField({
            status: true,
            hint: mes.data.hint
          })
        }
      }
  }


  return <div className='container-login100'>
    <div className="wrap-login100 p-t-30 p-b-50">
      <span className="login100-form-title p-b-41">
        Sign Up
      </span>
      <form onSubmit={handleClick} className="login100-form validate-form p-b-33 p-t-5">

        <div className="wrap-input100 validate-input" data-validate = "Enter username">
          <input onChange={handleChange} className="input100" type="text" name="username" placeholder="User name" autoComplete='off' value={signupInput.username}></input>
          <span className="focus-input100" data-placeholder="&#xf007;"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate = "Enter email">
						<input onChange={handleChange} className="input100" type="email" name="email" placeholder="Email" autoComplete='off' value={signupInput.email}></input>
						<span className="focus-input100" data-placeholder="&#xf0e0;"></span>
					</div>

        <div className="wrap-input100 validate-input" data-validate="Enter password">
          <input onChange={handleChange} className="input100" type="password" name="password" placeholder="Password" value={signupInput.password}/>
          <span className="focus-input100" data-placeholder="&#xf023;"></span>
        </div>

        <div className="wrap-input100 validate-input" data-validate="Enter password">
          <input onChange={handleChange} className="input100" type="password" name="confirmPassword" placeholder="Confirm Password" value={signupInput.confirmPassword}/>
          <span className="focus-input100" data-placeholder="&#xf023;"></span>
        </div>

        {incorrectField.status ? 
					<div>
						<p className='errorHint'>{incorrectField.hint}</p>
					</div> : null}

        <div className="container-login100-form-btn m-t-32">
          <button className="login100-form-btn" type="submit">
            Sign Up
          </button>
        </div>

      </form>
    </div>
  </div>;
}

export default Signup;
