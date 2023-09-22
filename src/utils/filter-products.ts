import { ProductsCategoryData } from "tp-kit/types";
import { ProductFiltersResult } from "../types";

export function filterProducts(
	categories: ProductsCategoryData[], 
	filters?: ProductFiltersResult
) : ProductsCategoryData[] {
    if(!filters){
        return categories
    }
    let categories_search : ProductsCategoryData[] = [...categories]
   
    if(filters.categoriesSlug.length > 0){
        categories_search = categories_search.filter((categorie)=>
            filters?.categoriesSlug.includes(categorie.slug)
        ) // on retire les categories non selectionnés
        
    }
    
    if(filters.search.length > 0){
        categories_search.filter((categorie) => {
            categorie.products = categorie.products.filter((product)=> 
            product.name.toLowerCase().includes(filters.search.toLowerCase())
            )
            return categorie.products.length > 0
            
        }) // on enleve les produit qui ne sont pas égales a la recherche
    }

    return categories_search
};