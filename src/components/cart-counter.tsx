import { useCart } from "../hooks/use-cart";

export default function CartCounter(){
    console.log("rendu counter")
    return useCart((state)=>state.count)
}