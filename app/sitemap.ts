import type { MetadataRoute } from "next";
import { locales, homePath, postPath } from "@/lib/i18n";
import { getPosts, translatedLocales } from "@/lib/posts";
import { siteUrl, languageAlternates } from "@/lib/seo";
export const dynamic = "force-static";
export default function sitemap(): MetadataRoute.Sitemap {
  return locales.flatMap((locale) => [
    { url: siteUrl + homePath(locale), alternates: { languages: languageAlternates([...locales]) } },
    ...getPosts(locale).map((post) => ({ url: siteUrl + postPath(locale, post.slug), lastModified: `${post.updated ?? post.date}T12:00:00Z`, alternates: { languages: languageAlternates(translatedLocales(post.slug), post.slug) } })),
  ]);
}
