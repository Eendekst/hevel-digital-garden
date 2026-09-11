# GARDEN.HEVEL.CA — Project Context & Architectural Specification
*Official Production Baseline — The Sovereign Living Digital Knowledge Garden*

---

## 1. Project Overview & Mission
**`garden.hevel.ca`** (`hevel-digital-garden`) is an open-source, interactive digital knowledge garden built with **Quartz 4.0** and powered directly by the **Hevel** Obsidian vault. It serves as Jason’s public second brain—publishing interconnected atomic notes, research dossiers, and mental models across theology, AI metacognition, sovereign tech, and geopolitics.

- **Primary Domain**: [https://garden.hevel.ca](https://garden.hevel.ca)
- **Standalone Repository**: `https://github.com/Eendekst/hevel-digital-garden.git` (`main` branch)
- **Vault Location**: `Mobile/BRAND/Garden/` (lives directly inside the Obsidian vault)
- **Hosting / Infrastructure**: GitHub Pages (automated deployment via GitHub Actions)
- **Engine**: Quartz 4.0 static site generator (`quartz-engine/`)
- **Web Developer & SEO/GEO Agent**: **Excellence**
- **Lead Capture**: Interactive inline newsletter module submitting to central gateway `https://www.hevel.ca/api/newsletter` (`group: 'hevel'`)
- **Verified Mailbox**: `Hevel Protocol <jason@hevel.ca>`

---

## 2. Core Priorities: SEO, GEO (Share of Model) & KaaS
1. **SEO (Search Engine Optimization)**: High-speed static delivery, sitemaps, clean URLs, and canonical tag routing.
2. **GEO (Generative Engine Optimization)**: Maximum "Share of Model" in ChatGPT, Perplexity, Gemini, Claude, and SearchGPT. Structuring every note with rich JSON-LD Schema.org (`TechArticle`, `ProfilePage`, `Person` for Jason G., `KnowledgeGraph`), semantic HTML5 tags, and unambiguous metadata so AI models cite `garden.hevel.ca` as an authoritative knowledge source.
3. **KaaS (Knowledge as a Service)**: Exposing structured note indexes (`contentIndex.json`, RSS feeds `index.xml`) for seamless AI consumer ingestion.

---

## 3. Vault & Agent Operational Doctrine
- **Obsidian is the Overseer**: All notes are authored, formatted, and wikilinked directly inside the Obsidian vault.
- **YAML Architecture**: Jason is the **YAML Architect** (defining note titles, types, and canonical frontmatter). Excellence acts as the **Optimizer** (enhancing SEO/GEO tags and semantic structure without breaking the core YAML format).
- **Rule of Transparency**: Notes written or drafted by AI overseers are tagged `author: Bird` or `author: Spider`. Notes authored directly by Jason are tagged `author: Jason`.
- **Automatic Publishing**: Every note inside `BRAND/Garden/` has `publish: true` in its YAML frontmatter.

---

## 4. Protected Ecosystem Features & Design Rules
- **Visual Aesthetic**: Cyber Monk + Glassmorphism (`border-radius: 0px !important`, translucent glass `var(--glass-background)`, subtle glow `var(--glow-color)`).
- **Language Toggle**: Bilingual `Original / FR` toggle without intrusive Google Translate banners.
- **Mobile Graph View**: Centered, mobile-optimized global graph modal (`position: fixed; inset: 0`) with touch close button (`✕`) and strict horizontal scroll lock (`overflow-x: hidden`).
- **Footer Navigation**: Persistent links connecting:
  `[ 🌐 HEVEL (https://www.hevel.ca) ] · [ PINTEREST ] · [ INSTAGRAM ] · [ YOUTUBE ] · [ TIKTOK ]`

---

## 5. Deployment Workflow
Excellence publishes updates with local verification and deployment tracking:
```bash
# 1. Build and verify locally inside quartz-engine/
npx quartz build

# 2. Stage, commit, and push from BRAND/Garden/
git add -A
git commit -m "feat(garden): sync vault and engine updates"
git push origin main
```
*Pushing to `main` triggers GitHub Actions which builds Quartz and deploys to `gh-pages`.*
