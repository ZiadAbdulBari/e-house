import { CartContext } from "@/contaxt/CartContext";
import MainLayout from "@/layout/MainLayout";
import { useContext } from "react";
const Checkout = () => {
  const { cartData, totalPrice } = useContext(CartContext);
  return (
    <MainLayout>
    <div className="lg:container mx-auto">
      <div className="flex gap-4 w-full h-screen">
        <div className="w-[50%] px-[30px]">
          <p className="my-4 font-samibold text-[30px]">Shipping address</p>
          <div className="mt-4">
            <div>
              <div>
                <label htmlFor="phone" className="text-[20px]">Contact Number</label>
              </div>
              <input
                type="text"
                id="phone"
                className="input !mt-2"
                placeholder="Enter your phone number"
              />
            </div>
            <div className="mt-6">
              <div>
                <label htmlFor="alter-contact" className="text-[20px]">Alternative Contact Number</label>
              </div>
              <input
                type="text"
                id="alter-contact"
                className="input !mt-2"
                placeholder="Enter your another phone number"
              />
            </div>
            <div className="mt-6">
              <div>
                <label htmlFor="name" className="text-[20px]">Full Name</label>
              </div>
              <input
                type="text"
                id="name"
                className="input !mt-2"
                placeholder="Enter your full name"
              />
            </div>
            <div className="mt-6">
              <div>
                <label htmlFor="email" className="text-[20px]">Email</label>
              </div>
              <input
                type="email"
                id="email"
                className="input !mt-2"
                placeholder="Enter your email address"
              />
            </div>
            <div className="mt-6">
              <div>
                <label htmlFor="address" className="text-[20px]">Current Address</label>
              </div>
              <input
                type="text"
                id="address"
                className="input !mt-2"
                placeholder="Enter your current address"
              />
            </div>
            <div className="flex justify-end mt-8">
                <button className="rounded-[5px] px-[20px] bg-[#025464] text-white text-[20px] py-[5px]">Add Shipping Address</button>
            </div>
          </div>
        </div>
        <div className="w-[50%] bg-gray-100 px-[30px]">
          <p className="my-4 font-samibold text-[30px]">Products</p>
          <div className="h-[55%] overflow-y-scroll">
            {cartData.length > 0 &&
              cartData.map((product, index) => {
                return (
                  <div
                    className="w-full flex justify-between items-center gap-4 py-[20px]"
                    key={index}
                  >
                    <div className="w-[20%] border">
                      <img
                        src={product.image}
                        alt=""
                        className="h-full w-full object-cover"
                      />
                    </div>
                    <div className="w-[60%]">
                      <p className="text-[20px]">{product.title}</p>
                    </div>
                    <div className="w-[20%]">
                      <p className="text-[20px]">{product.price} BDT</p>
                    </div>
                  </div>
                );
              })}
          </div>
          <div className="my-6 flex gap-2 justify-between">
            <input
              type="text"
              placeholder="Apply Cupon"
              className="input !mt-0"
            />
            <button className="px-[20px] bg-[#025464] rounded text-white text-[20px]">
              Apply
            </button>
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
            <div className="flex justify-end mt-8">
              <button className="bg-orange-700 text-white text-[20px] px-[50px] py-[5px] rounded-[5px]">Place Order</button>
            </div>
          </div>
        </div>
      </div>
    </div>
    </MainLayout>
  );
};
export default Checkout;
