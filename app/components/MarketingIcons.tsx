export type MarketingIconName =
  | "app"
  | "bolt"
  | "code"
  | "editor"
  | "files"
  | "history"
  | "preview"
  | "prompt"
  | "publish"
  | "review"
  | "run"
  | "shield"
  | "spark"
  | "website";

export function MarketingIcon({
  className,
  name,
}: {
  className?: string;
  name: MarketingIconName;
}) {
  return (
    <svg
      aria-hidden="true"
      className={className}
      fill="none"
      focusable="false"
      viewBox="0 0 24 24"
    >
      <g
        stroke="currentColor"
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth="1.55"
      >
        {iconDrawing(name)}
      </g>
    </svg>
  );
}

function iconDrawing(name: MarketingIconName) {
  switch (name) {
    case "app":
      return (
        <>
          <rect height="17" rx="3" width="17" x="3.5" y="3.5" />
          <path d="M8 8h3v3H8zM13 8h3M13 11h3M8 15h8" />
        </>
      );
    case "bolt":
      return <path d="m13.5 2.8-7 10h5l-1 8.4 7-10h-5l1-8.4Z" />;
    case "code":
      return (
        <>
          <path d="m8.5 7-5 5 5 5M15.5 7l5 5-5 5M13.5 4.5l-3 15" />
        </>
      );
    case "editor":
      return (
        <>
          <rect height="17" rx="3" width="18" x="3" y="3.5" />
          <path d="M8.5 8 6 10.5 8.5 13M11.5 8.5h5M11.5 12h4M7 17h9" />
        </>
      );
    case "files":
      return (
        <>
          <path d="M8 5.5V4a2 2 0 0 1 2-2h7l3 3v11a2 2 0 0 1-2 2h-1.5" />
          <path d="M17 2v4h3" />
          <rect height="14" rx="2" width="12" x="4" y="8" />
          <path d="M7.5 12h5M7.5 15h5M7.5 18h3" />
        </>
      );
    case "history":
      return (
        <>
          <path d="M4.7 8.4A8 8 0 1 1 4.3 15M4.7 8.4V4M4.7 8.4h4.4" />
          <path d="M12 7.5V12l3 1.8" />
        </>
      );
    case "preview":
      return (
        <>
          <rect height="16" rx="3" width="19" x="2.5" y="4" />
          <path d="M2.5 8h19M6 6h.01M9 6h.01" />
          <path d="M8 14s1.5-2.5 4-2.5 4 2.5 4 2.5-1.5 2.5-4 2.5S8 14 8 14Z" />
          <circle cx="12" cy="14" r="1" />
        </>
      );
    case "prompt":
      return (
        <>
          <path d="M5 4h14a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-8l-5 4v-4H5a2 2 0 0 1-2-2V6a2 2 0 0 1 2-2Z" />
          <path d="M7.5 9h9M7.5 12.5H13" />
        </>
      );
    case "publish":
      return (
        <>
          <path d="M12 16V3M7.5 7.5 12 3l4.5 4.5" />
          <path d="M5 13v6a2 2 0 0 0 2 2h10a2 2 0 0 0 2-2v-6" />
        </>
      );
    case "review":
      return (
        <>
          <rect height="18" rx="3" width="16" x="4" y="3" />
          <path d="m7.5 9 1.5 1.5L12 7.5M13.5 9H17M7.5 15h9" />
        </>
      );
    case "run":
      return (
        <>
          <circle cx="12" cy="12" r="9" />
          <path d="m10 8.5 5.5 3.5-5.5 3.5v-7Z" />
        </>
      );
    case "shield":
      return (
        <>
          <path d="M12 2.8 20 6v5.3c0 5-3.3 8.3-8 10-4.7-1.7-8-5-8-10V6l8-3.2Z" />
          <path d="m8.3 12.2 2.2 2.2 5.2-5.2" />
        </>
      );
    case "spark":
      return (
        <>
          <path d="M12 2.5c.7 5.4 2.1 6.8 7.5 7.5-5.4.7-6.8 2.1-7.5 7.5-.7-5.4-2.1-6.8-7.5-7.5 5.4-.7 6.8-2.1 7.5-7.5Z" />
          <path d="M19 16.5c.3 2.2.8 2.7 3 3-2.2.3-2.7.8-3 3-.3-2.2-.8-2.7-3-3 2.2-.3 2.7-.8 3-3Z" />
        </>
      );
    case "website":
      return (
        <>
          <rect height="17" rx="3" width="19" x="2.5" y="3.5" />
          <path d="M2.5 8h19M6 5.8h.01M9 5.8h.01" />
          <path d="M6.5 11.5h6v5h-6zM15 11.5h3M15 14h3M15 16.5h2" />
        </>
      );
  }
}
