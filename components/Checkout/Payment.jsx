import React from 'react';

const Payment = ({ selectedPayment, setSelectedPayment }) => {
    return (
        <div className="w-[60%] flex flex-col items-center lg:w-[100%] payment">
        <p className="my-4 font-medium text-[22px] text-color-1">
          Payment Method
        </p>
        <div className="mt-4">
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setSelectedPayment("cod")}
          >
            <div
              className={`px-[1px] rounded ${
                selectedPayment == "cod" ? "bg-color-1" : "bg-color-3"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className={`${
                  selectedPayment == "cod" ? "fill-color-3" : "fill-color-1"
                }`}
              >
                <path d="M12.0004 16C14.2095 16 16.0004 14.2091 16.0004 12 16.0004 9.79086 14.2095 8 12.0004 8 9.79123 8 8.00037 9.79086 8.00037 12 8.00037 14.2091 9.79123 16 12.0004 16ZM21.0049 4.00293H3.00488C2.4526 4.00293 2.00488 4.45064 2.00488 5.00293V19.0029C2.00488 19.5552 2.4526 20.0029 3.00488 20.0029H21.0049C21.5572 20.0029 22.0049 19.5552 22.0049 19.0029V5.00293C22.0049 4.45064 21.5572 4.00293 21.0049 4.00293ZM4.00488 15.6463V8.35371C5.13065 8.017 6.01836 7.12892 6.35455 6.00293H17.6462C17.9833 7.13193 18.8748 8.02175 20.0049 8.3564V15.6436C18.8729 15.9788 17.9802 16.8711 17.6444 18.0029H6.3563C6.02144 16.8742 5.13261 15.9836 4.00488 15.6463Z"></path>
              </svg>
            </div>
            <label
              htmlFor="payment-1"
              className="text-[18px] text-gray-800"
            >
              Cash on delivery
            </label>
          </div>
          <div
            className="flex gap-2 items-center cursor-pointer"
            onClick={() => setSelectedPayment("stripe")}
          >
            <div
              className={`px-[1px] rounded ${
                selectedPayment == "stripe" ? "bg-color-1" : "bg-color-3"
              }`}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="20"
                height="20"
                className={`${
                  selectedPayment == "stripe"
                    ? "fill-color-3"
                    : "fill-color-1"
                }`}
              >
                <path d="M3.00488 2.99979H21.0049C21.5572 2.99979 22.0049 3.4475 22.0049 3.99979V19.9998C22.0049 20.5521 21.5572 20.9998 21.0049 20.9998H3.00488C2.4526 20.9998 2.00488 20.5521 2.00488 19.9998V3.99979C2.00488 3.4475 2.4526 2.99979 3.00488 2.99979ZM20.0049 10.9998H4.00488V18.9998H20.0049V10.9998ZM20.0049 8.99979V4.99979H4.00488V8.99979H20.0049ZM14.0049 14.9998H18.0049V16.9998H14.0049V14.9998Z"></path>
              </svg>
            </div>
            <label
              htmlFor="payment-2"
              className="text-[18px] text-gray-800"
            >
              Master/Visa
            </label>
          </div>
        </div>
      </div>
    );
};

export default Payment;