export const locales = ["pt", "en", "es"] as const;
export type Locale = typeof locales[number];
export const languageTags = { pt: "pt-BR", en: "en", es: "es" } as const;
export const ogLocales = { pt: "pt_BR", en: "en_US", es: "es_ES" } as const;
export const languageNames = { pt: "Português", en: "English", es: "Español" } as const;
export const homePath = (locale: Locale) => `/${locale}`;
export const postPath = (locale: Locale, slug: string) => `${locale === "pt" ? "" : `/${locale}`}/posts/${slug}`;
export const messages = {
  pt: {
    title: "Blog da kalec.io | Tecnologia, design e desenvolvimento de software",
    description: "Artigos da kalec.io sobre tecnologia, design e desenvolvimento de software. Ideias e aprendizados para criar sistemas, sites e aplicativos com propósito.",
    skip: "Pular para o conteúdo", navigation: "Navegação principal", blog: "O blog", language: "Idioma", automatic: "Automático", tagline: "Feito de ideias.", motto: "Menos ruído, mais significado.",
    eyebrow: "UM CADERNO ABERTO", heading: "Ideias que merecem", headingEnd: "um pouco de", emphasis: "espaço.", intro: "Notas sobre tecnologia, design e o que acontece no caminho. Sem pressa. Uma ideia de cada vez.",
    latest: "Últimas palavras", search: "Buscar artigos", placeholder: "Buscar uma ideia…", filter: "Filtrar por assunto", all: "Todos", minutes: "min de leitura", empty: "Nenhum artigo por aqui ainda. Tente outro assunto ou outra busca.", end: "Você chegou ao fim. Por enquanto.",
    back: "Todos os artigos", thanks: "Obrigado pela leitura.", continue: "CONTINUE EXPLORANDO", publishedBy: "Publicado por", conversation: "A CONVERSA CONTINUA", thoughts: "O que você acha?", share: "Compartilhe sua perspectiva nos comentários.", unavailable: "Os comentários estarão disponíveis em breve.",
    aboutTitle: "Da ideia ao software.", about: "Este é o blog da kalec.io. Criamos sistemas sob medida, produtos SaaS, sites e aplicativos.", cta: "Conheça o desenvolvimento de software da kalec.io", notFound: "Essa ideia ainda não está por aqui.", missing: "PÁGINA NÃO ENCONTRADA", loading: "Preparando a leitura…",
  },
  en: {
    title: "kalec.io Blog | Technology, design and software development",
    description: "Articles from kalec.io about technology, design and software development. Ideas and lessons for building purposeful systems, websites and applications.",
    skip: "Skip to content", navigation: "Main navigation", blog: "The blog", language: "Language", automatic: "Automatic", tagline: "Made of ideas.", motto: "Less noise, more meaning.",
    eyebrow: "AN OPEN NOTEBOOK", heading: "Ideas that deserve", headingEnd: "a little", emphasis: "space.", intro: "Notes on technology, design and what happens along the way. No rush. One idea at a time.",
    latest: "Latest words", search: "Search articles", placeholder: "Find an idea…", filter: "Filter by topic", all: "All", minutes: "min read", empty: "No articles here yet. Try another topic or search.", end: "You have reached the end. For now.",
    back: "All articles", thanks: "Thanks for reading.", continue: "KEEP EXPLORING", publishedBy: "Published by", conversation: "THE CONVERSATION CONTINUES", thoughts: "What do you think?", share: "Share your perspective in the comments.", unavailable: "Comments will be available soon.",
    aboutTitle: "From idea to software.", about: "This is the kalec.io blog. We build custom systems, SaaS products, websites and applications.", cta: "Explore software development at kalec.io", notFound: "This idea is not here yet.", missing: "PAGE NOT FOUND", loading: "Preparing your read…",
  },
  es: {
    title: "Blog de kalec.io | Tecnología, diseño y desarrollo de software",
    description: "Artículos de kalec.io sobre tecnología, diseño y desarrollo de software. Ideas y aprendizajes para crear sistemas, sitios web y aplicaciones con propósito.",
    skip: "Saltar al contenido", navigation: "Navegación principal", blog: "El blog", language: "Idioma", automatic: "Automático", tagline: "Hecho de ideas.", motto: "Menos ruido, más significado.",
    eyebrow: "UN CUADERNO ABIERTO", heading: "Ideas que merecen", headingEnd: "un poco de", emphasis: "espacio.", intro: "Notas sobre tecnología, diseño y lo que ocurre en el camino. Sin prisa. Una idea a la vez.",
    latest: "Últimas palabras", search: "Buscar artículos", placeholder: "Busca una idea…", filter: "Filtrar por tema", all: "Todos", minutes: "min de lectura", empty: "Todavía no hay artículos aquí. Prueba otro tema o búsqueda.", end: "Has llegado al final. Por ahora.",
    back: "Todos los artículos", thanks: "Gracias por leer.", continue: "SIGUE EXPLORANDO", publishedBy: "Publicado por", conversation: "LA CONVERSACIÓN CONTINÚA", thoughts: "¿Qué opinas?", share: "Comparte tu perspectiva en los comentarios.", unavailable: "Los comentarios estarán disponibles pronto.",
    aboutTitle: "De la idea al software.", about: "Este es el blog de kalec.io. Creamos sistemas a medida, productos SaaS, sitios web y aplicaciones.", cta: "Conoce el desarrollo de software de kalec.io", notFound: "Esta idea todavía no está aquí.", missing: "PÁGINA NO ENCONTRADA", loading: "Preparando la lectura…",
  },
} as const;

export function browserLocale(languages: readonly string[]): Locale {
  for (const language of languages) {
    const base = language.toLowerCase().split("-")[0];
    if (locales.includes(base as Locale)) return base as Locale;
  }
  return "pt";
}
