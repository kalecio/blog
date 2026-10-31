import { SiteShell } from "@/components/site-shell";
import "@/app/globals.css";
export default function Layout({ children }: { children: React.ReactNode }) {
  return <html lang="es" data-scroll-behavior="smooth"><body><SiteShell locale="es">{children}</SiteShell></body></html>;
}
