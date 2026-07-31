import type { Metadata } from "next";
import { getD1Binding } from "../../db";
import { getAiRuntimeConfig } from "../api/ai/runtime";
import {
  MarketingFooter,
  MarketingHeader,
} from "../components/MarketingShell";



export const metadata: Metadata = {
  title: "System Status",
  description:
    "Current operational status for the SkyCode website, project database, Instant Builder, and optional Cloud AI.",
  alternates: { canonical: "/status" },
};

type ServiceState = "operational" | "setup" | "degraded";

async function readStatus() {
  let database: ServiceState = "degraded";
  try {
    const result = await getD1Binding()
      .prepare("SELECT 1 AS healthy")
      .first<{ healthy: number }>();
    database = result?.healthy === 1 ? "operational" : "degraded";
  } catch {
    database = "degraded";
  }

  return {
    checkedAt: new Date(),
    services: [
      {
        detail: "Public pages and workspace delivery",
        name: "SkyCode application",
        state: "operational" as ServiceState,
      },
      {
        detail: "Authenticated project storage and request limits",
        name: "Project database",
        state: database,
      },
      {
        detail: "No provider key or account required",
        name: "Instant Builder",
        state: "operational" as ServiceState,
      },
      {
        detail: "Optional server-side provider connection",
        name: "Cloud AI",
        state: getAiRuntimeConfig().configured
          ? ("operational" as ServiceState)
          : ("setup" as ServiceState),
      },
    ],
  };
}

const stateLabels: Record<ServiceState, string> = {
  operational: "Operational",
  setup: "Setup required",
  degraded: "Degraded",
};

export default async function StatusPage() {
  const status = await readStatus();
  const degraded = status.services.some((service) => service.state === "degraded");

  return (
    <div className="marketing-site status-page">
      <MarketingHeader />
      <main>
        <section className="status-hero">
          <span className="marketing-eyebrow">SYSTEM STATUS</span>
          <h1>{degraded ? "Some systems need attention." : "Core systems are operational."}</h1>
          <p>
            Live service health for the public application, secure project
            storage, and both AI building modes.
          </p>
          <div className={`status-summary ${degraded ? "degraded" : ""}`}>
            <i />
            <strong>
              {degraded
                ? "A core service is currently degraded"
                : "No core service disruption detected"}
            </strong>
          </div>
        </section>
        <section className="status-services" aria-label="SkyCode service status">
          {status.services.map((service) => (
            <article key={service.name} data-state={service.state}>
              <div>
                <i />
                <span>
                  <strong>{service.name}</strong>
                  <small>{service.detail}</small>
                </span>
              </div>
              <b>{stateLabels[service.state]}</b>
            </article>
          ))}
          <p>
            Last checked{" "}
            <time dateTime={status.checkedAt.toISOString()}>
              {status.checkedAt.toLocaleString("en", {
                dateStyle: "medium",
                timeStyle: "short",
                timeZone: "Asia/Baghdad",
              })}
            </time>
          </p>
        </section>
      </main>
      <MarketingFooter />
    </div>
  );
}
