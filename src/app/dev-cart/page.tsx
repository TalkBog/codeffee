"use client";
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { Button, Card, Heading, ProductCardLayout, ProductCartLine, SectionContainer } from "tp-kit/components";
const products = PRODUCTS_CATEGORY_DATA[0].products.slice(0, 3);

export default function DevCartPage() {
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
            button={<Button variant={"ghost"} fullWidth>Ajouter au panier</Button>}
          />
        ))}
      </section>
      {/* /Produits */}

      {/* Panier */}
      <section className="w-full lg:w-1/3 space-y-8">
				<Card>
                    <Heading as="h1" size="sm" weight="bold">Mon Panier</Heading>
                    <div className="my-16 flex gap-10 flex-col">
                        <ProductCartLine product={products[0]} qty={1} onDelete={function noRefCheck(){}} onQtyChange={function noRefCheck(){}} className="font-bold" />
                        <ProductCartLine product={products[1]} qty={2} onDelete={function noRefCheck(){}} onQtyChange={function noRefCheck(){}} className="font-bold"/>
                    </div>
                    <div className="flex justify-between font-bold mb-10">
                        <p>Total</p>
                        <p>19,51 €</p>
                    </div>
                    <Button className="w-full">Commander</Button> 
                </Card>
				<Button variant={"outline"} fullWidth>Vider le panier</Button>
			</section>
      {/* /Panier */}
    </SectionContainer>
  );
}