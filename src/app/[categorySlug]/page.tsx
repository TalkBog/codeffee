import ProductList from "@/components/product-list";
import { NextPageProps } from "@/types";
import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data/products-category.data";

type Props = {
	categorySlug: string,
}

export default function Home({params} : NextPageProps<Props>) {
    let categories = PRODUCTS_CATEGORY_DATA;
    categories = categories.filter((categorie) => {
        return categorie.slug.toLowerCase() == params.categorySlug.toLowerCase()
    })
  
  
    return (
      <main className="bg-coffee-50">
        <SectionContainer background="coffee" fullWidth>
            <BreadCrumbs items={[
                {
                label: 'Accueil',
                url: '#'
                },
                {
                    label: params.categorySlug,
                    url: '#'
                }
            ]}
            className="font-medium"/>
        </SectionContainer>
        <ProductList categories={categories} showFilters ={false}/>
          
      </main>
    );
  }