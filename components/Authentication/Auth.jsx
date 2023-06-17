import { AuthContext } from "@/contaxt/AuthContext";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useState } from "react";

const Auth = ({ pageName, text, link }) => {
  const router = useRouter();
  const {setAuthData} = useContext(AuthContext)
  const [state, setState] = useState({ phone: "", password: "" });
  const handleChangeField = (e) => {
    setState({
      ...state,
      [e.target.name]: e.target.value,
    });
  };
  const login = ()=>{
    const apiResponse = 200;
    if(apiResponse==200){
      setAuthData(true);
      router.push('/');
    }
  }
  const registration = ()=>{
    const apiResponse = 201;
    if(apiResponse==201){
      router.push('/signup');
    }
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
            <label htmlFor="phone">Phone Number</label>
          </div>
          <input
            type="text"
            id="phone"
            className="input"
            name="phone"
            placeholder="Enter your phone number"
            value={state.phone}
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
