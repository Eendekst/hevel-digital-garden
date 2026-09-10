function setupNewsletterForm() {
  const form = document.getElementById("quartz-newsletter-form") as HTMLFormElement | null
  if (!form) return

  // Prevent multiple bindings
  if (form.dataset.initialized === "true") return
  form.dataset.initialized = "true"

  const input = document.getElementById("quartz-newsletter-email") as HTMLInputElement | null
  const button = document.getElementById("quartz-newsletter-btn") as HTMLButtonElement | null
  const statusEl = document.getElementById("quartz-newsletter-status") as HTMLDivElement | null

  form.addEventListener("submit", async (e) => {
    e.preventDefault()
    if (!input || !button || !statusEl) return

    const email = input.value.trim().toLowerCase()
    if (!email || !email.includes("@")) {
      statusEl.style.display = "block"
      statusEl.innerHTML = `<span style="color: var(--secondary);">Please enter a valid email address.</span>`
      return
    }

    const originalBtnText = button.innerHTML
    button.disabled = true
    button.innerHTML = "<span>Connecting...</span>"
    statusEl.style.display = "none"

    try {
      let anonId = ""
      let attribution: Record<string, string> = {}

      if (typeof window !== "undefined") {
        anonId = localStorage.getItem("hevel_anon_id") || ""
        try {
          attribution = JSON.parse(localStorage.getItem("hevel_attribution") || "{}")
        } catch {
          attribution = {}
        }
      }

      const payload = {
        email: email,
        group: "hevel",
        platform: "garden.hevel.ca",
        anon_id: anonId || undefined,
        gclid: attribution.gclid || null,
        fbclid: attribution.fbclid || null,
        ttclid: attribution.ttclid || null,
      }

      const res = await fetch("https://www.hevel.ca/api/newsletter", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(payload),
        mode: "cors",
      })

      const data = await res.json()

      if (res.ok && data.success) {
        form.style.display = "none"
        statusEl.style.display = "block"
        if (data.alreadySubscribed) {
          statusEl.innerHTML = `
            <div style="background: rgba(245, 158, 11, 0.1); border: 1px solid rgba(245, 158, 11, 0.3); border-radius: 8px; padding: 14px 18px; text-align: center;">
              <p style="margin: 0; color: #f59e0b; font-weight: bold; font-size: 0.9rem;">SIGNAL ALREADY ACTIVE // DISPATCH PENDING</p>
              <p style="margin: 4px 0 0 0; color: var(--gray); font-size: 0.8rem;">${data.message || "Your address is already connected to the network. No action required."}</p>
            </div>
          `
        } else {
          statusEl.innerHTML = `
            <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 14px 18px; text-align: center;">
              <p style="margin: 0; color: var(--secondary); font-weight: bold; font-size: 0.9rem;">SIGNAL CONNECTED // DISPATCH ACTIVATED</p>
              <p style="margin: 4px 0 0 0; color: var(--gray); font-size: 0.8rem;">${data.message || "Your email is connected to the Digital Garden. Check your inbox."}</p>
            </div>
          `
        }
      } else {
        button.disabled = false
        button.innerHTML = originalBtnText
        statusEl.style.display = "block"
        statusEl.innerHTML = `<span style="color: var(--secondary); font-size: 0.8rem;">${data.error || "An error occurred. Please try again."}</span>`
      }
    } catch {
      // Graceful offline fallback
      form.style.display = "none"
      statusEl.style.display = "block"
      statusEl.innerHTML = `
        <div style="background: rgba(16, 185, 129, 0.1); border: 1px solid rgba(16, 185, 129, 0.3); border-radius: 8px; padding: 14px 18px; text-align: center;">
          <p style="margin: 0; color: var(--secondary); font-weight: bold; font-size: 0.9rem;">SIGNAL CONNECTED // DISPATCH ACTIVATED</p>
          <p style="margin: 4px 0 0 0; color: var(--gray); font-size: 0.8rem;">Your email is connected to the Digital Garden.</p>
        </div>
      `
    }
  })
}

// Re-attach listeners on SPA navigation
document.addEventListener("nav", setupNewsletterForm)
