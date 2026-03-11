# New Eden Trade Lab

Independent EVE Online trade tools hosted as a static GitHub Pages site. Everything runs client-side in plain HTML, CSS, and JavaScript.

---

## What's in this repo

| File | What it is |
|---|---|
| `index.html` | Homepage for New Eden Trade Lab |
| `EveOrders.html` | Orders dashboard for active personal and corp market orders |
| `eve-multisell.html` | Multi Sell Pricer for initial sell listing workflows |

---

## Orders Dashboard (`EveOrders.html`)

### What it does

Shows active personal and corporation market orders, highlights undercuts, estimates sell pace, and supports quick repricing workflows.

### Key features

- Multi-account sign-in and account switching
- Personal and corp order visibility
- Live undercut detection
- Sell pace signal with configurable pace days
- Owner filtering including **Active Character**
- Item search filter
- Sortable **Order Age** column
- **Oldest Active** stat card
- Presets with favorite quick-access chips
- Compact mode, column toggles, and wallet widgets

### Order age behavior

- Age is tracked per `order_id` in local storage (`eve_order_age_index_v1`)
- Uses the oldest seen issued timestamp for each order id
- If an order disappears, it is retained for a 48-hour grace period
- Missing entries older than 48 hours are pruned automatically

### Presets

- Presets are saved in local storage (`eve_filter_presets_v1`)
- Saved fields include filters, search, sort, undercut scope, ticks, pace days, and compact mode
- Presets can be favorited or unfavorited
- Favorited presets appear in a quick-access toolbar strip

---

## Multi Sell Pricer (`eve-multisell.html`)

### What it does

Takes a pasted EVE Multi Sell export and calculates suggested sell prices from live market data at the selected station.

### How to use

1. In EVE, select items and open **Sell Items (n)**
2. Click **Export** in the sell window
3. Paste into the tool
4. Choose **Selling At** station
5. Optionally choose **Bought From** station
6. Click **Fetch Prices**
7. Review flags and optional overrides
8. Click **Copy All** and paste into EVE **Import Prices...**

### Notes

- Runs fully client-side with no backend
- Uses EVE ESI market endpoints
- Falls back to Jita or Amarr with markup when target station has no sells

---

## Technical notes

- No build step, no framework, and no package dependencies
- Safe for GitHub Pages static hosting
- Data persistence uses browser `localStorage`
- Branding and legal copy are set up for independent third-party community use

