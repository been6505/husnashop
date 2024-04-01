import React from 'react'
import Slider from 'react-touch-drag-slider'
import {
  MDBCarousel,
  MDBCarouselItem,
} from 'mdb-react-ui-kit';



// here we are importing some images 
// but the Slider children can be an array of any element nodes, or your own components
// import images from './image'

// Z:\WEB\ecommerce-django-react-main\image

function SliderOne() {

  return (
    <MDBCarousel showControls fade>
    <MDBCarouselItem
      className='w-100 d-block'
      itemId={1}
      src='https://mdbootstrap.com/img/new/slides/041.jpg'
      alt='...'
    />
    <MDBCarouselItem
      className='w-100 d-block'
      itemId={2}
      src='https://mdbootstrap.com/img/new/slides/042.jpg'
      alt='...'
    />
    <MDBCarouselItem
      className='w-100 d-block'
      itemId={3}
      src='https://mdbootstrap.com/img/new/slides/043.jpg'
      alt='...'
    />
  </MDBCarousel>
  )
}

export default SliderOne