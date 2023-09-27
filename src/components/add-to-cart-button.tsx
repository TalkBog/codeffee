"use client"
import { Button, ButtonProps } from "tp-kit/components"
import { ProductData } from "tp-kit/types"
import { addLine } from "../hooks/use-cart"
import { Children, useState } from "react"
import { Loader } from '@mantine/core';

type props = Pick<ButtonProps, 'variant'|'fullWidth'> & {
    product: ProductData, 
    loaderColor? : string 
} 



export default function AddToCartButton({product, loaderColor = "rgba(56, 138, 107, 1)", variant = "ghost", fullWidth = true}:props){
    const [disabled, setDisabled] = useState(false)
    const [children, setChildren] = useState(<>Ajouter au panier</>)
    return <>
        <Button fullWidth = {fullWidth} variant={variant} className="flex justify-center content-center" children={children} disabled={disabled} onClick={async () => {
            setDisabled(true)
            setChildren(<Loader color={loaderColor} className="self-center justify-self-center" size="xs"/>)
            await addLine(product)
            setChildren(<>Ajouter au panier</>)
            setDisabled(false)
        }}/>
    </>
}