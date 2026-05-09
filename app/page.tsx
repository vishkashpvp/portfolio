import type { Metadata } from "next";

import { PortfolioTerminal } from "@/components/terminal/portfolio-terminal";

export const metadata: Metadata = {
  title: "vishkash | terminal",
  description: "Portfolio 3.0 — Terminal-style shell with work history, projects, and more.",
};

export default function Home() {
  return <PortfolioTerminal />;
}
