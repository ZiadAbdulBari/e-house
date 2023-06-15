import ProductCart from "../ProductCard/ProductCard";

const Section = ({sectionName,products})=>{
    return(
        <div>
            <h1 className="text-[40px] text-center">{sectionName}</h1>
            <div className="mt-8">
                <ProductCart/>
            </div>
        </div>
    )
}
export default Section;