import React, { useEffect, useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/free-mode";
import "swiper/css/navigation";
import "swiper/css/thumbs";
// import "./styles.css";

// import required modules
import { FreeMode, Navigation, Thumbs } from "swiper/modules";
const ProductDetailSlider = ({ images }) => {
  const [thumbsSwiper, setThumbsSwiper] = useState(null);
  return (
    <>
      <Swiper
        spaceBetween={10}
        navigation={false}
        thumbs={{
          swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null,
        }}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiper2"
      >
        {images.map((image, j) => {
          return (
            <div className="w-full h-full" key={j}>
              <SwiperSlide>
                <img className="w-full h-full" src={image.image_url} />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
      <Swiper
        onSwiper={setThumbsSwiper}
        spaceBetween={10}
        slidesPerView={4}
        freeMode={true}
        watchSlidesProgress={true}
        modules={[FreeMode, Navigation, Thumbs]}
        className="mySwiperThumb"
      >
        {images.map((image) => {
          return (
            <div className="w-full h-full" key={image}>
              <SwiperSlide>
                <img className="w-full h-full" src={image.image_url} />
              </SwiperSlide>
            </div>
          );
        })}
      </Swiper>
    </>
  );
};

export default ProductDetailSlider;
