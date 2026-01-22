# 📖 Digital Garden Operator Manual (Cloud Edition)

**Status:** ACTIVE
**Build System:** GitHub Actions (Cloud)
**URL:** [hevel.io](https://hevel.io)

---

## 🟢 M1: The Seed (Creation)
**Objective:** Plant new ideas in the Garden.

1.  **Write:** Create a note in `1 Jason/PP/Garden` (or any subfolder).
2.  **Tag:** Add `#frontmatter` if you want it published.
    ```yaml
    ---
    title: My Note
    date: 2026-01-22
    tags: [Strategy, AI]
    ---
    ```
    *(Note: Currently, we publish everything in the folder, but tags help organization.)*

---

## 🟠 M2: The Harvest (Deployment)
**Objective:** Publish to the world.

**Old Way (Legacy):**
*   Open PowerShell -> Run `Deploy-Garden.ps1`. (Requires PC).

**New Way (Zero-Touch):**
1.  **Sync:** Just push your changes to GitHub.
    *   **PC:** Use Obsidian Git plugin or `git push`.
    *   **Pixel 9:** Use an app like *GitJournal* or *Obsidian Git* (mobile) to push changes.
2.  **Wait:** GitHub Actions automatically wakes up, builds the site, and deploys.
3.  **Live:** Changes appear on `hevel.io` in ~2 minutes.

---

## 🔴 M3: The Weed (Troubleshooting)
**Symptom:** "I pushed, but the site didn't update."

1.  **Check Actions:** Go to https://github.com/Eendekst/hevel-digital-garden/actions
    *   ✅ **Green Check:** Build passed. Browser cache issue? Hard refresh.
    *   ❌ **Red X:** Build failed. Click to see the error log.
2.  **Common Errors:**
    *   *Frontmatter Error:* Invalid date or syntax.
    *   *Merge Conflict:* You edited the same file on Pixel and PC without syncing.

---

## ⚡ The Drill (Live Fire Exercise)
To certify as an **Autonomous Operator**:
1.  Create a new note: `Garden/Live-Fire-Check.md`.
2.  Content: "System Check: Cloud Build Active."
3.  Push to Git.
4.  Watch it go live on your phone.
