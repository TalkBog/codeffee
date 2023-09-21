import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "../types";

export function filterProducts(
	categories: ProductsCategoryData[], 
	filters?: ProductFiltersResult
) : ProductsCategoryData[] {
    console.log(filters)
    if(!filters){
        return categories
    }

    if(filters.categoriesSlug.length > 0){
        categories = categories.filter((categorie)=>
            filters?.categoriesSlug.includes(categorie.slug)
        ) // on retire les categories non selectionnés
        
    }
    
    if(filters.search.length > 0){
        categories = categories.filter((categorie) => {
            categorie.products = categorie.products.filter((product)=> 
            product.name.toLowerCase().includes(filters.search.toLowerCase())
            )
            return categorie.products.length >0
            
        }) // on enleve les produit qui ne sont pas égales a la recherche
    }
    

    return categories
};