const ProductCart = () => {
  return (
    <div className="w-[200px] h-[300px] border border-gray-300 grid grid-flow-row">
      <div className="h-[150px] w-full bg-[red] overflow-hidden">
        <img
          src="https://plus.unsplash.com/premium_photo-1675186049409-f9f8f60ebb5e?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1974&q=80"
          alt=""
          className="object-cover"
        />
      </div>
      <div className="p-[5px]">
        <div className="flex justify-between w-full">
          <h1 className="w-[88%]">Small size orange t-shirt</h1>
          <p className="w-[12%]">4.5</p>
        </div>
        <div className="flex justify-between">
          <button>Details</button>
          <button>Cart</button>
        </div>
      </div>
    </div>
  );
};
export default ProductCart;
