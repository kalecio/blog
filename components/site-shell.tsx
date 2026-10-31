import Link from "next/link";
import { homePath, locales, messages, type Locale } from "@/lib/i18n";
import { getPosts } from "@/lib/posts";
import { LanguageSelector } from "./language-selector";
export function SiteShell({ children, locale }: { children: React.ReactNode; locale: Locale }) {
  const t = messages[locale];
  const availablePosts = Object.fromEntries(locales.map((item) => [item, getPosts(item).map((post) => post.slug)]));
  return <><a className="skip-link" href="#conteudo">{t.skip}</a><div className="shell">
    <header className="site-header"><Link className="wordmark" href={homePath(locale)} aria-label={`kalec.io — ${t.blog}`}>kalec<span>.io</span><span className="brand-dot">✳</span></Link><nav aria-label={t.navigation}><Link href={homePath(locale)}>{t.blog}</Link><a href="https://kalec.io">kalec.io <span aria-hidden="true">↗</span></a><LanguageSelector locale={locale} availablePosts={availablePosts} links={Object.fromEntries(locales.map((item) => [item, homePath(item)]))} /></nav></header>
    {children}
    <aside className="about-kalec" aria-label="kalec.io"><div><p className="eyebrow">KALEC.IO</p><h2>{t.aboutTitle}</h2><p>{t.about}</p><a href="https://kalec.io">{t.cta} <span aria-hidden="true">↗</span></a></div></aside>
    <footer className="site-footer"><span><a href="https://kalec.io">kalec.io</a><span className="footer-divider">/</span>{t.tagline}</span><span>{t.motto}</span></footer>
  </div></>;
}
