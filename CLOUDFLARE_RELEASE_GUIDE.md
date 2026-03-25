# Cloudflare Release Guide

This is the simple setup path for putting this site on Cloudflare Pages and using KV to control who can open Market Probe.

## Access rules

Market Probe now checks Cloudflare KV for either of these keys:

- `market-probe:char:123456789`
- `market-probe:corp:987654321`

If either key exists, that pilot is allowed into Market Probe.

## 1. Create the KV namespaces

Run these in this project folder:

```powershell
npx wrangler kv:namespace create ACCESS_KV
npx wrangler kv:namespace create ACCESS_KV --preview
```

Paste the returned IDs into [`wrangler.toml`](/C:/Users/garci/OneDrive/Documents/Eve tools Web v2/wrangler.toml).

## 2. Cloudflare Pages project settings

Use these values in Cloudflare Pages:

- Build command: `npm run build`
- Output directory: `dist`
- Node version: `18` or newer

The `functions/` folder will be deployed automatically with the site.

## 3. EVE OAuth callback URL

Your EVE app must use the exact production callback:

```text
https://YOUR-DOMAIN.com/oauth/callback
```

Keep local dev on:

```text
http://localhost:8080/oauth/callback
```

## 4. Add allow rules to KV

Allow one pilot:

```powershell
npx wrangler kv:key put --binding ACCESS_KV "market-probe:char:123456789" "{\"note\":\"Pilot access\"}"
```

Allow one corporation:

```powershell
npx wrangler kv:key put --binding ACCESS_KV "market-probe:corp:987654321" "{\"note\":\"Corp access\"}"
```

## 5. Deploy

If Cloudflare Pages is connected to your repo, push your changes.

If you want a manual deploy from your machine:

```powershell
npm run cf:deploy
```

## 6. Test after deploy

1. Open `/market-probe.html`
2. Sign in with an allowed character
3. Confirm Market Probe unlocks
4. Sign in with a denied character
5. Confirm the denied page shows the character ID and corporation ID

## Useful commands

List keys:

```powershell
npx wrangler kv:key list --binding ACCESS_KV
```

Delete a pilot rule:

```powershell
npx wrangler kv:key delete --binding ACCESS_KV "market-probe:char:123456789"
```

Delete a corp rule:

```powershell
npx wrangler kv:key delete --binding ACCESS_KV "market-probe:corp:987654321"
```

## Important note

This is a solid release step for Market Probe access control, but it does not make the whole site a fully private backend app. If you later want hard server-enforced protection for every page request, the next step would be signed sessions or Cloudflare Access in front of the app.
