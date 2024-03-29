import "./globals.css";
import type { Metadata } from "next";
import { Lexend } from "next/font/google";
import { Providers } from "../components/providers";
import { Footer } from "tp-kit/components/footer";
import { Menu } from "../components/menu";
import { createServerComponentClient } from "@supabase/auth-helpers-nextjs";
import { cookies } from "next/headers";
import { getUser } from "../utils/supabase";

const font = Lexend({
  subsets: ["latin"],
  weight: ["400", "600"],
});

export const metadata: Metadata = {
  title: {
    default: "Starbucks",
    template: "%s - Starbucks",
  },
  robots: {
    index: false,
    follow: false,
  },
};

export default async function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const cookieData = { cookies };
  const supabase = createServerComponentClient(cookieData);
  const session = await getUser(supabase);
  return (
    <html lang="fr">
      <body className={font.className}>
        <Providers font={font}>
          <Menu connected={session.data.session !== null} />

          {children}
        </Providers>

        <Footer />
      </body>
    </html>
  );
}
