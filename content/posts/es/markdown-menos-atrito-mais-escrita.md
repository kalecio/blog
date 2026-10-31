---
title: "Markdown: menos fricción, más escritura"
description: "Un archivo de texto, unas cuantas convenciones y una forma más ligera de publicar en la web."
date: "2026-10-18"
tags: [Tecnología, Escritura]
---
Me gustan las herramientas que no estorban. Para escribir en la web, Markdown lo hace muy bien: el contenido sigue siendo un archivo de texto, fácil de leer y de llevar a otro lugar.

## Un formato que acompaña al pensamiento

Un párrafo es un párrafo. Un título empieza con `##`. Para dar énfasis usamos **negrita** o *cursiva*. La estructura aparece sin interrumpir la escritura.

```markdown
## Una idea

Un párrafo con **algo importante**.

- Una observación
- Otra posibilidad
```

También hay espacio para [enlaces](https://www.markdownguide.org/), citas, imágenes y bloques de código.

## El contenido junto a su contexto

Al principio de cada archivo, un pequeño bloque de metadatos describe el texto:

```yaml
---
title: "Mi próxima idea"
description: "Una breve presentación del artículo."
date: "2026-10-30"
tags: [Tecnología]
---
```

El nombre del archivo se convierte en la dirección del artículo. El título y el resumen aparecen en el listado. El tiempo de lectura se calcula a partir del contenido.

## Escribir, revisar, publicar

El proceso puede ser pequeño: crear un archivo, escribir, revisar y publicar una nueva versión del sitio. Para mantener un texto fuera del listado mientras madura, basta con añadir `draft: true` a los metadatos.

La herramienta se ocupa de la presentación. La atención se queda en las palabras.
