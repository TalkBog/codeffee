"use client"
import ProductFilters from "@/components/product-filters";
import { SYSTEM_ENTRYPOINTS } from "../../node_modules/next/dist/shared/lib/constants";
import { BreadCrumbs } from "../../tp-kit/components/breadcrumbs";
import { Button } from "../../tp-kit/components/button";
import { Heading } from "../../tp-kit/components/heading";
import { ProductCardLayout } from "../../tp-kit/components/products/product-card-layout";
import { ProductGridLayout } from "../../tp-kit/components/products/product-grid-layout";
import { SectionContainer } from "../../tp-kit/components/section-container";
import { ProductData } from "../../tp-kit/types";
import { filterProducts } from "@/utils/filter-products";
import { useMemo, useState } from "react";
import { ProductFiltersResult } from "@/types";

export default function ProductList({categories}:any){
    const [filters, setFilters] = useState<ProductFiltersResult>();

    const filtered = useMemo(() => filterProducts(categories, filters), [categories, filters]);

    return <>

        <SectionContainer background="white" fullWidth>
          <BreadCrumbs items={[
              {
                label: 'Accueil',
                url: '#'
              }
            ]}
            />
          </SectionContainer>
          <aside>
          <ProductFilters categories={categories} onChange={setFilters} />
          </aside>
          {filtered.map((categorie: { name: String; products: ProductData[]; }) => 
          <SectionContainer background="white" fullWidth>
            <h1 className="font-bold">{categorie.name} ({categorie.products.length})</h1> 
            <br/> 
            <ProductGridLayout products={categorie.products}>
              {(product: ProductData) => <ProductCardLayout button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} product={product}/>}
            </ProductGridLayout>
          </SectionContainer>

          )}
          
          
    </>
}