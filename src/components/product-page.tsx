"use client"

import { Button, ProductCardLayout, ProductGridLayout, ProductRating, SectionContainer } from "tp-kit/components"
import Image from 'next/image'
import ProductList from "./product-list"
import { ProductData } from "tp-kit/types"

export default function ProductPage({product}:any){
    return <>
    <SectionContainer fullWidth>
        <div className="flex flex-row">
            <Image src={product.img} alt={product.slug + "Image"} width={350} height={350} priority={true} />
            <div className="flex flex-col gap-16 ml-12">
                <h1 className="font-bold text-5xl ">{product.name}</h1>
                <ProductRating value={4} size={24} icon="star"/>
                <p className="text-lg">{product.desc}</p>
                <div className="flex justify-between">
                    <p className="text-xl">{product.price} €</p>
                    <Button>Ajouter au panier</Button>
                </div>
            </div>
        </div>
    </SectionContainer>
    <SectionContainer>
        <h1 className="font-bold text-3xl mb-10">Vous aimerez aussi :</h1>
        <ProductGridLayout products={product.category.products}>
              {(product: ProductData) => <ProductCardLayout button={<Button fullWidth variant="ghost">Ajouter au panier</Button>} product={product}/>}
        </ProductGridLayout>
    </SectionContainer>
    </>
}