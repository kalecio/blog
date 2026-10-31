import Link from "next/link";
import "./globals.css";
export const metadata = { title: "404 | Blog kalec.io", robots: { index: false, follow: true } };
export default function GlobalNotFound() {
  return <html lang="pt-BR"><body><main id="conteudo" className="shell not-found"><p className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</p><h1>Essa ideia ainda não está por aqui.</h1><Link className="back-link" href="/">Português</Link>{" · "}<Link className="back-link" href="/en">English</Link>{" · "}<Link className="back-link" href="/es">Español</Link></main></body></html>;
}
