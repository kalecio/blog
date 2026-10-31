import { messages } from "@/lib/i18n";
export default function Loading() { return <main id="conteudo" className="reading-page" aria-busy="true"><p role="status" className="eyebrow">{messages.es.loading}</p></main>; }
