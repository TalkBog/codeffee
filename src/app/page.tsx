import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { SYSTEM_ENTRYPOINTS } from "../../node_modules/next/dist/shared/lib/constants";
import { BreadCrumbs } from "../../tp-kit/components/breadcrumbs";
import { Button } from "../../tp-kit/components/button";
import { Heading } from "../../tp-kit/components/heading";
import { ProductCardLayout } from "../../tp-kit/components/products/product-card-layout";
import { ProductGridLayout } from "../../tp-kit/components/products/product-grid-layout";
import { SectionContainer } from "../../tp-kit/components/section-container";
import { ProductData } from "../../tp-kit/types";

export default function Home() {
  const categories = PRODUCTS_CATEGORY_DATA;

  return (
    <main>
      <SectionContainer background="white" fullWidth>
        <BreadCrumbs items={[
            {
              label: 'Accueil',
              url: '#'
            }
          ]}
          />
        </SectionContainer>
        
        {categories.map((categorie: { name: any; products: string | any[]; }) => 
        <SectionContainer background="white" fullWidth>
          <h1 className="font-bold">{categorie.name} ({categorie.products.length})</h1> 
          <br/> 
          <ProductGridLayout products={categorie.products}>
            {(product: ProductData) => <ProductCardLayout button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} product={product}/>}
          </ProductGridLayout>
        </SectionContainer>
        
        )}
        
        
    </main>
  );
}
