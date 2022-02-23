import React from 'react';
import './Home.css';
import Carousel from 'react-bootstrap/Carousel'

function Home() {

  const folder = '/pageImages/'
  const imgs = [
    'pablo-heimplatz-ZODcBkEohk8-unsplash.jpg',
    'pexels-eduardo-romero-3807958.jpg',
    'pexels-matheus-bertelli-2608517.jpg',
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
            <button className='homeRegister-btn'>Log In</button>
            <button className='homeRegister-btn'>Sign Up</button>
            <button className='homeRegister-btn'>Find Events</button>
        </div>
      </div>
    </div>
    
    

    <div className='home-container-r2'>
      <div className='home-content-r2-c1'>
        <div className='r2c1-other-panel'></div>
        <img className='home-content-c1-img' src='/pageImages/small/gettyimages-855383198-612x612.jpg' alt='city' />
        <div className='r2c1-text-panel'>
          <div className='r2c1-text'>
            <h2>Find Events Near You</h2>
            <p>Traveling to a new city and looking for what to do? Or just looking to find something new in your city? Whats Poppin has all the events you're looking for.</p>
          </div>
        </div>
      </div>

      <div className='home-content-r2-c2'>
        <div className='r2c2-other-panel'></div>
        <div className='r2c2-text-panel'>
          <h2>Dicover New Places</h2>
          <p>With friends</p>
        </div>
          <img className='home-content-c2-img' src='/pageImages/small/gettyimages-1159841835-612x612.jpg' alt='carnival game' />
      </div>

      <div className='home-content-r2-c2'>
        <div className='r2c2-other-panel'></div>
        <div className='r2c2-text-panel'>
          <h2>Dicover New Places</h2>
          <p>With friends</p>
        </div>
          <img className='home-content-c2-img' src='/pageImages/small/gettyimages-1148769679-612x612.jpg' height="360px" alt='carnival game' />
      </div>

      <div className='home-content-r2-c1'>
        <div className='r2c1-other-panel'></div>
        <img className='home-content-c1-img' src='/pageImages/small/gettyimages-1157908388-612x612.jpg' height="360px" alt='city' />
        <div className='r2c1-text-panel'>
          <div className='r2c1-text'>
            <h2>Find Events Near You</h2>
            <p>Traveling to a new city and looking for what to do? Or just looking to find something new in your city? Whats Poppin has all the events you're looking for.</p>
          </div>
        </div>
      </div>
    </div>  

    <div className='home-container-r3'>
            <h4 className='pageTitle'>Copyright © 2022 Whats Poppin</h4>
    </div>
  </div>;
}

export default Home;
