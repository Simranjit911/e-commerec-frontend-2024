import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 3000,
  };
  const images = [
    "https://images.pexels.com/photos/943096/pexels-photo-943096.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://images.pexels.com/photos/1229861/pexels-photo-1229861.jpeg?auto=compress&cs=tinysrgb&w=600",
    "https://rukminim2.flixcart.com/fk-p-flap/1600/270/image/fcb527dfb0bb87e5.jpg?q=20",
  ];

  return (
    <Slider {...settings}>
      {images.map((image, index) => (
        <div key={index} className="flex justify-center ">
          <img
            src={image}
            className="w-full h-[70vh] object-contain"
            alt={`Slide ${index}`}
          />
        </div>
      ))}
    </Slider>
  );
};

export default ImageSlider;
