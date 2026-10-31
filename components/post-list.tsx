"use client";

import { useState } from "react";
import Link from "next/link";
import type { Post } from "@/lib/posts";

type Summary = Omit<Post, "content">;
const normalize = (value: string) => value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");

export function PostList({ posts }: { posts: Summary[] }) {
  const [tag, setTag] = useState("Todos");
  const [query, setQuery] = useState("");
  const tags = ["Todos", ...new Set(posts.flatMap((post) => post.tags))];
  const filtered = posts.filter((post) => (tag === "Todos" || post.tags.includes(tag)) && normalize(`${post.title} ${post.description} ${post.tags.join(" ")}`).includes(normalize(query)));
  return <section className="articles" aria-labelledby="articles-title">
    <div className="section-heading"><h2 id="articles-title">Últimas palavras <span>{String(posts.length).padStart(2, "0")}</span></h2><label className="search"><span aria-hidden="true">⌕</span><input aria-label="Buscar artigos" placeholder="Buscar uma ideia…" type="search" value={query} onChange={(event) => setQuery(event.target.value)} /></label></div>
    <div className="filters" aria-label="Filtrar por assunto">{tags.map((item) => <button type="button" key={item} aria-pressed={tag === item} onClick={() => setTag(item)}>{item}</button>)}</div>
    <div aria-live="polite" className="post-list">
      {filtered.map((post, index) => <article className="post-item" key={post.slug}>
        <span className="post-number" aria-hidden="true">{String(index + 1).padStart(2, "0")}</span>
        <Link className="post-link" href={`/posts/${post.slug}`}>
          <div className="post-meta"><time dateTime={post.date}>{new Intl.DateTimeFormat("pt-BR", { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${post.date}T12:00:00Z`))}</time><span>·</span><span>{post.readingTime} min de leitura</span></div>
          <h3>{post.title}<span className="post-arrow" aria-hidden="true">↗</span></h3>
          <p>{post.description}</p><div className="post-tags">{post.tags.map((item) => <span key={item}>{item}</span>)}</div>
        </Link>
      </article>)}
      {filtered.length === 0 && <p className="empty">Nenhum artigo por aqui ainda. Tente outro assunto ou outra busca.</p>}
    </div>
    <p className="end-note"><span /> Você chegou ao fim. Por enquanto.<span /></p>
  </section>;
}
