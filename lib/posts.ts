import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { languageTags, locales, type Locale } from "./i18n";

export type Post = { slug: string; title: string; description: string; date: string; updated?: string; tags: string[]; readingTime: number; content: string };

export function getPosts(locale: Locale = "pt"): Post[] {
  const directory = path.join(process.cwd(), "content/posts", locale === "pt" ? "" : locale);
  if (!fs.existsSync(directory)) return [];
  return fs.readdirSync(directory).filter((file) => /^[a-z0-9]+(?:-[a-z0-9]+)*\.md$/.test(file)).flatMap((file) => {
    const { data, content } = matter(fs.readFileSync(path.join(directory, file), "utf8"));
    if (data.draft === true) return [];
    const date = data.date instanceof Date ? data.date.toISOString().slice(0, 10) : data.date;
    if (typeof data.title !== "string" || !data.title.trim() || typeof data.description !== "string" || typeof date !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(date) || Number.isNaN(Date.parse(date)) || new Date(date).toISOString().slice(0, 10) !== date || !Array.isArray(data.tags) || !data.tags.every((tag: unknown) => typeof tag === "string")) {
      throw new Error(`Metadados inválidos em ${file}. Use title, description, date (AAAA-MM-DD) e tags (lista de textos).`);
    }
    const updated = data.updated instanceof Date ? data.updated.toISOString().slice(0, 10) : data.updated;
    if (updated !== undefined && (typeof updated !== "string" || !/^\d{4}-\d{2}-\d{2}$/.test(updated) || Number.isNaN(Date.parse(updated)) || new Date(updated).toISOString().slice(0, 10) !== updated || updated < date)) throw new Error(`Data updated inválida em ${file}.`);
    return [{ updated, slug: file.replace(/\.md$/, ""), title: data.title, description: data.description, date, tags: data.tags, readingTime: Math.max(1, Math.ceil(content.trim().split(/\s+/).length / 200)), content }];
  }).sort((a, b) => b.date.localeCompare(a.date) || a.slug.localeCompare(b.slug));
}

export function translatedLocales(slug: string): Locale[] {
  return locales.filter((locale) => getPosts(locale).some((post) => post.slug === slug));
}

export function formatDate(date: string, locale: Locale = "pt") {
  return new Intl.DateTimeFormat(languageTags[locale], { day: "2-digit", month: "short", year: "numeric", timeZone: "UTC" }).format(new Date(`${date}T12:00:00Z`));
}
