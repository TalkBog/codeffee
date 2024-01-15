import {
  BreadCrumbs,
  Button,
  FormattedPrice,
  ProductCardLayout,
  ProductGridLayout,
  ProductRating,
  ProductImage,
  SectionContainer,
} from "tp-kit/components";
import { NextPageProps } from "../../../types";
import { Metadata } from "next";
import {
  ProductAttribute,
  ProductAttributesTable,
} from "../../../components/product-attributes-table";
import { AddToCartButton } from "../../../components/add-to-cart-button";
import { cache } from "react";
import prisma from "../../../utils/prisma";
import { notFound } from "next/navigation";

export const dynamic = "force-static";
export async function generateStaticParams() {
  const categories = await prisma.productCategory.findMany({
    include: {
      products: true,
    },
  });

  let staticParam: { categorySlug: string; productSlug: string }[] = [];
  for (const categorie of categories) {
    categorie.products.map((product) => {
      staticParam.push({
        categorySlug: categorie.slug,
        productSlug: product.slug,
      });
    });
  }
  return staticParam;
}

const getProduct = cache((slug: string) =>
  prisma.product.findUnique({
    where: { slug },
    include: {
      category: {
        include: {
          products: {
            where: { slug: { not: slug } },
          },
        },
      },
    },
  }),
);

type Props = {
  categorySlug: string;
  productSlug: string;
};

export async function generateMetadata({
  params,
  searchParams,
}: NextPageProps<Props>): Promise<Metadata> {
  const product = await getProduct(params.productSlug);
  if (!product) return {};

  return {
    title: product.name,
    description:
      product.desc ??
      `Succombez pour notre ${product.name} et commandez-le sur notre site !`,
  };
}

const productAttributes: ProductAttribute[] = [
  { label: "Intensité", rating: 3 },
  { label: "Volupté", rating: 2 },
  { label: "Amertume", rating: 1 },
  { label: "Onctuosité", rating: 4 },
  { label: "Instagramabilité", rating: 5 },
];

export default async function ProductPage({ params }: NextPageProps<Props>) {
  const product = await getProduct(params.productSlug);
  if (!product) notFound();

  return (
    <SectionContainer wrapperClassName="max-w-5xl">
      <BreadCrumbs
        className="my-8"
        items={[
          {
            label: "Accueil",
            url: "/",
          },
          {
            label: product.category.name,
            url: `/${product.category.slug}`,
          },
          {
            label: product.name,
            url: `/${product.path}`,
          },
        ]}
      />

      {/* Produit */}
      <section className="flex flex-col justify-center gap-8 md:flex-row">
        {/* Product Image */}
        <div className="relative">
          <ProductImage
            {...product}
            priority
            className="sticky top-12 w-full rounded-lg object-cover sm:aspect-video md:aspect-auto md:w-[300px]"
          />
        </div>

        {/* Product body */}
        <div className="flex-1">
          <div className="prose prose-lg">
            {/* Product Name */}
            <h1>{product.name}</h1>

            {/* Product Rating */}
            <ProductRating value={4} size={18} />

            {/* Desc */}
            <p>{product.desc}</p>

            {/* Prix et ajout au panier */}
            <div className="flex items-center justify-between gap-8">
              <p className="!my-0 text-xl">
                <FormattedPrice price={product.price} />
              </p>
              <AddToCartButton
                variant={"primary"}
                product={product}
                fullWidth={false}
              />
            </div>
          </div>

          {/* Products attribute */}
          <ProductAttributesTable className="mt-6" data={productAttributes} />
        </div>
      </section>

      {/* Related products */}
      <section>
        <div className="mt-24">
          <div className="prose prose-lg mb-8">
            <h2>Vous aimerez aussi</h2>
          </div>

          <ProductGridLayout products={product.category.products}>
            {(product) => (
              <ProductCardLayout
                product={product}
                button={
                  <Button variant="ghost" className="flex-1 !py-4">
                    Ajouter au panier
                  </Button>
                }
              />
            )}
          </ProductGridLayout>
        </div>
      </section>
      {/* /Related products */}
    </SectionContainer>
  );
}
