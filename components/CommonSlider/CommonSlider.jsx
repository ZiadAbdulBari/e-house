import React from "react";
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";
import Image from "next/image";
const CommonSlider = ({ images }) => {
  let settings = {
    dots: true,
    infinite: true,
    arrows:false,
    speed: 500,
    slidesToShow: 1,
    slidesToScroll: 1,
    autoplay:true,
    fade:true,
  };
  return (
    <div>
      <Slider {...settings}>
        {
        images.length > 0 && 
        images.map((image,i)=>{
            return (
            <div className="w-full h-[85vh]" key={i}>
              <img className="w-full h-full object-cover" src={image.link} />
            </div>
            )
        })
        }
      </Slider>
    </div>
  );
};

export default CommonSlider;
