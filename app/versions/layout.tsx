import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "vishkash | portfolio versions",
  description: "Browse alternate layouts — terminal, cards, and classic.",
};

export default function VersionsLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
