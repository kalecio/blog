import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

function loadTypeScript(path) {
  const source = readFileSync(new URL(path, import.meta.url), "utf8");
  const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
  return import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
}

const { formatRssFeed } = await loadTypeScript("../lib/rss-format.ts");
const { isPublishedPost } = await loadTypeScript("../lib/publishing.ts");

function assertWellFormedXml(xml) {
  assert.match(xml, /^<\?xml version="1\.0" encoding="UTF-8"\?><rss\b/);
  assert(!xml.replace(/&(?:amp|lt|gt|quot|apos);/g, "").includes("&"), "XML contains an unescaped ampersand");
  const stack = [];
  for (const [, closing, name] of xml.matchAll(/<\/?([\w:.-]+)(?:\s[^<>]*?)?\s*\/?>/g).map((match) => [match[0], match[0].startsWith("</"), match[1]])) {
    const selfClosing = /\/>$/.test(xml.match(new RegExp(`<\\/?${name}[^<>]*>`))[0]);
    if (closing) assert.equal(stack.pop(), name, `Mismatched XML closing tag ${name}`);
    else if (!selfClosing) stack.push(name);
  }
  assert.deepEqual(stack, [], "XML has unclosed tags");
}

test("RSS output is well formed and keeps absolute localized URLs with stable item IDs", () => {
  const locales = [
    { language: "pt-BR", homeUrl: "https://blog.kalec.io/pt", feedUrl: "https://blog.kalec.io/feed.xml", postUrl: "https://blog.kalec.io/posts/example" },
    { language: "en", homeUrl: "https://blog.kalec.io/en", feedUrl: "https://blog.kalec.io/en/feed.xml", postUrl: "https://blog.kalec.io/en/posts/example" },
    { language: "es", homeUrl: "https://blog.kalec.io/es", feedUrl: "https://blog.kalec.io/es/feed.xml", postUrl: "https://blog.kalec.io/es/posts/example" },
  ];
  for (const locale of locales) {
    const input = { title: "A <title>", description: "A & B", homeUrl: locale.homeUrl, feedUrl: locale.feedUrl, language: locale.language, items: [{ title: "Example", url: locale.postUrl, description: "Post <one>", date: "2026-01-02" }] };
    const first = formatRssFeed(input);
    assertWellFormedXml(first);
    assert.match(first, new RegExp(`<link>${locale.postUrl.replaceAll("/", "\\/")}<\\/link>`));
    assert.match(first, new RegExp(`<guid isPermaLink="true">${locale.postUrl.replaceAll("/", "\\/")}<\\/guid>`));
    assert.equal(formatRssFeed(input), first, "Item identifiers should remain stable between generations");
    assert(first.includes(`<atom:link href="${locale.feedUrl}"`));
  }
});

test("draft posts are excluded by the shared published-post predicate", () => {
  assert.equal(isPublishedPost({ draft: true }), false);
  assert.equal(isPublishedPost({ draft: false }), true);
  assert.equal(isPublishedPost({}), true);
  const drafts = [{ title: "Published", draft: false }, { title: "Draft", draft: true }];
  const feedTitles = drafts.filter(isPublishedPost).map(({ title }) => title);
  assert.deepEqual(feedTitles, ["Published"]);
});
