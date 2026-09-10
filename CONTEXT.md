# GARDEN.HEVEL.CA — Project Context & Architectural Specification
*Official Production Baseline — The Living Digital Knowledge Garden*

---

## 1. Project Overview & Mission
**`garden.hevel.ca`** (`hevel-digital-garden`) is an open-source, interactive digital knowledge garden built with **Quartz 4.0** and powered directly by the **Hevel** Obsidian vault. It serves as Jason’s public second brain—publishing interconnected atomic notes, research dossiers, and mental models across theology, AI metacognition, and geopolitics.

- **Primary Domain**: [https://garden.hevel.ca](https://garden.hevel.ca)
- **Standalone Repository**: `https://github.com/Eendekst/hevel-digital-garden.git` (`main` branch)
- **Vault Location**: `Mobile/BRAND/Garden/` (lives directly inside the Obsidian vault)
- **Hosting / Infrastructure**: GitHub Pages / Vercel
- **Engine**: Quartz 4.0 static site generator
- **Lead Capture**: Interactive inline newsletter module submitting to central gateway `https://www.hevel.ca/api/newsletter` (`group: 'hevel'`)
- **Verified Mailbox**: `Hevel Protocol <jason@hevel.ca>`

---

## 2. Vault Operational Doctrine
- **Obsidian is the Overseer**: All notes are authored, formatted, and wikilinked directly inside the Obsidian vault.
- **Rule of Transparency**: Notes written or drafted by AI overseers are tagged `author: Bird` or `author: Spider`. Notes authored directly by Jason are tagged `author: Jason`.
- **Automatic Publishing**: Every note inside `BRAND/Garden/` has `publish: true` in its YAML frontmatter.

---

## 3. Autonomous Agent Publishing Workflow
An agent invoked from `C:\Users\Hevel\Lab\Mobile` can publish the garden with zero manual intervention:
```bash
# Push latest vault notes and Quartz updates to main
git add -A
git commit -m "Sync vault update: YYYY-MM-DD"
git push origin main
```
