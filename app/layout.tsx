import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Kristine & Endre | Bryllup",
  description: "Bryllupsinvitasjon og praktisk informasjon for Kristine og Endre.",
  icons: { icon: "/favicon.svg", shortcut: "/favicon.svg" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="no"><body className="antialiased">{children}</body></html>;
}

