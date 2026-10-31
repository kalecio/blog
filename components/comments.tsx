"use client";

import { useEffect, useRef } from "react";

type Config = { repo: string; repoId: string; category: string; categoryId: string };

export function Comments({ config }: { config: Config }) {
  const container = useRef<HTMLDivElement>(null);
  const configured = Object.values(config).every(Boolean);
  useEffect(() => {
    if (!configured || !container.current) return;
    const element = container.current;
    const script = document.createElement("script");
    script.src = "https://giscus.app/client.js";
    script.async = true;
    script.crossOrigin = "anonymous";
    const attributes = { repo: config.repo, "repo-id": config.repoId, category: config.category, "category-id": config.categoryId, mapping: "pathname", strict: "0", "reactions-enabled": "1", "emit-metadata": "0", "input-position": "bottom", theme: "light", lang: "pt", loading: "lazy" };
    Object.entries(attributes).forEach(([key, value]) => script.setAttribute(`data-${key}`, value));
    element.appendChild(script);
    return () => element.replaceChildren();
  }, [config.repo, config.repoId, config.category, config.categoryId, configured]);
  return <section className="comments" aria-labelledby="comments-heading"><p className="eyebrow">A CONVERSA CONTINUA</p><h2 id="comments-heading">O que você acha?</h2>{configured ? <><p>Compartilhe sua perspectiva nos comentários.</p><div ref={container} className="giscus" /></> : <p>Os comentários estarão disponíveis em breve.</p>}</section>;
}
