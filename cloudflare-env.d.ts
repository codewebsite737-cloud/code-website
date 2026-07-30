export {};

declare global {
  interface Fetcher {
    fetch(input: Request | URL | string, init?: RequestInit): Promise<Response>;
  }

  interface D1Result<T = Record<string, unknown>> {
    success: boolean;
    results: T[];
    meta: {
      changes: number;
      duration?: number;
      rows_read?: number;
      rows_written?: number;
    };
  }

  interface D1PreparedStatement {
    bind(...values: unknown[]): D1PreparedStatement;
    first<T = Record<string, unknown>>(columnName?: string): Promise<T | null>;
    all<T = Record<string, unknown>>(): Promise<D1Result<T>>;
    run<T = Record<string, unknown>>(): Promise<D1Result<T>>;
    raw<T = unknown[]>(options?: { columnNames?: boolean }): Promise<T[]>;
  }

  interface D1Database {
    prepare(query: string): D1PreparedStatement;
    batch<T = Record<string, unknown>>(
      statements: D1PreparedStatement[],
    ): Promise<D1Result<T>[]>;
    exec(query: string): Promise<{ count: number; duration: number }>;
    dump(): Promise<ArrayBuffer>;
  }

  type SkyCodeAiRuntimeConfig = {
    dailyLimit?: string;
    openRouterApiKey?: string;
    openRouterModel?: string;
  };

  var __SKYCODE_AI_CONFIG__: SkyCodeAiRuntimeConfig | undefined;
}
