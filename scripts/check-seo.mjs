import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import path from "node:path";
const output = path.resolve("out");
const sitemap = readFileSync(path.join(output, "sitemap.xml"), "utf8");
const urls = [...sitemap.matchAll(/<loc>(.*?)<\/loc>/g)].map((match) => match[1]);
assert(urls.length >= 3, "Sitemap must include the three homepages");
assert.equal(new Set(urls).size, urls.length, "Sitemap contains duplicate URLs");
const languages = { pt: "pt-BR", en: "en", es: "es" };
const alternatesByUrl = new Map();
for (const url of urls) {
  const pathname = new URL(url).pathname;
  const file = path.join(output, pathname === "/" ? "index.html" : `${pathname}.html`);
  const html = readFileSync(file, "utf8");
  const locale = pathname.startsWith("/en") ? "en" : pathname.startsWith("/es") ? "es" : "pt";
  assert(html.includes(`<html lang="${languages[locale]}"`), `Incorrect HTML language: ${url}`);
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
  assert.equal(new URL(canonical).href, new URL(url).href, `Incorrect canonical: ${url}`);
  assert(!/<meta name="robots" content="[^"]*noindex/.test(html), `Published page is not indexable: ${url}`);
  const alternates = [...html.matchAll(/<link rel="alternate" hrefLang="([^"]+)" href="([^"]+)"/g)].filter((match) => match[1] !== "x-default").map((match) => match[2]);
  assert(alternates.length > 0 && alternates.some((alternate) => new URL(alternate).href === new URL(url).href), `Missing self hreflang: ${url}`);
  for (const alternate of alternates) assert(urls.some((item) => new URL(item).href === new URL(alternate).href), `Alternate is missing from sitemap: ${alternate}`);
  alternatesByUrl.set(new URL(url).href, alternates.map((alternate) => new URL(alternate).href));
  assert(/<meta name="description" content="[^"]+"/.test(html), `Missing description: ${url}`);
  assert(html.includes('content="summary_large_image"'), `Missing social card: ${url}`);
  assert.equal((html.match(/<h1[ >]/g) ?? []).length, 1, `Expected one h1: ${url}`);
  const blocks = [...html.matchAll(/<script type="application\/ld\+json">(.*?)<\/script>/g)].map((match) => JSON.parse(match[1]));
  const graph = blocks.flatMap((block) => block["@graph"] ?? [block]);
  const entity = graph.find((item) => item["@type"] === (pathname.includes("/posts/") ? "BlogPosting" : "Blog"));
  assert(entity && entity.inLanguage === languages[locale], `Missing or incorrect structured content: ${url}`);
  assert.equal(entity.publisher["@id"], "https://kalec.io/#organization");
  assert(graph.some((item) => item["@type"] === "Organization" && item.url === "https://kalec.io"));
  if (pathname.includes("/posts/")) {
    assert.equal(entity.author["@id"], "https://kalec.io/#organization");
    assert(graph.some((item) => item["@type"] === "BreadcrumbList"));
  }
}
for (const [url, alternates] of alternatesByUrl) for (const alternate of alternates) assert(alternatesByUrl.get(alternate)?.includes(url), `Non-reciprocal hreflang: ${url} → ${alternate}`);
assert(readFileSync(path.join(output, "robots.txt"), "utf8").includes("Sitemap: https://blog.kalec.io/sitemap.xml"));
assert(/noindex/.test(readFileSync(path.join(output, "404.html"), "utf8")), "404 page must not be indexed");
const image = readFileSync(path.join(output, "social-card.png"));
assert.equal(image.subarray(1, 4).toString(), "PNG");
assert.equal(image.readUInt32BE(16), 1200);
assert.equal(image.readUInt32BE(20), 630);
console.log(`SEO verified for ${urls.length} pages: HTML languages, canonicals, reciprocal hreflang, sitemap, structured data, social card and 404.`);
