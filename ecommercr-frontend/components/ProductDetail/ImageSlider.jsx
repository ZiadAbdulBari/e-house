import { useState, useRef } from "react";
import ImageGallery from "react-image-gallery";
import "react-image-gallery/styles/css/image-gallery.css";
const ImageSlider = ({productImage}) => {
  const images = [];
  productImage.forEach((img)=>{
    let imgData = {
        original: img,
        thumbnail: img,
    }
    images.push(imgData);
  })
  return (
    <ImageGallery
      showNav={false}
      thumbnailPosition={'left'}
      showFullscreenButton={false}
      useBrowserFullscreen={false}
      showPlayButton={false}
      autoPlay={false}
      disableThumbnailScroll={true}
      items={images}
    />
  );
};

export default ImageSlider;
