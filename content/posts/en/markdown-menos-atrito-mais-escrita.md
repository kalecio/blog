---
title: "Markdown: less friction, more writing"
description: "A text file, a few conventions and a lighter way to publish on the web."
date: "2026-10-18"
tags: [Technology, Writing]
---
I like tools that get out of the way. For writing on the web, Markdown does this well: the content remains a text file, easy to read and take somewhere else.

## A format that follows your thinking

A paragraph is a paragraph. A heading starts with `##`. For emphasis, we use **bold** or *italics*. The structure appears without interrupting the writing.

```markdown
## An idea

A paragraph with **something important**.

- An observation
- Another possibility
```

There is room for [links](https://www.markdownguide.org/), quotes, images and code blocks too.

## Content alongside context

At the start of each file, a small metadata block describes the text:

```yaml
---
title: "My next idea"
description: "A short introduction to the article."
date: "2026-10-30"
tags: [Technology]
---
```

The file name becomes the article's address. The title and summary appear in the listing. Reading time is calculated from the content.

## Write, review, publish

The process can be small: create a file, write, review and publish a new version of the site. To keep a text out of the listing while it takes shape, simply add `draft: true` to the metadata.

The tool takes care of the presentation. Your attention stays with the words.
