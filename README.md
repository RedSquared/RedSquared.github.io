# RedSquared.github.io

A small collection of browser-based tools, hosted on GitHub Pages. No installs, no accounts — just open a page and use it.

---

## What's in this repo

| File | What it is |
|---|---|
| `index.html` | The homepage — lists all available tools with descriptions |
| `eve-multisell.html` | The EVE Multi Sell Pricer tool (see below) |

---

## EVE Multi Sell Pricer (`eve-multisell.html`)

### What it does

When you're selling a bunch of items in EVE Online, this tool looks up the current market prices at whichever trade hub you pick and calculates the best price to list each item at — just slightly undercut from the cheapest existing seller so your listings move faster.

You paste in an export from EVE's sell window, click a button, and get back a formatted list of prices you can paste straight back into EVE.

### How to use it (as a player)

1. In EVE, select the items you want to sell
2. Right-click → **Sell Items (n)**
3. In the sell window, click the **Export** button — this copies tab-separated data to your clipboard
4. Open the tool and paste into the text box
5. Choose where you're selling (**Selling At** dropdown)
6. Optionally choose where you bought the items (**Bought From**) — the tool will warn you if selling back there would be more profitable
7. Click **Fetch Prices** — it pulls live data from the EVE market API
8. Review the results table; override any price you want to change manually
9. Click **Copy All** at the bottom
10. Back in EVE: open the Multi Sell window → **Import Prices…** → paste

### The results table explained

| Column | What it means |
|---|---|
| **Lowest Sell** | The cheapest active sell order at your station right now |
| **Age** | How old that order is — very old orders may be "ghost listings" that never sell |
| **2nd Lowest** | The next cheapest order — useful for spotting when someone is way underpriced |
| **Highest Buy** | The best buy order at your station — your hard price floor (you never want to sell below this) |
| **Your Price** | The recommended sell price: lowest sell minus a small undercut |
| **Total ISK** | Your Price × quantity |
| **Override** | Type a custom price here to ignore the calculated one |
| **Flags** | Warnings if something looks off (see below) |

### Flags / warnings

| Flag | What it means |
|---|---|
| **✓ Clear** | No issues — price looks good |
| **Fills Buy Order** | Your calculated price would accidentally sell into a buy order (auto-corrected, but worth checking) |
| **Near Buy Order** | Price is uncomfortably close to the buy floor — nudged up automatically |
| **Large Price Gap** | The cheapest and 2nd cheapest sellers are far apart — you might make more by buying out the low listing and relisting higher |
| **Better at [Station]** | You'd make more ISK by selling at the station you bought from instead |
| **[Hub] +X%** | No orders at your station — price is based on Jita or Amarr with your markup added |
| **No Orders** | No data found anywhere — price can't be calculated |

### Settings (the ⚙ button)

| Setting | What it does | Default |
|---|---|---|
| **Undercut Ticks** | How many "price ticks" to go below the lowest seller (1 tick = the minimum price increment for that item's value range) | 2 |
| **Markup %** | When falling back to Jita/Amarr pricing, how much extra to add on top | 25% |
| **Gap Threshold** | How many ticks apart the 1st and 2nd sellers need to be before a "Large Price Gap" warning fires | 10 |
| **Buy Floor Buffer %** | Safety cushion above the highest buy order — your price won't go below (buy price × (1 + buffer)) | 3% |

### Reset vs Clear

- **Clear** — wipes the pasted item list only; your station selection stays
- **Reset** — clears everything including station selections and closes settings

---

## How it works (technical short version)

The tool is a single self-contained HTML file. There's no backend — everything runs in your browser.

- Market data comes from the **EVE ESI** (the official EVE Online public API) — no login required
- Prices are fetched live each time you click Fetch Prices
- If a station has no orders for an item, it falls back to Jita, then Amarr, and applies your markup %
- Nothing is stored or sent anywhere except to the ESI API to read market data

---

## Want to add or change a station?

Look for this block in `eve-multisell.html` (it appears twice — once for "Selling At" and once for "Bought From"):

```html
<option value="60003760" data-region="10000002" data-short="Jita">Jita IV - Moon 4 - Caldari Navy Assembly Plant</option>
