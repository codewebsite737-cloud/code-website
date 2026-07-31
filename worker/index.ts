/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  DB: D1Database;
  AI_DAILY_LIMIT?: string;
  OPENROUTER_API_KEY?: string;
  OPENROUTER_MODEL?: string;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

// Image security config. SVG sources with .svg extension auto-skip the
// optimization endpoint on the client side (served directly, no proxy).
// To route SVGs through the optimizer (with security headers), set
// dangerouslyAllowSVG: true in next.config.js and uncomment below:
// const imageConfig: ImageConfig = { dangerouslyAllowSVG: true };

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    globalThis.__SKYCODE_D1__ = env?.DB;
    globalThis.__SKYCODE_AI_CONFIG__ = {
      dailyLimit: env?.AI_DAILY_LIMIT,
      openRouterApiKey: env?.OPENROUTER_API_KEY,
      openRouterModel: env?.OPENROUTER_MODEL,
    };

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      const imageResponse = await handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
      return withSecurityHeaders(request, imageResponse);
    }

    const isStaticAsset =
      url.pathname.startsWith("/assets/") ||
      url.pathname.startsWith("/_vinext/") ||
      /\.(css|js|json|svg|png|jpg|jpeg|gif|ico|woff|woff2|ttf|eot)$/i.test(url.pathname);

    if (isStaticAsset && env?.ASSETS) {
      try {
        const assetResponse = await env.ASSETS.fetch(new Request(request.url));
        if (assetResponse && assetResponse.status >= 200 && assetResponse.status < 400) {
          return withSecurityHeaders(request, assetResponse);
        }
      } catch {
        // Continue to app handler if asset fetch fails
      }
    }

    try {
      const response = await handler.fetch(request, env, ctx);
      if (response) {
        return withSecurityHeaders(request, response);
      }
    } catch (error) {
      console.error("App handler fetch error:", error);
    }

    if (env?.ASSETS) {
      try {
        const fallback = await env.ASSETS.fetch(new Request(request.url));
        if (fallback) return withSecurityHeaders(request, fallback);
      } catch {
        // Ignore fallback error
      }
    }

    return new Response("OK", { status: 200 });
  },
};

function withSecurityHeaders(request: Request, response: Response): Response {
  const pathname = new URL(request.url).pathname;
  const isWorkspace =
    pathname === "/workspace" || pathname.startsWith("/workspace/");
  const isPrivateRoute =
    isWorkspace ||
    pathname === "/dashboard" ||
    pathname.startsWith("/dashboard/") ||
    pathname.startsWith("/api/");
  const secured = new Response(response.body, response);
  const contentSecurityPolicy = pathname.startsWith("/api/")
    ? [
        "default-src 'none'",
        "base-uri 'none'",
        "form-action 'none'",
        "frame-ancestors 'none'",
      ]
    : [
        "default-src 'self'",
        "script-src 'self' 'unsafe-inline'",
        "script-src-attr 'none'",
        "style-src 'self' 'unsafe-inline' https://fonts.googleapis.com",
        "img-src 'self' data: blob:",
        "font-src 'self' data: https://fonts.gstatic.com",
        "connect-src 'self'",
        isWorkspace ? "worker-src 'self' blob:" : "worker-src 'self'",
        isWorkspace ? "frame-src 'self' blob:" : "frame-src 'none'",
        "manifest-src 'self'",
        "object-src 'none'",
        "base-uri 'none'",
        "form-action 'self'",
        "frame-ancestors 'none'",
        "upgrade-insecure-requests",
      ];
  secured.headers.set(
    "Content-Security-Policy",
    contentSecurityPolicy.join("; "),
  );
  secured.headers.set("Cross-Origin-Opener-Policy", "same-origin");
  secured.headers.set("Cross-Origin-Resource-Policy", "same-site");
  secured.headers.set("Permissions-Policy", "camera=(), microphone=(), geolocation=(), payment=(), usb=()");
  secured.headers.set(
    "Referrer-Policy",
    isWorkspace ? "no-referrer" : "strict-origin-when-cross-origin",
  );
  secured.headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  secured.headers.set("X-Content-Type-Options", "nosniff");
  secured.headers.set("X-DNS-Prefetch-Control", "off");
  secured.headers.set("X-Frame-Options", "DENY");
  secured.headers.set("Origin-Agent-Cluster", "?1");
  if (isPrivateRoute) {
    secured.headers.set(
      "Cache-Control",
      "no-store, no-cache, must-revalidate, private",
    );
    secured.headers.set("Pragma", "no-cache");
    secured.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }
  return secured;
}

export default worker;
