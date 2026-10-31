import { SiteShell } from "@/components/site-shell";
import "@/app/globals.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="en" data-scroll-behavior="smooth"><body><SiteShell locale="en">{children}</SiteShell></body></html>;
}
