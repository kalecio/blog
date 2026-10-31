import Link from "next/link";
import { homePath, messages } from "@/lib/i18n";
export default function NotFound() { const t = messages.pt; return <main id="conteudo" className="not-found"><p className="eyebrow">404 / {t.missing}</p><h1>{t.notFound}</h1><Link className="back-link" href={homePath("pt")}>← {t.back}</Link></main>; }
