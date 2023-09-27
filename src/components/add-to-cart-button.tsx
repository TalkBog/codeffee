import { Button } from "tp-kit/components"
import { ProductData } from "tp-kit/types"
import { addLine } from "../hooks/use-cart"
import { Children, useState } from "react"

type props = {
    product: ProductData
}



export default function AddToCartButton({product}:props){
    const [disabled, setDisabled] = useState(false)
    const [children, setChildren] = useState("Ajouter au panier")
    return <>
        <Button variant="ghost" children={children} disabled={disabled} onClick={() => {
            setDisabled(true)
            setChildren(<Loader></Loader>)
        }}/>
    </>
}