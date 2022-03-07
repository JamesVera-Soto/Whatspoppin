import React, {useState, useContext} from 'react';
import './LoginSignup.css';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import AuthApi from '../AuthApi';

function Login() {

	document.title = "Log In - Whats Poppin"

	const authUser = useContext(AuthApi)

	const navigate = useNavigate();

	const blankInput = {
		usernameEmail: "",
		password: ""
	}

	const [loginInput, setLoginInput] = useState(blankInput)
	const [incorrectField, setIncorrectField] = useState({
		status: false,
		hint: ""
	})

	function handleChange(event) {

		const {name, value} = event.target;

		setLoginInput(prevInput => {
			return {
				...prevInput,
				[name]: value,
			}
		})
	}

	async function handleClick(event) {
		event.preventDefault();

		console.log(loginInput);

		const returningUser = loginInput;

        const mes = await axios.post('http://localhost:3001/login', returningUser);

		console.log(mes)

		if(mes.data.success){
			authUser.setAuth(true)
			authUser.setCurrentUser(mes.data.user)

			
			navigate('/account');
		}
		else{
			setIncorrectField({
				status: true,
				hint: mes.data.hint
			})
		}

	}


  return <div className='container-login100'>
    <div className="wrap-login100 p-t-30 p-b-50">
				<span className="login100-form-title p-b-41">
					Login
				</span>
				<form onSubmit={handleClick} className="login100-form validate-form p-b-33 p-t-5">

					<div className="wrap-input100 validate-input" data-validate = "Enter username">
						<input onChange={handleChange} className="input100" type="text" name="usernameEmail" placeholder="User name / email" autoComplete='off' value={loginInput.usernameEmail}></input>
						<span className="focus-input100" data-placeholder="&#xf007;"></span>
					</div>

					<div className="wrap-input100 validate-input" data-validate="Enter password">
						<input onChange={handleChange} className="input100" type="password" name="password" placeholder="Password" value={loginInput.password} />
						<span className="focus-input100" data-placeholder="&#xf023;"></span>
					</div>

					{incorrectField.status ? 
					<div>
						<p className='errorHint'>{incorrectField.hint}</p>
					</div> : null}

					<div className="container-login100-form-btn m-t-32">
						<button className="login100-form-btn">
							Login
						</button>
					</div>

				</form>
			</div>
  </div>;
}

export default Login;
