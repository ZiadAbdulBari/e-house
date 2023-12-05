import ProductCart from "../ProductCard/ProductCard";

const Section = ({ sectionName,count, products }) => {
  return (
    <div>
      <div className="flex gap-2 items-end">
        <h1 className="text-[30px] font-semibold text-gray-800">{sectionName}</h1>
        {
          count>0 && <p className="font-semibold text-[22px] text-gray-500">({count})</p>
        }
      </div>
      <div className="mt-8 grid grid-flow-row grid-cols-4 gap-3">
        {products.length > 0 &&
          products.map((product, index) => {
            return <ProductCart product={product} key={index} />;
          })}
      </div>
    </div>
  );
};
export default Section;
