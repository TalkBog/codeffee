"use client";
import { Order } from "@prisma/client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { OrderDetailsLayout } from "tp-kit/components";
import { OrderData } from "tp-kit/types";

type Props = {
  data: OrderData;
};
export default function RealTimeOrderDetail({ data }: Props) {
  const router = useRouter();
  const [order, setOrder] = useState(data);
  const supabase = createClientComponentClient();

  useEffect(() => {
    const channel = supabase
      .channel("channel Order")
      .on(
        "postgres_changes",
        {
          event: "UPDATE",
          table: "Order",
          schema: "public",
          filter: `id=eq.${order.id}`,
        },
        (payload) => {
          console.log(payload);
          setOrder({ ...(payload.new as Order), lines: order.lines });
        },
      )
      .subscribe();

    return () => {
      supabase.removeChannel(channel);
      router.refresh();
    };
  }, [supabase, order, setOrder]);
  return <OrderDetailsLayout order={order} />;
}
