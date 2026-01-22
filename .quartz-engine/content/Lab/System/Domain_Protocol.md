# Domain Protocol: garden.hevel.ca
**Target**: Connect `hevel-digital-garden` to `garden.hevel.ca` (Subdomain)
**Provider**: Squarespace
**Main Site**: `hevel.ca` (Gamma.app) - **UNTOUCHED**

## 1. STRATEGY
We will use a **Subdomain** (`garden.hevel.ca`).
*   **Why**: This allows your main site (`hevel.ca`) to stay on Gamma without interruption.
*   **The Garden** lives peacefully next door at `garden`.

## 2. AUTOMATED CONFIGURATION (Done by Jim)
*   **Quartz Config**: `baseUrl` set to `garden.hevel.ca`.
*   **CNAME**: Pushed to GitHub.

## 3. USER ACTION REQUIRED (DNS Setup)
Log in to **Squarespace** > **Domains** > **Manage Domain** > **DNS Settings**.
Scroll down to **Custom Records** and add:

| Record Type | Host | Data / Value | Priority |
|---|---|---|---|
| **CNAME** | `garden` | `eendekst.github.io` | (Leave blank or Default) |

*   **Note**: Do **NOT** delete your existing A records or CNAME records for `@` or `www` (those keep your Gamma site working). only **ADD** the new `garden` record.

### 4. GitHub Activation
1.  Go to Repo Settings > Pages.
2.  Ensure "Custom domain" says `garden.hevel.ca` (Run Deploy script to update this automatically).
3.  Check "Enforce HTTPS".
