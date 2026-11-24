// Language Toggle & Live Translation Script (FR-CA / Original)

declare global {
  interface Window {
    google?: any
    googleTranslateElementInit?: () => void
  }
}

const STORAGE_KEY = "garden_lang"
const COOKIE_NAME = "googtrans"

function getStoredLang(): "fr" | "original" {
  try {
    return localStorage.getItem(STORAGE_KEY) === "fr" ? "fr" : "original"
  } catch {
    return "original"
  }
}

function setStoredLang(lang: "fr" | "original") {
  try {
    localStorage.setItem(STORAGE_KEY, lang)
  } catch {}
}

function setCookie(lang: "fr" | "original") {
  const val = lang === "fr" ? "/en/fr" : "/en/en"
  const host = window.location.hostname
  const parts = host.split(".")

  document.cookie = `${COOKIE_NAME}=${val}; path=/;`
  document.cookie = `${COOKIE_NAME}=${val}; path=/; domain=${host};`

  if (parts.length > 2) {
    const root = parts.slice(-2).join(".")
    document.cookie = `${COOKIE_NAME}=${val}; path=/; domain=.${root};`
  }
}

function clearCookie() {
  const host = window.location.hostname
  const parts = host.split(".")
  const past = "expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;"

  document.cookie = `${COOKIE_NAME}=; ${past}`
  document.cookie = `${COOKIE_NAME}=; ${past} domain=${host};`

  if (parts.length > 2) {
    const root = parts.slice(-2).join(".")
    document.cookie = `${COOKIE_NAME}=; ${past} domain=.${root};`
  }
}

// Protect code, math, formulas, and graph elements from translation
function protectElements() {
  const selectors = [
    "pre",
    "code",
    ".graph",
    ".global-graph",
    ".katex",
    ".mermaid",
    "svg",
    ".notranslate",
  ]
  selectors.forEach((sel) => {
    document.querySelectorAll(sel).forEach((el) => {
      el.setAttribute("translate", "no")
      el.classList.add("notranslate")
    })
  })
}

let googleScriptLoading = false
function loadGoogleTranslate(onReady?: () => void) {
  if (window.google?.translate?.TranslateElement) {
    if (onReady) onReady()
    return
  }

  if (document.getElementById("google-translate-script")) {
    if (onReady) {
      const checkInterval = setInterval(() => {
        if (window.google?.translate?.TranslateElement) {
          clearInterval(checkInterval)
          onReady()
        }
      }, 50)
      setTimeout(() => clearInterval(checkInterval), 5000)
    }
    return
  }

  if (googleScriptLoading) return
  googleScriptLoading = true

  window.googleTranslateElementInit = function () {
    try {
      new window.google.translate.TranslateElement(
        {
          pageLanguage: "en",
          includedLanguages: "fr",
          autoDisplay: false,
        },
        "google_translate_element",
      )
    } catch (e) {
      console.warn("Translate init warning:", e)
    }
    if (onReady) onReady()
  }

  const script = document.createElement("script")
  script.id = "google-translate-script"
  script.src = "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
  script.async = true
  document.head.appendChild(script)
}

function triggerGoogleTranslate(lang: "fr" | "original") {
  protectElements()

  const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null
  if (combo) {
    combo.value = lang === "fr" ? "fr" : "en"
    combo.dispatchEvent(new Event("change"))
  } else {
    let attempts = 0
    const poll = setInterval(() => {
      attempts++
      const c = document.querySelector(".goog-te-combo") as HTMLSelectElement | null
      if (c) {
        c.value = lang === "fr" ? "fr" : "en"
        c.dispatchEvent(new Event("change"))
        clearInterval(poll)
      }
      if (attempts > 40) clearInterval(poll)
    }, 100)
  }
}

function updateToggleUI(currentLang: "fr" | "original") {
  const btn = document.getElementById("garden-lang-toggle")
  if (btn) {
    btn.setAttribute("data-lang", currentLang)
    if (currentLang === "fr") {
      btn.setAttribute(
        "title",
        "Contenu traduit en français canadien. Cliquer pour revenir à l'original.",
      )
      document.documentElement.setAttribute("lang", "fr-CA")
    } else {
      btn.setAttribute(
        "title",
        "Cliquer pour traduire le Jardin Numérique en français canadien (Original / FR).",
      )
      document.documentElement.setAttribute("lang", "en")
    }
  }
}

// Initial check before DOM completes
const initialLang = getStoredLang()
if (initialLang === "fr") {
  setCookie("fr")
  document.documentElement.setAttribute("lang", "fr-CA")
  loadGoogleTranslate(() => {
    triggerGoogleTranslate("fr")
  })
}

// Attach listener on SPA navigation and DOM ready
document.addEventListener("nav", () => {
  const currentLang = getStoredLang()
  updateToggleUI(currentLang)

  if (currentLang === "fr") {
    loadGoogleTranslate(() => {
      triggerGoogleTranslate("fr")
    })
  }

  const toggleBtn = document.getElementById("garden-lang-toggle")
  if (!toggleBtn) return

  if (toggleBtn.dataset.bound === "true") return
  toggleBtn.dataset.bound = "true"

  toggleBtn.addEventListener("click", (e) => {
    e.preventDefault()
    const active = getStoredLang()
    const nextLang: "fr" | "original" = active === "original" ? "fr" : "original"

    setStoredLang(nextLang)
    updateToggleUI(nextLang)

    if (nextLang === "fr") {
      setCookie("fr")
      loadGoogleTranslate(() => {
        triggerGoogleTranslate("fr")
      })
    } else {
      clearCookie()
      setCookie("original")
      const combo = document.querySelector(".goog-te-combo") as HTMLSelectElement | null
      if (combo) {
        combo.value = "en"
        combo.dispatchEvent(new Event("change"))
      }
      window.location.reload()
    }
  })
})
