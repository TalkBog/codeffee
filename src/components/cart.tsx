import { Card, Heading,ProductCartLine,FormattedPrice,Button } from "tp-kit/components"
import { updateLine,computeCartTotal,removeLine, useCart } from "../hooks/use-cart"

export default function Cart(){
    const lines = useCart((state) => state.lines)
    return <>
            <Heading as="h1" size="sm" weight="bold">Mon Panier</Heading>
            <div className="my-16 flex gap-10 flex-col">
                {lines.map((line, index) => 
                <ProductCartLine key={index} product={line.product} qty={line.qty} onQtyChange={(qty) => {
                    line.qty = qty
                    updateLine(line)
                }} onDelete={()=> removeLine(line.product.id)} className="font-bold" />
                )}
            </div>
            <div className="flex justify-between font-bold mb-10">
                <p>Total</p>
                <FormattedPrice price={computeCartTotal(lines)}/>
            </div>
            <Button className="w-full">Commander</Button> 
    </>
}