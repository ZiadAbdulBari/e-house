// import { AuthContext } from "@/contaxt/AuthContext";
import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/router";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getLoggedinStatus, getToken } from "../../store/authSlice";

const Auth = ({ pageName, text, link }) => {
  const loggedinStatus = useSelector(state=>state.auth.isLoggedin)
  const dispatch = useDispatch();
  const router = useRouter();
  const [state, setState] = useState({ email: "", password: "" });
  const handleChangeField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const login = ()=>{
    axios.post('http://localhost:4000/login',state)
    .then((response)=>{
      if(response?.data?.status==200){
        const token = response?.data?.access_token;
        window.localStorage.setItem('token',JSON.stringify(token));
        window.localStorage.setItem('isLoggedin',JSON.stringify(true));
        dispatch(getLoggedinStatus());
        dispatch(getToken());
        router.push('/');
      }
    })
  }
  const registration = ()=>{
    axios.post('http://localhost:4000/registration',state)
    .then(response=>{
      if(response?.data?.status==200){
        router.push('/signup');
      }
    })
  }
  const authCnotroller = (e)=>{
    e.preventDefault();
    if(pageName=='Registration'){
      registration();
    }
    else{
      login();
    }
  }
  return (
    <div className="flex w-screen h-screen justify-center items-center">
      <div className="grid grid-flow-row gap-4 w-[400px] bg-white p-[40px] rounded-[5px] shadow-1">
        <div>
          <div>
            <label htmlFor="email">Email address</label>
          </div>
          <input
            type="email"
            id="email"
            className="input"
            name="email"
            placeholder="Enter your email address"
            value={state.email}
            onChange={handleChangeField}
          />
        </div>
        <div>
          <div>
            <label htmlFor="password">Password</label>
          </div>
          <input
            type="password"
            id="password"
            className="input"
            name="password"
            placeholder="Enter your password"
            value={state.password}
            onChange={handleChangeField}
          />
        </div>
        <p className="text-center">
          {text}
          <Link href={link} className="font-bold text-orange-700">
            {pageName == "Registration" ? "Login" : "Registration"}
          </Link>
        </p>
        <div className="text-center">
          <button className="button" onClick={authCnotroller}>{pageName}</button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
