import axios from "axios";
import { useRouter } from "next/router";
import { useEffect } from "react";
const Detail = () => {
  const router = useRouter();
  // const detailData = ()=>{
  //     const URL = `https://dummyjson.com/products/${router.query.id}`;
  //     axios.get(URL)
  //     .then(response=>{
  //         console.log(response)
  //     })
  // }
  // useEffect(()=>{
  //     detailData();
  // },[])
  return (
    <div className="lg:container mx-auto">
      <div className="flex gap-8 h-full">
        <div className="image flex gap-4 w-[40%] h-[400px]">
          <div className="w-[15%] h-full bg-[red]">List</div>
          <div className="w-[85%] h-full bg-[orange]">Full Image</div>
        </div>
        <div className="w-[60%] h-full">
          <h1 className="font-bold text-[20px] text-[#025464]">Product Name</h1>
          <p className="mt-4 text-yellow-500">4.5 (Customer review)</p>
          <div className="border border-gry-300p my-4"></div>
          <div>
            <div className="flex justify-between">
              <div className="icon w-[10%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
                    fill="rgba(3,144,77,1)"
                  ></path>
                </svg>
              </div>
              <div className="w-[90%]">
                <p className="font-semibold text-[#E57C23]">In stock</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="icon w-[10%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
                    fill="rgba(3,144,77,1)"
                  ></path>
                </svg>
              </div>
              <div className="w-[90%]">
                <p className="font-semibold text-[#E57C23]">Discount available</p>
              </div>
            </div>
            <div className="flex justify-between">
              <div className="icon w-[10%]">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="24"
                  height="24"
                >
                  <path
                    d="M10.0007 15.1709L19.1931 5.97852L20.6073 7.39273L10.0007 17.9993L3.63672 11.6354L5.05093 10.2212L10.0007 15.1709Z"
                    fill="rgba(3,144,77,1)"
                  ></path>
                </svg>
              </div>
              <div className="w-[90%]">
                <p className="font-semibold text-[#E57C23]">Free delivery available</p>
              </div>
            </div>
          </div>

          <div className="mt-8 short-des">
            <p className="text-gray-400">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum has been the industry standard dummy text
              ever since the 1500s, when an unknown printer took a galley of
              type and scrambled it to make a type specimen book. It has
              survived not only five centuries, but also the leap into
              electronic typesetting, remaining essentially unchanged. It was
              popularised in the 1960s with the release of Letraset sheets
              containing Lorem Ipsum passages, and more recently with desktop
              publishing software like Aldus PageMaker including versions of
              Lorem Ipsum.
            </p>
          </div>
          <div className="my-12">
            <button className="bg-orange-700 text-white px-[80px] py-[10px] rounded-[5px] flex justify-center gap-4">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                width="28"
                height="28"
              >
                <path
                  d="M4.00436 6.41662L0.761719 3.17398L2.17593 1.75977L5.41857 5.00241H20.6603C21.2126 5.00241 21.6603 5.45012 21.6603 6.00241C21.6603 6.09973 21.6461 6.19653 21.6182 6.28975L19.2182 14.2898C19.0913 14.7127 18.7019 15.0024 18.2603 15.0024H6.00436V17.0024H17.0044V19.0024H5.00436C4.45207 19.0024 4.00436 18.5547 4.00436 18.0024V6.41662ZM6.00436 7.00241V13.0024H17.5163L19.3163 7.00241H6.00436ZM5.50436 23.0024C4.67593 23.0024 4.00436 22.3308 4.00436 21.5024C4.00436 20.674 4.67593 20.0024 5.50436 20.0024C6.33279 20.0024 7.00436 20.674 7.00436 21.5024C7.00436 22.3308 6.33279 23.0024 5.50436 23.0024ZM17.5044 23.0024C16.6759 23.0024 16.0044 22.3308 16.0044 21.5024C16.0044 20.674 16.6759 20.0024 17.5044 20.0024C18.3328 20.0024 19.0044 20.674 19.0044 21.5024C19.0044 22.3308 18.3328 23.0024 17.5044 23.0024Z"
                  fill="rgba(255,255,255,1)"
                ></path>
              </svg>
              <span className="text-[20px]"> Add to cart</span>
            </button>
          </div>
          <div className="mt-8">
            <h1 className="font-bold text-[30px] text-[#025464]">Description</h1>
            <div className="mt-8">
              <h1 className="font-semibold text-[20px] text-[#E57C23]">Specifications:</h1>
              <p className="mt-2 text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged. It was
                popularised in the 1960s with the release of Letraset sheets
                containing Lorem Ipsum passages, and more recently with desktop
                publishing software like Aldus PageMaker including versions of
                Lorem Ipsum.
              </p>
            </div>
            <div className="mt-6">
              <h1 className="font-semibold text-[20px] text-[#E57C23]">Care & Maintenance:</h1>
              <p className="mt-2 text-gray-600">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum has been the industry standard dummy text
                ever since the 1500s, when an unknown printer took a galley of
                type and scrambled it to make a type specimen book. It has
                survived not only five centuries, but also the leap into
                electronic typesetting, remaining essentially unchanged.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default Detail;
