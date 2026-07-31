import { drizzle } from "drizzle-orm/d1";
import * as schema from "./schema";

declare global {
  var __SKYCODE_D1__: D1Database | undefined;
}

export function getDb() {
  return drizzle(getD1Binding(), { schema });
}

const createMockD1 = (): D1Database => ({
  prepare: () => ({
    bind: () => ({
      first: async () => ({ healthy: 1 }),
      all: async () => ({ results: [{ healthy: 1 }], success: true, meta: { duration: 0 } }),
      run: async () => ({ success: true, meta: { duration: 0 } }),
    }),
    first: async () => ({ healthy: 1 }),
    all: async () => ({ results: [{ healthy: 1 }], success: true, meta: { duration: 0 } }),
    run: async () => ({ success: true, meta: { duration: 0 } }),
  }),
  exec: async () => ({ count: 0, duration: 0 }),
  batch: async () => [],
  dump: async () => new ArrayBuffer(0),
} as unknown as D1Database);

export function getD1Binding(): D1Database {
  const binding = globalThis.__SKYCODE_D1__;
  if (!binding) {
    throw new Error(
      "Cloudflare D1 binding `DB` is unavailable for this request.",
    );
  }
  return binding;
}
