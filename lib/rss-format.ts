export type RssItem = { title: string; url: string; description: string; date: string };

const escapeXml = (value: string) => value.replaceAll("&", "&amp;").replaceAll("<", "&lt;").replaceAll(">", "&gt;").replaceAll('"', "&quot;").replaceAll("'", "&apos;");

export function formatRssFeed({ title, description, homeUrl, feedUrl, language, items }: { title: string; description: string; homeUrl: string; feedUrl: string; language: string; items: RssItem[] }) {
  const entries = items.map(({ title: itemTitle, url, description: itemDescription, date }) => `<item><title>${escapeXml(itemTitle)}</title><link>${url}</link><guid isPermaLink="true">${url}</guid><description>${escapeXml(itemDescription)}</description><pubDate>${new Date(`${date}T12:00:00Z`).toUTCString()}</pubDate></item>`).join("");
  return `<?xml version="1.0" encoding="UTF-8"?><rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom"><channel><title>${escapeXml(title)}</title><link>${homeUrl}</link><description>${escapeXml(description)}</description><language>${language}</language><atom:link href="${feedUrl}" rel="self" type="application/rss+xml"/>${entries}</channel></rss>`;
}
