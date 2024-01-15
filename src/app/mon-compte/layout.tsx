import { ReactNode } from "react";
import { Button, Heading, SectionContainer } from "tp-kit/components";
import prisma from "../../utils/prisma";
import { OrderTable } from "../../components/order-table";
import { getUser } from "../../utils/supabase";
import {
  createClientComponentClient,
  createServerComponentClient,
} from "@supabase/auth-helpers-nextjs";
import { redirect, useRouter } from "next/navigation";
import { cookies } from "next/headers";
import LogOutButton from "../../components/log-out-button";

export default async function Layout({ children }: { children: ReactNode }) {
  const cookieData = { cookies };
  const supabase = createServerComponentClient(cookieData);
  const session = await getUser(supabase);
  console.log(session);
  if (session.data.session === null) {
    console.log("redirect");
    redirect("/connexion");
  }
  const user = await supabase.auth.getUser();
  const orders = await prisma.order.findMany({
    where: {
      userId: user.data.user?.id,
    },
  });
  return (
    <>
      {/* Orders list */}
      <SectionContainer wrapperClassName="py-24 min-h-[80vh] flex flex-row w-full justify-between">
        <div className="h-fit w-[30vw] rounded-lg bg-white p-6 shadow-lg ">
          <Heading
            as="h1"
            size="md"
            variant="black"
            weight="bold"
            className="mb-4"
          >
            Mon compte
          </Heading>
          <p className="text-sm">
            Bonjour, {user.data.user?.user_metadata.name} !
          </p>
          <div className="pb-10 pt-5">
            <p className="text-sm">
              <span className=" font-bold">Nom:</span>{" "}
              {user.data.user?.user_metadata.name}
            </p>
            <p className="text-sm">
              <span className=" font-bold">Email:</span> {user.data.user?.email}
            </p>
          </div>
          <LogOutButton />
        </div>
        <div className="w-[60vw] rounded-lg bg-white p-6 shadow-lg">
          <Heading
            as="h1"
            size="md"
            variant="black"
            weight="bold"
            className="mb-4"
          >
            Mes commandes
          </Heading>
          <OrderTable orders={orders} />
        </div>
      </SectionContainer>

      {/* Children */}
      {children}
    </>
  );
}
