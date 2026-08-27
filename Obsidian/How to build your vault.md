---
title: How to build your vault
publish: true
created: 2026-08-07
modified: 2026-08-27
author: Jason
description: Practical architectural guide to designing a sovereign local-first Obsidian vault with YAML metadata taxonomies, district routing, and folder hygiene.
tags:
  - administration
  - Data
  - obsidian
  - case-study
  - local-first
aliases:
  - Local-First Vault Architecture
  - Obsidian Vault Guide
cssclasses: []
cover: "[[BRAND/Garden/Assets/Miniature-man-in-giant-book.jpg]]"
---

> [!KEY TAKEAWAY]
> A **Sovereign Vault** separates local knowledge management from cloud lock-in by using plain-text Markdown files, clean YAML frontmatter, and shallow folder hierarchies connected through bi-directional wikilinks. Structuring your filesystem into clear functional districts prevents index bloat and empowers AI agents to navigate your knowledge base deterministically.

*Build your vault in the [Obsidian.md](https://obsidian.md) app*

# What is a Vault?

> [!KEY CONCEPT] Sovereign Vault Architecture
> A local-first filesystem paradigm where all personal knowledge, research, and documentation are stored in open standards (`.md`, `.png`, `.pdf`) on physical device storage, freeing the user from proprietary cloud platforms and vendor lock-in.

A vault is the sovereign folder on your computer system chosen to store your digital files. 

The vault can contain files of any format (`.jpg`, `.mp3`, `.mp4`, `.md`, `.pdf`, `.png`), allowing the administrator to organize, document, and build their digital estate locally—without cloud lock-in or algorithmic dependence.

A thoughtful vault requires a thoughtful and rigorous architecture. In this case study, I will break down how I designed my personal `Lab` ecosystem so that you can draw direct inspiration for yours.

### Vault District Taxonomy & Routing Matrix

| District Layer | Primary Function | File Types & Scope | Optimization Strategy |
| :--- | :--- | :--- | :--- |
| **`Mobile/`** | Fast mobile capture & active execution | Markdown (`.md`), images, receipts | Kept lightweight for rapid cross-device synchronization |
| **`Repos/`** | Software source code & dependencies | TypeScript, Python, `node_modules` | **Excluded from Obsidian** to prevent search index latency |
| **`Vault/`** | Long-term knowledge base & research | Evergreen research notes, book summaries | Structured with strict YAML metadata & bi-directional wikilinks |
| **`Assets/`** | Media repository | `.jpg`, `.png`, `.gif`, `.mp4` | Centralized media directory referenced by relative paths |

---

> [!WARNING] The 5 Golden Sovereignty Rules for Obsidian Beginners
> 1. **DO NOT Load Raw Code Repositories in Obsidian**: Never drag `node_modules` or massive code projects into your vault. It creates heavy file-indexing lag and renders your search useless. Keep code in git repositories and link to them conceptually.
> 2. **Local-First Over Cloud Dependency**: Store your raw data locally. Use cloud services purely as secondary sync channels (e.g., Git, Remotely Save, or Obsidian Sync).
> 3. **Metadata (YAML) Over Raw Memory**: Use YAML frontmatter to categorize notes so you index context, not memory. Let AI & search handle retrieval.
> 4. **Authentic Human Voice Over AI Slop**: Use AI for backend organization and context compression, but preserve your raw, unfiltered human voice in copywriting.
> 5. **Bi-Directional Links Over Deep Folder Nesting**: Avoid 10-level deep folder trees. Use `[[wiki-links]]` to connect ideas associatively across categories.

---

# How I Built Mine (The Lab Architecture)

My complete workspace is organized under a single root directory named `Lab/`. To balance high-level software development, mobile capture, and deep research, I split `Lab/` into three distinct structural pillars:

```text
Lab/
├── Mobile/                     # Live Mobile & Desktop Sync Layer
│   ├── ADMIN/                  # Invoicing, taxes, receipts, contracts
│   ├── BIBLE/                  # Scripture studies & sermon notes
│   ├── BRAND/                  # Digital Garden notes, site assets, posts
│   ├── CAPTURE/                # Quick inbox notes, ideas, media clippings
│   ├── RESEARCH/               # Active fast-reference research topics
│   └── TASKS/                  # Daily logs & operational task lists
│
├── Repos/                      # Application & Website Codebases (NO CODE IN OBSIDIAN)
│   ├── Clients/                # Client custom apps (e.g., Elysium, Calerie)
│   ├── Hevel/                  # Core brand repos (hevel-next, hevel-backend)
│   └── Private/                # Personal tools & experimental scripts
│
└── Vault/                      # Sovereign Research & Knowledge Archive
    ├── Acquéreurs/             # Client administration & project dockets
    ├── Clippings/              # Web clips, PDF papers & book summaries
    ├── Playground/             # Media archives, soundscapes, visual experiments
    ├── Research/               # Deep-dive research (AI, Geopolitics, Branding)
    └── Templates/              # Standardized YAML Frontmatter Templates
```

### The 3 Pillars Explained:
1. **`Mobile/` (The Capture & Living Layer)**: Syncs seamlessly between phone, laptop, and desktop. Stores daily logs, media clips, live administrative documents, Bible notes, and published digital garden notes.
2. **`Repos/` (The Engineering Layer)**: Houses all Next.js, Node, and Python codebases built with Google Antigravity. **Crucial Rule**: *Never index raw code in Obsidian.* Repositories stay isolated in `Repos/`.
3. **`Vault/` (The Deep Storage & Research Layer)**: Houses deep geopolitical research, client dockets (`Acquéreurs/`), media assets (`Playground/`), and master templates (`Templates/`).

---
# The YAML Metacognition Framework

YAML (YAML Ain't Markup Language) is the frontmatter block at the very top of a Markdown note between `---` delimiters. 

### Why is YAML Essential for Beginners?
- **Reduces Cognitive Friction**: You don't need to memorize where a note is stored; metadata properties (`status`, `tags`, `pillar`, `type`) allow instant filtering.
- **AI & Context Engine Ready**: YAML provides clean, structured metadata that LLMs (AIs) can parse instantly to build context wikis.

### The Master Hevel Frontmatter Schema

```yaml
---
title: "Title of the Note"
type: Note                      # Note | Article | Research | Project | Ledger
status: Active                  # Draft | Active | Archival | Complete
author: Jason
pillar: 3 R&D                    # 1 Core | 2 Ops | 3 R&D | 4 Output
created: 2026-08-07
updated: 2026-08-07
tags:
  - obsidian
  - architecture
  - metacognition
aliases:
  - Vault Blueprint
source: "https://hevel.ca"
context_bridge: "Connects vault architecture to local agentic workflows"
---
```

---

# How to Build Yours: Step-by-Step Guide to Templates

Templates ensure that every note you create automatically includes standard YAML metadata without manual typing.

### Native Method (Obsidian Core Plugin)

#### Step 1: Enable the Templates Plugin
1. Open **Obsidian Settings** (`Ctrl + ,` or `Cmd + ,`).
2. Navigate to **Core Plugins**.
3. Toggle on **Templates**.

#### Step 2: Set Up a Templates Directory
1. Create a folder in your vault named `Templates`.
2. In **Settings -> Templates**, set **Template folder location** to `Templates`.

#### Step 3: Create Your Standard Frontmatter Template
Create a new note inside `Templates/` named `Standard Note Template.md` and paste the following:

```markdown
---
title: "{{title}}"
type: Note
status: Draft
author: {{author}}
created: {{date}}
updated: {{date}}
tags:
  - inbox
aliases: []
source: 
context_bridge: 
---
```

#### Step 4: Insert Template Into Any Note
- Press `Alt + N` (or `Ctrl/Cmd + P` -> **Templates: Insert template**).
- Select `Standard Note Template`. Obsidian will dynamically populate `{{title}}` and `{{date}}`!

---

### Advanced Method: Templater Plugin (Dynamic JS Execution)

For power users who want dynamic dates, auto-folder placement, and conditional logic, install the community plugin **Templater**.

#### Templater Configuration:
1. Go to **Settings -> Community Plugins** -> Search for **Templater** -> Install & Enable.
2. Set **Template folder location** to `Templates`.
3. Toggle on **Trigger Templater on new file creation**.

#### Advanced Templater Script Template (`Templates/Advanced Templater.md`):

```markdown
---
title: "<% tp.file.title %>"
type: Note
status: Active
author: Jason
created: <% tp.date.now("YYYY-MM-DD") %>
updated: <% tp.date.now("YYYY-MM-DD") %>
tags:
  - <% tp.file.folder(true) %>
aliases: []
source: 
context_bridge: 
---
```

---
### Pro Tip: Speed Up Your Workflow with Slash Commands

To navigate and command your digital brain seamlessly without leaving your keyboard, I strongly recommend enabling Obsidian's native **Slash Commands** core plugin.

* **How to Enable**: Open **Settings (`Ctrl + ,` or `Cmd + ,`) → Core Plugins** → Toggle on **Slash Commands**.

* **How It Works**: Simply type `/` anywhere inside any note. A lightweight popup menu will instantly appear, allowing you to trigger any Obsidian command—such as inserting templates, creating callouts, toggling graph views, embedding media, or formatting text—by typing a few characters and pressing `Enter`.
---

# Summary Checklist for Your Vault
- [x] Create a clean root directory (`Lab/` or your custom name).
- [x] Keep code repositories separate from Obsidian files.
- [x] Create a `Templates/` folder and set up YAML frontmatter.
- [x] Use bi-directional `[[links]]` instead of deep folder hierarchies.
- [x] Let YAML handle metadata so search and AI context engines do the heavy lifting for you.