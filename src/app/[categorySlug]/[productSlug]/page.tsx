import ProductList from "@/components/product-list";
import ProductPage from "@/components/product-page";
import { NextPageProps } from "@/types";
import { BreadCrumbs, SectionContainer } from "tp-kit/components";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data/products-category.data";

type Props = {
	categorySlug: string,
  productSlug: string
}

export default function Home({params} : NextPageProps<Props>) {
  const product = {
    ...PRODUCTS_CATEGORY_DATA[0].products[0],
    category: {
      ...PRODUCTS_CATEGORY_DATA[0],
      products: PRODUCTS_CATEGORY_DATA[0].products.slice(1)
    }
  };
  
    return (
      <main className="bg-coffee-50">
        <SectionContainer background="coffee" fullWidth>
            <BreadCrumbs items={[
                {
                label: 'Accueil',
                url: '/'
                },
                {
                    label: params.categorySlug,
                    url: '/'+ params.categorySlug
                },
                {
                  label:product.name,
                  url: '/'+params.categorySlug + '/' + params.productSlug
                }
            ]}
            className="font-medium"/>
        </SectionContainer>
        <ProductPage product={product}/>
          
      </main>
    );
  }