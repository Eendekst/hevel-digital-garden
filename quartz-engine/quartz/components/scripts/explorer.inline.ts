import { FileTrieNode } from "../../util/fileTrie"
import { FullSlug, resolveRelative, simplifySlug } from "../../util/path"
import { ContentDetails } from "../../plugins/emitters/contentIndex"

type MaybeHTMLElement = HTMLElement | undefined

interface ParsedOptions {
  folderClickBehavior: "collapse" | "link"
  folderDefaultState: "collapsed" | "open"
  useSavedState: boolean
  sortFn: (a: FileTrieNode, b: FileTrieNode) => number
  filterFn: (node: FileTrieNode) => boolean
  mapFn: (node: FileTrieNode) => void
  order: "sort" | "filter" | "map"[]
}

type FolderState = {
  path: string
  collapsed: boolean
}

let currentExplorerState: Array<FolderState> = []

function toggleExplorer(explorer: HTMLElement) {
  const explorerCollapsed = explorer.classList.toggle("collapsed")
  explorer.setAttribute("aria-expanded", explorerCollapsed ? "false" : "true")

  if (!explorerCollapsed && window.innerWidth <= 800) {
    document.documentElement.classList.add("mobile-no-scroll")
  } else {
    document.documentElement.classList.remove("mobile-no-scroll")
  }
}

function toggleFolder(evt: MouseEvent) {
  evt.stopPropagation()
  const target = evt.target as MaybeHTMLElement
  if (!target) return

  const isSvg = target.nodeName === "svg"
  const folderContainer = (
    isSvg
      ? target.parentElement
      : target.parentElement?.parentElement
  ) as MaybeHTMLElement
  if (!folderContainer) return
  const childFolderContainer = folderContainer.nextElementSibling as MaybeHTMLElement
  if (!childFolderContainer) return

  childFolderContainer.classList.toggle("open")

  const isCollapsed = !childFolderContainer.classList.contains("open")
  setFolderState(childFolderContainer, isCollapsed)

  const currentFolderState = currentExplorerState.find(
    (item) => item.path === folderContainer.dataset.folderpath,
  )
  if (currentFolderState) {
    currentFolderState.collapsed = isCollapsed
  } else {
    currentExplorerState.push({
      path: folderContainer.dataset.folderpath as FullSlug,
      collapsed: isCollapsed,
    })
  }

  try {
    localStorage.setItem("fileTree", JSON.stringify(currentExplorerState))
  } catch (e) {}
}

function createFileNode(currentSlug: FullSlug, node: FileTrieNode): HTMLLIElement {
  const template = document.getElementById("template-file") as HTMLTemplateElement
  const clone = template.content.cloneNode(true) as DocumentFragment
  const li = clone.querySelector("li") as HTMLLIElement
  const a = li.querySelector("a") as HTMLAnchorElement
  a.href = resolveRelative(currentSlug, node.slug)
  a.dataset.for = node.slug
  a.textContent = node.displayName

  if (currentSlug === node.slug) {
    a.classList.add("active")
  }

  return li
}

function createFolderNode(
  currentSlug: FullSlug,
  node: FileTrieNode,
  opts: ParsedOptions,
): HTMLLIElement {
  const template = document.getElementById("template-folder") as HTMLTemplateElement
  const clone = template.content.cloneNode(true) as DocumentFragment
  const li = clone.querySelector("li") as HTMLLIElement
  const folderContainer = li.querySelector(".folder-container") as HTMLElement
  const folderButton = li.querySelector(".folder-button") as HTMLButtonElement
  const folderTitle = li.querySelector(".folder-title") as HTMLSpanElement
  const folderOuter = li.querySelector(".folder-outer") as HTMLElement
  const ul = li.querySelector("ul") as HTMLUListElement

  folderTitle.textContent = node.displayName
  folderContainer.dataset.folderpath = node.slug

  if (opts.folderClickBehavior === "link") {
    folderButton.replaceWith(folderTitle)
    const a = document.createElement("a")
    a.href = resolveRelative(currentSlug, node.slug)
    a.dataset.for = node.slug
    a.textContent = node.displayName
    if (currentSlug === node.slug) {
      a.classList.add("active")
    }
    folderContainer.appendChild(a)
  }

  const isCollapsed =
    currentExplorerState.find((item) => item.path === node.slug)?.collapsed ??
    opts.folderDefaultState === "collapsed"

  if (!isCollapsed) {
    folderOuter.classList.add("open")
  }

  for (const child of node.children) {
    if (child.isFolder) {
      ul.appendChild(createFolderNode(currentSlug, child, opts))
    } else {
      ul.appendChild(createFileNode(currentSlug, child))
    }
  }

  return li
}

async function setupExplorer(currentSlug: FullSlug) {
  const explorer = document.querySelector(".explorer") as HTMLElement
  if (!explorer) return

  const dataFns = JSON.parse(explorer.dataset.dataFns ?? "{}")
  const opts: ParsedOptions = {
    folderBehavior: explorer.dataset.behavior,
    folderDefaultState: explorer.dataset.collapsed,
    useSavedState: explorer.dataset.savestate === "true",
    order: dataFns.order,
    sortFn: new Function(`return ${dataFns.sortFn}`)() as ParsedOptions["sortFn"],
    filterFn: new Function(`return ${dataFns.filterFn}`)() as ParsedOptions["filterFn"],
    mapFn: new Function(`return ${dataFns.mapFn}`)() as ParsedOptions["mapFn"],
  }

  const storageTree = localStorage.getItem("fileTree")
  if (storageTree && opts.useSavedState) {
    try {
      currentExplorerState = JSON.parse(storageTree)
    } catch (e) {
      currentExplorerState = []
    }
  } else {
    currentExplorerState = []
  }

  try {
    const res = await fetch(resolveRelative(currentSlug, "static/contentIndex.json" as FullSlug))
    const contentIndex = (await res.json()) as Map<FullSlug, ContentDetails>

    const trie = FileTrieNode.fromEntries(Object.entries(contentIndex))

    for (const fn of opts.order) {
      if (fn === "filter") trie.filter(opts.filterFn)
      if (fn === "map") trie.map(opts.mapFn)
      if (fn === "sort") trie.sort(opts.sortFn)
    }

    const explorerUl = explorer.querySelector(".explorer-ul") as HTMLUListElement
    if (explorerUl) {
      explorerUl.innerHTML = ""
      for (const child of trie.children) {
        if (child.isFolder) {
          explorerUl.appendChild(createFolderNode(currentSlug, child, opts))
        } else {
          explorerUl.appendChild(createFileNode(currentSlug, child))
        }
      }

      const scrollTop = sessionStorage.getItem("explorerScrollTop")
      if (scrollTop) {
        explorerUl.scrollTop = parseInt(scrollTop)
      } else {
        const activeElement = explorerUl.querySelector("a.active")
        if (activeElement) {
          activeElement.scrollIntoView({ behavior: "smooth" })
        }
      }

      if (opts.folderClickBehavior === "collapse") {
        const folderButtons = explorer.getElementsByClassName(
          "folder-button",
        ) as HTMLCollectionOf<HTMLElement>
        for (const button of folderButtons) {
          button.addEventListener("click", toggleFolder)
          window.addCleanup(() => button.removeEventListener("click", toggleFolder))
        }
      }

      const folderIcons = explorer.getElementsByClassName(
        "folder-icon",
      ) as HTMLCollectionOf<HTMLElement>
      for (const icon of folderIcons) {
        icon.addEventListener("click", toggleFolder)
        window.addCleanup(() => icon.removeEventListener("click", toggleFolder))
      }
    }
  } catch (e) {
    console.error("Failed to load explorer contentIndex:", e)
  }
}

// Helper: collapse all explorers on mobile immediately
// Uses a class on <html> which survives micromorph (micromorph only morphs <body>)
function collapseAllMobileExplorers() {
  if (window.innerWidth <= 800) {
    // Add hide class on <html> — this survives micromorph body replacement
    document.documentElement.classList.add("explorer-force-hide")
    document.documentElement.classList.remove("mobile-no-scroll")
    for (const explorer of document.getElementsByClassName("explorer")) {
      explorer.classList.add("collapsed")
      explorer.setAttribute("aria-expanded", "false")
    }
  }
}

// Remove the force-hide so the explorer can be toggled open again
function removeForceHide() {
  document.documentElement.classList.remove("explorer-force-hide")
}

// Global delegated event handling for toggle buttons (instant click response)
document.addEventListener("click", (evt) => {
  const target = evt.target as HTMLElement
  const toggleBtn = target.closest(".explorer-toggle") as HTMLElement
  if (toggleBtn) {
    const explorer = toggleBtn.closest(".explorer") as HTMLElement
    if (explorer) {
      // Remove force-hide when user explicitly toggles
      removeForceHide()
      toggleExplorer(explorer)
    }
    return
  }

  // Close mobile menu when clicking ANY link inside explorer (note links, folder links)
  if (window.innerWidth <= 800) {
    const link = target.closest(".explorer-content a")
    if (link) {
      collapseAllMobileExplorers()
    }
  }
})

document.addEventListener("prenav", async () => {
  // Save scroll position before navigation
  const explorer = document.querySelector(".explorer-ul")
  if (explorer) {
    sessionStorage.setItem("explorerScrollTop", explorer.scrollTop.toString())
  }

  // Collapse explorer immediately when navigation starts so the menu
  // closes before micromorph replaces the DOM. The html class survives morph.
  collapseAllMobileExplorers()
})

document.addEventListener("nav", async (e: CustomEventMap["nav"]) => {
  const currentSlug = e.detail.url

  // Collapse explorer on mobile BEFORE the async setupExplorer call
  collapseAllMobileExplorers()

  await setupExplorer(currentSlug)

  for (const explorer of document.getElementsByClassName("explorer")) {
    const mobileExplorer = explorer.querySelector(".mobile-explorer")
    if (mobileExplorer) {
      mobileExplorer.classList.remove("hide-until-loaded")
    }

    // Ensure collapsed state on mobile after DOM rebuild
    if (window.innerWidth <= 800) {
      explorer.classList.add("collapsed")
      explorer.setAttribute("aria-expanded", "false")
    }
  }

  // Remove force-hide now that explorers are properly collapsed
  // This allows the user to open the explorer again via the hamburger button
  removeForceHide()
})

window.addEventListener("resize", function () {
  const explorer = document.querySelector(".explorer")
  if (explorer && !explorer.classList.contains("collapsed") && window.innerWidth <= 800) {
    document.documentElement.classList.add("mobile-no-scroll")
  } else {
    document.documentElement.classList.remove("mobile-no-scroll")
  }
})

function setFolderState(folderElement: HTMLElement, collapsed: boolean) {
  return collapsed ? folderElement.classList.remove("open") : folderElement.classList.add("open")
}
