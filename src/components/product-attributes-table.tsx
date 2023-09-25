import { ProductAttribute, ProductFiltersResult } from "@/types"
import { ProductRating } from "tp-kit/components"
import './product-attributes-table.module.css'
type Props = {
    rating : ProductAttribute[]
}


export default function ProductAttributesTable({rating}:Props){
    return<>
        <table className="table">
            <tbody>
                {rating.map((rate: ProductAttribute) => {
                    return <>
                        <tr>
                            <td>{rate.label}</td>
                            <td align="right"><ProductRating value={rate.rating} icon="circle"/></td>
                        </tr>
                    </>
                    }
                )}
                
            </tbody>
        </table>
    </>
}