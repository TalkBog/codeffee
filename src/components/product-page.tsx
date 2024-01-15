"use client";

import {
  Button,
  ProductCardLayout,
  ProductGridLayout,
  ProductRating,
  SectionContainer,
} from "tp-kit/components";
import Image from "next/image";
import { ProductData } from "tp-kit/types";
import { ProductAttributesTable } from "./product-attributes-table";

export default function ProductPage({ product }: any) {
  return (
    <>
      <SectionContainer fullWidth>
        <div className="mx-10 flex flex-row items-start  justify-around">
          <Image
            src={product.img}
            alt={product.slug + "Image"}
            width={350}
            height={350}
            priority={true}
          />
          <div className="flex flex-col gap-16">
            <h1 className="text-5xl font-bold ">{product.name}</h1>
            <ProductRating value={4} size={24} icon="star" />
            <p className="text-lg">{product.desc}</p>
            <div className="flex justify-between">
              <p className="text-xl">{product.price} €</p>
              <Button>Ajouter au panier</Button>
            </div>
            <ProductAttributesTable
              data={[
                { label: "Intensité", rating: 3 },
                { label: "Volupté", rating: 2 },
                { label: "Amertume", rating: 1 },
                { label: "Onctuosité", rating: 4 },
                { label: "Instagramabilité", rating: 5 },
              ]}
            />
          </div>
        </div>
      </SectionContainer>
      <SectionContainer>
        <h1 className="mb-10 text-3xl font-bold">Vous aimerez aussi :</h1>
        <ProductGridLayout products={product.category.products}>
          {(product: ProductData) => (
            <ProductCardLayout
              button={
                <Button fullWidth variant="ghost">
                  Ajouter au panier
                </Button>
              }
              product={product}
            />
          )}
        </ProductGridLayout>
      </SectionContainer>
    </>
  );
}
