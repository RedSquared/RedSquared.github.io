# New Eden Trade Lab — User Guide

Tools for active EVE Online market traders. No installs, no spreadsheets — just open the site, sign in with your EVE character, and go.

**Site:** https://newedentradelab.com

---

## Table of Contents

1. [Getting Started — First Login](#1-getting-started--first-login)
2. [EVE Orders](#2-eve-orders)
3. [Multi Sell Pricer](#3-multi-sell-pricer)
4. [Market Probe](#4-market-probe)
5. [Tips & Common Questions](#5-tips--common-questions)

---

## 1. Getting Started — First Login

**Step 1:** Open any tool and click **Sign In with EVE Online**.

**Step 2:** You'll be taken to EVE's login page. Log in and approve the access request.

**Step 3:** You'll be redirected back to the tool automatically. Your character name appears in the top bar — you're in.

### Multiple Characters

Click **Add Character** in the slide-out menu to add additional accounts. Once added, you can switch between characters using the dropdown in the header. Each character's data is stored separately.

### Access Denied?

If you see "Standing Too Low to Dock" after logging in, your character isn't on the access list. Your character ID is shown on that page — send it to the site owner to be added.

---

## 2. EVE Orders

**Purpose:** See all your active market orders across characters and stations. Instantly spot undercuts, track sell pace, and copy the right price to your clipboard — all without leaving your browser.

---

### Refreshing Orders

Orders do **not** auto-refresh. Click the **Refresh Orders** button to pull the latest data from EVE. There's a 6-minute cooldown between refreshes to respect ESI rate limits. The last refresh time is shown next to the button.

When you return to the page, your previous order snapshot loads from cache automatically — no waiting required.

---

### Reading the Table

| Column | What it means |
|--------|---------------|
| **Copy** | Copies the suggested undercut price to clipboard and opens the item's market window in EVE |
| **Item** | Item name |
| **Type** | Sell or Buy order |
| **Status** | Best Price / Undercut / Dupes (see below) |
| **Sell Pace** | Units ahead of you ÷ avg daily sales — e.g. "24 / 3d" means 24 units ahead selling at ~8/day |
| **Unit Price** | Your current order price |
| **Qty** | Units remaining on your order |
| **Order Total** | Unit Price × Qty |
| **Undercut Total** | ISK gap between your price and the current best, multiplied by your remaining quantity |
| **Location** | Station or structure name |
| **Owner** | Character or corporation that placed the order |
| **Order Age** | Days since this order was first placed (tracked locally) |
| **Expires** | When the order expires |

### Order Status Indicators

| Status | Meaning |
|--------|---------|
| 🟢 **Best Price** | You have the lowest (sell) or highest (buy) price — you're first in queue |
| 🟡 **Undercut** | Someone has a better price than you — you're losing queue position |
| 🔴 **Dupes** | Multiple orders at the exact same price — tied for position |
| ⚪ **Loading** | Undercut check still fetching live market data |

---

### The Copy Button

Clicking **Copy** does two things at once:

1. **Copies the suggested undercut price** to your clipboard — paste it directly into the EVE market window price field.
2. **Opens the item's market window in-game** — so you land right on the correct item without searching.

The button turns green with a checkmark for 15 seconds so you can see where you are in your list while working through updates.

> **Requires:** EVE client must be running and logged in. If the button turns orange, your login session needs to be refreshed (click Sign In again to re-authorise).

---

### Filtering Orders

Use the filter bar above the table to narrow down what you see:

- **Type** — All / Sell / Buy
- **Source** — All / Personal / Corp
- **Status** — All / Best Price / Undercut / Dupes
- **Owner** — All owners / Active character / individual character names
- **Search** — Filter by item name (partial match, case-insensitive)
- **Location chips** — Click any station chip below the filter bar to show only orders at that location. Click again to deselect.

Click **Reset** to clear all active filters at once.

---

### Sorting

Click any column header to sort by that column. Click again to reverse the order.

---

### Stats Bar

The bar at the top of the page shows a quick summary for the active character:

- **Wallet** — Personal ISK balance
- **Corp Wallet** — Corp wallet balance (select division via the dropdown; requires Accountant role in EVE)
- **Free Slots** — Remaining market order slots based on your skills
- **Oldest Order** — The age of your oldest active order
- **Undercut summary** — Count of undercut orders and total ISK exposure

---

### Settings Menu

Open the slide-out menu (hamburger icon) to access settings:

| Setting | Description |
|---------|-------------|
| **Undercut Scope** | **Station** — compare only against orders at the same station. **Region** — compare against the best price in the entire region |
| **Undercut Ticks** | How many 0.01 ISK increments to move below the current best price (default: 1) |
| **Pace Days** | How many days of history to use for the Sell Pace calculation (1–90, default: 7) |
| **Columns** | Toggle any column on or off |
| **Compact Mode** | Reduces row height and hides icons — fits more orders on screen |
| **Local / EVE Clock** | Current time in your local timezone and EVE time (UTC) |

---

### Presets

Presets let you save your current filter configuration under a name and reload it later.

- **Save:** Set your filters, then click **Save Preset** in the menu and give it a name.
- **Load:** Click any preset name in the menu to apply it instantly.
- **Favourite:** Star a preset to pin it to the top of the list.
- **Delete:** Select a preset and click Delete to remove it.

Useful for switching between "Sell orders only at Jita" and "All corp orders" with one click.

---

### Corporation Orders

If your character has the **Accountant** or **Junior Accountant** role in their corporation, corporation orders will appear alongside personal orders. Set **Source** to **Corp** to see only corp orders.

Corp wallet balances appear in the stats bar when the corp scope is active. Use the division dropdown to switch between wallet divisions.

---

### Order Age

Order age is tracked from the **first time** the order was seen in New Eden Trade Lab — not from when EVE says the order was created. This means the age survives EVE server resets that change order IDs, giving you a consistent "how long has this been sitting here" view.

Orders that disappear (sold, cancelled, or expired) are removed from tracking after 48 hours.

---

## 3. Multi Sell Pricer

**Purpose:** Quickly price a batch of items before opening the EVE sell dialog. Export your items from EVE, paste them in, fetch prices, review, and copy a ready-to-import price list back into EVE.

---

### Workflow

**Step 1 — Export from EVE**

In the EVE client:
1. Open your inventory or hangar
2. Select the items you want to price (Ctrl+A to select all)
3. Right-click → **Sell Items**
4. In the sell dialog, click **Export**
5. Copy the exported text

**Step 2 — Paste**

Paste the exported text into the large text box on the Multi Sell page. The item count updates immediately.

**Step 3 — Choose your station**

Select where you're selling from the **Selling At** dropdown:
- Jita (Perimeter 4-4 / NPC), Amarr, Dodixie, Rens, Hek, Thera

Optionally set **Bought From** if you bought the items at a different hub — this is used for fallback pricing when no data exists at your sell station.

**Step 4 — Fetch prices**

Click **Fetch Prices**. A progress bar shows which item is being priced and how many remain. Prices appear row by row as they resolve.

**Step 5 — Review**

Check the results table for flags (see below) and override any prices you disagree with by typing in the **Override** column.

**Step 6 — Copy and import**

Click **Copy All** to copy the formatted price list. In EVE, open the sell dialog and click **Import Prices** → paste.

---

### Results Table

| Column | Description |
|--------|-------------|
| **Item** | Item name |
| **Qty** | Quantity from your export |
| **Lowest Sell** | Cheapest listing at your chosen station |
| **Age** | How old that listing is (colour-coded: 🟢 fresh / 🟡 mid / 🔴 stale) |
| **2nd Lowest** | Next cheapest listing (useful when the lowest looks like a ghost order) |
| **Age** | Age of the 2nd listing |
| **Highest Buy** | Highest buy order — your hard price floor |
| **Your Price** | Calculated suggested price |
| **Total ISK** | Your Price × Qty |
| **Override** | Type a custom price here; Total ISK updates live |
| **Flags** | Warnings (see below) |

---

### Understanding Flags

| Flag | Colour | Meaning |
|------|--------|---------|
| `gap` | 🟡 Yellow | Large spread between the 1st and 2nd lowest sell orders. The cheapest listing might be a ghost order — consider pricing below the 2nd lowest instead |
| `stale` | 🟡 Yellow | The cheapest listing is very old. It may not represent real competition |
| `buy-floor` | 🔴 Red | Your calculated price would be below the highest buy order. The price has been raised to the buy floor — don't sell below this or a buyer instantly profits |
| `no-data` | 🔴 Red | No sell orders found at your station. A fallback price from Jita or Amarr was used |

---

### Settings

Open the menu to adjust pricing behaviour:

| Setting | Description | Default |
|---------|-------------|---------|
| **Undercut Ticks** | How many 0.01 ISK steps below the lowest sell to price | 2 |
| **Markup %** | Percentage to mark up the fallback price when using Jita/Amarr data for a different station | 25% |
| **Gap Threshold %** | Spread between 1st and 2nd sell orders that triggers the `gap` flag | 7.5% |
| **Buy Floor Buffer %** | Extra margin above buy orders — never price below (highest buy × (1 + buffer)) | 3% |

---

## 4. Market Probe

**Purpose:** Scan multiple trade hubs simultaneously for arbitrage — items priced below their value at another hub that you can buy and relist for profit.

---

### How It Works

Market Probe fetches sell orders from all your selected regions, then for each item it finds:

1. **Buy price** — the lowest sell order price at that hub (what you'd pay to buy it)
2. **Relist price** — the lowest sell price at the best other hub (what you'd sell it for)
3. **Profit** — `(relist × (1 − sales tax)) − (buy × (1 + broker fee))`

Items above your minimum profit and volume thresholds appear in the results table.

---

### Starting a Scan

Click **Scan Now**. The status bar shows scan progress. Results appear as they come in — you don't need to wait for the full scan to finish.

Click **⏸ Pause** to stop the auto-scan countdown without stopping the current scan. Click again to resume.

---

### Reading the Results Table

| Column | Description |
|--------|-------------|
| **In Game** | Check this box to mark a deal as purchased — it fades out so you don't act on it twice |
| **Region** | Which hub this deal was found at (where to buy) |
| **Item** | Item name |
| **Category** | Item category (Ships, Modules, Resources, etc.) |
| **Group** | Item group within the category |
| **Buy Price** | Lowest sell order at this hub — what you pay |
| **Relist Price** | Best sell price at the alternative hub — what you'll list at |
| **Profit / Unit** | ISK profit per unit after fees |
| **Profit %** | Margin percentage |
| **Total Profit** | Profit / Unit × Volume |
| **Volume** | Units available at the buy price |

Click any column header to sort. Click again to reverse.

---

### Region Tabs

Use the tabs above the table to filter results to a single hub, or select **All** to see everything. This doesn't re-scan — it's a local filter on your existing results.

---

### Auto-Scan

Market Probe automatically re-scans on a timer so you always have fresh data. The countdown is shown in the header.

To change the interval: open the menu → **Settings** → set Minutes and Seconds → click Save. Default is 10 minutes.

---

### Columns

On smaller or half-screen windows, toggle off columns you don't need. Open the menu → **Columns** and uncheck any column. The table scrolls horizontally if the content is wider than the screen — you can always scroll to see everything.

---

### Filters

Open the menu → **Filters** to narrow results:

- **Min Profit** — minimum ISK profit per deal (or % margin if Profit Mode is set to %)
- **Min Volume** — minimum units available at the buy price
- **Profit Mode** — switch between ISK total and % margin for the minimum profit filter

Open the menu → **Categories** to filter by item type. Expand any category to check or uncheck individual groups.

---

### Settings

| Setting | Description | Default |
|---------|-------------|---------|
| **Broker Fee %** | Your broker fee at the buy hub | 3% |
| **Sales Tax %** | Your sales tax at the relist hub | 8% |
| **Auto-Scan Interval** | How often to re-scan (minutes + seconds) | 10 min |

Broker fee and sales tax affect all profit calculations. Set them to match your actual character skills and standings for accurate numbers.

---

### Scan Regions

Open the menu → **Scan Regions** to choose which hubs to include. Check or uncheck any hub. Changes take effect on the next scan.

---

### Characters

Adding an EVE character to Market Probe enables the **Open in Game** feature — clicking an item's name opens the market window in the EVE client directly.

Click **Add EVE Character** in the Characters section of the menu. You can link a character to a specific region so the right account is used when opening in-game windows.

---

## 5. Tips & Common Questions

**Why does the Copy button in EVE Orders open a market window in EVE?**
That's intentional. Copying a price and manually finding the item in the market takes time. The button does both at once so you can work through your order list faster.

---

**My orders say "Best Price" but I'm still getting undercut.**
Check your Undercut Scope setting. If it's set to **Station**, the tool only compares prices at your exact station. Set it to **Region** to check the entire region for better-priced competition.

---

**I added a character but no orders are showing.**
Orders don't load automatically. Click **Refresh Orders** to pull the latest data. The very first load always requires a manual refresh.

---

**Market Probe isn't showing any results.**
Check the Filters menu — your minimum profit or volume settings might be filtering everything out. Try setting Min Profit to 0 and Min Volume to 1 to see all deals, then raise the thresholds from there.

---

**A location shows as "Unknown Structure" or "Unknown Structure (no access)".**
That's a player-owned structure. Resolving its name requires docking access — if your character doesn't have it (or if no character is logged in), the name can't be fetched. Your order is still tracked correctly; only the display name is missing.

---

**Corp orders aren't showing up.**
You need the **Accountant** or **Junior Accountant** role in your corporation. Without it, the ESI API doesn't return corp order data. Contact your corp leadership to have the role assigned.

---

**Sell Pace shows a very high number.**
Sell Pace is "units ahead of you / average daily sales at that station." A high number means a lot of competition ahead of you relative to how fast the item sells — the item might move slowly or the market is very crowded. Consider whether it's worth updating your price.

---

**Can I use this on mobile?**
The tools are designed for desktop use. They work on large tablets in landscape, but the order tables have many columns and work best on a full-width screen.

---

**The site is asking for access to my wallet and skills. Is that safe?**
The site uses EVE's official OAuth login — your password is never entered here. The wallet scope is read-only (it can't move ISK), and skills are read-only too. The site cannot modify your orders, wallet, or character in any way other than opening market windows in the EVE client.
