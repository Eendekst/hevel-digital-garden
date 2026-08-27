import { i18n } from "../i18n"
import { FullSlug, getFileExtension, joinSegments, pathToRoot } from "../util/path"
import { CSSResourceToStyleElement, JSResourceToScriptElement } from "../util/resources"
import { googleFontHref, googleFontSubsetHref } from "../util/theme"
import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
import { unescapeHTML } from "../util/escape"
import { CustomOgImagesEmitterName } from "../plugins/emitters/ogImage"
export default (() => {
  const Head: QuartzComponent = ({
    cfg,
    fileData,
    externalResources,
    ctx,
  }: QuartzComponentProps) => {
    const titleSuffix = cfg.pageTitleSuffix ?? ""
    const title =
      (fileData.frontmatter?.title ?? i18n(cfg.locale).propertyDefaults.title) + titleSuffix
    const description =
      fileData.frontmatter?.socialDescription ??
      fileData.frontmatter?.description ??
      unescapeHTML(fileData.description?.trim() ?? i18n(cfg.locale).propertyDefaults.description)

    const { css, js, additionalHead } = externalResources

    const url = new URL(`https://${cfg.baseUrl ?? "example.com"}`)
    const path = url.pathname as FullSlug
    const baseDir = fileData.slug === "404" ? path : pathToRoot(fileData.slug!)
    const iconPath = joinSegments(baseDir, "static/icon.png")

    // Url of current page
    const socialUrl =
      fileData.slug === "404" ? url.toString() : joinSegments(url.toString(), fileData.slug!)

    const usesCustomOgImage = ctx.cfg.plugins.emitters.some(
      (e) => e.name === CustomOgImagesEmitterName,
    )
    const ogImageDefaultPath = `https://${cfg.baseUrl}/static/og-image.png`

    // Construct dynamic JSON-LD Structured Data
    const isIndex = fileData.slug === "index"
    const is404 = fileData.slug === "404"
    const socialLinks = [
      "https://www.youtube.com/@HevelProd",
      "https://www.instagram.com/hevelshow/",
      "https://www.tiktok.com/@hevelstudio",
      "https://ca.pinterest.com/HevelInsights/",
    ]

    const jsonLdGraph: any[] = []

    if (isIndex) {
      jsonLdGraph.push(
        {
          "@type": "WebSite",
          "@id": `https://${cfg.baseUrl}/#website`,
          url: `https://${cfg.baseUrl}/`,
          name: "Hevel Digital Garden",
          description:
            description ||
            "Sovereign Technology & Agentic AI Architect Lab, Faith, Geopolitics, and Knowledge Garden.",
          inLanguage: "en-US",
          publisher: {
            "@type": "Organization",
            "@id": `https://${cfg.baseUrl}/#organization`,
            name: "Hevel Digital Garden",
            url: `https://${cfg.baseUrl}/`,
            logo: `https://${cfg.baseUrl}/static/icon.png`,
            sameAs: socialLinks,
          },
        },
        {
          "@type": "ProfilePage",
          "@id": `https://${cfg.baseUrl}/#profile`,
          url: `https://${cfg.baseUrl}/`,
          name: "Jason G. — Hevel Digital Garden",
          mainEntity: {
            "@type": "Person",
            "@id": `https://${cfg.baseUrl}/#author`,
            name: "Jason G.",
            jobTitle: "Sovereign Tech & Agentic AI Architect",
            worksFor: {
              "@id": `https://${cfg.baseUrl}/#organization`,
            },
            sameAs: socialLinks,
          },
        },
      )
    } else if (!is404) {
      const tags = (fileData.frontmatter?.tags as any) ?? []
      const tagList = Array.isArray(tags) ? tags : [tags]
      const isTech =
        fileData.slug?.startsWith("AI/") ||
        fileData.slug?.startsWith("Obsidian/") ||
        tagList.some((t: string) =>
          ["AI", "Technology", "Obsidian", "Data", "Data-Science", "Agentic"].includes(t),
        )

      const articleType = isTech ? "TechArticle" : "Article"
      const authorName = (fileData.frontmatter?.author as string) || "Jason G."
      const canonicalPageUrl = socialUrl

      const datePublished = fileData.frontmatter?.created
        ? new Date(fileData.frontmatter.created as string).toISOString()
        : fileData.dates?.created
          ? fileData.dates.created.toISOString()
          : undefined

      const dateModified = fileData.frontmatter?.modified
        ? new Date(fileData.frontmatter.modified as string).toISOString()
        : fileData.dates?.modified
          ? fileData.dates.modified.toISOString()
          : datePublished

      const articleSchema: Record<string, any> = {
        "@type": articleType,
        "@id": `${canonicalPageUrl}#article`,
        isPartOf: {
          "@type": "WebSite",
          "@id": `https://${cfg.baseUrl}/#website`,
          name: "Hevel Digital Garden",
          url: `https://${cfg.baseUrl}/`,
        },
        headline: fileData.frontmatter?.title ?? title,
        description: description,
        mainEntityOfPage: canonicalPageUrl,
        inLanguage: "en-US",
        author: {
          "@type": "Person",
          "@id": `https://${cfg.baseUrl}/#author`,
          name: authorName,
          url: `https://${cfg.baseUrl}/`,
          sameAs: socialLinks,
        },
        publisher: {
          "@type": "Organization",
          "@id": `https://${cfg.baseUrl}/#organization`,
          name: "Hevel Digital Garden",
          url: `https://${cfg.baseUrl}/`,
          logo: `https://${cfg.baseUrl}/static/icon.png`,
          sameAs: socialLinks,
        },
      }

      if (datePublished) articleSchema.datePublished = datePublished
      if (dateModified) articleSchema.dateModified = dateModified
      if (tagList.length > 0) articleSchema.keywords = tagList.join(", ")

      jsonLdGraph.push(articleSchema)

      if (fileData.slug && fileData.slug.includes("/")) {
        const segments = fileData.slug.split("/")
        const breadcrumbItems = [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: `https://${cfg.baseUrl}/`,
          },
        ]
        let currPath = `https://${cfg.baseUrl}`
        segments.forEach((seg, idx) => {
          currPath += `/${seg}`
          breadcrumbItems.push({
            "@type": "ListItem",
            position: idx + 2,
            name: decodeURIComponent(seg),
            item: currPath,
          })
        })
        jsonLdGraph.push({
          "@type": "BreadcrumbList",
          itemListElement: breadcrumbItems,
        })
      }
    }

    const jsonLdPayload =
      jsonLdGraph.length > 0
        ? {
            "@context": "https://schema.org",
            "@graph": jsonLdGraph,
          }
        : null

    return (
      <head>
        <title>{title}</title>
        <meta charSet="utf-8" />
        {cfg.theme.cdnCaching && cfg.theme.fontOrigin === "googleFonts" && (
          <>
            <link rel="preconnect" href="https://fonts.googleapis.com" />
            <link rel="preconnect" href="https://fonts.gstatic.com" />
            <link rel="stylesheet" href={googleFontHref(cfg.theme)} />
            {cfg.theme.typography.title && (
              <link rel="stylesheet" href={googleFontSubsetHref(cfg.theme, cfg.pageTitle)} />
            )}
          </>
        )}
        <link rel="preconnect" href="https://cdnjs.cloudflare.com" crossOrigin="anonymous" />
        <meta name="viewport" content="width=device-width, initial-scale=1.0" />

        <meta name="og:site_name" content={cfg.pageTitle}></meta>
        <meta property="og:title" content={title} />
        <meta property="og:type" content="website" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:title" content={title} />
        <meta name="twitter:description" content={description} />
        <meta property="og:description" content={description} />
        <meta property="og:image:alt" content={description} />

        {!usesCustomOgImage && (
          <>
            <meta property="og:image" content={ogImageDefaultPath} />
            <meta property="og:image:url" content={ogImageDefaultPath} />
            <meta name="twitter:image" content={ogImageDefaultPath} />
            <meta
              property="og:image:type"
              content={`image/${getFileExtension(ogImageDefaultPath) ?? "png"}`}
            />
          </>
        )}

        {cfg.baseUrl && (
          <>
            <meta property="twitter:domain" content={cfg.baseUrl}></meta>
            <meta property="og:url" content={socialUrl}></meta>
            <meta property="twitter:url" content={socialUrl}></meta>
          </>
        )}

        <link rel="icon" href={iconPath} />
        <meta name="description" content={description} />
        <meta name="generator" content="Quartz" />

        {jsonLdPayload && (
          <script
            type="application/ld+json"
            dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdPayload) }}
          />
        )}

        {css.map((resource) => CSSResourceToStyleElement(resource, true))}
        {js
          .filter((resource) => resource.loadTime === "beforeDOMReady")
          .map((res) => JSResourceToScriptElement(res, true))}
        {additionalHead.map((resource) => {
          if (typeof resource === "function") {
            return resource(fileData)
          } else {
            return resource
          }
        })}
      </head>
    )
  }

  return Head
}) satisfies QuartzComponentConstructor
