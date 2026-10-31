import Link from "next/link";
export default function NotFound() {
  return <main id="conteudo" className="not-found"><p className="eyebrow">404 / PÁGINA NÃO ENCONTRADA</p><h1>Essa ideia ainda<br />não está por aqui.</h1><Link className="back-link" href="/">← Voltar para os artigos</Link></main>;
}
