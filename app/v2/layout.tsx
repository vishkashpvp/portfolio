import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "vishkash | Vishnuprakash P",
  description:
    "Personal portfolio of Vishnuprakash P (vishkash) — a full-stack developer building calm, efficient web experiences.",
};

export default function V2Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return children;
}
