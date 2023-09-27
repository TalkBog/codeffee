import { useCart } from "../hooks/use-cart";

export default function CartCounter(){
    console.log("rendu counter")
    const lines = useCart((state) => state.lines)
    return lines.length
}