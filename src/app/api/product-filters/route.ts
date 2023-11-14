import { NextRequest, NextResponse } from "next/server"
import prisma from "../../../utils/prisma"

export async function GET(request: NextRequest) {
    const searchParams = request.nextUrl.searchParams
    const search = searchParams.get('search')
    const cat = searchParams.getAll('cat')
    console.log(cat, search)
    const result = await prisma.productCategory.findMany({
        where: cat.length > 0 ?{
            slug:{
                in:cat
            }
        }: {}, 
        include:{
            products: search ? {
                where:{
                    name:{
                        contains: search,
                        mode: 'insensitive',
                    }
                }
            } : true
        }
    })

    return NextResponse.json({
        "params": {
            "categorieSlugs":cat,
            "search": search
        },
        "categories":result
    })
}