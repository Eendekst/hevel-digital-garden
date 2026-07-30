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
    pageTitleSuffix: "",
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
          light: "#2F2F2F",
          lightgray: "#A9A9A9",
          gray: "#007BB8",
          darkgray: "#B0E0E6",
          dark: "#B0E0E6",
          secondary: "#E30A86",
          tertiary: "#A9A9A9",
          highlight: "rgba(227, 10, 134, 0.15)",
          textHighlight: "#b3aa0288",
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
      Plugin.CrawlLinks({ markdownLinkResolution: "shortest" }),
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
