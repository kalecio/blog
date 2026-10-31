import type { Metadata } from "next";
import { languageTags, locales, messages, ogLocales, homePath, postPath, type Locale } from "./i18n";
import type { Post } from "./posts";
export const siteUrl = "https://blog.kalec.io";
export const organization = { "@type": "Organization", "@id": "https://kalec.io/#organization", name: "kalec.io", url: "https://kalec.io" };
export function languageAlternates(available: Locale[], slug?: string) {
  return Object.fromEntries(available.map((locale) => [languageTags[locale], siteUrl + (slug ? postPath(locale, slug) : homePath(locale))]));
}
export function pageMetadata(locale: Locale, post?: Post, available: Locale[] = [...locales]): Metadata {
  const t = messages[locale];
  const url = siteUrl + (post ? postPath(locale, post.slug) : homePath(locale));
  const title = post ? `${post.title} | Blog kalec.io` : t.title;
  const description = post?.description ?? t.description;
  return {
    metadataBase: new URL(siteUrl), title: { absolute: title }, description,
    alternates: { canonical: url, languages: { ...languageAlternates(available, post?.slug), "x-default": siteUrl + (post ? postPath(available.includes("pt") ? "pt" : available[0], post.slug) : "/") } },
    authors: [{ name: "kalec.io", url: "https://kalec.io" }], creator: "kalec.io", publisher: "kalec.io",
    robots: { index: true, follow: true, googleBot: { "max-image-preview": "large", "max-snippet": -1, "max-video-preview": -1 } },
    openGraph: { title, description, url, siteName: "Blog kalec.io", locale: ogLocales[locale], alternateLocale: available.filter((item) => item !== locale).map((item) => ogLocales[item]), images: [{ url: `${siteUrl}/social-card.png`, width: 1200, height: 630, alt: "kalec.io — Technology · Design · Software" }], ...(post ? { type: "article" as const, publishedTime: `${post.date}T12:00:00Z`, modifiedTime: `${post.updated ?? post.date}T12:00:00Z`, authors: ["https://kalec.io"], tags: post.tags } : { type: "website" as const }) },
    twitter: { card: "summary_large_image", title, description, images: [`${siteUrl}/social-card.png`] },
  };
}
