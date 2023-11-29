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
    console.log("hitted");
    // return;
    if (loggedin) {
      axios
        .get("http://localhost:4000/order-list", {
          headers: { Authorization: token },
        })
        .then((response) => {
          console.log(response);
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
      <div className="w-[70vw] m-auto">
        <h1 className="text-[30px] font-bold mt-4">Order list</h1>
        <div className="flex gap-2 mt-12">
          <Sidebar />
          <div className="w-full">
            <div className="grid grid-flow-row gap-y-2 w-full">
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
                          {order.estimated_delivery}
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
                          {order.createdAt}
                        </p>
                      </div>
                    </div>
                    <div className="flex justify-between items-center mt-4">
                      <div>
                        <div className="w-[100px] h-[120px]">
                          <img
                            className="w-full h-full object-cover"
                            src="https://plus.unsplash.com/premium_photo-1674688194029-17dda3aaf779?q=80&w=2080&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                            alt=""
                          />
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
                          externalClass="bg-green-300"
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
