import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import Markdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Comments } from "@/components/comments";
import { formatDate, getPosts } from "@/lib/posts";

export const dynamicParams = false;

export function generateStaticParams() { return getPosts().map(({ slug }) => ({ slug })); }

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPosts().find((post) => post.slug === slug);
  if (!post) notFound();
  return { title: post.title, description: post.description, alternates: { canonical: `/posts/${post.slug}` }, openGraph: { title: post.title, description: post.description, url: `/posts/${post.slug}`, type: "article", publishedTime: post.date, tags: post.tags } };
}

export default async function PostPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const posts = getPosts();
  const post = posts.find((post) => post.slug === slug);
  if (!post) notFound();
  const next = posts[posts.indexOf(post) + 1];
  return <main id="conteudo" className="reading-page">
    <Link href="/" className="back-link">← Todos os artigos</Link>
    <article>
      <header className="article-header"><div className="post-tags">{post.tags.map((tag) => <span key={tag}>{tag}</span>)}</div><h1>{post.title}</h1><p className="article-description">{post.description}</p><div className="post-meta"><time dateTime={post.date}>{formatDate(post.date)}</time><span>·</span><span>{post.readingTime} min de leitura</span></div></header>
      <div className="prose"><Markdown remarkPlugins={[remarkGfm]}>{post.content}</Markdown></div>
      <div className="article-signoff">✳<span>Obrigado pela leitura.</span></div>
    </article>
    <Comments key={slug} config={{ repo: process.env.NEXT_PUBLIC_GISCUS_REPO ?? "", repoId: process.env.NEXT_PUBLIC_GISCUS_REPO_ID ?? "", category: process.env.NEXT_PUBLIC_GISCUS_CATEGORY ?? "", categoryId: process.env.NEXT_PUBLIC_GISCUS_CATEGORY_ID ?? "" }} />
    {next && <Link className="next-post" href={`/posts/${next.slug}`}><span className="eyebrow">CONTINUE EXPLORANDO</span><span>{next.title} ↗</span></Link>}
  </main>;
}
