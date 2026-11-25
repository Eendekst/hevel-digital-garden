import { jsx, jsxs } from "preact/jsx-runtime"

function classNames(...classes) {
  return classes.filter(Boolean).join(" ")
}

const langToggleScript = `
(() => {
  const STORAGE_KEY = "garden_lang";
  const COOKIE_NAME = "googtrans";

  function getStoredLang() {
    try {
      return localStorage.getItem(STORAGE_KEY) === "fr" ? "fr" : "original";
    } catch {
      return "original";
    }
  }

  function setStoredLang(lang) {
    try {
      localStorage.setItem(STORAGE_KEY, lang);
    } catch {}
  }

  function setCookie(lang) {
    const val = lang === "fr" ? "/en/fr" : "/en/en";
    const host = window.location.hostname;
    const parts = host.split(".");
    document.cookie = COOKIE_NAME + "=" + val + "; path=/;";
    document.cookie = COOKIE_NAME + "=" + val + "; path=/; domain=" + host + ";";
    if (parts.length > 2) {
      const root = parts.slice(-2).join(".");
      document.cookie = COOKIE_NAME + "=" + val + "; path=/; domain=." + root + ";";
    }
  }

  function clearCookie() {
    const host = window.location.hostname;
    const parts = host.split(".");
    const past = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    document.cookie = COOKIE_NAME + "=; " + past;
    document.cookie = COOKIE_NAME + "=; " + past + " domain=" + host + ";";
    if (parts.length > 2) {
      const root = parts.slice(-2).join(".");
      document.cookie = COOKIE_NAME + "=; " + past + " domain=." + root + ";";
    }
  }

  function protectElements() {
    const selectors = ["pre", "code", ".graph", ".global-graph", ".katex", ".mermaid", "svg", ".notranslate"];
    selectors.forEach((sel) => {
      document.querySelectorAll(sel).forEach((el) => {
        el.setAttribute("translate", "no");
        el.classList.add("notranslate");
      });
    });
  }

  let googleScriptLoading = false;
  function loadGoogleTranslate(onReady) {
    if (window.google && window.google.translate && window.google.translate.TranslateElement) {
      if (onReady) onReady();
      return;
    }
    if (document.getElementById("google-translate-script")) {
      if (onReady) {
        const checkInterval = setInterval(() => {
          if (window.google && window.google.translate && window.google.translate.TranslateElement) {
            clearInterval(checkInterval);
            onReady();
          }
        }, 50);
        setTimeout(() => clearInterval(checkInterval), 5000);
      }
      return;
    }
    if (googleScriptLoading) return;
    googleScriptLoading = true;

    window.googleTranslateElementInit = function () {
      try {
        new window.google.translate.TranslateElement(
          { pageLanguage: "en", includedLanguages: "fr", autoDisplay: false },
          "google_translate_element"
        );
      } catch (e) {
        console.warn("Translate init warning:", e);
      }
      if (onReady) onReady();
    };

    const script = document.createElement("script");
    script.id = "google-translate-script";
    script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit";
    script.async = true;
    document.head.appendChild(script);
  }

  function triggerGoogleTranslate(lang) {
    protectElements();
    const combo = document.querySelector(".goog-te-combo");
    if (combo) {
      combo.value = lang === "fr" ? "fr" : "en";
      combo.dispatchEvent(new Event("change"));
    } else {
      let attempts = 0;
      const poll = setInterval(() => {
        attempts++;
        const c = document.querySelector(".goog-te-combo");
        if (c) {
          c.value = lang === "fr" ? "fr" : "en";
          c.dispatchEvent(new Event("change"));
          clearInterval(poll);
        }
        if (attempts > 40) clearInterval(poll);
      }, 100);
    }
  }

  function updateToggleUI(currentLang) {
    const btns = document.querySelectorAll("#garden-lang-toggle");
    btns.forEach((btn) => {
      btn.setAttribute("data-lang", currentLang);
      if (currentLang === "fr") {
        btn.setAttribute("title", "Contenu traduit en français canadien. Cliquer pour revenir en anglais (EN).");
        document.documentElement.setAttribute("lang", "fr-CA");
      } else {
        btn.setAttribute("title", "Cliquer pour traduire le Jardin Numérique en français canadien (EN / FR).");
        document.documentElement.setAttribute("lang", "en");
      }
    });
  }

  const initialLang = getStoredLang();
  if (initialLang === "fr") {
    setCookie("fr");
    document.documentElement.setAttribute("lang", "fr-CA");
    loadGoogleTranslate(() => triggerGoogleTranslate("fr"));
  }

  function bindLanguageToggle() {
    const currentLang = getStoredLang();
    updateToggleUI(currentLang);
    if (currentLang === "fr") {
      loadGoogleTranslate(() => triggerGoogleTranslate("fr"));
    }
    const toggleBtns = document.querySelectorAll("#garden-lang-toggle");
    toggleBtns.forEach((toggleBtn) => {
      if (toggleBtn.dataset.bound === "true") return;
      toggleBtn.dataset.bound = "true";
      const onClick = (e) => {
        e.preventDefault();
        const active = getStoredLang();
        const nextLang = active === "original" ? "fr" : "original";
        setStoredLang(nextLang);
        updateToggleUI(nextLang);
        if (nextLang === "fr") {
          setCookie("fr");
          loadGoogleTranslate(() => triggerGoogleTranslate("fr"));
        } else {
          clearCookie();
          setCookie("original");
          const combo = document.querySelector(".goog-te-combo");
          if (combo) {
            combo.value = "en";
            combo.dispatchEvent(new Event("change"));
          }
          window.location.reload();
        }
      };
      toggleBtn.addEventListener("click", onClick);
      if (typeof window.addCleanup === "function") {
        window.addCleanup(() => toggleBtn.removeEventListener("click", onClick));
      }
    });
  }

  document.addEventListener("nav", bindLanguageToggle);
  document.addEventListener("render", bindLanguageToggle);
})();
`

const langToggleCss = `
.lang-toggle-wrapper {
  display: inline-flex;
  align-items: center;
  flex-shrink: 0;
}

.lang-toggle-btn {
  cursor: pointer;
  padding: 0 4px;
  position: relative;
  background: var(--glass-background) !important;
  border: 1px solid var(--glass-border) !important;
  height: 26px;
  margin: 0;
  display: inline-flex;
  align-items: center;
  gap: 2px;
  font-family: var(--codeFont) !important;
  font-size: 0.72rem;
  font-weight: 600;
  color: var(--darkgray);
  flex-shrink: 0;
  transition: all 0.2s cubic-bezier(0.16, 1, 0.3, 1);
  user-select: none;
  line-height: 1;
}

.lang-toggle-btn:hover {
  border-color: var(--secondary) !important;
  color: var(--dark);
  box-shadow: 0 0 8px var(--glow-color);
}

.lang-toggle-btn .lang-pill {
  padding: 2px 5px;
  transition: all 0.15s ease;
  display: inline-block;
  letter-spacing: 0.3px;
}

.lang-toggle-btn .lang-divider {
  opacity: 0.4;
  font-size: 0.65rem;
  padding: 0 1px;
  user-select: none;
}

.lang-toggle-btn[data-lang="original"] .lang-orig {
  background-color: var(--secondary) !important;
  color: var(--light) !important;
  font-weight: 700;
  box-shadow: 0 0 6px var(--glow-color);
}

.lang-toggle-btn[data-lang="original"] .lang-fr {
  color: var(--darkgray);
  opacity: 0.65;
}

.lang-toggle-btn[data-lang="fr"] .lang-fr {
  background-color: var(--secondary) !important;
  color: var(--light) !important;
  font-weight: 700;
  box-shadow: 0 0 6px var(--glow-color);
}

.lang-toggle-btn[data-lang="fr"] .lang-orig {
  color: var(--darkgray);
  opacity: 0.65;
}

@media (max-width: 800px) {
  .lang-toggle-btn {
    height: 24px;
    padding: 0 2px;
    font-size: 0.65rem;
  }
  .lang-toggle-btn .lang-pill {
    padding: 1px 3px;
  }
}

.goog-te-banner-frame.skiptranslate,
.goog-te-banner-frame,
iframe.goog-te-banner-frame {
  display: none !important;
  visibility: hidden !important;
  height: 0 !important;
  width: 0 !important;
  border: none !important;
}

body {
  top: 0px !important;
  position: static !important;
}

.goog-tooltip,
.goog-tooltip:hover {
  display: none !important;
}

.goog-text-highlight {
  background-color: transparent !important;
  box-shadow: none !important;
}

#google_translate_element {
  display: none !important;
}

body > .skiptranslate {
  display: none !important;
}
`

const LanguageToggleComponent = ({ displayClass }) => {
  return jsxs("div", {
    class: classNames(displayClass, "lang-toggle-wrapper"),
    children: [
      jsxs("button", {
        id: "garden-lang-toggle",
        class: "lang-toggle-btn",
        type: "button",
        "data-lang": "original",
        "aria-label": "Basculer la langue : EN ou FR",
        title: "Traduire le Jardin Numérique en français canadien (EN / FR)",
        children: [
          jsx("span", { class: "lang-pill lang-orig", children: "EN" }),
          jsx("span", { class: "lang-divider", children: "/" }),
          jsx("span", { class: "lang-pill lang-fr", children: "FR" }),
        ],
      }),
      jsx("div", { id: "google_translate_element", style: "display: none;" }),
    ],
  })
}

LanguageToggleComponent.beforeDOMLoaded = langToggleScript
LanguageToggleComponent.css = langToggleCss

export const LanguageToggle = () => LanguageToggleComponent
export default LanguageToggle
