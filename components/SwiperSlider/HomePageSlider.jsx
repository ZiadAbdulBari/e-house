import React from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import { Pagination, Autoplay } from "swiper/modules";
const HomePageSlider = ({ images }) => {
  return (
    <>
      <Swiper
        pagination={{
          clickable: true,
        }}
        loop={true}
        modules={[Pagination, Autoplay]}
        autoplay={{
          delay: 2500,
          disableOnInteraction: false,
        }}
        className="mySwiper"
      >
        {images?.length > 0 &&
          images.map((image, i) => {
            return (
              <div className="w-full h-full" key={i}>
                <SwiperSlide>
                  <img className="w-full h-full object-cover" src={image} />
                </SwiperSlide>
              </div>
            );
          })}
      </Swiper>
    </>
  );
};

export default HomePageSlider;
