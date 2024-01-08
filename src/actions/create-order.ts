"use server";

import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { computeCartTotal, computeLineSubtotal } from "../hooks/use-cart";
import { CartData } from "../types";
import prisma from "../utils/prisma";
import { cookies } from "next/headers";
import { getUser } from "../utils/supabase";
import { data } from "autoprefixer";

export async function createOrder(cart: CartData) {
  const supabase = createServerComponentClient({ cookies });
  const user = await getUser(supabase);
  if (user.data.session === null) {
    return { error: "not-connected", success: false };
  }
  console.log(
    await prisma.order.create({
      data: {
        total: computeCartTotal(cart.lines),
        userId: user.data.session?.user.id,
        lines: {
          create: cart.lines.map((line) => ({
            productId: line.product.id,
            qty: line.qty,
            subtotal: computeLineSubtotal(line),
          })),
        },
      },
    }),
  );
  return { error: null, success: true };
}
