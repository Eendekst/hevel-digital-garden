---
title: YAML
publish: true
created: 2026-07-11
modified: 2026-08-27
author: Jason
description: "Mastering YAML frontmatter in Obsidian: token-efficient metadata schemas, AI context injection, and structured knowledge management."
tags:
  - Technology
  - administration
aliases: []
cssclasses: []
cover: "[[Black-man-in-library.jpg]]"
---
# YAML properties
are context and instruction lines at the beginning of markdown notes. You are free to use them or not. They are:
* The most sophisticated technological way to manually organize your data
* One of the most token-efficient way to inject context and instruction to AI
* Human and machine readable

All you need to do is type "---" at the beginning of a note to start typing your YAML properties.
## The Fields

```yaml
---
# Identity & Taxonomy
title: "The Exact Title"
publish: false             # Set to true to make the page public (private by default)
created: YYYY-MM-DD        # History (creation date)
modified: YYYY-MM-DD       # Freshness (last modified date)
author: Jason              # The Human Source (Default)
description: ""            # A 150-char hook designed for Google Click-Through Rate
tags: []                   # Topics (bracketed: [tag1, tag2])
aliases: []                # Alternate Title, Misspelling, Voice Search Phrase
cssclasses: []             # Custom CSS styling classes
cover: ""                  # URL or Path (Required for Master Notes)
---
```

You can use all kinds of YAML properties in your files (type, category, external/internal links, etc.). This is just my template.

This human-machine-readable syntax will add a cognitive layer for you to share with your intelligence system and organically augment the depth of your thinking alongside internal linkage.