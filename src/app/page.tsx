
import ProductList from "@/components/product-list";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";


export default function Home() {
  const categories = PRODUCTS_CATEGORY_DATA;


  return (
    <main className="bg-coffee-50">
      <ProductList categories={categories}/>
        
    </main>
  );
}
