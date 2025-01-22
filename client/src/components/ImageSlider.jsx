import React from 'react';
import Slider from 'react-slick';
import { Typography } from '@mui/material';
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = ({ images }) => {
  const sliderSettings = {
    dots: true,
    infinite: false,  
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    arrows: false,
  };

  if (!images?.length) {
    return <Typography variant="body2" color="textSecondary">אין תמונות נוספות</Typography>;
  }

  return (
    <Slider {...sliderSettings}>
      {images.map((image, index) => (
        <div key={index}>
          <img
            src={`data:image/jpeg;base64,${image}`}
            alt={`Image ${index + 1}`}
            style={{
              width: 'auto',
              height: '300px',
              maxWidth: '100%',
              borderRadius: '4px',
              marginBottom: '10px',
              display: 'block',
              margin: '0 auto'
            }}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
