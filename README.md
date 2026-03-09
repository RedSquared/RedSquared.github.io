# RedSquared.github.io

A small collection of browser-based tools hosted on GitHub Pages. Everything runs client-side in plain HTML/CSS/JS.

---

## What's in this repo

| File | What it is |
|---|---|
| `index.html` | Homepage with links to all tools |
| `EveOrders.html` | EVE Orders dashboard (auth + character/corp order management) |
| `eve-multisell.html` | EVE Multi Sell Pricer |

---

## EVE Orders Dashboard (`EveOrders.html`)

### What it does

Shows your active personal and corporation market orders, highlights undercuts, estimates sell pace, and gives quick repricing workflow support (copy suggested price + open market window).

### Key features

- Multi-account sign-in and account switching
- Personal + corp order visibility (role-gated for corp)
- Live undercut detection (station or region scope)
- Sell pace signal with configurable pace days
- Owner filtering including **Active Character**
- Item search filter (case-insensitive)
- Sortable **Order Age** column
- **Oldest Active** stat card
- Presets (save/apply/delete)
- Favorited presets surfaced as quick chips next to filters
- Compact mode, column toggles, and wallet summary cards

### Order age behavior

- Age is tracked per `order_id` in local storage (`eve_order_age_index_v1`)
- Uses oldest seen issued timestamp for that order id
- If an order disappears, it is retained for a 48-hour grace period
- Missing entries older than 48 hours are pruned automatically

### Presets

- Presets are saved in local storage (`eve_filter_presets_v1`)
- Saved fields include filters, search, sort, undercut scope/ticks, pace days, and compact mode
- Presets can be favorited/unfavorited
- Favorited presets appear in a quick-access toolbar strip

---

## EVE Multi Sell Pricer (`eve-multisell.html`)

### What it does

Takes a pasted EVE Multi Sell export and calculates suggested sell prices from live market data at the station you choose.

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

- Runs fully client-side; no backend
- Uses EVE ESI market endpoints
- Falls back to Jita/Amarr with markup when target station has no sells

---

## Technical notes

- No build step, no framework, no package dependencies
- Safe for GitHub Pages static hosting
- Data persistence uses browser `localStorage`
