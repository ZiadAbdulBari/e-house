import React, { useState } from 'react';

const MobileSidebar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [windowSize, setWindowSize] = useState("");
    const cartControl = () => {
      const selectCart = document.getElementById("cart");
      if (!isOpen) {
        selectCart.classList.remove("hidden");
        selectCart.classList.add("open-cart");
        setIsOpen(true);
      } else {
        selectCart.classList.add("hidden");
        selectCart.classList.remove("open-cart");
        setIsOpen(false);
      }
    };
    useEffect(() => {
        const size = window.screen.height;
        setWindowSize(size);
      }, []);
    return (
        <div>
              <div
        className="fixed right-0 top-[50%] bg-color-1 p-[10px] z-[999] rounded-l cursor-pointer"
        onClick={cartControl}
      >
        <div className="p-2">
          <div className="absolute font-semibold text-color-2 text-[25px] top-[-6px] left-[32px] p-[10px] rounded-full">
            {cartCount}
          </div>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="32"
            height="32"
            className="fill-color-3"
          >
            <path d="M4.00436 6.41686L0.761719 3.17422L2.17593 1.76001L5.41857 5.00265H20.6603C21.2126 5.00265 21.6603 5.45037 21.6603 6.00265C21.6603 6.09997 21.6461 6.19678 21.6182 6.29L19.2182 14.29C19.0913 14.713 18.7019 15.0027 18.2603 15.0027H6.00436V17.0027H17.0044V19.0027H5.00436C4.45207 19.0027 4.00436 18.5549 4.00436 18.0027V6.41686ZM6.00436 7.00265V13.0027H17.5163L19.3163 7.00265H6.00436ZM5.50436 23.0027C4.67593 23.0027 4.00436 22.3311 4.00436 21.5027C4.00436 20.6742 4.67593 20.0027 5.50436 20.0027C6.33279 20.0027 7.00436 20.6742 7.00436 21.5027C7.00436 22.3311 6.33279 23.0027 5.50436 23.0027ZM17.5044 23.0027C16.6759 23.0027 16.0044 22.3311 16.0044 21.5027C16.0044 20.6742 16.6759 20.0027 17.5044 20.0027C18.3328 20.0027 19.0044 20.6742 19.0044 21.5027C19.0044 22.3311 18.3328 23.0027 17.5044 23.0027Z"></path>
          </svg>
        </div>
      </div>
        </div>
    );
};

export default MobileSidebar;