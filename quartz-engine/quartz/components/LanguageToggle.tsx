import { QuartzComponent, QuartzComponentConstructor, QuartzComponentProps } from "./types"
// @ts-ignore
import script from "./scripts/languagetoggle.inline"
import styles from "./styles/languagetoggle.scss"
import { classNames } from "../util/lang"

const LanguageToggle: QuartzComponent = ({ displayClass }: QuartzComponentProps) => {
  return (
    <div class={classNames(displayClass, "lang-toggle-wrapper")}>
      <button
        id="garden-lang-toggle"
        class="lang-toggle-btn"
        type="button"
        data-lang="original"
        aria-label="Basculer la langue : Original ou Français Canadien"
        title="Traduire le Jardin Numérique en français canadien (Original / FR)"
      >
        <span class="lang-pill lang-orig">Original</span>
        <span class="lang-divider">/</span>
        <span class="lang-pill lang-fr">FR</span>
      </button>
      <div id="google_translate_element" style="display: none;"></div>
    </div>
  )
}

LanguageToggle.beforeDOMLoaded = script
LanguageToggle.css = styles

export default (() => LanguageToggle) satisfies QuartzComponentConstructor
