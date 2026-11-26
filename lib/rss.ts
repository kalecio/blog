import { feedPath, homePath, languageTags, messages, postPath, type Locale } from "./i18n";
import { getPosts, type Post } from "./posts";
import { siteUrl } from "./seo";
import { formatRssFeed } from "./rss-format";

export function createRssFeed(locale: Locale, posts: Post[] = getPosts(locale)) {
  return formatRssFeed({
    title: messages[locale].title,
    description: messages[locale].description,
    homeUrl: siteUrl + homePath(locale),
    feedUrl: siteUrl + feedPath(locale),
    language: languageTags[locale],
    items: posts.map((post) => ({ title: post.title, url: siteUrl + postPath(locale, post.slug), description: post.description, date: post.date })),
  });
}
