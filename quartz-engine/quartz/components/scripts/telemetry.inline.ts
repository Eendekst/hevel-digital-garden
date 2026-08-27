const TELEMETRY_ENDPOINT = "https://hevel.ca/api/telemetry"

function getOrSetAnonId(): string {
  if (typeof window === "undefined") return ""
  let anonId = localStorage.getItem("hevel_anon_id")
  if (!anonId) {
    anonId = "anon_" + Math.random().toString(36).substring(2, 15) + "_" + Date.now().toString(36)
    localStorage.setItem("hevel_anon_id", anonId)
  }
  return anonId
}

function getStoredClickIds() {
  if (typeof window === "undefined") return {}
  try {
    return JSON.parse(localStorage.getItem("hevel_attribution") || "{}")
  } catch {
    return {}
  }
}

function updateStoredClickIds() {
  if (typeof window === "undefined") return {}
  const params = new URLSearchParams(window.location.search)
  const current: Record<string, string> = getStoredClickIds()
  const keys = [
    "gclid",
    "fbclid",
    "ttclid",
    "utm_source",
    "utm_medium",
    "utm_campaign",
    "utm_term",
    "utm_content",
  ]
  let updated = false

  keys.forEach((key) => {
    const val = params.get(key)
    if (val) {
      current[key] = val
      updated = true
    }
  })

  if (updated) {
    localStorage.setItem("hevel_attribution", JSON.stringify(current))
  }
  return current
}

function sendBeaconPing(eventType: string, dwellSeconds = 0, scrollPct = 0, meta = {}) {
  try {
    const anonId = getOrSetAnonId()
    const attribution = getStoredClickIds()
    const eventId = "evt_" + Math.random().toString(36).substring(2, 11) + "_" + Date.now()

    const payload = {
      anon_id: anonId,
      event_id: eventId,
      platform: "garden.hevel.ca",
      event_type: eventType,
      page_path: window.location.pathname,
      page_title: document.title,
      referrer: document.referrer || null,
      gclid: attribution.gclid || null,
      fbclid: attribution.fbclid || null,
      ttclid: attribution.ttclid || null,
      utm_source: attribution.utm_source || null,
      utm_medium: attribution.utm_medium || null,
      utm_campaign: attribution.utm_campaign || null,
      utm_term: attribution.utm_term || null,
      utm_content: attribution.utm_content || null,
      dwell_time_seconds: dwellSeconds,
      scroll_depth_pct: scrollPct,
      metadata: meta,
    }

    const jsonStr = JSON.stringify(payload)
    if (navigator.sendBeacon) {
      const blob = new Blob([jsonStr], { type: "application/json" })
      navigator.sendBeacon(TELEMETRY_ENDPOINT, blob)
    } else {
      fetch(TELEMETRY_ENDPOINT, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: jsonStr,
        mode: "cors",
        keepalive: true,
      }).catch(() => {})
    }
  } catch (e) {}
}

let pageStartTime = Date.now()
let maxScroll = 0
let activeTimers: any[] = []

document.addEventListener("nav", () => {
  updateStoredClickIds()
  pageStartTime = Date.now()
  maxScroll = 0
  activeTimers.forEach(clearTimeout)
  activeTimers = []

  // Track Garden Note view
  sendBeaconPing("page_view", 0, 0, { context: "garden_note_view" })

  // 15s Active Reader
  activeTimers.push(
    setTimeout(() => {
      sendBeaconPing("dwell_milestone", 15, maxScroll, { milestone: "garden_active_15s" })
    }, 15000),
  )

  // 60s Engaged Reader milestone
  activeTimers.push(
    setTimeout(() => {
      sendBeaconPing("dwell_milestone", 60, maxScroll, { milestone: "engaged_garden_reader_60s" })
    }, 60000),
  )

  // 180s Deep Sovereign Scholar milestone
  activeTimers.push(
    setTimeout(() => {
      sendBeaconPing("dwell_milestone", 180, maxScroll, {
        milestone: "deep_sovereign_scholar_180s",
      })
    }, 180000),
  )
})

window.addEventListener("scroll", () => {
  const h = document.documentElement
  const b = document.body
  const st = "scrollTop"
  const sh = "scrollHeight"
  const percent = Math.round(((h[st] || b[st]) / ((h[sh] || b[sh]) - h.clientHeight)) * 100)
  if (percent > maxScroll) {
    maxScroll = Math.min(100, Math.max(0, percent))
  }
}, { passive: true })

window.addEventListener("beforeunload", () => {
  const dwell = Math.round((Date.now() - pageStartTime) / 1000)
  if (dwell > 2) {
    sendBeaconPing("page_exit", dwell, maxScroll)
  }
})
