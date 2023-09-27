import { create } from 'zustand'
import { CartData, ProductLineData } from '../types'
import { ProductData } from 'tp-kit/types'
import { wait } from 'tp-kit/utils/wait'

export const useCart = create<CartData>(() => ({
    lines:[],
    count:0
}))

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export async function addLine(product: ProductData) {
    useCart.setState((state) => {
        const productLine = state.lines.find((line) => line.product.id === product.id)
        
        if(productLine){
            productLine.qty++
            wait(1000)
            return {lines: [...state.lines]}
        }
        else{
            wait(1000)
            return {lines: [...state.lines, {product: product, qty:1}], count: state.count +1 }
        }
    })
}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
    useCart.setState((state)=>{
        let lineState = state.lines.find((lineS) => line.product.id === lineS.product.id)
        if(lineState){
            lineState = line
        }
        return {lines: [...state.lines]}
    })
}

/**
 * Supprime la ligne produit du panier 
 * 
 * @param productId 
 * @returns 
 */
export function removeLine(productId: number) {
    let deleted_line :ProductLineData = {
        product: {
            id: 0,
            name: '',
            desc: null,
            slug: '',
            path: '',
            img: '',
            price: 0
        },
        qty: 0
    }
    useCart.setState((state)=>{
        deleted_line= state.lines.find((line) => line.product.id == productId)!
        state.lines.splice(state.lines.indexOf(deleted_line))
        return {lines: [...state.lines], count: state.count - 1}
    })
    return deleted_line
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useCart.setState((state) => ({lines: []}))
}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {
    return line.product.price * line.qty
}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {
    let total = 0
    lines.map((line)=> total += computeLineSubTotal(line))
    return total
}