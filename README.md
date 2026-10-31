# Wormzilla Live Finder

Real YouTube LIVE search, optional Twitch integration, and clearly labeled external searches for TikTok, Facebook, and Kick.

## Requirements
Node.js 20+, npm, a YouTube Data API v3 key. Optional Twitch Client ID and Client Secret.

## Run locally
```bash
npm install
cp .env.example .env.local
# Fill YOUTUBE_API_KEY in .env.local
npm run dev
```
Open http://localhost:3000.

## Get YouTube API key
1. Visit https://console.cloud.google.com/ and create/select a project.
2. Enable **YouTube Data API v3** in APIs & Services > Library.
3. Go to Credentials > Create Credentials > API key.
4. Restrict the key to YouTube Data API v3. For server-side API keys, use appropriate API restrictions; browser referrer restrictions are not suitable for server-side requests.
5. Add `YOUTUBE_API_KEY` to `.env.local` and to Vercel project environment variables. Never commit `.env.local`.

## Deploy via GitHub and Vercel
1. Create an empty GitHub repository named `wormzilla-live-finder`.
2. From this project directory run:
```bash
git init
git add .
git commit -m "Initial Wormzilla Live Finder"
git branch -M main
git remote add origin https://github.com/YOUR_USERNAME/wormzilla-live-finder.git
git push -u origin main
```
3. At https://vercel.com/new select **Import Git Repository**, authorize GitHub and choose the repository.
4. Set Framework Preset **Next.js**. Under Environment Variables add `YOUTUBE_API_KEY`, and optionally `TWITCH_CLIENT_ID`, `TWITCH_CLIENT_SECRET`.
5. Click Deploy. Open the generated `*.vercel.app` URL in Chrome on your phone.
6. Future pushes to `main` trigger deployments. If environment variables change, redeploy.

## API
`GET /api/search?query=wormzilla&country=VN&platform=youtube`
Country: `VN`, `ID`, `TH`, `GLOBAL`; platform: `youtube`, `twitch`, `tiktok`, `facebook`, `kick`, `all`.

`streams` contains only verified active public livestreams. `platforms` reports `ok`, `unsupported`, `not_configured`, `error`, `quota_exceeded`, or `rate_limited`.

## Notes and limitations
- YouTube `search.list` costs **100 quota units per keyword**; the six Vietnam variants can use **600 units per uncached search**, plus additional `videos.list` and `channels.list` requests. Default quota is commonly 10,000 units/day. Restrict usage and consider reducing variants for public high-traffic deployments.
- The 60-second in-memory cache and IP rate limiter are **best-effort per serverless instance**; Vercel instances do not share memory. For production abuse protection, use a shared store / edge rate limiting. CDN caching can also vary by deployment.
- Searches can miss streams that YouTube has not indexed yet. Verification reflects API data at request time, not a continuously open stream connection.
- Country is not geolocation. `Verified` means public channel country metadata matches the label; `Likely` uses language/title hints. Unknown is shown when evidence is insufficient. Twitch does not expose reliable broadcaster country here.
- Twitch requires both credentials; search only yields active matching channels and then verifies through Helix streams.
- TikTok, Facebook, and Kick are **not integrated**. External links are not verified livestream results.
- This MVP does not use a database, does not scrape sites, and does not expose credentials to the browser.
