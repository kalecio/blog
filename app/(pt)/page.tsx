import type { Metadata } from "next";
import { languageNames, languageTags, locales, homePath } from "@/lib/i18n";
import { languageAlternates, siteUrl } from "@/lib/seo";
export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "Blog kalec.io | Português, English, Español",
  description: "O blog da kalec.io sobre tecnologia, design e desenvolvimento de software. Escolha seu idioma: português, inglês ou espanhol.",
  alternates: { canonical: siteUrl, languages: { ...languageAlternates([...locales]), "x-default": siteUrl } },
  openGraph: { title: "Blog kalec.io", description: "Technology · Design · Software", url: siteUrl, type: "website", images: [{ url: `${siteUrl}/social-card.png`, width: 1200, height: 630 }] },
  twitter: { card: "summary_large_image", images: [`${siteUrl}/social-card.png`] },
};
export default function LanguageEntry() {
  return <main id="conteudo" className="intro"><p className="eyebrow">KALEC.IO / BLOG</p><h1>Ideias, sem fronteiras.</h1><p className="intro-description">Escolha seu idioma · Choose your language · Elige tu idioma</p><nav className="entry-languages" aria-label="Idiomas">{locales.map((locale) => <a key={locale} href={homePath(locale)} lang={languageTags[locale]} hrefLang={languageTags[locale]}>{languageNames[locale]} <span aria-hidden="true">↗</span></a>)}</nav></main>;
}
