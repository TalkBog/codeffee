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
    categories = categories.filter((categorie)=>
        filters?.categoriesSlug.includes(categorie.slug)
    ) // on retire les categories non selectionnés
    

    if(filters.search.length != 0){
        categories = categories.map((categorie) => {
            categorie.products = categorie.products.filter((product)=> 
            filters.search.toLowerCase().includes(product.name.toLowerCase())
            )
            return categorie
        }) // on enleve les produit qui ne sont pas égales a la recherche
    }
    

    return categories
};