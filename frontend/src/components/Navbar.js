import './Navbar.css';
import React, { useContext, useRef, useLayoutEffect, useState } from 'react';
import {Link, Navigate} from 'react-router-dom';
import AuthApi from '../AuthApi';
import axios from 'axios';


function Navbar(props) {

    function useWindowSize() {
      const [size, setSize] = useState([0, 0]);
      useLayoutEffect(() => {
        function updateSize() {
          setSize([window.innerWidth, window.innerHeight]);
        }
        window.addEventListener('resize', updateSize);
        updateSize();
        return () => window.removeEventListener('resize', updateSize);
      }, []);
      return size;
    }

    const [width, height] = useWindowSize()
    const authUser = useContext(AuthApi)

    const toggleButtonRef = useRef()

    const handleLinkClick = () => {
        
        if(width < 992)toggleButtonRef.current.click()
    }

    const SignOut = async () => {
        authUser.setAuth(false)
        authUser.setCurrentUser(null)
        await axios.post('http://localhost:3001/signout')
    }

    console.log("navbar: ", authUser)


    return (
        <nav className="navbar navbar-expand-lg title-bar py-0">
            <div className="container-fluid">
                <h1 className='title-text'><Link className='nav-txt' to='/'>Whats Poppin</Link></h1>
                <button ref={toggleButtonRef} className="navbar-toggler navbar-dark" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
                <span className="navbar-toggler-icon"></span>
                </button>
                <div className="collapse navbar-collapse" id="navbarSupportedContent">
                <ul className="navbar-nav ms-auto">
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/events'><span onClick={handleLinkClick}>Events</span></Link></h4>
                    </li>
                    {!authUser.auth ? <>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/login'><span onClick={handleLinkClick}>Log In</span></Link></h4>
                    </li>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/signup'><span onClick={handleLinkClick}>Sign Up</span></Link></h4>
                    </li>
                    </> :
                    <>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' to='/account'><span onClick={handleLinkClick}>Account</span></Link></h4>
                    </li>
                    <li className="nav-item">
                        <h4 className='title-text'><Link className='nav-txt' onClick={SignOut} to='/'><span onClick={handleLinkClick}>Sign Out</span></Link></h4>
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
