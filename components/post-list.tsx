"use client";

import { useState } from "react";
import Link from "next/link";
import { postPath, messages, languageTags, type Locale } from "@/lib/i18n";
import type { Post } from "@/lib/posts";

type Summary = Omit<Post, "content">;
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

export function PostList({ posts, locale }: { posts: Summary[]; locale: Locale }) {
  const t = messages[locale];
  const [tag, setTag] = useState<string>("");
  const [query, setQuery] = useState("");
  const tags = ["", ...new Set(posts.flatMap((post) => post.tags))];
  const filtered = posts.filter((post) => (tag === "" || post.tags.includes(tag)) && normalize(`${post.title} ${post.description} ${post.tags.join(" ")}`).includes(normalize(query)));
  return <section className="articles" aria-labelledby="articles-title">
    <div className="section-heading"><h2 id="articles-title">{t.latest} <span>{String(posts.length).padStart(2, "0")}</span></h2><label className="search"><span aria-hidden="true">⌕</span><input aria-label={t.search} placeholder={t.placeholder} type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
    <div className="filters" aria-label={t.filter}>{tags.map((item) => <button type="button" key={item} aria-pressed={tag === item} onClick={() => setTag(item)}>{item || t.all}</button>)}</div>
    <div aria-live="polite" className="post-list">
      {filtered.map((post, index) => <article className="post-item" key={post.slug}>
        <span className="post-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <Link className="post-link" href={postPath(locale, post.slug)}>
          <div className="post-meta"><time dateTime={post.date}>{new Intl.DateTimeFormat(languageTags[locale], { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${post.date}T12:00:00Z`))}</time><span>·</span><span>{post.readingTime} {t.minutes}</span></div>
          <h3>{post.title}<span className="post-arrow" aria-hidden="true">↗</span></h3>
          <p>{post.description}</p><div className="post-tags">{post.tags.map((item) => <span key={item}>{item}</span>)}</div>
        </Link>
      </article>)}
      {filtered.length === 0 && <p className="empty">{t.empty}</p>}
    </div>
    <p className="end-note"><span /> {t.end}<span /></p>
  </section>;
}
