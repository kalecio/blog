import type { Metadata } from "next";
import Link from "next/link";
import "./globals.css";

export const metadata: Metadata = {
  metadataBase: new URL("https://blog.kalec.io"),
  title: { default: "kalec.io — caderno aberto", template: "%s · kalec.io" },
  description: "Notas sobre tecnologia, design e o que acontece no caminho. Sem pressa. Uma ideia de cada vez.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return <html lang="pt-BR" data-scroll-behavior="smooth"><body>
    <a className="skip-link" href="#conteudo">Pular para o conteúdo</a>
    <div className="shell">
      <header className="site-header">
        <Link className="wordmark" href="/" aria-label="kalec.io, início">kalec<span>.io</span><span className="brand-dot">✳</span></Link>
        <nav aria-label="Navegação principal"><Link href="/">O blog <span aria-hidden="true">↗</span></Link></nav>
      </header>
      {children}
      <footer className="site-footer"><span>kalec.io <span className="footer-divider">/</span> Feito de ideias.</span><span>Menos ruído, mais significado.</span></footer>
    </div>
  </body></html>;
}
