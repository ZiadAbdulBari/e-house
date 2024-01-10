import axios from "axios";
import { useRouter } from "next/router";
import React, { useEffect } from "react";

const Success = () => {
  const router = useRouter();
  const chnageStatus = () => {
    // router.query.id
    const url = `http://localhost:4000/change-payment-status`;
    const id = router.query.id;
    console.log(id);
    axios.post(url, { id }).then((response) => {
      if (response.data.status == 200) {
        router.push('/order');
      }
    });
  };
  useEffect(() => {
    chnageStatus();
  }, [router]);
  return (
    <div className="flex justify-center items-center h-screen">
      <div>
        <h1 className="text-color-1 font-semibold text-[30px]">Payment successfull</h1>
        <h1 className="text-color-1 font-medium text-[25px] mt-2 text-center">Thank you for shopping</h1>
      </div>
    </div>
  );
};

export default Success;
