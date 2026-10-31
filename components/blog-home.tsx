import { PostList } from "./post-list";
import { JsonLd } from "./json-ld";
import { getPosts } from "@/lib/posts";
import { homePath, languageTags, messages, type Locale } from "@/lib/i18n";
import { organization, siteUrl } from "@/lib/seo";
export function BlogHome({ locale }: { locale: Locale }) {
  const t = messages[locale];
  const url = siteUrl + homePath(locale);
  return <main id="conteudo">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [organization, { "@type": "Blog", "@id": `${url}#blog`, url, name: t.title, description: t.description, inLanguage: languageTags[locale], publisher: { "@id": organization["@id"] }, isPartOf: { "@type": "WebSite", "@id": "https://kalec.io/#website", url: "https://kalec.io", name: "kalec.io" } }] }} />
    <section className="intro"><p className="eyebrow"><span className="status-dot" /> {t.eyebrow}</p><h1>{t.heading}<br />{t.headingEnd} <em>{t.emphasis}</em></h1><p className="intro-description">{t.intro}</p></section>
    <PostList locale={locale} posts={getPosts(locale).map(({ content, ...post }) => { void content; return post; })} />
  </main>;
}
