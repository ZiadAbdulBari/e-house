import React from 'react';
import UiButton from '../UiKit/UiButton';
import UiInput from '../UiKit/UiInput';

const ShippingAddress = ({
    newAddress,
    inputValue,
    handleInput,
    addShippingAddress,
    setNewAddress,
    addresses,
    selectedAddress,
    deleteShippingAddress,
  }) => {
    return (
        <div className="w-[100%] px-[30px] h-full">
        <div className="flex justify-between items-center">
          <p className="my-4 font-medium text-[22px] text-color-1">
            Shipping address
          </p>
          {newAddress == false && (
            <button
              className="flex font-medium text-color-1 bg-color-3 py-[5px] px-[10px] rounded"
              onClick={() => setNewAddress(true)}
            >
              <span>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M11 11V5H13V11H19V13H13V19H11V13H5V11H11Z"
                    className="fill-color-1"
                  ></path>
                </svg>
              </span>
              <span>Add address</span>
            </button>
          )}
        </div>
        {newAddress == true && (
          <div className="mt-4">
            <div className="grid gird-cols-1 gap-y-4">
              <UiInput
                id="name"
                label="Name"
                type="text"
                value={inputValue.name}
                name="name"
                placeholder="Enter receiver name"
                onChange={handleInput}
              />
              <UiInput
                id="phone"
                label="Phone"
                type="text"
                value={inputValue.phone}
                name="phone"
                placeholder="Enter receiver phone number"
                onChange={handleInput}
              />
              <UiInput
                id="email"
                label="Email"
                type="email"
                value={inputValue.email}
                name="email"
                placeholder="Enter receiver email"
                onChange={handleInput}
              />
              <UiInput
                id="address"
                label="Address"
                type="text"
                value={inputValue.address}
                name="address"
                placeholder="Enter receiver address"
                onChange={handleInput}
              />
              <UiInput
                id="gift"
                label="Gift"
                type="checkbox"
                value={inputValue.gift}
                name="gift"
                placeholder=""
                onChange={handleInput}
              />
              {inputValue.gift && (
                <div className="grid grid-cols-1">
                  <label
                    className="text-[18px] font-medium text-gray-800"
                    htmlFor="message"
                  >
                    Message
                  </label>
                  <textarea
                    className="mt-4 text-[20px] font-medium px-[20px] rounded border border-gray-200 outline-gray-300 placeholder:text-gray-300"
                    name="message"
                    id="message"
                    cols="30"
                    rows="5"
                    placeholder="Write your message"
                    onClick={handleInput}
                  >
                    {inputValue.message}
                  </textarea>
                </div>
              )}
            </div>
            <div className="flex justify-end mt-20 gap-x-2">
              <UiButton
                buttonName="Add Shipping Address"
                externalClass="!bg-color-1 !text-color-3 !font-medium"
                onClick={addShippingAddress}
              />
              <UiButton
                buttonName="Cancel"
                externalClass="bg-red-500 text-white"
                onClick={() => setNewAddress(false)}
              />
            </div>
          </div>
        )}
        <div>
          {newAddress == false && (
            <div className="grid grid-cols-1 gap-2">
              {addresses.map((address) => (
                <div
                  className="border p-[10px] bg-gray-50"
                  key={address.id}
                >
                  <div className="flex justify-between mb-4">
                    <input
                      id={`address-${address.id}`}
                      className="peer/published"
                      type="radio"
                      name={`address-${address.id}`}
                      value={selectedAddress}
                      onChange={() => setSelectedAddress(address)}
                      checked={address.id == selectedAddress.id}
                    />
                    <svg
                      className="cursor-pointer"
                      xmlns="http://www.w3.org/2000/svg"
                      viewBox="0 0 24 24"
                      width="20"
                      height="20"
                      onClick={() => deleteShippingAddress(address.id)}
                    >
                      <path
                        d="M17 6H22V8H20V21C20 21.5523 19.5523 22 19 22H5C4.44772 22 4 21.5523 4 21V8H2V6H7V3C7 2.44772 7.44772 2 8 2H16C16.5523 2 17 2.44772 17 3V6ZM18 8H6V20H18V8ZM9 11H11V17H9V11ZM13 11H15V17H13V11ZM9 4V6H15V4H9Z"
                        fill="rgba(255,0,0,1)"
                      ></path>
                    </svg>
                  </div>
                  <label htmlFor={`address-${address.id}`} className="">
                    <ul>
                      <li>Name: {address.receiver_name}</li>
                      <li>Phone: {address.receiver_phone}</li>
                      <li>Email: {address.receiver_email}</li>
                      <li>Address: {address.receiver_address}</li>
                    </ul>
                  </label>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    );
};

export default ShippingAddress;