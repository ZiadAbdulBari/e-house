import Link from "next/link";

const Auth = ({ pageName, text, link }) => {
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
            placeholder="Enter your phone number"
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
            placeholder="Enter your password"
          />
        </div>
        <p className="text-center">
          {text}
          <Link href={link} className="font-bold">
            {pageName=='Registration'?'Login':'Registration'}
          </Link>
        </p>
        <div className="text-center">
          <button className="button">{pageName}</button>
        </div>
      </div>
    </div>
  );
};
export default Auth;
