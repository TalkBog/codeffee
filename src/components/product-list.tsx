"use client"
import ProductFilters from "@/components/product-filters";
import { SYSTEM_ENTRYPOINTS } from "../../node_modules/next/dist/shared/lib/constants";
import { BreadCrumbs } from "../../tp-kit/components/breadcrumbs";
import { Button } from "../../tp-kit/components/button";
import { Heading } from "../../tp-kit/components/heading";
import { ProductCardLayout } from "../../tp-kit/components/products/product-card-layout";
import { ProductGridLayout } from "../../tp-kit/components/products/product-grid-layout";
import { SectionContainer } from "../../tp-kit/components/section-container";
import { ProductData, ProductsCategoryData } from "../../tp-kit/types";
import { filterProducts } from "@/utils/filter-products";
import { useMemo, useState } from "react";
import { ProductFiltersResult } from "@/types";
import Link from "next/link";

type props = {
  categories : ProductsCategoryData[],
  showFilters : boolean
}

export default function ProductList({categories, showFilters}:props){
    const [filters, setFilters] = useState<ProductFiltersResult>();

    const filtered = useMemo(() => filterProducts(categories, filters), [categories, filters]);

    let filter = <></>

    if(showFilters){
      filter = <SectionContainer background="coffee" className="basis-1/4 mt-12">
      <ProductFilters categories={categories} onChange={setFilters}/>
    </SectionContainer>
    }

    return <div className="inline-flex flex-row">
          
        
        {filter}
        
        <SectionContainer background="coffee" fullWidth>
        {filtered.map((categorie: ProductsCategoryData, index : number) => 
          <div key={index}>
            <h1><Link className="font-bold link" href={"/"+ categorie.slug}>{categorie.name} ({categorie.products.length})</Link></h1>
            <br/> 
            <ProductGridLayout products={categorie.products}>
              {(product: ProductData) => <ProductCardLayout button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} product={product}/>}
            </ProductGridLayout>
            <br/>
          </div>
          
        )}
        </SectionContainer>
      </div>
}