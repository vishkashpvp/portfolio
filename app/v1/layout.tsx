import type { Metadata } from "next";

import { ClassicLayoutChrome } from "@/components/layout/classic-layout-chrome";

export const metadata: Metadata = {
  title: "Vishnuprakash P · classic layout",
  description: "Alternate split-screen portfolio layout.",
};

export default function V1Layout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <>
      <ClassicLayoutChrome />
      {children}
    </>
  );
}
