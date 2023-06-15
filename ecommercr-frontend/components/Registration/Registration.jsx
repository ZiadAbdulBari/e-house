import Link from "next/link";

const Registration = () => {
  return (
    <div className="flex !w-screen h-screen justify-center items-center">
      <div className="grid grid-flow-row gap-4 w-[400px]">
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
        <p>
          If you have no account, please{" "}
          <Link href="/signup" className="font-bold">
            Login
          </Link>
        </p>
        <div>
          <button className="button">Registration</button>
        </div>
      </div>
    </div>
  );
};
export default Registration;
