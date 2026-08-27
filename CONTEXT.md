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

1. **Pillar Articles**: Start with `> [!KEY TAKEAWAY]` (high-density thesis). Wrap core definitions in `> [!KEY CONCEPT]`. Use comparison tables.
2. **Atomic Notes**: Retain concise authentic text; ensure YAML `description` has a standalone 120–160 char summary.
3. **Hierarchy**: Strict heading depth (`# H1` -> `## H2` -> `### H3`).
4. **Links**:
   - **Internal (`[[Wikilinks]]`)**: 100% manual. Never auto-generate or re-route.
   - **Outbound**: Open in new tab (`target="_blank" rel="noopener noreferrer"`).
5. **Schema.org**: Injected via Quartz `Head.tsx` (`TechArticle`, `Article`, `WebSite`, `ProfilePage` + `sameAs` socials, `BreadcrumbList`).

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

