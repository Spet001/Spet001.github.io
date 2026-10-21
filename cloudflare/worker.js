/**
 * Spet01.dev Edge Gateway & API Backend (Cloudflare Worker)
 * 
 * Handles:
 * 1. 301 Permanent Redirects for legacy renamed URLs (e.g. /journal/shame_for_the_leakers -> /journal/Document-Explaining-Leaks/)
 * 2. Strict MIME-type & CORS headers for AI crawlers (llm.txt, llms.txt, robots.txt, sitemap.xml)
 * 3. Portfolio API routes (visit counter, journal views, mascot AI chat proxy, Patreon OAuth)
 * 4. Origin proxying to GitHub Pages with edge caching
 */

const ORIGIN_HOST = 'spet001.github.io';
const CANONICAL_HOST = 'spet01.dev';

// Permanent 301 URL Aliases & Legacy Backlink Mappings
const REDIRECTS = new Map([
  ['/journal/shame_for_the_leakers', '/journal/Document-Explaining-Leaks/'],
  ['/journal/shame_for_the_leakers/', '/journal/Document-Explaining-Leaks/'],
  ['/journal/UWPCOD-GDK-DLC-Unlocker', '/journal/UWP-GDK-Sandbox-Entitlement-Analysis/'],
  ['/journal/UWPCOD-GDK-DLC-Unlocker/', '/journal/UWP-GDK-Sandbox-Entitlement-Analysis/'],
  ['/tools/tool_image_to_3d', '/tools/image-to-3d/'],
  ['/tools/tool_image_to_3d/', '/tools/image-to-3d/'],
  ['/tools/tool_quick_3d_studio', '/tools/image-to-3d/'],
  ['/tools/tool_quick_3d_studio/', '/tools/image-to-3d/'],
]);

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);
    const pathname = url.pathname;

    // 1. Handle HTTP 301 Legacy Redirects
    if (REDIRECTS.has(pathname)) {
      const targetUrl = new URL(REDIRECTS.get(pathname), `https://${CANONICAL_HOST}`);
      return Response.redirect(targetUrl.toString(), 301);
    }

    // 2. Normalize llms.txt -> serve llm.txt or mirror
    if (pathname === '/llms.txt') {
      const llmUrl = new URL('/llm.txt', request.url);
      const response = await fetch(llmUrl, request);
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
      return new Response(response.body, { status: response.status, headers });
    }

    // 3. Explicit Headers for AI Crawlers and Search Indexers (*.txt, *.xml)
    if (pathname.endsWith('.txt') || pathname === '/robots.txt' || pathname === '/llm.txt') {
      const response = await fetch(request);
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'text/plain; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('X-Robots-Tag', 'all');
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
      return new Response(response.body, { status: response.status, headers });
    }

    if (pathname.endsWith('.xml') || pathname === '/sitemap.xml') {
      const response = await fetch(request);
      const headers = new Headers(response.headers);
      headers.set('Content-Type', 'application/xml; charset=utf-8');
      headers.set('Access-Control-Allow-Origin', '*');
      headers.set('X-Robots-Tag', 'all');
      headers.set('Cache-Control', 'public, max-age=3600, s-maxage=86400');
      return new Response(response.body, { status: response.status, headers });
    }

    // 4. API Endpoints (KV counters, mascot chat, Patreon)
    if (pathname.startsWith('/api/')) {
      // Handle CORS Preflight
      if (request.method === 'OPTIONS') {
        return new Response(null, {
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Access-Control-Allow-Methods': 'GET, POST, OPTIONS',
            'Access-Control-Allow-Headers': 'Content-Type, Authorization',
            'Access-Control-Max-Age': '86400',
          },
        });
      }

      // Handle Visit Tracking
      if (pathname === '/api/visit') {
        try {
          let count = 1;
          if (env && env.PORTFOLIO_KV) {
            const current = await env.PORTFOLIO_KV.get('total_visits');
            count = (current ? parseInt(current, 10) : 0) + 1;
            await env.PORTFOLIO_KV.put('total_visits', count.toString());
          }
          return new Response(JSON.stringify({ success: true, visits: count }), {
            headers: {
              'Content-Type': 'application/json',
              'Access-Control-Allow-Origin': '*',
            },
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
      }

      // Handle Journal View Counters
      if (pathname === '/api/journal/view' && request.method === 'POST') {
        try {
          const body = await request.json().catch(() => ({}));
          const slug = body.slug || 'unknown';
          let views = 1;
          if (env && env.PORTFOLIO_KV) {
            const key = `journal_views_${slug}`;
            const current = await env.PORTFOLIO_KV.get(key);
            views = (current ? parseInt(current, 10) : 0) + 1;
            await env.PORTFOLIO_KV.put(key, views.toString());
          }
          return new Response(JSON.stringify({ success: true, slug, views }), {
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        } catch (err) {
          return new Response(JSON.stringify({ error: err.message }), {
            status: 500,
            headers: { 'Content-Type': 'application/json', 'Access-Control-Allow-Origin': '*' },
          });
        }
      }
    }

    // 5. Default Pass-Through with Security & Caching Headers
    const response = await fetch(request);
    const headers = new Headers(response.headers);
    headers.set('X-Content-Type-Options', 'nosniff');
    headers.set('Referrer-Policy', 'strict-origin-when-cross-origin');

    return new Response(response.body, {
      status: response.status,
      statusText: response.statusText,
      headers,
    });
  },
};
