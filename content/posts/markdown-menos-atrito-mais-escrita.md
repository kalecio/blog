---
title: "Markdown: menos atrito, mais escrita"
description: "Um arquivo de texto, algumas convenções e um jeito mais leve de publicar na web."
date: "2026-10-18"
tags: [Tecnologia, Escrita]
---
Gosto de ferramentas que saem do caminho. Para escrever na web, Markdown faz isso muito bem: o conteúdo continua sendo um arquivo de texto, fácil de ler e de levar para outro lugar.

## Um formato que acompanha o pensamento

Um parágrafo é um parágrafo. Um título começa com `##`. Para dar ênfase, usamos **negrito** ou *itálico*. A estrutura aparece sem interromper a escrita.

```markdown
## Uma ideia

Um parágrafo com **algo importante**.

- Uma observação
- Outra possibilidade
```

Também há espaço para [links](https://www.markdownguide.org/), citações, imagens e blocos de código.

## Conteúdo junto do contexto

No início de cada arquivo, um pequeno bloco de metadados descreve o texto:

```yaml
---
title: "Minha próxima ideia"
description: "Uma breve apresentação do texto."
date: "2026-10-30"
tags: [Tecnologia]
---
```

O nome do arquivo vira o endereço do artigo. O título e o resumo aparecem na listagem. O tempo de leitura é calculado a partir do conteúdo.

## Escrever, revisar, publicar

O fluxo pode ser pequeno: criar um arquivo, escrever, revisar e publicar uma nova versão do site. Para manter um texto fora da listagem enquanto ele amadurece, basta adicionar `draft: true` aos metadados.

A ferramenta cuida da apresentação. A atenção fica com as palavras.
