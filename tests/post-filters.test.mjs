import { test } from "node:test";
import assert from "node:assert/strict";
import { readFileSync } from "node:fs";
import ts from "typescript";

const source = readFileSync(new URL("../lib/post-filters.ts", import.meta.url), "utf8");
const { outputText } = ts.transpileModule(source, { compilerOptions: { module: ts.ModuleKind.ESNext, target: ts.ScriptTarget.ES2020 } });
const { normalizeSearch, postFiltersSearch, readPostFilters } = await import(`data:text/javascript;base64,${Buffer.from(outputText).toString("base64")}`);

test("localized homepage filter query can be restored and serialized", () => {
  const filters = readPostFilters("?q=gest%C3%A3o&tag=Design");
  assert.deepEqual(filters, { query: "gestão", tag: "Design" });
  assert.equal(postFiltersSearch("", filters), "?q=gest%C3%A3o&tag=Design");
  assert.deepEqual(readPostFilters(postFiltersSearch("", filters)), filters);
});

test("changing a filter retains the other selection and removing both clears the query", () => {
  assert.equal(postFiltersSearch("?q=ideia&tag=Design", { query: "software", tag: "Design" }), "?q=software&tag=Design");
  assert.equal(postFiltersSearch("?q=ideia&tag=Design", { query: "", tag: "" }), "");
  assert.deepEqual(readPostFilters("?utm_source=share&q=idea&tag=Writing"), { query: "idea", tag: "Writing" });
});

test("search matching ignores accents and case", () => {
  assert.equal(normalizeSearch("Gestão Ágil"), normalizeSearch("GESTAO agil"));
  assert.ok(normalizeSearch("Café com código").includes(normalizeSearch("cafe")));
});
