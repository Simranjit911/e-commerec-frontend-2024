import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import img1 from "/images/samsungimg.jpg";
import img2 from "/images/laptop.jpg";
import img3 from "/images/iphonee.avif";
import { FaCartArrowDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const ImageSlider = () => {
  const settings = {
    dots: true,
    infinite: true,
    
    speed: 900,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 1600,
  };
  let nav = useNavigate();

  return (
    <Slider {...settings}>
      <div className="relative  max-h-[500px]  md:max-h-[550px] bg-opacity-50 bg-black">
        <img
          src={img1}
          alt=""
          className="max-h-[500px] md:max-h-[550px] w-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-white">
          <div className="text-center">
            <h2 className="tmd:text-2xl text-xl text-slate-400 font-bold mb-2">
              20% off on Mobiles
            </h2>
            <button
              className="group relative bg-gray-800 text-white font-medium text-md  text-sm md:text-md uppercase px-1 py-1 md:px-2 md:py-2 rounded-sm group-hover:opacity-100 inline-block z-10 transition-all duration-500 ease-in-out  hover:bg-blue-600 hover:text-white shadow-xl"
              onClick={() => nav("/allproducts")}
            >
              <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10">
                Buy Now <FaCartArrowDown />
              </span>
              <span className="relative z-10 group-hover:text-transparent">
                Explore Now
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* div 2 */}
      <div className="relative  max-h-[500px]  md:max-h-[550px] bg-opacity-50 bg-black">
        <img
          src={img2}
          alt=""
          className=" max-h-[500px] md:max-h-[550px] w-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-white">
          <div className="text-center">
            <h2 className="md:text-2xl text-xl font-bold mb-2">
              Huge Discounts on Laptops
            </h2>
            <button
              className="group relative bg-[#232126] text-white font-medium text-md uppercase text-sm md:text-md  px-1 py-1 md:px-2 md:py-2rounded-sm group-hover:opacity-100 inline-block z-10 transition-all duration-500 ease-in-out  hover:bg-blue-600 hover:text-white shadow-xl"
              onClick={() => nav("/allproducts")}
            >
              <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10">
                Shop Now <FaCartArrowDown />
              </span>
              <span className="relative z-10 group-hover:text-transparent">
                Explore Now
              </span>
            </button>
          </div>
        </div>
      </div>
      {/* div 3 */}
      <div className="relative  max-h-[500px]  md:max-h-[550px] bg-opacity-50 bg-black">
        <img
          src={img3}
          alt=""
          className="max-h-[500px] md:max-h-[550px] w-full object-cover"
        />
        <div className="absolute top-0 left-0 right-0 bottom-0 flex justify-center items-center text-white">
          <div className="text-center">
            <h2 className="md:text-2xl text-xl font-bold mb-2">
              Special Offer!
            </h2>
            <button
              className="group relative bg-[#7a474a] text-black font-medium text-sm md:text-md uppercase px-1 py-1 md:px-2 md:py-2 rounded-sm group-hover:opacity-100 inline-block z-10 transition-all duration-500 ease-in-out  hover:bg-blue-600 hover:text-white shadow-xl"
              onClick={() => nav("/allproducts")}
            >
              <span className="absolute inset-0 flex items-center justify-center transition-opacity duration-500 opacity-0 group-hover:opacity-100 z-10">
                Special Deal <FaCartArrowDown />
              </span>
              <span className="relative z-10 group-hover:text-transparent">
                Explore Now
              </span>
            </button>
          </div>
        </div>
      </div>
    </Slider>
  );
};

export default ImageSlider;
