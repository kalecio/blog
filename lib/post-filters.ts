export type PostFilters = { query: string; tag: string };

export function readPostFilters(search: string): PostFilters {
  const params = new URLSearchParams(search);
  return { query: params.get("q") ?? "", tag: params.get("tag") ?? "" };
}

export function postFiltersSearch(search: string, filters: PostFilters): string {
  const params = new URLSearchParams(search);
  if (filters.query) params.set("q", filters.query);
  else params.delete("q");
  if (filters.tag) params.set("tag", filters.tag);
  else params.delete("tag");
  const serialized = params.toString();
  return serialized ? `?${serialized}` : "";
}

export function normalizeSearch(value: string): string {
  return value.normalize("NFD").replace(/[\u0300-\u036f]/g, "").toLocaleLowerCase("pt-BR");
}
