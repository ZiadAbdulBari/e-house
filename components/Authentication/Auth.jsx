// import { AuthContext } from "@/contaxt/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus, getToken } from "../../store/authSlice";
import toastMessage from "@/plugings/toastify";
import UiInput from "../UiKit/UiInput";

const Auth = ({ pageName, text, link }) => {
  const loggedinStatus = useSelector((state) => state.auth.isLoggedin);
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({ email: "", password: "" });
  const handleChangeField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const login = () => {
    axios
      .post(`${process.env.baseurl}/login`, state)
      .then((response) => {
        if (response?.data?.status == 200) {
          const token = response?.data?.access_token;
          window.localStorage.setItem("token", JSON.stringify(token));
          window.localStorage.setItem("isLoggedin", JSON.stringify(true));
          dispatch(getLoggedinStatus());
          dispatch(getToken());
          toastMessage(response?.data?.message, "s");
          router.push("/");
        }
      })
      .catch((error) => {
        toastMessage(error?.message, "e");
      });
  };
  const registration = () => {
    axios
      .post(`${process.env.baseurl}/registration`, state)
      .then((response) => {
        if (response?.data?.status == 200) {
          toastMessage(response?.data?.message, "s");
          router.push("/signup");
        }
      })
      .catch((error) => {
        toastMessage(error?.message, "e");
      });
  };
  const authCnotroller = (e) => {
    e.preventDefault();
    if (pageName == "Registration") {
      registration();
    } else {
      login();
    }
  };
  return (
    <div className="flex w-screen h-screen justify-center items-center px-[10px] lg:px-0">
      <div className="shadow-1 p-[30px] lg!p-[40px]">
        <p className="text-center text-[25px] lg:text-[40px] font-extrabold text-color-1">Essential</p>
        <div className="grid grid-flow-row gap-4 xs:w-[300px] sm:w-[400px] lg:w-[500px] bg-white rounded-[5px] mt-8">
          <UiInput
            type="email"
            id="email"
            label="Email address"
            name="email"
            placeholder="Enter your email address"
            value={state.email}
            onChange={handleChangeField}
          />
          <UiInput
            label="Password"
            type="password"
            id="password"
            className="input"
            name="password"
            placeholder="Enter your password"
            value={state.password}
            onChange={handleChangeField}
          />
          <p className="text-center text-gray-500">
            {text}
            <Link href={link} className="font-medium text-gray-600">
              {pageName == "Registration" ? "Login" : "Registration"}
            </Link>
          </p>
          <div className="text-center">
            <button className="button" onClick={authCnotroller}>
              {pageName}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Auth;
