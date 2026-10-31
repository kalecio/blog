import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Comments } from "./comments";
import { JsonLd } from "./json-ld";
import { formatDate, getPosts } from "@/lib/posts";
import { homePath, postPath, languageTags, messages, type Locale } from "@/lib/i18n";
import { organization, siteUrl } from "@/lib/seo";
export function BlogArticle({ locale, slug }: { locale: Locale; slug: string }) {
  const posts = getPosts(locale);
  const post = posts.find((post) => post.slug === slug);
  if (!post) notFound();
  const next = posts[posts.indexOf(post) + 1];
  const t = messages[locale];
  const url = siteUrl + postPath(locale, slug);
  return <main id="conteudo" className="reading-page">
    <JsonLd data={{ "@context": "https://schema.org", "@graph": [organization, { "@type": "BlogPosting", "@id": `${url}#article`, mainEntityOfPage: { "@type": "WebPage", "@id": url }, url, headline: post.title, description: post.description, datePublished: `${post.date}T12:00:00Z`, dateModified: `${post.updated ?? post.date}T12:00:00Z`, inLanguage: languageTags[locale], image: `${siteUrl}/social-card.png`, author: { "@id": organization["@id"] }, publisher: { "@id": organization["@id"] }, isPartOf: { "@type": "Blog", "@id": `${siteUrl + homePath(locale)}#blog` }, keywords: post.tags.join(", ") }, { "@type": "BreadcrumbList", itemListElement: [{ "@type": "ListItem", position: 1, name: "kalec.io", item: "https://kalec.io" }, { "@type": "ListItem", position: 2, name: t.blog, item: siteUrl + homePath(locale) }, { "@type": "ListItem", position: 3, name: post.title, item: url }] }] }} />
    <div className="article-tools"><Link href={homePath(locale)} className="back-link">← {t.back}</Link></div>
    <article>
      <header className="article-header"><div className="post-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h1>{post.title}</h1><p className="article-description">{post.description}</p><div className="post-meta"><time dateTime={post.date}>{formatDate(post.date, locale)}</time><span>·</span><span>{post.readingTime} {t.minutes}</span><span>·</span><span>{t.publishedBy} <a href="https://kalec.io" rel="author">kalec.io</a></span></div></header>
      <div className="prose"><Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown></div>
      <div className="article-signoff">✳<span>{t.thanks}</span></div>
    </article>
    <Comments key={`${locale}/${slug}`} locale={locale} slug={slug} config={{ repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "", repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "", category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "", categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "" }} />
    {next && <Link className="next-post" href={postPath(locale, next.slug)}><span className="eyebrow">{t.continue}</span><span>{next.title} ↗</span></Link>}
  </main>;
}
