#!/usr/bin/env node

/**
 * Gemma Autonomous Publisher for garden.hevel.ca (Quartz v5.2.2)
 *
 * Operational Loop:
 * 1. Synchronizes live @garden notes from root into engine content.
 * 2. Filters notes according to 'publish: true' mandate.
 * 3. Executes the local Quartz v5 build verification gate.
 * 4. In case of clean build, crafts semantic commit log and pushes to GitHub Pages.
 */

import { execSync } from "child_process"
import fs from "fs"
import path from "path"
import { fileURLToPath } from "url"

const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)

const GARDEN_ROOT = path.resolve(__dirname, "..")
const ENGINE_ROOT = path.resolve(GARDEN_ROOT, "quartz-v5-scaffold")
const CONTENT_ROOT = path.resolve(ENGINE_ROOT, "content")

console.log("🌱 [Gemma Publisher] Starting synchronization cycle for garden.hevel.ca...")

// 1. Shadow sync content
function syncContent() {
  if (!fs.existsSync(CONTENT_ROOT)) {
    fs.mkdirSync(CONTENT_ROOT, { recursive: true })
  }

  const excludeDirs = [
    ".git",
    ".github",
    ".obsidian",
    "node_modules",
    "quartz-engine",
    "quartz-v5-scaffold",
    "scripts",
    ".quartz-cache",
  ]

  const filesToCopy = []
  function scan(dir, rel = "") {
    const entries = fs.readdirSync(dir, { withFileTypes: true })
    for (const entry of entries) {
      if (excludeDirs.includes(entry.name)) continue
      const fullPath = path.join(dir, entry.name)
      const relPath = path.join(rel, entry.name)

      if (entry.isDirectory()) {
        scan(fullPath, relPath)
      } else if (entry.isFile()) {
        filesToCopy.push({ fullPath, relPath })
      }
    }
  }

  scan(GARDEN_ROOT)

  let publishedCount = 0
  for (const { fullPath, relPath } of filesToCopy) {
    const destPath = path.join(CONTENT_ROOT, relPath)
    const destDir = path.dirname(destPath)

    if (relPath.endsWith(".md")) {
      try {
        const text = fs.readFileSync(fullPath, "utf-8")
        const match = text.match(/^---([\s\S]+?)^---/m)
        if (!match) continue
        const front = match[1]
        if (!/^\s*publish\s*:\s*true\s*$/m.test(front)) {
          continue
        }
      } catch {
        continue
      }
    }

    if (!fs.existsSync(destDir)) {
      fs.mkdirSync(destDir, { recursive: true })
    }
    fs.copyFileSync(fullPath, destPath)
    if (relPath.endsWith(".md")) publishedCount++
  }

  // Handle Home.md -> index.md
  const homePath = path.join(CONTENT_ROOT, "Home.md")
  const indexPath = path.join(CONTENT_ROOT, "index.md")
  if (fs.existsSync(homePath)) {
    fs.copyFileSync(homePath, indexPath)
  }

  console.log(`✓ [Gemma Publisher] Synchronized ${publishedCount} published notes into Quartz content.`)
}

// 2. Build gate
function runBuild() {
  console.log("⚙ [Gemma Publisher] Executing Quartz v5.2.2 build verification gate...")
  try {
    execSync("node ./quartz/bootstrap-cli.mjs build", {
      cwd: ENGINE_ROOT,
      stdio: "inherit",
    })
    console.log("✓ [Gemma Publisher] Local build passed with 0 fatal errors.")
    return true
  } catch (err) {
    console.error("❌ [Gemma Publisher] Build gate failed! Aborting git publish.", err.message)
    return false
  }
}

// 3. Autonomous Git deployment
function publishGit() {
  console.log("🚀 [Gemma Publisher] Checking git working tree...")
  try {
    const status = execSync("git status --porcelain", { cwd: GARDEN_ROOT }).toString()
    if (!status.trim()) {
      console.log("✨ [Gemma Publisher] No modified notes. Workspace is up-to-date.")
      return
    }

    const timestamp = new Date().toISOString().replace("T", " ").substring(0, 19)
    const commitMsg = `feat(garden): autonomous publication via Gemma daemon (${timestamp})`

    execSync("git add -A", { cwd: GARDEN_ROOT, stdio: "inherit" })
    execSync(`git commit -m "${commitMsg}"`, { cwd: GARDEN_ROOT, stdio: "inherit" })
    execSync("git push origin upgrade/quartz-v5", { cwd: GARDEN_ROOT, stdio: "inherit" })
    console.log(`✓ [Gemma Publisher] Successfully published changes to origin/upgrade/quartz-v5.`)
  } catch (err) {
    console.error("❌ [Gemma Publisher] Git deployment failed:", err.message)
  }
}

// Main execution
try {
  syncContent()
  const ok = runBuild()
  if (ok) {
    publishGit()
  }
} catch (e) {
  console.error("Fatal publisher error:", e)
}
