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
export function removeLine(productId: number) {}

/**
 * Vide le contenu du panier actuel
 */
export function clearCart() {}

/**
 * Calcule le total d'une ligne du panier
 */
export function computeLineSubTotal(line: ProductLineData): number {}

/**
 * Calcule le total du panier
 */
export function computeCartTotal(lines: ProductLineData[]): number {}