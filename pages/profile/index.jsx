import UiButton from "@/components/UiKit/UiButton";
import UiInput from "@/components/UiKit/UiInput";
import MainLayout from "@/layout/MainLayout";
import { getLoggedinStatus, getToken } from "@/store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";
import Link from "next/link";
import React, { useEffect, useState } from "react";
import Sidebar from "@/components/Sidebar/Sidebar";

const Profile = () => {
  const dispatch = useDispatch();
  const loggedin = useSelector((state) => state.auth.isLoggedin);
  const token = useSelector((state) => state.auth.token);
  const [edit, setEdit] = useState(false);
  const [profileData, setProfileData] = useState({});
  const [inputValue, setInputValue] = useState({
    name: "",
    email: "",
    phone: "",
    address: "",
  });
  const getProfileData = () => {
    if (loggedin) {
      axios
        .get("http://localhost:4000/get-profile", {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response?.data?.status == 200) {
            setProfileData(response?.data?.profile);
            setInputValue({
              ...inputValue,
              name: response?.data?.profile.name,
              email: response?.data?.profile.email,
              phone: response?.data?.profile.phone,
              address: response?.data?.profile.address,
            });
          }
          console.log(response);
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const handleChangeInput = (event) => {
    if (event.target.name == "name") {
      setInputValue({ ...inputValue, name: event.target.value });
    } else if (event.target.name == "email") {
      setInputValue({ ...inputValue, email: event.target.value });
    } else if (event.target.name == "phone") {
      setInputValue({ ...inputValue, phone: event.target.value });
    } else if (event.target.name == "address") {
      setInputValue({ ...inputValue, address: event.target.value });
    }
  };
  const upgradeProfile = () => {
    if (loggedin) {
      console.log(inputValue)
      axios
        .post("http://localhost:4000/update-profile",inputValue, {
          headers: { Authorization: token },
        })
        .then((response) => {
          if (response?.data?.status == 200) {
            setEdit(false);
          }
        })
        .catch((error) => {
          console.log(error);
        });
    }
  };
  const cancelUpgrade = () => {
    setEdit(false);
  };
  useEffect(() => {
    dispatch(getLoggedinStatus());
    dispatch(getToken());
  }, []);
  useEffect(() => {
    getProfileData();
  }, [loggedin == true]);
  return (
    <MainLayout>
      <div className="w-[70vw] m-auto">
        <h1 className="text-[30px] font-bold mt-4">Profile</h1>
        <div className="flex gap-2 mt-12">
          <Sidebar/>
          {/* SHOW PROFILE DATA */}
          {edit == false && (
            <div className="rounded bg-orange-100 w-[80%]">
              <div className="p-[10px] flex justify-end cursor-pointer">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                  onClick={() => setEdit(true)}
                >
                  <path
                    d="M16.7574 2.99666L9.29145 10.4626L9.29886 14.7097L13.537 14.7023L21 7.2393V19.9967C21 20.5489 20.5523 20.9967 20 20.9967H4C3.44772 20.9967 3 20.5489 3 19.9967V3.99666C3 3.44438 3.44772 2.99666 4 2.99666H16.7574ZM20.4853 2.09717L21.8995 3.51138L12.7071 12.7038L11.2954 12.7062L11.2929 11.2896L20.4853 2.09717Z"
                    fill="rgba(0,0,0,1)"
                  ></path>
                </svg>
              </div>
              <div className="w-full py-[50px] px-[30px]">
                <div className="flex justify-between gap-y-2 w-full">
                  <div className="flex w-[50%]">
                    <p className="text-[20px] font-medium w-[20%]">Name</p>
                    <p className="text-[20px] font-medium">
                      {profileData?.name}
                    </p>
                  </div>
                  <div className="flex w-[50%]">
                    <p className="text-[20px] font-medium w-[20%]">Email</p>
                    <p className="text-[20px] font-medium">
                      {profileData?.email}
                    </p>
                  </div>
                </div>
                <div className="flex justify-between gap-y-2 w-full">
                  <div className="flex w-[50%]">
                    <p className="text-[20px] font-medium w-[20%]">Phone</p>
                    <p className="text-[20px] font-medium">
                      {profileData?.phone}
                    </p>
                  </div>
                  <div className="flex w-[50%]">
                    <p className="text-[20px] font-medium w-[20%]">Address</p>
                    <p className="text-[20px] font-medium">
                      {profileData?.address}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
          {/* UPDATE PROFILE DATA*/}
          {edit == true && (
            <div className="rounded bg-orange-100 py-[50px] px-[30px] w-[80%]">
              <div className="grid grid-cols-2 gap-4">
                <UiInput
                  label="Name"
                  type="text"
                  value={inputValue.name}
                  name="name"
                  placeholder="Ente your name"
                  onChange={handleChangeInput}
                />
                <UiInput
                  label="Email"
                  type="email"
                  value={inputValue.email}
                  name="email"
                  placeholder="Ente your email"
                  onChange={handleChangeInput}
                />
                <UiInput
                  label="Phone"
                  type="text"
                  value={inputValue.phone}
                  name="phone"
                  placeholder="Ente your phone number"
                  onChange={handleChangeInput}
                />
                <UiInput
                  label="Address"
                  type="text"
                  value={inputValue.address}
                  name="address"
                  placeholder="Ente your address"
                  onChange={handleChangeInput}
                />
              </div>
              <div className="flex justify-end mt-[100px] gap-4">
                <UiButton
                  buttonName="Upgrade Profile"
                  type="success"
                  onClick={upgradeProfile}
                />
                <UiButton
                  buttonName="Cancel"
                  type="denger"
                  onClick={cancelUpgrade}
                />
              </div>
            </div>
          )}
        </div>
      </div>
    </MainLayout>
  );
};

export default Profile;
