import { CartContext } from "@/contaxt/CartContext";
import Link from "next/link";
import { useContext } from "react";

const ProductCart = ({product}) => {
  const {addCartData} = useContext(CartContext);
  const addTOCart = (product)=>{
    const cartData={
      id:product.id,
      image:product.image,
      title:product.title,
      price:product.price,
    }
    addCartData(cartData);
  }
  return (
    <div className="w-[200px] h-[300px] border border-gray-300 rounded-[5px]">
      <div className="h-[150px] w-full bg-white overflow-hidden">
        <img
          src={product.thumbnail}
          className="h-full w-full object-contain"
        />
        
      </div>
      <div className="p-[5px] grid grid-flow-row gap-4">
        <div className="flex justify-between w-full">
          <h1 className="w-[85%]">{product.title}</h1>
          <p className="w-[15%]">{product.rating}</p>
        </div>
        <div>
          <p>Price: {product.price} BDT</p>
        </div>
        <div className="flex justify-between ">
          <button className="bg-[#E8AA42] px-[15px] py-[2px] rounded-[5px] text-white"><Link href={`/product-detail/${encodeURIComponent(product.id)}`}>Details</Link></button>
          <button className="bg-orange-700 px-[15px] py-[2px] rounded-[5px] text-white" onClick={()=>addTOCart(product)}>Cart</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCart;
