import React from 'react';
import Slider from 'react-slick';

const CarouselComponent = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    swipe: false,     
    autoplay: true, 
    autoplaySpeed: 2000 
  };

  return (
    <></>
    // <Slider {...settings}>
    //   <div>
    //     <img src="car1.jpg" alt="Car 1" />
    //   </div>
    //   <div>
    //     <img src="car2.jpg" alt="Car 2" />
    //   </div>
    //   <div>
    //     <img src="car3.jpg" alt="Car 3" />
    //   </div>
    // </Slider>
  );
};

export default CarouselComponent;
