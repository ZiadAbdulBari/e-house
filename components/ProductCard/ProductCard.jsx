import Link from "next/link";
const ProductCart = ({ product }) => {
  return (
    <Link href={`/product-detail/${encodeURIComponent(product.id)}`}>
      <div className="lg:h-[500px] border bg-gray-50 rounded hover:shadow-lg hover:shadow-gray-400/20 transition-all duration-300">
        <div className="h-[350px] w-full bg-white overflow-hidden">
          <img
            src={product?.productImages[0]?.image_url}
            className="h-full w-full object-cover hover:scale-125 transition-all duration-700"
          />
        </div>
        <div className="p-[10px] grid grid-flow-row gap-2">
          <h1 className="font-semibold text-color-1">{product.title}</h1>
          <div className="flex">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
                fill="rgba(245,191,13,1)"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
                fill="rgba(245,191,13,1)"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
                fill="rgba(245,191,13,1)"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
                fill="rgba(245,191,13,1)"
              ></path>
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="20"
              height="20"
            >
              <path
                d="M12.0008 14.6564L14.8175 16.3769L14.0517 13.1664L16.5583 11.0192L13.2683 10.7554L12.0008 7.70792V14.6564ZM12.0008 17L6.12295 20.5902L7.72105 13.8906L2.49023 9.40983L9.35577 8.85942L12.0008 2.5L14.6458 8.85942L21.5114 9.40983L16.2806 13.8906L17.8787 20.5902L12.0008 17Z"
                fill="rgba(245,191,13,1)"
              ></path>
            </svg>
          </div>
          <div className="flex gap-2">
            <p
              className={`${
                product.discount_price > 0
                  ? "text-gray-500 line-through"
                  : "text-gray-800 font-semibold"
              }`}
            >
              {product.price} Tk
            </p>
            {product.discount_price > 0 && (
              <p className="text-color-1 font-semibold">
                {product.price - product.discount_price} Tk
              </p>
            )}
          </div>
          <div className="grid grid-flow-col grid-cols-1 transition-all duration-900">
            <div className="group flex items-center w-full">
              <div className="w-[35px] h-[35px] flex justify-center items-center rounded-full border border-color-1 transition-all duration-300 group-hover:bg-color-1">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  width="20"
                  height="20"
                >
                  <path
                    d="M1.18164 12C2.12215 6.87976 6.60812 3 12.0003 3C17.3924 3 21.8784 6.87976 22.8189 12C21.8784 17.1202 17.3924 21 12.0003 21C6.60812 21 2.12215 17.1202 1.18164 12ZM12.0003 17C14.7617 17 17.0003 14.7614 17.0003 12C17.0003 9.23858 14.7617 7 12.0003 7C9.23884 7 7.00026 9.23858 7.00026 12C7.00026 14.7614 9.23884 17 12.0003 17ZM12.0003 15C10.3434 15 9.00026 13.6569 9.00026 12C9.00026 10.3431 10.3434 9 12.0003 9C13.6571 9 15.0003 10.3431 15.0003 12C15.0003 13.6569 13.6571 15 12.0003 15Z"
                    className="fill-color-1 transition-all duration-300 group-hover:fill-color-3"
                  ></path>
                </svg>
              </div>
            </div>
          </div>
          {product.discount_price > 0 && (
            <div className="absolute top-4 left-4 bg-red-500 py-[5px] px-[10px] rounded-[100px]">
              <p className="text-white">-{product.discount_price} Tk</p>
            </div>
          )}
        </div>
      </div>
    </Link>
  );
};
export default ProductCart;
