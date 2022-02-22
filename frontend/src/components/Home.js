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
                    <h3>First slide label</h3>
                    <p>Nulla vitae elit libero, a pharetra augue mollis interdum.</p>
                    </Carousel.Caption>
                </Carousel.Item>)
            })}
        </Carousel>
      </div>
    </div>
    
    

    <div className='home-container1'>
      <h1>Upcoming Events</h1>
    </div>  
  </div>;
}

export default Home;
