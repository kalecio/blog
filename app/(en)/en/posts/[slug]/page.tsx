import { notFound } from "next/navigation";
import { BlogArticle } from "@/components/blog-article";
import { getPosts, translatedLocales } from "@/lib/posts";
import { pageMetadata } from "@/lib/seo";
export const dynamicParams = false;
export function generateStaticParams() { return getPosts("en").map(({ slug }) => ({ slug })); }
export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const post = getPosts("en").find((post) => post.slug === slug);
  if (!post) notFound();
  return pageMetadata("en", post, translatedLocales(slug));
}
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  return <BlogArticle locale="en" slug={slug} />;
}
