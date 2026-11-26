"use client";

import { useSyncExternalStore } from "react";
import Link from "next/link";
import { postPath, messages, languageTags, type Locale } from "@/lib/i18n";
import { normalizeSearch, postFiltersSearch, readPostFilters } from "@/lib/post-filters";
import type { Post } from "@/lib/posts";

type Summary = Omit<Post, "content">;

const filterChangeEvent = "post-filters-change";
function subscribeToSearch(callback: () => void) {
  window.addEventListener("popstate", callback);
  window.addEventListener(filterChangeEvent, callback);
  return () => {
    window.removeEventListener("popstate", callback);
    window.removeEventListener(filterChangeEvent, callback);
  };
}
const getSearch = () => window.location.search;
const getServerSearch = () => "";

export function PostList({ posts, locale }: { posts: Summary[]; locale: Locale }) {
  const t = messages[locale];
  const search = useSyncExternalStore(subscribeToSearch, getSearch, getServerSearch);
  const { tag, query } = readPostFilters(search);
  const updateFilters = (filters: { query: string; tag: string }) => {
    window.history.pushState(null, "", `${window.location.pathname}${postFiltersSearch(window.location.search, filters)}${window.location.hash}`);
    window.dispatchEvent(new Event(filterChangeEvent));
  };
  const tags = ["", ...new Set(posts.flatMap((post) => post.tags))];
  const filtered = posts.filter((post) => (tag === "" || post.tags.includes(tag)) && normalizeSearch(`${post.title} ${post.description} ${post.tags.join(" ")}`).includes(normalizeSearch(query)));
  return <section className="articles" aria-labelledby="articles-title">
    <div className="section-heading"><h2 id="articles-title">{t.latest} <span>{String(posts.length).padStart(2, "0")}</span></h2><label className="search"><span aria-hidden="true">⌕</span><input aria-label={t.search} placeholder={t.placeholder} type="search" value={query} onChange={(event) => updateFilters({ query: event.target.value, tag })} /></label></div>
    <div className="filters" aria-label={t.filter}>{tags.map((item) => <button type="button" key={item} aria-pressed={tag === item} onClick={() => updateFilters({ query, tag: item })}>{item || t.all}</button>)}</div>
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
