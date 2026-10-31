# kalec.io · Blog

Blog minimalista em português, inglês e espanhol, feito com Next.js, React e TypeScript. Posts em Markdown, busca sem distinção de acentos, filtros por tags, tempo de leitura e comentários pelo Giscus.

## Rodar localmente

```sh
pnpm install
pnpm dev
```

Abra http://localhost:3000. Para produção: `pnpm build` gera o site estático na pasta `out`, publicada pelo Cloudflare Pages. `next start` não se aplica à exportação estática.

## Publicar um artigo

Crie `content/posts/meu-artigo.md`. Use nomes em minúsculas, sem acentos, separados por hífens. O nome vira a URL `/posts/meu-artigo`.

```markdown
---
title: "Título do artigo"
description: "Resumo exibido na listagem e nos metadados."
date: "2026-10-30"
tags: [Tecnologia, Reflexões]
draft: false
---

O conteúdo começa aqui.

## Uma seção

Markdown aceita **negrito**, *itálico*, links, listas, imagens,
citações, blocos de código e tabelas no formato GitHub.
```

`title`, `description`, `date` (AAAA-MM-DD) e `tags` são obrigatórios. `draft: true` oculta o post, inclusive pelo endereço direto. As datas determinam a ordem, da mais recente para a mais antiga; datas futuras não agendam publicação. O tempo de leitura é calculado automaticamente. Os três textos incluídos são exemplos editáveis.

Adicione imagens em `public/images` e referencie-as com `![Descrição da imagem](/images/arquivo.jpg)`.

Os artigos são gerados no build. Em produção, faça um novo build/deploy após alterar os arquivos Markdown.

## Idiomas e conteúdo traduzido

A entrada `/` detecta o idioma e encaminha para uma versão estável. Português usa `/pt` e mantém os endereços originais dos artigos (`/posts/meu-artigo`). Inglês usa `/en` e `/en/posts/meu-artigo`; espanhol usa `/es` e `/es/posts/meu-artigo`. As três versões são HTML estático completo, com o atributo `lang` correto, títulos, resumos, textos, datas e navegação no idioma correspondente.

- Português: `content/posts/meu-artigo.md`.
- Inglês: `content/posts/en/meu-artigo.md`.
- Espanhol: `content/posts/es/meu-artigo.md`.

Use o mesmo nome de arquivo para conectar as traduções. Traduza também `title`, `description` e `tags`. Uma tradução ausente ou com `draft: true` não aparece no seletor do artigo nem nos seus `hreflang`; não há tradução automática em tempo real. O campo opcional `updated: "AAAA-MM-DD"` registra uma atualização real, posterior à publicação, e alimenta o sitemap e os metadados do artigo.

Ao abrir `/`, o blog usa primeiro a preferência salva no seletor; sem preferência, percorre `navigator.languages` e escolhe o primeiro idioma suportado (`pt`, `en` ou `es`). Português é o fallback. O seletor exibe apenas links para os idiomas, com o idioma atual destacado. Links diretos `/pt`, `/en`, `/es` e de artigos não são redirecionados automaticamente. A escolha manual usa endereços estáveis mesmo quando o armazenamento local está bloqueado. Sem JavaScript, a entrada exibe links normais para as três versões, que continuam disponíveis como HTML completo. A entrada é marcada com `hreflang="x-default"`; o sitemap lista as versões com idioma definido.

## SEO e ligação com kalec.io

Cada página tem URL canônica própria, alternâncias `hreflang` recíprocas para traduções existentes e metadados Open Graph/Twitter. `/sitemap.xml` lista as páginas publicadas; `/robots.txt` informa o sitemap; `/social-card.png` entrega a imagem PNG de compartilhamento. As páginas 404 não são indexáveis.

Os dados estruturados usam `Blog`, `BlogPosting`, `Organization` e `BreadcrumbList`, com autor/editor `kalec.io` e links para `https://kalec.io`. A autoria e a apresentação dos serviços também são visíveis na página. As páginas do blog têm suas próprias canônicas: apontá-las todas para o site principal prejudicaria a indexação dos artigos.

Essa base técnica ajuda os buscadores a entenderem o conteúdo e a relação entre o blog e o site. Ganhos de posicionamento dependem também da qualidade e relevância dos artigos e de links externos; os textos iniciais continuam sendo exemplos editáveis. Cadastre o sitemap no Google Search Console usando uma propriedade que cubra `blog.kalec.io` (por exemplo, a propriedade de domínio `kalec.io`).

## Ativar os comentários Giscus

O Giscus está configurado para `kalecio/blog`, na categoria `Announcements` (`DIC_kwDOVdsM484DKDUi`). Os identificadores públicos estão preenchidos em `.env.example` e como padrão no workflow de produção. Para usar a mesma configuração localmente, copie `.env.example` para `.env.local`.

1. Use um repositório **público** no GitHub e habilite Discussions nas configurações.
2. Instale o aplicativo Giscus nesse repositório.
3. Acesse https://giscus.app/pt, selecione o repositório e uma categoria de Discussions (preferencialmente Announcements).
4. Copie `.env.example` para `.env.local` e preencha os valores gerados pelo configurador:

```dotenv
NEXT_PUBLIC_GISCUS_REPO=kalecio/blog
NEXT_PUBLIC_GISCUS_REPO_ID=ID_DO_REPOSITORIO
NEXT_PUBLIC_GISCUS_CATEGORY=NOME_DA_CATEGORIA
NEXT_PUBLIC_GISCUS_CATEGORY_ID=ID_DA_CATEGORIA
```

Reinicie o servidor local. Na hospedagem, configure as mesmas variáveis antes de gerar o build. Esses identificadores são públicos, não são tokens. Nunca adicione tokens GitHub.

Cada artigo usa um termo estável (`posts/meu-artigo`) para encontrar a discussão. Esse termo preserva o identificador do mapeamento anterior por pathname e compartilha os comentários entre traduções. Mudar o título não troca os comentários; mudar o nome do arquivo troca o identificador. O tema é claro para acompanhar o blog, a interface acompanha o idioma da página e a caixa de comentários fica abaixo da conversa. Sem configuração completa, o blog mostra uma mensagem discreta e não carrega o script externo. A autenticação e os comentários são gerenciados pelo Giscus/GitHub.

## Deploy automático · Cloudflare Pages

O workflow `.github/workflows/deploy.yml` publica o blog em cada push na `main`, incluindo merge commits, squash merges e rebase merges. Também aceita execução manual pela aba Actions, apenas na `main`. Ele instala as dependências pelo lockfile, gera `out` e envia os arquivos ao projeto Pages **`kalecio-blog`**, com branch de produção **`main`**. Deploys não executam em paralelo.

### Configuração inicial

1. Na conta Cloudflare, crie um projeto Pages de **Direct Upload** chamado `kalecio-blog`, com branch de produção `main`. Você pode criá-lo uma vez pelo terminal autenticado com `pnpm dlx wrangler@4 pages project create kalecio-blog --production-branch=main`. Não é necessário conectar o GitHub na Cloudflare: a publicação é feita pelo Actions.
2. Crie um API token Cloudflare com permissão **Account → Cloudflare Pages → Edit**, restrito à conta do projeto. Copie também o **Account ID** dessa conta.
3. No repositório GitHub, em **Settings → Secrets and variables → Actions → Secrets**, cadastre `CLOUDFLARE_API_TOKEN` e `CLOUDFLARE_ACCOUNT_ID`. Não coloque o token nos arquivos do repositório.
4. O workflow já inclui os quatro identificadores públicos do Giscus. Para substituir a configuração, cadastre em **Actions → Variables**: `NEXT_PUBLIC_GISCUS_REPO`, `NEXT_PUBLIC_GISCUS_REPO_ID`, `NEXT_PUBLIC_GISCUS_CATEGORY` e `NEXT_PUBLIC_GISCUS_CATEGORY_ID`. Variáveis de build do painel Pages não são usadas pelo build que roda no GitHub.
5. Envie o código e este workflow para a `main` ou faça merge de um PR. Acompanhe a execução em **Actions → Deploy to Cloudflare Pages**.

O workflow usa o ambiente GitHub `production`. Caso ele tenha revisores obrigatórios, será necessária a aprovação definida pelo próprio ambiente antes de cada execução.

### Domínio `blog.kalec.io`

Depois do primeiro deploy, abra **Workers & Pages → kalecio-blog → Custom domains → Set up a custom domain** e associe **`blog.kalec.io`** ao projeto. O endereço canônico do blog já está definido como `https://blog.kalec.io`.

Se a zona `kalec.io` estiver na mesma conta Cloudflare, siga o assistente para criar o registro DNS. Se o DNS estiver em outro provedor, crie um **CNAME** de `blog` para o endereço `*.pages.dev` exato exibido pelo projeto (normalmente `kalecio-blog.pages.dev`). Associe o domínio no Pages antes de configurar o CNAME; somente o registro DNS não registra o domínio no serviço. Aguarde o domínio e o certificado HTTPS ficarem ativos.

O domínio personalizado é configurado uma única vez no Pages; os deploys seguintes atualizam o mesmo projeto automaticamente. Alterar apenas o nome no workflow ou a URL do ambiente GitHub não associa o domínio na Cloudflare.

Referências: [deploy com GitHub Actions](https://developers.cloudflare.com/pages/how-to/use-direct-upload-with-continuous-integration/), [Next.js estático no Pages](https://developers.cloudflare.com/pages/framework-guides/nextjs/deploy-a-static-nextjs-site/) e [domínios personalizados](https://developers.cloudflare.com/pages/configuration/custom-domains/).

## Verificação

```sh
pnpm exec tsc --noEmit
pnpm build
pnpm check:seo
pnpm test
```
