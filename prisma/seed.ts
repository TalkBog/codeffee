import { PrismaClient } from '@prisma/client'
import { PRODUCTS_CATEGORY_DATA } from "tp-kit/data";
import { ProductsCategoryData } from 'tp-kit/types';

const prisma = new PrismaClient()

async function main() {
    const deleteProductCategory = prisma.productCategory.deleteMany()
    await prisma.$transaction([deleteProductCategory])
    for(const productcategory of PRODUCTS_CATEGORY_DATA){
        console.log("insertion catégorie " + productcategory.id)
    await prisma.productCategory.create({
        data:{
            id:productcategory.id,
            name: productcategory.name,
            slug: productcategory.slug
        }
    })
    await Promise.all(
        productcategory.products.map((product) =>{
            console.log("insertion produit " + product.id)
            return prisma.product.create({
                data:{
                    name: product.name,
                    slug: product.slug,
                    price: product.price,
                    path: product.path,
                    desc: product.desc,
                    img: product.img,
                    categoryId:productcategory.id
                }
            })
        })
    )
    
    }
    
}
main()
  .then(async () => {
    await prisma.$disconnect()
  })
  .catch(async (e) => {
    console.error(e)
    await prisma.$disconnect()
    process.exit(1)
  })