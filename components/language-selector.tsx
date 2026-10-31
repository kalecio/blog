"use client";
import { useEffect, useMemo } from "react";
import { usePathname } from "next/navigation";
import { browserLocale, postPath, languageNames, locales, messages, languageTags, type Locale } from "@/lib/i18n";

const preferenceKey = "kalec-blog-language";
export function LanguageSelector({ locale, links: homeLinks, availablePosts }: { locale: Locale; links: Partial<Record<Locale, string>>; availablePosts?: Record<string, string[]> }) {
  const pathname = usePathname();
  const slug = pathname.match(/\/posts\/([a-z0-9-]+)\/?$/)?.[1];
  const links = useMemo(() => slug && availablePosts ? Object.fromEntries(locales.filter((item) => availablePosts[item]?.includes(slug)).map((item) => [item, postPath(item, slug)])) : homeLinks, [slug, availablePosts, homeLinks]);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(preferenceKey); } catch { /* Storage may be disabled. */ }
    // Negotiate language only at the entry URL. Explicit localized URLs and article links stay stable.
    if (window.location.pathname !== "/") return;
    const target = locales.includes(saved as Locale) ? saved as Locale : browserLocale(navigator.languages?.length ? navigator.languages : [navigator.language]);
    if (links[target] && links[target] !== window.location.pathname) window.location.replace(links[target] + window.location.search + window.location.hash);
  }, [locale, links]);
  function choose(target: Locale) {
    try { localStorage.setItem(preferenceKey, target); } catch { /* Navigation still works without storage. */ }
    window.location.assign(links[target] ?? `/${target}`);
  }
  return <div className="language-control"><div className="language-links" role="group" aria-label={messages[locale].language}>{locales.filter((item) => links[item]).map((item) => <a key={item} href={links[item]} hrefLang={languageTags[item]} lang={languageTags[item]} aria-current={item === locale ? "page" : undefined} onClick={(event) => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); choose(item); }}>{languageNames[item]}</a>)}</div></div>;
}
