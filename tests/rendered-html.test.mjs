import assert from "node:assert/strict";
import { access, readFile } from "node:fs/promises";
import test from "node:test";
import { readAiGenerationInput } from "../app/api/ai/policy.ts";
import { buildPreviewDocument } from "../app/workspace/preview-document.ts";

const developmentPreviewMeta =
  /<meta(?=[^>]*\bname=["']codex-preview["'])(?=[^>]*\bcontent=["']development["'])[^>]*>/i;

async function loadWorker() {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);
  return worker;
}

async function request(pathname, init = {}) {
  const worker = await loadWorker();
  return worker.fetch(
    new Request(`http://localhost${pathname}`, init),
    {
      ASSETS: {
        fetch: async () => new Response("Not found", { status: 404 }),
      },
    },
    {
      waitUntil() {},
      passThroughOnException() {},
    },
  );
}

test("renders development preview metadata", async () => {
  const response = await request("/", {
    headers: { accept: "text/html" },
  });

  assert.equal(response.status, 200);
  assert.match(
    response.headers.get("content-type") ?? "",
    /^text\/html\b/i,
  );
  assert.match(await response.text(), developmentPreviewMeta);
});

test("keeps the public landing page isolated from the workspace", async () => {
  const response = await request("/", {
    headers: { accept: "text/html" },
  });
  const html = await response.text();
  const csp = response.headers.get("content-security-policy") ?? "";

  assert.equal(response.status, 200);
  assert.match(html, /class=["']marketing-site home-replit["']/i);
  assert.match(html, /What will you build\?/i);
  assert.match(html, /Everything your build needs\./i);
  assert.match(html, /class=["']marketing-mobile-menu["']/i);
  assert.match(html, /Open navigation menu/i);
  assert.match(html, /href=["']\/privacy["']/i);
  assert.match(html, /href=["']\/terms["']/i);
  assert.match(html, /href=["']\/status["']/i);
  assert.doesNotMatch(html, /class=["']ai-builder-dialog["']/i);
  assert.doesNotMatch(html, /class=["']workspace["']/i);
  assert.match(csp, /connect-src 'self'(?:;|$)/);
  assert.doesNotMatch(csp, /openrouter\.ai/i);
  assert.equal(response.headers.get("x-frame-options"), "DENY");
});

test("publishes honest pricing and complete legal routes", async () => {
  const [pricing, privacy, terms, cookies, acceptableUse] = await Promise.all([
    request("/pricing", { headers: { accept: "text/html" } }),
    request("/privacy", { headers: { accept: "text/html" } }),
    request("/terms", { headers: { accept: "text/html" } }),
    request("/cookies", { headers: { accept: "text/html" } }),
    request("/acceptable-use", { headers: { accept: "text/html" } }),
  ]);

  for (const response of [pricing, privacy, terms, cookies, acceptableUse]) {
    assert.equal(response.status, 200);
  }

  const pricingHtml = await pricing.text();
  assert.match(pricingHtml, /Creator and Team are roadmap plans/i);
  assert.match(pricingHtml, /No payment is collected/i);
  assert.doesNotMatch(pricingHtml, />Choose Creator</i);
  assert.match(await privacy.text(), /Privacy Policy/i);
  assert.match(await terms.text(), /Terms of Service/i);
  assert.match(await cookies.text(), /Cookie Policy/i);
  assert.match(await acceptableUse.text(), /Acceptable Use Policy/i);
});

test("exposes status and a safe public health response", async () => {
  const [statusPage, health] = await Promise.all([
    request("/status", { headers: { accept: "text/html" } }),
    request("/api/health"),
  ]);

  assert.equal(statusPage.status, 200);
  assert.match(await statusPage.text(), /Project database/i);
  assert.equal(health.status, 503);
  assert.match(
    health.headers.get("content-type") ?? "",
    /^application\/json\b/i,
  );
  assert.match(health.headers.get("cache-control") ?? "", /no-store/i);
  assert.deepEqual((await health.json()).status, "degraded");
});

test("packages the complete durable database history", async () => {
  const migrations = [
    "drizzle/0000_first_bruce_banner.sql",
    "drizzle/0001_hesitant_avengers.sql",
    "drizzle/0002_round_redwing.sql",
  ];
  await Promise.all(migrations.map((migration) => access(migration)));
  const combined = (
    await Promise.all(migrations.map((migration) => readFile(migration, "utf8")))
  ).join("\n");

  assert.match(combined, /CREATE TABLE `projects`/);
  assert.match(combined, /CREATE TABLE `api_rate_limits`/);
  assert.match(combined, /CREATE TABLE `project_audit_events`/);
  assert.match(combined, /CREATE TABLE `ai_usage_events`/);
});

test("renders the builder only on the noindex workspace route", async () => {
  const response = await request("/workspace", {
    headers: { accept: "text/html" },
  });
  const html = await response.text();
  const csp = response.headers.get("content-security-policy") ?? "";

  assert.equal(response.status, 200);
  assert.match(html, /class=["']workspace["']/i);
  assert.match(html, /class=["']ai-builder-dialog["']/i);
  assert.match(html, /What do you want to build\?/i);
  assert.match(html, /class=["']activity-bar["']/i);
  assert.match(html, /aria-label=["']Files["']/i);
  assert.match(html, /aria-label=["']Search["']/i);
  assert.match(html, /aria-label=["']Source control["']/i);
  assert.match(html, /aria-label=["']Database["']/i);
  assert.match(html, /data-layout-version=["']studio["']/i);
  assert.match(html, /data-canvas-mode=["']preview["']/i);
  assert.match(html, /aria-label=["']Center workspace view["']/i);
  assert.match(html, /class=["']workspace-overflow-menu["']/i);
  assert.match(html, /Open workspace actions/i);
  assert.match(html, />V2</i);
  assert.doesNotMatch(html, /class=["']marketing-hero["']/i);
  assert.match(csp, /connect-src 'self'(?:;|$)/);
  assert.doesNotMatch(csp, /openrouter\.ai/i);
  assert.match(response.headers.get("cache-control") ?? "", /no-store/i);
  assert.match(response.headers.get("x-robots-tag") ?? "", /noindex/i);
});

test("rejects authenticated cross-origin project writes before storage", async () => {
  const response = await request("/api/projects", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "oai-authenticated-user-email": "developer@example.com",
      origin: "https://attacker.example",
      "sec-fetch-site": "cross-site",
    },
    body: JSON.stringify({ name: "Unsafe request" }),
  });
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body.code, "CROSS_ORIGIN");
  assert.match(response.headers.get("cache-control") ?? "", /no-store/i);
  assert.match(
    response.headers.get("content-security-policy") ?? "",
    /default-src 'none'/,
  );
});

test("builds a fresh restricted preview document from the current code snapshot", () => {
  const document = buildPreviewDocument({
    "index.html": '<main id="fresh-preview">Updated markup</main>',
    "styles.css": "#fresh-preview { color: rebeccapurple; }",
    "app.js": 'document.querySelector("#fresh-preview").dataset.ready = "yes";',
    "package.json": "{}",
  });

  assert.match(document, /Updated markup/);
  assert.match(document, /color: rebeccapurple/);
  assert.match(document, /dataset\.ready = "yes"/);
  assert.match(document, /connect-src 'none'/);
  assert.match(document, /form-action 'none'/);
});

test("keeps embedded closing tags from escaping the preview style or script", () => {
  const document = buildPreviewDocument({
    "index.html": "<main>Safe preview</main>",
    "styles.css": 'body::after { content: "</style>"; }',
    "app.js": 'const closingTag = "</script>";',
    "package.json": "{}",
  });

  assert.doesNotMatch(document, /content: "<\/style>"/);
  assert.doesNotMatch(document, /closingTag = "<\/script>"/);
  assert.match(document, /content: "<\\\/style>"/);
  assert.match(document, /closingTag = "<\\\/script>"/);
});

test("reports managed AI as safely unavailable until its server key exists", async () => {
  const response = await request("/api/ai", {
    headers: { accept: "application/json" },
  });
  const body = await response.json();

  assert.equal(response.status, 200);
  assert.equal(body.configured, false);
  assert.equal(body.available, false);
  assert.equal(body.model, "openrouter/free");
  assert.match(response.headers.get("cache-control") ?? "", /no-store/i);
});

test("requires authentication before accepting a managed AI generation", async () => {
  const response = await request("/api/ai", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      origin: "http://localhost",
      "sec-fetch-site": "same-origin",
    },
    body: JSON.stringify({}),
  });
  const body = await response.json();

  assert.equal(response.status, 401);
  assert.equal(body.code, "AUTH_REQUIRED");
  assert.match(body.signInPath, /^\/signin-with-chatgpt\?/);
});

test("rejects authenticated cross-origin AI writes before provider access", async () => {
  const response = await request("/api/ai", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "oai-authenticated-user-email": "developer@example.com",
      origin: "https://attacker.example",
      "sec-fetch-site": "cross-site",
    },
    body: JSON.stringify({}),
  });
  const body = await response.json();

  assert.equal(response.status, 403);
  assert.equal(body.code, "CROSS_ORIGIN");
});

test("never attempts provider access when the server key is missing", async () => {
  const response = await request("/api/ai", {
    method: "POST",
    headers: {
      "content-type": "application/json",
      "oai-authenticated-user-email": "developer@example.com",
      origin: "http://localhost",
      "sec-fetch-site": "same-origin",
    },
    body: JSON.stringify({}),
  });
  const body = await response.json();

  assert.equal(response.status, 503);
  assert.equal(body.code, "AI_NOT_CONFIGURED");
});

test("validates the exact bounded context sent to managed AI", async () => {
  const input = await readAiGenerationInput(
    new Request("https://skycode.example/api/ai", {
      method: "POST",
      body: JSON.stringify({
        category: "web-app",
        prompt: "Build a secure booking dashboard",
        currentFiles: {
          "index.html": "<main></main>",
          "styles.css": "main { display: grid; }",
          "app.js": "console.log('ready');",
          "package.json": "{}",
        },
      }),
    }),
  );

  assert.equal(input.category, "web-app");
  assert.equal(input.prompt, "Build a secure booking dashboard");
  assert.deepEqual(Object.keys(input.currentFiles).sort(), [
    "app.js",
    "index.html",
    "package.json",
    "styles.css",
  ]);
});
