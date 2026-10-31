import { PostList } from "@/components/post-list";
import { getPosts } from "@/lib/posts";

export const metadata = { alternates: { canonical: "/" } };

export default function Home() {
  return <main id="conteudo">
    <section className="intro">
      <p className="eyebrow"><span className="status-dot" /> UM CADERNO ABERTO</p>
      <h1>Ideias que merecem<br />um pouco de <em>espaço.</em></h1>
      <p className="intro-description">Notas sobre tecnologia, design e o que acontece no caminho.<br className="desktop-break" /> Sem pressa. Uma ideia de cada vez.</p>
    </section>
    <PostList posts={getPosts().map(({ content, ...post }) => { void content; return post; })} />
  </main>;
}
