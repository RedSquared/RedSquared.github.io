# New Eden Trade Lab — Technical Reference

A static, client-side EVE Online trading toolkit. No backend. No database. All data lives in the browser via `localStorage` and the public [EVE ESI API](https://esi.evetech.net/).

**Live site:** https://newedentradelab.com
**Stack:** Vanilla HTML/CSS/ES Modules · Vite (bundler) · Cloudflare Pages (hosting)

---

## Table of Contents

1. [Project Structure](#1-project-structure)
2. [Local Development](#2-local-development)
3. [Build & Deploy](#3-build--deploy)
4. [EVE SSO Setup](#4-eve-sso-setup)
5. [Whitelist / Access Control](#5-whitelist--access-control)
6. [ESI Client API Reference](#6-esi-client-api-reference)
7. [Authentication Module Reference](#7-authentication-module-reference)
8. [Authentication Flow](#8-authentication-flow)
9. [localStorage Keys](#9-localstorage-keys)
10. [Adding a New Tool](#10-adding-a-new-tool)
11. [Deployment Checklist](#11-deployment-checklist)

---

## 1. Project Structure

```
eve-tools/
│
├── index.html                      # Home / tool launcher
├── EveOrders.html                  # EVE Orders dashboard
├── eve-multisell.html              # Multi Sell Pricer
├── market-probe.html               # Market Probe Scanner
├── 404.html                        # Custom not-found page
├── access-denied.html              # Whitelist rejection page
│
├── oauth/
│   └── callback.html               # EVE SSO redirect target (thin shell)
│
├── src/
│   ├── api/
│   │   └── esi-client.js           # Unified ESI fetch wrapper (see §6)
│   ├── auth/
│   │   └── eve-auth.js             # Multi-account SSO + token management (see §7)
│   ├── oauth/
│   │   └── callback.js             # PKCE token exchange logic
│   ├── pages/
│   │   ├── multisell/main.js       # Multi Sell page logic
│   │   └── market-probe/main.js    # Market Probe page logic
│   └── shared/
│       └── regions.js              # Trade hub IDs + station IDs (single source of truth)
│
├── assets/
│   ├── js/
│   │   ├── orders.js               # EVE Orders page logic (ES module, imports from src/)
│   │   ├── site-config.js          # Tool visibility flags (plain script)
│   │   └── site-nav.js             # Hamburger menu behaviour (plain script)
│   └── css/
│       ├── index.css
│       ├── orders.css
│       ├── multisell.css
│       ├── market-probe.css
│       └── site-nav.css
│
├── public/                         # Vite copies verbatim → dist/
│   ├── favicon.svg
│   ├── _headers                    # Cloudflare Pages response headers
│   └── _redirects                  # URL rewrite rules
│
├── dist/                           # Build output (git-ignored)
├── package.json
└── vite.config.js
```

### Path Aliases (vite.config.js)

| Alias | Resolves to |
|-------|------------|
| `@api` | `src/api/` |
| `@auth` | `src/auth/` |
| `@shared` | `src/shared/` |

Use these in any `import` statement — Vite resolves them at build time and during `npm run dev`.

---

## 2. Local Development

```bash
npm install
npm run dev          # Vite dev server → http://localhost:8080
```

> **Two OAuth apps:** EVE's callback URL must be an exact match. Keep one app pointing to `http://localhost:8080/oauth/callback` for local dev and a separate app for production. See [§4](#4-eve-sso-setup).

`npm run preview` serves the production build locally for final smoke-testing before deploying.

---

## 3. Build & Deploy

```bash
npm run build        # Bundles everything → dist/
```

Vite's multi-page build produces one optimised HTML+JS bundle per entry point. The `public/` directory is copied verbatim, so `_headers`, `_redirects`, and `favicon.svg` land in `dist/` unchanged.

### Cloudflare Pages Settings

| Setting | Value |
|---------|-------|
| Build command | `npm run build` |
| Output directory | `dist` |
| Node version | 18+ |

### URL Rewrites (`public/_redirects`)

```
/oauth/callback     /oauth/callback.html    200
/market-probe       /market-probe.html      200
/access-denied      /access-denied.html     200
```

These let you link to clean URLs while the actual files use `.html` extensions.

---

## 4. EVE SSO Setup

1. Go to https://developers.eveonline.com and create a new application.
2. **Connection type:** Authentication & API Access
3. **Callback URL:** Must exactly match the URL users hit after login:
   - Local: `http://localhost:8080/oauth/callback`
   - Production: `https://newedentradelab.com/oauth/callback`
4. **Required scopes:**
   ```
   esi-markets.read_character_orders.v1
   esi-markets.read_corporation_orders.v1
   esi-skills.read_skills.v1
   esi-ui.open_window.v1
   esi-wallet.read_character_wallet.v1
   esi-wallet.read_corporation_wallets.v1
   ```
5. Copy the **Client ID** (not the secret — PKCE apps don't use secrets).
6. Set the client ID in `src/auth/eve-auth.js`:
   ```js
   // src/auth/eve-auth.js
   export function getClientId() {
     return localStorage.getItem('eve_client_id') || 'YOUR_CLIENT_ID_HERE';
   }
   ```
   The `localStorage` override (`eve_client_id`) lets you test with a different app without redeploying.

---

## 5. Whitelist / Access Control

The site supports an optional character whitelist. It's controlled by `ALLOWED_CHARACTER_IDS` in `src/auth/eve-auth.js`:

```js
// src/auth/eve-auth.js
export const ALLOWED_CHARACTER_IDS = [];
// Empty = open access (anyone who logs in with EVE SSO can use the tools)
// Populated = only these character IDs are allowed
// Example: [12345678, 87654321]
```

When a character is rejected:
- They're redirected to `access-denied.html`
- Their character name and ID are shown on that page
- They can share that ID with you to be added to the list

After editing the array, redeploy (`npm run build` → push to Cloudflare Pages).

---

## 6. ESI Client API Reference

**File:** `src/api/esi-client.js`

All functions append `datasource=tranquility` automatically. **Never embed query params directly in the path string** — always pass them via the `params` option, otherwise `_buildUrl` will produce a double-`?` malformed URL.

### `esiGet(path, opts?)`

Single authenticated or public GET request.

```js
import { esiGet } from '@api/esi-client.js';

const { data, headers } = await esiGet('/characters/12345/orders/', {
  charId: 12345,           // omit for public endpoints
  params: { page: 1 },    // appended as query string
});
```

Returns `{ data, headers }`. `headers` is the native `Response.headers` — use it to inspect `X-Pages`, `Expires`, etc.

### `esiGetAllPages(path, opts?)`

Fetches page 1, reads the `X-Pages` header, then fetches all remaining pages concurrently. Returns a flat array of all items.

```js
import { esiGetAllPages } from '@api/esi-client.js';

const orders = await esiGetAllPages('/markets/10000002/orders/', {
  charId: null,                  // public endpoint
  params: { order_type: 'sell', type_id: 34 },
  concurrency: 10,               // max simultaneous page requests (default: 10)
});
```

### `esiPost(path, opts?)`

POST request. Returns the parsed JSON body, or `null` on `204 No Content`.

```js
import { esiPost } from '@api/esi-client.js';

// Batch ID → name lookup
const names = await esiPost('/universe/names/', {
  body: [12345, 60003760],
});

// Open in-game market window (requires esi-ui.open_window.v1)
await esiPost('/ui/openwindow/marketdetails/', {
  charId: activeCharId,
  params: { type_id: 34 },     // ← params, not path string
});
```

### `runConcurrent(tasks, limit)`

Bounded concurrency runner. `tasks` is an array of `() => Promise` functions. Results are returned in the same order as tasks.

```js
import { runConcurrent } from '@api/esi-client.js';

const results = await runConcurrent(
  regionIds.map(id => () => fetchRegionData(id)),
  20  // max 20 simultaneous
);
```

### `EsiError`

Thrown by all three fetch functions on non-2xx responses.

```js
import { EsiError } from '@api/esi-client.js';

try {
  await esiGet('/universe/structures/1234567890123/', { charId });
} catch (e) {
  if (e instanceof EsiError) {
    console.log(e.status);       // HTTP status code
    console.log(e.isAuthError);  // true if 401
    console.log(e.path);         // the ESI path that failed
  }
}
```

---

## 7. Authentication Module Reference

**File:** `src/auth/eve-auth.js`

### Account Storage

```js
import { getAccounts, saveAccounts, removeAccount } from '@auth/eve-auth.js';

// Returns: { [charId]: { at, rt, exp, cname, corpId } }
const accounts = getAccounts();

// Persist changes
saveAccounts(accounts);

// Remove one character
removeAccount(charId);
```

### Token Management

```js
import { getToken } from '@auth/eve-auth.js';

// Returns a valid access token, auto-refreshing if within 30s of expiry.
// Deduplicates concurrent refresh calls for the same character.
// Throws EsiError with isAuthError=true if token is invalid/expired beyond recovery.
const token = await getToken(charId);
```

### OAuth Flow

```js
import { startOAuth } from '@auth/eve-auth.js';

// Redirects the user to EVE login. `originPath` is where to return after auth.
startOAuth('/market-probe.html');
```

### Whitelist Check

```js
import { isWhitelisted } from '@auth/eve-auth.js';

if (!isWhitelisted(charId)) {
  window.location.href = '/access-denied.html';
}
```

---

## 8. Authentication Flow

```
User clicks "Sign in with EVE"
        │
        ▼
startOAuth(originPath)
  ├─ Generate 64-char PKCE verifier
  ├─ Generate 16-char state (CSRF token)
  ├─ Compute SHA-256 challenge from verifier
  ├─ Save verifier + state + originPath to localStorage
  └─ Redirect → https://login.eveonline.com/v2/oauth/authorize?...
        │
        ▼ (user approves)
/oauth/callback?code=...&state=...
        │
src/oauth/callback.js
  ├─ Validate state (CSRF check)
  ├─ POST code + verifier → EVE token endpoint
  ├─ Parse JWT → extract charId, charName
  ├─ isWhitelisted(charId)?
  │     No  → redirect /access-denied.html
  │     Yes → saveAccounts({ [charId]: { at, rt, exp, cname, ... } })
  └─ Redirect → originPath
        │
        ▼
Tool page loads
  └─ getToken(charId) used for all authenticated ESI calls
       ├─ Token valid → return as-is
       ├─ Within 30s of expiry → refresh silently
       └─ Concurrent refreshes → deduplicated (one in-flight per charId)
```

---

## 9. localStorage Keys

| Key | Tool | Description |
|-----|------|-------------|
| `eve_accounts` | All | `{ [charId]: { at, rt, exp, cname, corpId } }` — all authenticated characters |
| `eve_active_char` | Orders, Market Probe | Currently selected character ID |
| `eve_client_id` | All | Optional override for EVE OAuth client ID |
| `eve_pkce_v` | Auth | PKCE verifier (written before OAuth redirect, deleted after callback) |
| `eve_pkce_s` | Auth | PKCE state / CSRF token |
| `eve_pkce_origin` | Auth | Return URL after OAuth completes |
| `eve_uc_ticks` | Orders | Undercut ticks setting (default: 1) |
| `eve_uc_scope` | Orders | `"station"` or `"region"` — undercut comparison scope |
| `eve_turnover_days` | Orders | Sell pace lookback window in days (1–90, default: 7) |
| `eve_compact` | Orders | `"1"` = compact mode on |
| `eve_visible_columns` | Orders | JSON array of visible column IDs |
| `eve_filter_presets_v1` | Orders | Saved filter presets `[{ name, filters, favorite }]` |
| `eve_order_age_index_v1` | Orders | `{ [orderId]: firstSeenTimestamp }` — tracks order age |
| `eve_orders_cache_v1` | Orders | Per-character order snapshot cache |
| `eve_last_order_refresh_v1` | Orders | Last refresh timestamp (enforces 6-min cooldown) |
| `eve_corp_wallet_div` | Orders | Selected corp wallet division (1–7) |
| `eve_scan_regions` | Market Probe | JSON array of enabled region IDs |
| `eve_rescan_min` | Market Probe | Auto-scan interval minutes |
| `eve_rescan_sec` | Market Probe | Auto-scan interval seconds |
| `mp_col_vis` | Market Probe | Column visibility `{ region, category, group, ... }` |

---

## 10. Adding a New Tool

Follow this pattern to add a new page that integrates with the shared auth and ESI client:

**1. Create the page script**

```js
// src/pages/my-tool/main.js
import { esiGet, esiGetAllPages } from '@api/esi-client.js';
import { getToken, startOAuth, getAccounts } from '@auth/eve-auth.js';
import { JITA_REGION } from '@shared/regions.js';

// ... tool logic ...

// Expose functions called from HTML onclick= attributes
Object.assign(window, { myPublicFunction, anotherFunction });
```

**2. Create the HTML page**

```html
<!-- my-tool.html -->
<!DOCTYPE html>
<html>
<head>
  <link rel="stylesheet" href="/assets/css/site-nav.css">
  <!-- tool stylesheet -->
</head>
<body>
  <!-- nav markup (copy from another page) -->
  <script src="/assets/js/site-config.js"></script>
  <script src="/assets/js/site-nav.js"></script>
  <script type="module" src="/src/pages/my-tool/main.js"></script>
</body>
</html>
```

**3. Register with Vite**

```js
// vite.config.js
rollupOptions: {
  input: {
    // ... existing entries ...
    myTool: resolve(__dirname, 'my-tool.html'),
  }
}
```

**4. Add to navigation**

Add a nav link to `index.html`, `EveOrders.html`, `eve-multisell.html`, and `market-probe.html`.

**5. Add a redirect (optional)**

```
# public/_redirects
/my-tool    /my-tool.html    200
```

---

## 11. Deployment Checklist

- [ ] `npm run build` completes without errors
- [ ] EVE OAuth app callback URL matches the production domain exactly
- [ ] Client ID updated in `src/auth/eve-auth.js` (or set via `eve_client_id` in localStorage)
- [ ] `ALLOWED_CHARACTER_IDS` set correctly (empty = open, populated = whitelist only)
- [ ] `public/_redirects` includes `/oauth/callback`, `/market-probe`, `/access-denied`
- [ ] Cloudflare Pages: build command `npm run build`, output directory `dist`
- [ ] Sign in, load orders, and run a Market Probe scan on the live domain before announcing
