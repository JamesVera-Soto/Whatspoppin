import React from 'react';
import { useNavigate } from 'react-router-dom'
import './Home.css';
import Carousel from 'react-bootstrap/Carousel'

function Home() {

  document.title = "Whats Poppin"

  const navigate = useNavigate()

  const folder = '/pageImages/'
  const imgs = [
    'pexels-eduardo-romero-3807958.jpg',
    'pexels-pixabay-274192.jpg',
    'pexels-designecologist-2526105.jpg',
    'pexels-abby-kihano-431722.jpg',
    'pexels-josh-sorenson-976866.jpg',
    'pexels-photo-700413.jpeg',
    'pexels-rodnae-productions-6173860.jpg'
  ]

  return <div className='home-page'>
    <div className='banner-container'>
      <div className='banner-imgs'>
        <h1 className='banner-txt'>Go out and explore</h1>
        <Carousel pause={false} controls={false} className='home-carousel' fade>
            {imgs.map(img => {
                return(
                <Carousel.Item className='home-carousel-item' interval={10000}>
                    <img
                    className="d-block w-100 home-carousel-img"
                    src={folder + img}
                    alt="First slide"
                    />
                    <Carousel.Caption>
                    <h3>Whats Poppin</h3>
                    <p>Find events in your area. Meet people. Make Memories.</p>
                    </Carousel.Caption>
                </Carousel.Item>)
            })}
        </Carousel>
        <div className='homeRegisterBox'>
            <button className='homeRegister-btn' onClick={() => {navigate('/login')}}>Log In</button>
            <button className='homeRegister-btn' onClick={() => {navigate('/signup')}}>Sign Up</button>
            <button className='homeRegister-btn' onClick={() => {navigate('/events')}}>Find Events</button>
        </div>
      </div>
    </div>


    <div className='home-container-r2'>
      <div className='home-content-r2-c1'>
        <div className='home-content-c1-img'>
          <img className='content-img' src='/pageImages/small/gettyimages-855383198-612x612.jpg' alt='city' />
        </div>  
        <div className='r2c1-text-panel'>
          <div className='r2c1-text'>
            <h2>Find Events Near You</h2>
            <p>Traveling to a new city and looking for what to do? Or just looking to find something new in your city? Whats Poppin has all the events you're looking for.</p>
          </div>
        </div>
      </div>

      <div className='home-content-r2-c1'>
        <div className='r2c1-text-panel'>
          <h2>Dicover New Places</h2>
          <p>With friends or just to get away</p>
        </div>
        <div className='home-content-c1-img'>
          <img className='content-img' src='/pageImages/small/gettyimages-1159841835-612x612.jpg' alt='carnival game' />
        </div>
      </div>

      <div className='home-content-r2-c1'>
        <div className='home-content-c1-img'>
          <img className='content-img' src='/pageImages/small/gettyimages-1148769679-612x612.jpg' height="360px" alt='carnival game' />
        </div>  
        <div className='r2c1-text-panel'>
          <h2>Stay Up to Date</h2>
          <p>Follow your favorite organizers and venues</p>
        </div>
      </div>

      <div className='home-content-r2-c1'>
        <div className='r2c1-text-panel'>
          <div className='r2c1-text'>
            <h2>Join Group Activities</h2>
            <p>Socialize by joining one or more of many group events</p>
          </div>
        </div>
        <div className='home-content-c1-img'>
          <img className='content-img' src='/pageImages/small/gettyimages-1157908388-612x612.jpg' height="360px" alt='city' />
        </div>
      </div>
    </div>  

    <div className='home-container-r3'>
            <h4 className='pageTitle' style={{color:"gray"}}>Copyright © 2022 Whats Poppin</h4>
    </div>
  </div>;
}

export default Home;
