import { QuartzConfig } from "./quartz/cfg"
import * as Plugin from "./quartz/plugins"

/**
 * Quartz 4 Configuration
 *
 * See https://quartz.jzhao.xyz/configuration for more information.
 */
const config: QuartzConfig = {
  configuration: {
    pageTitle: "Hevel's Garden",
    pageTitleSuffix: " — Hevel Digital Garden",
    enableSPA: true,
    enablePopovers: true,
    analytics: {
      provider: "plausible",
    },
    locale: "en-US",
    baseUrl: "garden.hevel.ca",
    ignorePatterns: ["private", "templates", ".obsidian", "node_modules", ".git"],
    defaultDateType: "modified",
    theme: {
      fontOrigin: "googleFonts",
      cdnCaching: true,
      typography: {
        header: "Fira Code",
        body: "Inter",
        code: "Fira Code",
      },
      colors: {
        lightMode: {
          light: "#F0F0F0",
          lightgray: "#A9A9A9",
          gray: "#007BB8",
          darkgray: "#2F2F2F",
          dark: "#2F2F2F",
          secondary: "#007BB8",
          tertiary: "#A9A9A9",
          highlight: "rgba(0, 123, 184, 0.15)",
          textHighlight: "#fff23688",
        },
        darkMode: {
          light: "#12151A",
          lightgray: "#222A35",
          gray: "#0284C7",
          darkgray: "#E2E8F0",
          dark: "#FFFFFF",
          secondary: "#0EA5E9",
          tertiary: "#7DD3FC",
          highlight: "rgba(14, 165, 233, 0.12)",
          textHighlight: "#0ea5e944",
        },
      },
    },
  },
  plugins: {
    transformers: [
      Plugin.FrontMatter(),
      Plugin.CreatedModifiedDate({
        priority: ["frontmatter", "git", "filesystem"],
      }),
      Plugin.SyntaxHighlighting({
        theme: {
          light: "github-light",
          dark: "github-dark",
        },
        keepBackground: false,
      }),
      Plugin.ObsidianFlavoredMarkdown({ enableInHtmlEmbed: false }),
      Plugin.GitHubFlavoredMarkdown(),
      Plugin.TableOfContents(),
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest", openLinksInNewTab: true }),
      Plugin.Description(),
      Plugin.Latex({ renderEngine: "katex" }),
    ],
    filters: [Plugin.ExplicitPublish()],
    emitters: [
      Plugin.AliasRedirects(),
      Plugin.ComponentResources(),
      Plugin.ContentPage(),
      Plugin.FolderPage(),
      Plugin.TagPage(),
      Plugin.ContentIndex({
        enableSiteMap: true,
        enableRSS: true,
      }),
      Plugin.Assets(),
      Plugin.Static(),
      Plugin.Favicon(),
      Plugin.NotFoundPage(),
      Plugin.CustomOgImages(),
      Plugin.CNAME(),
    ],
  },
}

export default config
