import { SiteShell } from "@/components/site-shell";
import "@/app/globals.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" data-scroll-behavior="smooth"><body><SiteShell locale="pt">{children}</SiteShell></body></html>;
}
