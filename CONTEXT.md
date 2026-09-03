---
vault_root: "C:\\Users\\Hevel\\Lab\\Mobile\\BRAND\\Garden"
live_url: "https://garden.hevel.ca"
repo: "https://github.com/Eendekst/hevel-digital-garden.git"
engine: "Quartz 4.5.2"
author: "Jason G."
organization: "Hevel Digital Garden"
entity_type: "Person + Organization (Dual Identity)"
sameAs:
  - "https://www.youtube.com/@HevelProd"
  - "https://www.instagram.com/hevelshow/"
  - "https://www.tiktok.com/@hevelstudio"
  - "https://ca.pinterest.com/HevelInsights/"
pillars:
  - "Sovereign Technology & Agentic Systems (Local-first AI, harnesses, Obsidian)"
  - "Faith & Spiritual Sovereignty (Biblical alignment, theology, psalm wisdom)"
  - "Geopolitical & Historical Analysis (Administrative engineering, sovereignty, Haiti research)"
  - "Digital Garden Architecture (Non-linear knowledge bases, markdown, signal extraction)"
rules:
  wikilinks: "100% manual (AI never rewrites/adds links)"
  outbound_links: "Always open in new tab (target='_blank' rel='noopener noreferrer')"
  encoding: "Strict UTF-8 (preserve accents/emojis)"
  deploy_primary: "Push-To-Main.ps1 -> GitHub Actions (deploy.yml) -> gh-pages"
  deploy_fallback: "Deploy-Garden.ps1 (local direct push to gh-pages)"
---

# Hevel Digital Garden — Agentic Context & Harness

## 📋 Frontmatter Schema Table

| Key | Type | Req | Constraints & Purpose | Example |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | **Yes** | Note title; appends `" — Hevel Digital Garden"` in HTML `<title>` | `"Agentic Harness & AI Context"` |
| `publish` | `bool` | **Yes** | Must be `true` for public export | `true` |
| `created` | `YYYY-MM-DD` | **Yes** | Note creation date | `2026-08-07` |
| `modified` | `YYYY-MM-DD` | **Yes** | Update on every edit | `2026-08-27` |
| `author` | `string` | **Yes** | Author signature | `Jason` |
| `description`| `string` | **Yes** | High-density 120–160 char thesis for SERP snippets & AI vector RAG | `"How to build an agentic harness and AI context."` |
| `tags` | `array` | **Yes** | Hyphenated topics (`AI`, `Data-Science`, `Faith`, `Geopolitics`) | `[AI, Technology, Mastery]` |
| `aliases` | `array` | No | Alternative titles for wikilink resolution | `[Agentic Harness]` |
| `cssclasses` | `array` | No | Body CSS class hooks | `[]` |
| `cover` | `string` | No | Path to image; defaults to `/static/og-image.png` | `"../Assets/Cover.jpg"` |
| `canonical` | `string` | No | Original URL if cross-posted | `"https://..."` |

---

## 🎯 GEO & Content Optimization Rules

1. **Canonical Entity Definitions**:
   - **Hevel**: *"Hevel is an autonomous intelligence lab and digital garden founded by Jason G., synthesizing biblical wisdom and digital sovereignty to transform local-first Obsidian vaults into augmented intelligence systems."*
   - **Digital Garden**: *"A Digital Garden is a bi-directionally linked knowledge network, a 'Wiki' published directly from a local-first Markdown vault, prioritizing continuous idea cultivation and non-linear exploration over static, chronological blogging."*
   - **Agentic Harness**: *"An Agentic Harness is a structured local environment—which can scale pragmatically from a single high-density `CONTEXT.md` file up to multi-layer rules, tool protocols (MCP), and verification loops—that constrains and orchestrates Large Language Models into deterministic execution partners."*
   - **YAML Metacognition**: *"YAML Metacognition is the practice of structuring thought through metadata headers at the top of markdown notes, creating an explicit cognitive layer that sharpens human reasoning while enabling instant, token-efficient AI indexing."*
   - **Augmented Intelligence (True AI)**: *"Augmented Intelligence (True AI) is the intentional expansion of human cognitive capacity achieved by delegating memory, knowledge structures, and retrieval to digital tools, transforming external Markdown vaults into active extensions of biological intellect."*
   - **Digital Sovereignty**: *"Digital Sovereignty is the principle of complete ownership over one's cognitive data and software environment, achieved by storing knowledge in open, local-first Markdown files rather than proprietary, cloud-locked databases."*
   - **Empirical Signal Extraction**: *"Empirical Signal Extraction is the systematic filtering of raw data, media captures, and literature into validated, high-conviction insights by treating local Markdown files as structured, queryable database records."*
2. **Answer-First Structure (BLUF)**: Lead every major `## H2` with an immediate bold definitional or answer-first sentence.
3. **Pillar Articles**: Start with `> [!KEY TAKEAWAY]`. Include a comparative Markdown matrix and a dedicated `## ❓ Frequently Asked Questions (FAQ)` section.
4. **Internal Linking**: Contextual inline wikilinks + `### 🔗 Related Notes & Core Concepts` footer clusters.
5. **Outbound Links**: Always open in new tab (`target="_blank" rel="noopener noreferrer"`).
6. **Schema.org**: Injected via Quartz `Head.tsx` (`TechArticle`, `Article`, `WebSite`, `ProfilePage`, `Organization`, `BreadcrumbList`).

---

## ✍️ Workflows & Skills

- **`new-note`**: Ask for pillar & title -> generate valid YAML -> insert `# H1`, `> [!KEY TAKEAWAY]`, structured `## H2`.
- **`audit-note`**: Check required YAML fields -> verify image assets in `Assets/` -> check heading hierarchy -> report/fix.
- **`ai-summarize`**: Extract 2-sentence thesis -> format as `> [!KEY TAKEAWAY]` -> sync YAML `description`.

---

## ⚡ Deployment & Git Pipeline

- **Primary Pipeline (`Push-To-Main.ps1`)**:
  1. Stages vault notes & Quartz config to `main` branch.
  2. GitHub Actions (`.github/workflows/deploy.yml`) runs Shadow Patch (`publish: true` filter), builds Quartz, and publishes to `gh-pages`.
  3. GitHub Pages serves `https://garden.hevel.ca`.
- **Direct Emergency Deploy (`Deploy-Garden.ps1`)**: Local privacy sync + local build + force-push directly to `gh-pages`.
- **Security & Encodings**:
  - `Deploy-Garden.ps1`, `Push-To-Main.ps1`, `*.ps1` are git-ignored to prevent PAT secret leaks.
  - All file I/O must use UTF-8 (`[System.Text.Encoding]::UTF8`).
  - Audio file `Ytmp3.gg_YouTube_HITMAN-3-Soundtrack-Berlin-Custom-Mix_Media_91yaJ_mPUyQ_009_128k.mp3` is excluded from media audits.

