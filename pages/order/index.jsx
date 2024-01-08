import Sidebar from "@/components/Sidebar/Sidebar";
import UiButton from "@/components/UiKit/UiButton";
import MainLayout from "@/layout/MainLayout";
import React, { useEffect, useState } from "react";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
const Order = () => {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [orderlist, setOrderlist] = useState([]);
  const viewOrder = () => {
    console.log("dsd");
  };
  const getOrderList = () => {
    // return;
    if (loggedin) {
      axios
        .get("http://localhost:4000/order-list", {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response?.data?.status == 200) {
            setOrderlist(response?.data?.order_list);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  useEffect(() => {
    getOrderList();
  }, [loggedin == true]);
  return (
    <MainLayout>
      <div className="lg:container mx-auto">
        <div className="flex gap-4 mt-12 w-full">
          <Sidebar />
          <div className="w-[85%] h-[75vh] overflow-y-auto">
            <h1 className="text-[30px] font-bold mb-4 text-color-1">Order list</h1>
            <div className="grid grid-flow-row gap-y-4 w-full">
              {orderlist.length > 0 &&
                orderlist.map((order, index) => (
                  <div
                    key={index}
                    className="bg-gray-50 rounded py-[15px] px-[20px]"
                  >
                    <div className="flex justify-between">
                      <div>
                        <p className="text-gray-700 text-[16px] font-medium">
                          Estimated delivery
                        </p>
                        <p className="text-gray-700 text-[16px] font-medium">
                          {new Date(order.estimated_delivery).toLocaleDateString()}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-[16px] font-medium">
                          Order number
                        </p>
                        <p className="text-gray-700 text-[16px] font-medium">
                          {order.order_number}
                        </p>
                      </div>
                      <div>
                        <p className="text-gray-700 text-[16px] font-medium">
                          Order date
                        </p>
                        <p className="text-gray-700 text-[16px] font-medium">
                          {new Date(order.createdAt).toLocaleDateString()}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div className="hidden">
                        <div className="w-[100px] h-[120px] rounded relative bg-blue-500">
                          <div className="w-[60%] h-full rounded absolute top-0 left-0 bg-red-500 z-[999]"></div>
                          <div className="w-[80%] h-full rounded absolute top-0 left-0 bg-orange-500 z-[99]"></div>
                          <div className="w-full h-full rounded absolute top-0 left-0 bg-black z-[9]"></div>
                          {/* <img
                            className="w-full h-full object-cover"
                            src="https://plus.unsplash.com/premium_photo-1674688194029-17dda3aaf779?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          /> */}
                        </div>
                      </div>
                      <div>
                        <p className="font-semibold text-[18px] text-gray-700">
                          {order.status}
                        </p>
                      </div>
                      <div>
                        <UiButton
                          buttonName="View order"
                          externalClass="bg-color-1 !text-color-3 !font-medium"
                          onClick={viewOrder}
                        />
                      </div>
                    </div>
                  </div>
                ))}
            </div>
          </div>
        </div>
      </div>
    </MainLayout>
  );
};

export default Order;
