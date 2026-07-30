import { FullSlug, isRelativeURL, resolveRelative, simplifySlug, pathToRoot } from "../../util/path"
import { QuartzEmitterPlugin } from "../types"
import { write } from "./helpers"
import { BuildCtx } from "../../util/ctx"
import { VFile } from "vfile"
import path from "path"

async function* processFile(ctx: BuildCtx, file: VFile) {
  const ogSlug = simplifySlug(file.data.slug!)

  for (const aliasTarget of file.data.aliases ?? []) {
    const aliasTargetSlug = (
      isRelativeURL(aliasTarget)
        ? path.normalize(path.join(ogSlug, "..", aliasTarget))
        : aliasTarget
    ) as FullSlug

    const slugsToEmit = new Set<FullSlug>([aliasTargetSlug])
    slugsToEmit.add(aliasTargetSlug.toLowerCase() as FullSlug)

    for (const slug of slugsToEmit) {
      let redirUrl = resolveRelative(slug, ogSlug)
      if (ogSlug === "/" || ogSlug === "") {
        // If redirecting to the homepage, use index.html to avoid browser resolving "./" as current page
        const pathRoot = pathToRoot(slug)
        redirUrl = (pathRoot === "." ? "index.html" : `${pathRoot}/index.html`) as any
      }
      yield write({
        ctx,
        content: `
          <!DOCTYPE html>
          <html lang="en-us">
          <head>
          <title>${ogSlug}</title>
          <link rel="canonical" href="${redirUrl}">
          <meta name="robots" content="noindex">
          <meta charset="utf-8">
          <meta http-equiv="refresh" content="0; url=${redirUrl}">
          <script>
            window.location.replace("${redirUrl}");
          </script>
          </head>
          <body>
            <p>Redirecting to <a href="${redirUrl}">${redirUrl}</a>...</p>
          </body>
          </html>
          `,
        slug,
        ext: ".html",
      })
    }
  }
}

export const AliasRedirects: QuartzEmitterPlugin = () => ({
  name: "AliasRedirects",
  async *emit(ctx, content) {
    for (const [_tree, file] of content) {
      yield* processFile(ctx, file)
    }
  },
  async *partialEmit(ctx, _content, _resources, changeEvents) {
    for (const changeEvent of changeEvents) {
      if (!changeEvent.file) continue
      if (changeEvent.type === "add" || changeEvent.type === "change") {
        // add new ones if this file still exists
        yield* processFile(ctx, changeEvent.file)
      }
    }
  },
})
