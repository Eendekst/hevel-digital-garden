---
title: YAML Standard
type: Protocol
status: Active
author: Jason
agent: Bird
pillar: Meta
tags: [System, Standard, SEO]
created: 2026-01-22
updated: 2026-01-22
aliases: [Frontmatter Protocol, Metadata Rules]
---

# The YAML Standard (V1.0)

This protocol defines the metadata structure for **Hevel's Digital Garden**. All Agents ([[Bird]], [[Peter]], [[Ricky]], [[Jim]]) must adhere to this standard to ensure SEO/ASO/VSO optimization and intuitive navigation.

## The "Strict Trinity" Taxonomy
Every note MUST have these three fields:
1.  `pillar`: (Ministry, Meta, Lab, Gallery).
2.  `type`: (Master, Atomic, Seed, Protocol, Person).
3.  `tags`: List of intuitive topics.

## The Visual Hierarchy (Hybrid)
*   **Master Notes:** MUST have a `cover` image and an `icon`.
*   **Atomic Notes:** MUST have an `icon`. `cover` is optional.

## The Fields

```yaml
---
# Identity & Taxonomy
title: "The Exact Title"
type: Atomic               # Master, Atomic, Seed, Protocol
pillar: Meta               # Ministry, Meta, Lab, Gallery
tags: [Topic A, Topic B]   # Intuitive tags for discovery

# Authorship (Hybrid)
author: Jason              # The Human Source (Default)
agent: Bird                # The Processing Agent (Optional)

# Visuals (Hierarchical)
icon: "🌿"                 # Emoji or Lucide icon name
cover: ""                  # URL or Path (Required for Master Notes)

# Dates (Dual Timeline)
created: YYYY-MM-DD        # History
updated: YYYY-MM-DD        # Freshness

# SEO & VSO (Max Optimization)
description: "A 150-char hook designed for Google Click-Through Rate."
aliases: ["Alternate Title", "Misspelling", "Voice Search Phrase"]

# Linking (Hybrid Citation)
source: "https://external.com" # External references here
up: [[Parent Note]]            # Optional: Strict hierarchy parent
---
```

## Protocol Rules
1.  **AI Enforcement:** The AI is the template. Do not rely on manual copy-paste.
2.  **Open Door:** All files in `PP/Garden` are public unless `draft: true`.
3.  **VSO Strategy:** Use `aliases` to catch natural language queries (e.g., "What is the loop").
