"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function ErrorPage({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    console.error("SkyCode route error", error);
  }, [error]);

  return (
    <main className="route-error" role="alert">
      <span>SKYCODE</span>
      <h1>Something interrupted this page.</h1>
      <p>
        Your local edits have not been intentionally cleared. Try loading the
        current route again.
      </p>
      <button onClick={reset}>Try again</button>
      <Link href="/">Return home</Link>
    </main>
  );
}
