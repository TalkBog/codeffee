import { Button } from "tp-kit/components"
import { ProductData } from "tp-kit/types"
import { addLine } from "../hooks/use-cart"
import { Children, useState } from "react"
import { Loader } from '@mantine/core';

type props = {
    product: ProductData
}



export default function AddToCartButton({product}:props){
    const [disabled, setDisabled] = useState(false)
    const [children, setChildren] = useState(<>Ajouter au panier</>)
    return <>
        <Button fullWidth variant="ghost" children={children} disabled={disabled} onClick={async () => {
            setDisabled(true)
            setChildren(<Loader color="rgba(56, 138, 107, 1)"/>)
            await addLine(product)
            setChildren(<>Ajouter au panier</>)
            setDisabled(false)
        }}/>
    </>
}