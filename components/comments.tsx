"use client";

import { useEffect, useRef } from "react";
import { messages, type Locale } from "@/lib/i18n";

type Config = { repo: string; repoId: string; category: string; categoryId: string };

export function Comments({ config, locale, slug }: { config: Config; locale: Locale; slug: string }) {
  const t = messages[locale];
  const container = useRef<HTMLDivElement>(null);
  const configured = Object.values(config).every(Boolean);
  useEffect(() => {
    if (!configured || !container.current) return;
    const element = container.current;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attributes = { repo: config.repo, "repo-id": config.repoId, category: config.category, "category-id": config.categoryId, mapping: "specific", term: `posts/${slug}`, strict: "0", "reactions-enabled": "1", "emit-metadata": "0", "input-position": "bottom", theme: "light", lang: locale, loading: "lazy" };
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(`data-${key}`, value));
    element.appendChild(script);
    return () => element.replaceChildren();
  }, [config.repo, config.repoId, config.category, config.categoryId, configured, locale, slug]);
  return <section className="comments" aria-labelledby="comments-heading"><p className="eyebrow">{t.conversation}</p><h2 id="comments-heading">{t.thoughts}</h2>{configured ? <><p>{t.share}</p><div ref={container} className="giscus" /></> : <p>{t.unavailable}</p>}</section>;
}
