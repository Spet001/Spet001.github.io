# Quick Entry: Having a Backend on a Static Website with Cloudflare Workers!

Usually, when you host a portfolio on GitHub Pages, it's 100% static. That means no database, no private API keys, and definitely no dynamic server-side logic. 

But what if you want to implement features like a **Visitor Counter** or a **Secure OAuth Login** (like Google,Patreon) without paying for a dedicated VPS or Heroku dyno?

Enter **Cloudflare Workers**.

## The Magic of Edge Computing

Cloudflare Workers allow you to run serverless JavaScript code at the "edge" of the network (right in Cloudflare's CDN servers around the world). Because they sit between the visitor and your GitHub Pages host, you can intercept requests, manipulate headers, or create entirely new API endpoints on a custom subdomain like `api.yourdomain.workers.dev`.

### 1. The Patreon OAuth Flow (Hiding Secret Content)
On this very portfolio, some Journal entries are exclusive to Patrons. But how do you securely lock content on a static site? If you just hide it with CSS or JavaScript, anyone can inspect the source code and read it.

By using a Cloudflare Worker, I created a tiny backend that handles the Patreon OAuth 2.0 flow:
1. When you click "Log in with Patreon", the site redirects you to the Patreon authorization page.
2. Patreon redirects you back with a temporary `code`.
3. The frontend sends this `code` to the Cloudflare Worker.
4. **The Worker**, holding the private `CLIENT_SECRET` in its secure environment, validates the code with Patreon's servers.
5. If valid, the Worker returns the *actual encrypted Markdown content* to the frontend.

Since the secret markdown texts are stored entirely inside the Worker's code and are only transmitted *after* a successful server-side check, the static frontend is completely safe!

### 2. AdBlock-Immune Visitor Counter
I also wanted a simple visitor counter that couldn't be blocked by uBlock Origin or Brave's shields (which aggressively block Google Analytics and plausible).

Using Cloudflare's **KV Namespace** (a simple key-value database), I added a `/api/visit` route to my Worker. 
When the portfolio's Footer loads, it silently fetches this route. The Worker increments the `total_visits` key in the KV store, and simultaneously fires a Discord Webhook containing the visitor's generic ASN/Country data using `ctx.waitUntil()` (which ensures the request doesn't slow down the page load).

```javascript
// Example of how easy it is to track visits on the Edge
let currentVisits = await env.METRICS_KV.get("total_visits");
currentVisits = currentVisits ? parseInt(currentVisits) + 1 : 1;
ctx.waitUntil(env.METRICS_KV.put("total_visits", currentVisits.toString()));
```

## How You Can Do It Too

If you have a static site, you don't need a bloated Express.js server:
1. Create a free account on [Cloudflare](https://dash.cloudflare.com/).
2. Navigate to **Workers & Pages**.
3. Click **Create Worker**. You get a generous free tier of 100,000 requests per day!
4. Write your API logic in simple JavaScript (Fetch API).
5. Add your secrets in **Settings > Variables**, bind a KV database if you need storage, and deploy.
6. Call your new `your-worker.workers.dev/api/something` from your static frontend!

Serverless architecture at the edge is incredibly powerful for injecting dynamic life into otherwise flat, static web deployments!
