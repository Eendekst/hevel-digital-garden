# Hevel Digital Garden — Agentic Harness & Project Context

> **Vault Root**: `C:\Users\Hevel\Lab\Mobile\BRAND\Garden`  
> **Live Site**: `https://garden.hevel.ca`  
> **Core Architecture**: Local Obsidian Vault + Quartz 4.5.2 Static Engine + GitHub Pages (`gh-pages`)

---

## 🏛️ Brand Entity & Knowledge Graph Positioning Strategy

- **Dual Identity Framework**:
  - **Author / Human Researcher**: `Jason G.` (`@type: Person`) — Sovereign Tech & Agentic AI Architect + Biblical Researcher.
  - **Publisher / Research Laboratory**: `Hevel Digital Garden` (`@type: Organization`) — Non-linear knowledge base and open lab.
- **Verified Entity Social Signals (`sameAs`)**:
  - YouTube: `https://www.youtube.com/@HevelProd`
  - Instagram: `https://www.instagram.com/hevelshow/`
  - TikTok: `https://www.tiktok.com/@hevelstudio`
  - Pinterest: `https://ca.pinterest.com/HevelInsights/`
- **Core Signal Pillars**:
  1. **Sovereign Technology & Agentic Systems**: Local-first AI context engineering, agentic harnesses, Obsidian systems, and autonomous execution labs.
  2. **Faith & Spiritual Sovereignty**: Biblical alignment, theology, psalm wisdom, and moral sovereignty.
  3. **Geopolitical & Historical Analysis**: Administrative engineering, historical research, monetary sovereignty, and structural analysis (e.g., Haïti research).
  4. **Digital Garden Architecture**: Non-linear knowledge bases, markdown standards, and content velocity.

---

## 📋 Instructive YAML Reference Table

Every published note in the digital garden MUST maintain strict frontmatter structure. Below is the authoritative schema table for AI agents and human authors:

| YAML Key | Data Type | Required? | Description & Constraints | Example Value |
| :--- | :--- | :--- | :--- | :--- |
| `title` | `string` | **YES** | Human-readable note title. Appends `" — Hevel Digital Garden"` in HTML title. | `"Haïti & Administrative invasions"` |
| `publish` | `boolean` | **YES** | Controls publication. Must be `true` for public notes. | `true` |
| `created` | `string` (YYYY-MM-DD) | **YES** | Creation date of note. | `2026-08-07` |
| `modified` | `string` (YYYY-MM-DD) | **YES** | Last modification date. Must update on edits. | `2026-08-27` |
| `author` | `string` | **YES** | Author signature. Standard value is `Jason`. | `Jason` |
| `description` | `string` | **YES** | High-density 120–160 char standalone thesis for SERP snippets & AI vector RAG. | `"Comprehensive historical research on administrative, financial, and political interventions in Haiti."` |
| `tags` | `array` | **YES** | Topic tags. Hyphenate multi-word tags (e.g. `Data-Science`). | `[AI, Technology, Faith]` |
| `aliases` | `array` | Optional | Alternative titles for wikilink resolution & search. | `[Haiti Invasions]` |
| `cssclasses` | `array` | Optional | Custom CSS class names applied to page body. | `[grid-masonry]` |
| `cover` | `string` | Optional | Relative path to cover image. If omitted, falls back to `/static/og-image.png`. | `"../Assets/Cover.jpg"` |
| `canonical` | `string` | Optional | Original URL if cross-posted from external platforms. | `"https://substack.com/..."` |

### Sample Valid Frontmatter Header

```yaml
---
title: "Agentic Harness & AI Context"
publish: true
created: 2026-08-07
modified: 2026-08-27
author: Jason
description: How to build an agentic harness and structured AI context for autonomous local systems.
tags:
  - AI
  - Technology
  - Mastery
aliases:
  - Agentic Harness
cssclasses: []
cover: "../Assets/Sadly-creative.gif"
---
```

---

## 🎯 Generative Engine Optimization (GEO) & SEO Formatting Rules

To maximize citation ranking, summary extraction, and indexability across AI Answer Engines (Perplexity, SearchGPT, Claude, ChatGPT, Gemini) and traditional search engines (Google, Bing):

1. **Top Callout Summary (`> [!KEY TAKEAWAY]`)**:
   - Begin major pillar articles with a high-density summary callout block. AI crawlers weigh top-level callouts with highest citation probability.
   ```markdown
   > [!KEY TAKEAWAY]
   > Direct, high-density summary of the article's core thesis and key conclusion.
   ```

2. **Concept Callouts (`> [!KEY CONCEPT]`)**:
   - Wrap core definitions and technical terminology inside concept callouts:
   ```markdown
   > [!KEY CONCEPT] Administrative Engineering
   > The substitution of self-governance with external control, debt leverage, and foreign mandates.
   ```

3. **Hybrid Optimization Strategy**:
   - **Long-Form & Technical Pillars**: Include `> [!KEY TAKEAWAY]`, `> [!KEY CONCEPT]`, and structured comparison matrices.
   - **Compact Atomic Notes**: Maintain clean, authentic body text while packing a standalone, high-density 120–160 character thesis into the YAML `description` field.

4. **Structured Heading Hierarchy & Matrices**:
   - Use clean Markdown heading depth (`# H1` -> `## H2` -> `### H3`). Never skip heading levels.
   - Use Markdown tables for structured comparisons, timelines, and feature taxonomies.

5. **Internal Linking Policy**:
   - Internal linking (`[[Wikilinks]]`) is **100% manual**. AI agents must NEVER rewrite, remove, or force automated internal links.

6. **Automated Schema.org JSON-LD Infrastructure**:
   - Quartz [`Head.tsx`](file:///c:/Users/Hevel/Lab/Mobile/BRAND/Garden/quartz-engine/quartz/components/Head.tsx) dynamically generates:
     - `TechArticle` for technical notes (`AI/`, `Obsidian/`, `#Data-Science`).
     - `Article` for research and geopolitical essays.
     - `WebSite` and `ProfilePage` on homepage (`index.html`) linking to verified socials (`sameAs`).
     - `BreadcrumbList` for category paths.
   - Title tag standard: `{Note Title} — Hevel Digital Garden`.

---

## ✍️ Embedded Writing & Editing Skills

### 1. `new-note` Skill Workflow
When tasked with creating a new note:
1. Ask for (or extract) the topic title and primary pillar category (*Obsidian*, *AI*, *Geopolitic*, *Faith*, *Hevel*, *Projects*).
2. Generate valid YAML frontmatter matching the Instructive Table above (`publish: true`, `author: Jason`, `created`, `modified`, `description`, `tags`).
3. Add an `# H1 Heading`, a `> [!KEY TAKEAWAY]` summary block, and structured `## H2` sections.

### 2. `audit-note` Skill Workflow
When asked to audit a note:
1. Verify frontmatter completeness (`title`, `publish`, `author`, `created`, `modified`, `description`, `tags`).
2. Verify image links point to valid `Assets/` files.
3. Verify heading depth and formatting clean markdown.
4. Report missing metadata or fix issues in-place.

### 3. `ai-summarize` Skill Workflow
When asked to generate a summary:
1. Extract the primary thesis in 2-3 sentences.
2. Format as a `> [!KEY TAKEAWAY]` block ready to paste at the top of the note.
3. Update `description` in YAML frontmatter.

---

## ⚡ Deployment & Publishing Architecture

### 1. Primary Publishing Pipeline (`Push-To-Main.ps1` -> GitHub Actions)
- **Workflow Trigger**: Pushing vault changes to `main` branch on GitHub (`Eendekst/hevel-digital-garden`).
- **GitHub Actions Execution**:
  - Automatically triggers the **"Deploy Digital Garden"** workflow ([deploy.yml](file:///c:/Users/Hevel/Lab/Mobile/BRAND/Garden/.github/workflows/deploy.yml)).
  - Runs the Shadow Patch privacy filter (`publish: true` isolation), compiles Quartz 4.5.2, and deploys the static build directly to the `gh-pages` branch using `peaceiris/actions-gh-pages`.
  - GitHub Pages automatically runs **"pages-build-deployment"** to serve the updated site on [https://garden.hevel.ca](https://garden.hevel.ca).
- **Security & Push Protection**: Local PowerShell scripts (`Deploy-Garden.ps1`, `Push-To-Main.ps1`, `*.ps1`) are strictly listed in `.gitignore` so GitHub Secret Scanning / Push Protection never blocks pushes containing local PAT tokens.

### 2. Direct Local Deploy Pipeline (`Deploy-Garden.ps1`)
- **Use Case**: Direct local emergency deploy or offline preview testing.
- **Workflow**: Runs local privacy filter (`publish: true`), executes `npx quartz build` inside `quartz-engine/`, and force-pushes `public/` directly to the `gh-pages` branch on GitHub.

### 3. Encoding & Media Safety Constraints
- **UTF-8 Encoding**: PowerShell file operations must explicitly enforce `[System.Text.Encoding]::UTF8` to preserve accents (e.g., `Haïti`), emojis, and special characters.
- **Media Asset Audit**: Pre-deployment scripts verify image files exist, while explicitly excluding the background audio file `Ytmp3.gg_YouTube_HITMAN-3-Soundtrack-Berlin-Custom-Mix_Media_91yaJ_mPUyQ_009_128k.mp3`.

