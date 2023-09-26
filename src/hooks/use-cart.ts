import { create } from 'zustand'
import { CartData, ProductLineData } from '../types'
import { ProductData } from 'tp-kit/types'

const useStore = create<CartData>(() => ({
    lines:[]
}))

/**
 * Ajoute une nouvelle ligne au panier.
 * Si le produit est déjà dans le panier, augmente la quantité de 1.
 * 
 * @param product 
 */
export function addLine(product: ProductData) {
    useStore.setState((state) => {
        const productLine = state.lines.find((line) => line.product.id === product.id)
        
        if(productLine){
            productLine.qty++
            return {lines: [...state.lines]}
        }
        else{
            return {lines: [...state.lines, {product: product, qty:1}]}
        }
    })
}

/**
 * Modifie une ligne produit du panier
 * 
 * @param line 
 */
export function updateLine(line: ProductLineData) {
    useStore.setState((state)=>{
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
    useStore.setState((state)=>{
        deleted_line= state.lines.find((line) => line.product.id == productId)!
        state.lines.splice(state.lines.indexOf(deleted_line))
        return {lines: [...state.lines]}
    })
    return deleted_line
}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {
    useStore.setState((state) => ({lines: []}))
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
    lines.map((line)=> total+= computeLineSubTotal(line))
    return total
}