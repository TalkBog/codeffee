import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { Card, SectionContainer, ZodI18nProvider } from "tp-kit/components";
import { getUser } from "../../utils/supabase";
import { redirect } from "next/navigation";

export default async function layout({
  children,
}: {
  children: React.ReactNode;
}) {
  const supabase = createServerComponentClient({ cookies });
  const session = await getUser(supabase);
  console.log(session);
  if (session.data.session !== null) {
    console.log("redirect");
    redirect("/mon-compte");
  }
  return (
    <SectionContainer background="coffee">
      <Card className="mx-[30%] my-[4%] flex flex-col">
        <ZodI18nProvider>{children}</ZodI18nProvider>
      </Card>
    </SectionContainer>
  );
}
