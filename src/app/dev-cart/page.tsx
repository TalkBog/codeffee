"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, Card, FormattedPrice, Heading, ProductCardLayout, ProductCartLine, SectionContainer } from "tp-kit/components";
import { addLine, computeCartTotal, removeLine, updateLine, useCart } from "../../hooks/use-cart";
import { CartData } from "../../types";
import Cart from "../../components/cart";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
  console.log("rendu page")
  return (
    <SectionContainer
      className="py-36"
      wrapperClassName="flex flex-col lg:flex-row gap-24"
    >
      {/* Produits */}
      <section className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6 flex-1">
        {products.map((product) => (
          <ProductCardLayout
            key={product.id}
            product={product}
            button={<Button variant={"ghost"} fullWidth onClick={() => addLine(product)}>Ajouter au panier</Button>}
          />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
				<Cart/>
				<Button variant={"outline"} fullWidth>Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}