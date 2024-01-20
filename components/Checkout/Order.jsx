import React from 'react';
import UiButton from '../UiKit/UiButton';

const Order = ({ cartData, totalPrice, placeOrder  }) => {
    return (
        <div className="w-[100%] px-[20px] lg:px-[30px] h-full">
            <p className="my-4 font-medium text-[22px] text-color-1">
              Products
            </p>
            <div className="h-[55%] overflow-y-auto">
              {cartData.length > 0 &&
                cartData.map((product, index) => {
                  return (
                    <div
                      className="w-full flex justify-between items-center gap-4 py-[20px]"
                      key={index}
                    >
                      <div className="w-[15%] border">
                        <img
                          src={product.image_url}
                          alt=""
                          className="h-full w-full object-cover"
                        />
                      </div>
                      <div className="w-[55%]">
                        <p className="text-color-1">{product.title}</p>
                        <p className="text-gray-800">
                          Size: {product.variants}
                        </p>
                      </div>
                      <div className="w-[10%]">
                        <p className="text-gray-800">
                          {product.cart_quantity} x
                        </p>
                      </div>
                      <div className="w-[20%]">
                        <p
                          className={`font-semibold ${
                            product.discount_price > 0
                              ? "text-gray-500 line-through"
                              : "text-gray-800"
                          }`}
                        >
                          {product.price} Tk
                        </p>
                        {product.discount_price > 0 && (
                          <p className="text-gray-800 font-semibold">
                            {product.price - product.discount_price} Tk
                          </p>
                        )}
                      </div>
                    </div>
                  );
                })}
            </div>
            <div>
              <div className="flex justify-between">
                <p className="text-[20px]">Subtotal:</p>
                <p className="text-[20px]">{totalPrice} BDT</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[20px]">Discount:</p>
                <p className="text-[20px]">00.00 BDT</p>
              </div>
              <div className="flex justify-between">
                <p className="text-[20px]">Delivery:</p>
                <p className="text-[20px]">00.00 BDT</p>
              </div>
              <div className="border w-full my-4"></div>
              <div className="flex justify-between">
                <p className="text-[20px] font-semibold">Total:</p>
                <p className="text-[20px] font-semibold">{totalPrice} BDT</p>
              </div>
              <div className="hidden lg:flex justify-end mt-8">
                <UiButton
                  buttonName="Place Order"
                  externalClass="!bg-color-1 !text-color-3 !font-medium"
                  onClick={placeOrder}
                />
              </div>
            </div>
          </div>
    );
};

export default Order;