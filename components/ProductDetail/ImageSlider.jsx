import { useRef } from "react";
import { Splide, SplideSlide } from "@splidejs/react-splide";
import "@splidejs/react-splide/css";
const ImageSlider = ({ productImage }) => {
  const mainOptions = {
    type: "loop",
    perPage: 1,
    perMove: 1,
    gap: "1rem",
    pagination: false,
    height: "100%",
    width:"100%",
    arrows: false,
  };
  const btn_img = {
    width: "100%",
    height: "120px",
    listStyle: "none",
    cursor: "pointer",
    objectFit: 'cover',
  };
  const thumbnailsstyle = {
    width:"100%",
    listStyle: "none",
    overflow: "hidden",
  };
  const mainRef = useRef(null);

  const handleThumbs = (id) => {
    if (mainRef.current) {
      mainRef.current.go(id);
    }
  };
  return (
    <div className="flex gap-6 w-full">
      <div className="w-[20%] bg-gray-100">
        <ul style={thumbnailsstyle}>
          {productImage?.map((img, index) => (
            <li key={index}>
              <button onClick={() => handleThumbs(index)}>
                <img src={img} alt="product thumbnail" style={btn_img} />
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className="w-[90%] bg-gray-100">
        <Splide
          options={mainOptions}
          ref={mainRef}
        >
          {productImage.length > 0 &&
            productImage.map((img, index) => {
              return (
                <SplideSlide key={index}>
                  <img src={img} alt="" className="!w-full !h-full !object-cover"/>
                </SplideSlide>
              );
            })}
        </Splide>
      </div>
    </div>
  );
};

export default ImageSlider;
