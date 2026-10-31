import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";
const { outputText } = ts.transpileModule(readFileSync(new URL("../lib/i18n.ts", import.meta.url), "utf8"), { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const { browserLocale, postPath, homePath } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);
test("browser language selection honors preference order and regional language tags", () => {
  assert.equal(browserLocale(["es-AR", "en-US", "pt-BR"]), "es");
  assert.equal(browserLocale(["fr-FR", "en-GB", "pt-BR"]), "en");
  assert.equal(browserLocale(["pt-PT", "en"]), "pt");
  assert.equal(browserLocale(["EN-us"]), "en");
  assert.equal(browserLocale(["de", "ja"]), "pt");
  assert.equal(browserLocale([]), "pt");
});
test("locale URLs preserve existing Portuguese routes and the article identifier", () => {
  assert.equal(homePath("pt"), "/pt");
  assert.equal(homePath("en"), "/en");
  assert.equal(homePath("es"), "/es");
  assert.equal(postPath("pt", "my-post"), "/posts/my-post");
  assert.equal(postPath("en", "my-post"), "/en/posts/my-post");
  assert.equal(postPath("es", "my-post"), "/es/posts/my-post");
});
