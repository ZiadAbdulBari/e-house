import ProductCart from "../ProductCard/ProductCard";

const Section = ({sectionName,products})=>{
    return(
        <div>
            <h1 className="text-[40px] text-center">{sectionName}</h1>
            <div className="mt-8 grid grid-flow-row grid-cols-4 gap-6">
                {
                    products.length>0? products.map((product,index)=>{
                        return(
                            <ProductCart product={product} key={index}/>
                        )
                    })
                    :'No product'
                }
            </div>
        </div>
    )
}
export default Section;