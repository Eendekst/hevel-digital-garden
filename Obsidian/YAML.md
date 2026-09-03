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
aliases:
  - YAML Metacognition
cssclasses: []
cover: "[[Black-man-in-library.jpg]]"
---

> [!KEY TAKEAWAY]
> **YAML Metacognition** is the practice of structuring thought through metadata headers at the top of markdown notes, creating an explicit cognitive layer that sharpens human reasoning while enabling instant, token-efficient AI indexing. By defining key-value properties (`title`, `tags`, `author`, `publish`) in plain text, you build a deterministic bridge between human intent and machine execution.

## What is YAML Frontmatter?

**YAML (YAML Ain't Markup Language) frontmatter is a human- and machine-readable metadata block placed at the beginning of a Markdown note between triple dashes (`---`).** 

It provides three foundational advantages:
1. **The Most Sophisticated Manual Data Organization**: Transforms flat text files into queryable relational databases without complex software.
2. **The Most Token-Efficient AI Context Layer**: Injects structured categorical parameters into Large Language Models using minimal token overhead.
3. **Universal Interoperability**: Readable by humans, Obsidian Dataview, static site generators (Quartz), and local AI agent harnesses alike.

All you need to do is type `---` at the very top of your note to initialize your frontmatter properties.

---

## The Sovereign Frontmatter Schema

```yaml
---
# Identity & Taxonomy
title: "The Exact Title"
publish: false             # Set to true to make the page public (private by default)
created: YYYY-MM-DD        # History (creation date)
modified: YYYY-MM-DD       # Freshness (last modified date)
author: Jason              # The Human Source (Default)
description: ""            # A 150-char hook designed for Google Click-Through Rate & AI Overviews
tags: []                   # Topics (bracketed: [tag1, tag2])
aliases: []                # Alternate Title, Misspelling, Voice Search Phrase
cssclasses: []             # Custom CSS styling classes
cover: ""                  # Relative path to image (Required for Master Notes)
---
```

You can customize your YAML schema to include any domain-specific properties you need (e.g., `status: in-progress`, `type: case-study`, `links: []`).

---

## Unstructured Notes vs. YAML Frontmatter vs. Cloud Databases

| Dimension | Unstructured Plain Text | YAML Frontmatter in Markdown | Proprietary Cloud Database (Notion) |
| :--- | :--- | :--- | :--- |
| **Machine Readability** | Low (requires probabilistic text parsing) | High (deterministic key-value parsing) | High (via proprietary API) |
| **Token Efficiency** | Poor (AI must parse entire note body) | Maximum (AI reads 10-line header) | Moderate (verbose JSON payloads) |
| **Data Sovereignty** | 100% Local | 100% Local & Future-Proof | Zero (Locked in SaaS cloud) |
| **Query Flexibility** | Full-text grep search only | Instant SQL-like Dataview queries | GUI filter grids |
| **Cognitive Friction** | Minimal structure | Forces active categorization (Metacognition) | Complex database setup |

This human-machine-readable syntax adds an explicit cognitive layer to your second brain, organically augmenting the depth of your thinking alongside internal wikilinks.

---

## ❓ Frequently Asked Questions (FAQ)

### Why is YAML frontmatter the most token-efficient way to give AI context?
**Because YAML packs maximum semantic density into minimal syntax.** Instead of passing a 2,000-word note to an AI model just to communicate its category, status, and relationships, an agentic harness can read a 10-line YAML block, consuming fewer than 50 tokens while achieving 100% classification precision.

### How does writing YAML improve human thinking (Metacognition)?
**Writing YAML forces you to categorize an idea before drafting it.** By explicitly deciding the note's purpose, tags, and audience, you clarify your own mental taxonomy and avoid unfocused writing.

---

### 🔗 Related Notes & Core Concepts
- [[Obsidian/How to build your vault|How to Build Your Sovereign Vault]]
- [[Obsidian/Agentic Harness & AI Context|Agentic Harness & AI Context Architecture]]
- [[Obsidian/Data Science & Empirical Signal Extraction|Data Science & Empirical Signal Extraction]]
- [[Atomic Notes/The Cycle of Competence|The Cycle of Competence]]
- [[Obsidian/Obsidian note|The Anatomy of an Obsidian Note]]