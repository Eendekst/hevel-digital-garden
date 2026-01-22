import { PageLayout, SharedLayout } from "./quartz/cfg"
import * as Component from "./quartz/components"

// components shared across all pages
export const sharedPageComponents: SharedLayout = {
  head: Component.Head(),
  header: [],
  afterBody: [],
  footer: Component.Footer({
    links: {
      GitHub: "https://github.com/jackyzha0/quartz",
      "Discord Community": "https://discord.gg/cRFFHYye7t",
    },
  }),
}

// components for pages that display a single page (e.g. a single note)
export const defaultContentPageLayout: PageLayout = {
  beforeBody: [
    Component.ConditionalRender({
      component: Component.Breadcrumbs(),
      condition: (page) => page.fileData.slug !== "index",
    }),
    Component.ConditionalRender({
      component: Component.Graph({
        localGraph: {
          drag: true,
          zoom: true,
          depth: 2, // Deeper for Hero
          scale: 1.5, // Larger
          repelForce: 1.2, // Looser
          centerForce: 0.3,
          linkDistance: 40,
          fontSize: 0.8,
          opacityScale: 1,
          removeTags: ["Excalidraw"],
          showTags: true,
        },
        globalGraph: {
          drag: true,
          zoom: true,
          depth: -1,
          scale: 1.5,
          repelForce: 1.2,
          centerForce: 0.3,
          linkDistance: 40,
          fontSize: 0.8,
          opacityScale: 1,
          removeTags: ["Excalidraw"],
          showTags: true,
        },
      }),
      condition: (page) => page.fileData.slug === "index",
    }),
    Component.ArticleTitle(),
    Component.ContentMeta(),
    Component.TagList(),
  ],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
        { Component: Component.ReaderMode() },
      ],
    }),
    Component.Explorer({
      title: "Districts",
      folderDefaultState: "open",
      sortFn: (a, b) => {
        const order = ["Meta", "Lab", "Gallery"]
        const aIndex = order.indexOf(a.displayName)
        const bIndex = order.indexOf(b.displayName)

        // If both are in the order list, sort by index
        if (aIndex !== -1 && bIndex !== -1) {
          return aIndex - bIndex
        }

        // If one is in the list, it comes first
        if (aIndex !== -1) return -1
        if (bIndex !== -1) return 1

        // Default alphabetical for everything else
        return a.displayName.localeCompare(b.displayName)
      },
    }),
  ],
  right: [
    Component.Graph({
      localGraph: {
        drag: true,
        zoom: true,
        depth: 1,
        scale: 1.1,
        repelForce: 1, // Phase 5: Loose
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        removeTags: ["Excalidraw"],
        showTags: true, // Phase 5: Groups
      },
      globalGraph: {
        drag: true,
        zoom: true,
        depth: -1,
        scale: 0.9,
        repelForce: 1, // Phase 5: Loose
        centerForce: 0.3,
        linkDistance: 30,
        fontSize: 0.6,
        opacityScale: 1,
        removeTags: ["Excalidraw"],
        showTags: true, // Phase 5: Groups
      },
    }),
    Component.DesktopOnly(Component.TableOfContents()),
    Component.Backlinks(),
  ],
}

// components for pages that display lists of pages  (e.g. tags or folders)
export const defaultListPageLayout: PageLayout = {
  beforeBody: [Component.Breadcrumbs(), Component.ArticleTitle(), Component.ContentMeta()],
  left: [
    Component.PageTitle(),
    Component.MobileOnly(Component.Spacer()),
    Component.Flex({
      components: [
        {
          Component: Component.Search(),
          grow: true,
        },
        { Component: Component.Darkmode() },
      ],
    }),
    Component.Explorer(),
  ],
  right: [],
}
