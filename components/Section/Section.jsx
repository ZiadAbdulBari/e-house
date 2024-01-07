import Link from "next/link";
import ProductCart from "../ProductCard/ProductCard";

const Section = ({ sectionName, count, products, id = "" }) => {
  return (
    <div className="mt-20 w-full">
      <div
        className={`flex ${
          count > 0 ? "items-end gap-2" : "justify-between items-center"
        } w-full`}
      >
        <h1 className="text-[30px] font-semibold text-color-1">
          {sectionName}
        </h1>

        {count > 0 ? (
          <p className="font-semibold text-[22px] text-gray-500">({count})</p>
        ) : (
          <Link className="cursore-pointer" href={`/section/${id}`}>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="35"
              height="35"
            >
              <path
                d="M12 2C17.52 2 22 6.48 22 12C22 17.52 17.52 22 12 22C6.48 22 2 17.52 2 12C2 6.48 6.48 2 12 2ZM12 11H8V13H12V16L16 12L12 8V11Z"
                className="fill-color-1"
              ></path>
            </svg>
          </Link>
        )}
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
