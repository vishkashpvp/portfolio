import type { Metadata } from "next";
import { Montserrat } from "next/font/google";

import { ThemeProvider } from "@/components/layout/theme-provider";
import "./globals.css";

const montserrat = Montserrat({
  subsets: ["latin"],
  variable: "--font-montserrat",
  display: "swap",
  weight: ["400", "500", "600", "700"],
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  title: "vishkash | Vishnuprakash P",
  description:
    "Personal portfolio of Vishnuprakash P (vishkash) — a full-stack developer building calm, efficient web experiences.",
  authors: [{ name: "Vishnuprakash P" }],
  creator: "Vishnuprakash P",
  openGraph: {
    type: "website",
    locale: "en_US",
    title: "vishkash | Vishnuprakash P",
    description:
      "Personal portfolio of Vishnuprakash P (vishkash) — a full-stack developer building calm, efficient web experiences.",
    siteName: "vishkash",
  },
  twitter: {
    card: "summary_large_image",
    title: "vishkash | Vishnuprakash P",
    description:
      "Personal portfolio of Vishnuprakash P (vishkash) — a full-stack developer building calm, efficient web experiences.",
  },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      suppressHydrationWarning>
      <body className={`${montserrat.variable} ${montserrat.className} font-normal antialiased`}>
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
