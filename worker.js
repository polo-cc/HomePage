// Cloudflare Worker Entry: DrToB Systems, Inc. (San Francisco, CA)
import htmlContent from './index.html';

export default {
  async fetch(request, env, ctx) {
    const url = new URL(request.url);

    // Mock API Endpoint for Developer Playground
    if (url.pathname === '/v1/consensus/orchestrate' && request.method === 'POST') {
      return new Response(JSON.stringify({
        status: "COMMITTED",
        task_id: "drtob_task_" + Math.random().toString(36).substring(2, 9),
        execution_trace: {
          latency_p95_ms: 16.8,
          quorum: "3/3_AGENTS_ATTESTED",
          hardware_enclave: "AMD_SEV_SNP_VERIFIED",
          sha256_proof: "0x89f41b9921e4a77bc89d201cba64f8"
        }
      }), {
        headers: {
          'content-type': 'application/json',
          'access-control-allow-origin': '*',
          'cache-control': 'no-store'
        }
      });
    }

    // Static Assets binding for Cloudflare Workers
    if (env.ASSETS) {
      const response = await env.ASSETS.fetch(request);
      if (response.status !== 404) {
        return response;
      }
    }

    // Return HTML with Cache Busting Headers (Never cache in development)
    return new Response(htmlContent, {
      headers: {
        'content-type': 'text/html;charset=UTF-8',
        'cache-control': 'no-store, no-cache, must-revalidate, max-age=0',
        'pragma': 'no-cache',
        'x-content-type-options': 'nosniff',
        'x-frame-options': 'DENY',
        'x-powered-by': 'DrToB-Edge-Kernel',
      }
    });
  },
};
