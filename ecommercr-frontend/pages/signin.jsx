import Auth from "@/components/Authentication/Auth";

const Signin = () => {
  return (
    <Auth
      pageName="Registration"
      text="If you have an account, please "
      link="/signup"
    />
  );
};
export default Signin;
