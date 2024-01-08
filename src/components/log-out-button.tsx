"use client";
import { createClientComponentClient } from "@supabase/auth-helpers-nextjs";
import { useRouter } from "next/navigation";
import { Button } from "tp-kit/components";

export default function LogOutButton() {
  const router = useRouter();
  const handleClick = async () => {
    const supabase = createClientComponentClient();
    await supabase.auth.signOut();

    router.refresh();
  };
  return (
    <Button variant={"outline"} fullWidth onClick={handleClick}>
      Se déconnecter
    </Button>
  );
}
