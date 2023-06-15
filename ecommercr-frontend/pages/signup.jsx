import Auth from "@/components/Authentication/Auth";
const Signup = ()=>{
    return(
        <Auth
      pageName="Login"
      text="If you have no account, please "
      link="/signin"
    />
    )
}
export default Signup;