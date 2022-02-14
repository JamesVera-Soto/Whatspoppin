import './Navbar.css';
import React, { useContext } from 'react';
import {Link, Navigate} from 'react-router-dom';
import AuthApi from '../AuthApi';

function Navbar(props) {

    const authUser = useContext(AuthApi)

    const SignOut = () => {
        authUser.setAuth(false)
        authUser.setCurrentUser(null)
    }

    console.log("navbar: ", authUser)

    return (
        <nav className="navbar navbar-expand-lg title-bar py-0">
            <div className="container-fluid">
                <h1 className='title-text'><Link className='nav-txt' to='/'>Whats Poppin</Link></h1>
                <button className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/events'>Events</Link></h4>
                    </li>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/create-event'>Create Event</Link></h4>
                    </li>
                    {!authUser.auth ? <>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/login'>Log In</Link></h4>
                    </li>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/signup'>Sign Up</Link></h4>
                    </li>
                    </> :
                    <>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/account'>Account</Link></h4>
                    </li>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' onClick={SignOut} to='/'>Sign Out</Link></h4>
                    </li>
                    </>
                    }
                </ul>
                </div>
            </div>
            </nav>
    )
}

export default Navbar
