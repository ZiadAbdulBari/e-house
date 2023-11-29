import ProductCart from "../ProductCard/ProductCard";

const Section = ({ sectionName, products }) => {
  return (
    <div>
      <h1 className="text-[30px] font-semibold text-gray-800 text-center">{sectionName}</h1>
      <div className="mt-8 grid grid-flow-row grid-cols-5 gap-3">
        {products.length > 0 &&
          products.map((product, index) => {
            return <ProductCart product={product} key={index} />;
          })}
      </div>
    </div>
  );
};
export default Section;
