"use client";
import { useEffect, useState, useId, useMemo } from "react";
import { usePathname } from "next/navigation";
import { browserLocale, postPath, languageNames, locales, messages, languageTags, type Locale } from "@/lib/i18n";

const preferenceKey = "kalec-blog-language";
export function LanguageSelector({ locale, links: homeLinks, availablePosts }: { locale: Locale; links: Partial<Record<Locale, string>>; availablePosts?: Record<string, string[]> }) {
  const id = useId();
  const pathname = usePathname();
  const slug = pathname.match(/\/posts\/([a-z0-9-]+)\/?$/)?.[1];
  const links = useMemo(() => slug && availablePosts ? Object.fromEntries(locales.filter((item) => availablePosts[item]?.includes(slug)).map((item) => [item, postPath(item, slug)])) : homeLinks, [slug, availablePosts, homeLinks]);
  const [automatic, setAutomatic] = useState(false);
  useEffect(() => {
    let saved: string | null = null;
    try { saved = localStorage.getItem(preferenceKey); } catch { /* Storage may be disabled. */ }
    setAutomatic(!saved);
    // Negotiate language only at the entry URL. Explicit localized URLs and article links stay stable.
    if (window.location.pathname !== "/") return;
    const explicit = new URLSearchParams(window.location.search).get("lang");
    if (explicit === "pt") return;
    const target = locales.includes(saved as Locale) ? saved as Locale : browserLocale(navigator.languages?.length ? navigator.languages : [navigator.language]);
    if (target !== locale && links[target]) window.location.replace(links[target] + window.location.search + window.location.hash);
  }, [locale, links]);
  function choose(value: string) {
    const target = value === "auto" ? browserLocale(navigator.languages?.length ? navigator.languages : [navigator.language]) : value as Locale;
    try { if (value === "auto") localStorage.removeItem(preferenceKey); else localStorage.setItem(preferenceKey, target); } catch { /* Navigation still works without storage. */ }
    setAutomatic(value === "auto");
    const destination = links[target] ?? (target === "pt" ? "/" : `/${target}`);
    window.location.assign(destination === "/" && value !== "auto" ? "/?lang=pt" : destination);
  }
  return <div className="language-control"><label htmlFor={id}>{messages[locale].language}</label><select id={id} aria-label={messages[locale].language} value={automatic ? "auto" : locale} onChange={(event) => choose(event.target.value)}><option value="auto">{messages[locale].automatic}</option>{locales.filter((item) => links[item]).map((item) => <option key={item} value={item} lang={languageTags[item]}>{languageNames[item]}</option>)}</select><div className="language-links" aria-label={messages[locale].language}>{locales.filter((item) => links[item]).map((item) => <a key={item} href={links[item]} hrefLang={languageTags[item]} lang={languageTags[item]} aria-current={item === locale ? "page" : undefined} onClick={(event) => { if (event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return; event.preventDefault(); choose(item); }}>{languageNames[item]}</a>)}</div></div>;
}
