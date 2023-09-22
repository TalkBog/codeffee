
import ProductList from "@/components/product-list";
import { BreadCrumbs } from "tp-kit/components/breadcrumbs";
import { SectionContainer } from "tp-kit/components/section-container";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";


export default function Home() {
  const categories = PRODUCTS_CATEGORY_DATA;


  return (
    <main className="bg-coffee-50">
      <SectionContainer background="coffee" fullWidth>
        <BreadCrumbs items={[
            {
              label: 'Accueil',
              url: '/'
            }
          ]}
          className="font-medium"/>
      </SectionContainer>
      <ProductList categories={categories} showFilters ={true}/>
        
    </main>
  );
}
