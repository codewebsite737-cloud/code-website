"use client";

import Link from "next/link";
import { useEffect, useState } from "react";

type Project = {
  id: string;
  name: string;
  template: string;
  createdAt: string;
  updatedAt: string;
};

type ProjectListResponse = {
  accountType?: "authenticated" | "guest";
  displayName?: string;
  error?: string;
  projects?: Project[];
};

export default function DashboardClient({
  displayName: initialDisplayName,
  authenticated,
  signOutPath,
}: {
  displayName: string;
  authenticated: boolean;
  signOutPath: string | null;
}) {
  const [projects, setProjects] = useState<Project[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [template, setTemplate] = useState("web");
  const [creating, setCreating] = useState(false);
  const [displayName, setDisplayName] = useState(initialDisplayName);
  const [accountType, setAccountType] = useState<"authenticated" | "guest">(
    authenticated ? "authenticated" : "guest",
  );

  useEffect(() => {
    let cancelled = false;
    void fetch("/api/projects", { cache: "no-store" })
      .then(async (response) => {
        const data = (await response.json()) as ProjectListResponse;
        if (!response.ok) {
          throw new Error(data.error ?? "Projects could not be loaded.");
        }
        return data;
      })
      .then((data) => {
        if (cancelled) return;
        setProjects(data.projects ?? []);
        if (data.displayName) setDisplayName(data.displayName);
        if (data.accountType) setAccountType(data.accountType);
      })
      .catch((loadError: unknown) => {
        if (!cancelled) {
          setError(
            loadError instanceof Error
              ? loadError.message
              : "Projects could not be loaded.",
          );
        }
      })
      .finally(() => {
        if (!cancelled) setLoading(false);
      });
    return () => {
      cancelled = true;
    };
  }, []);

  async function createProject() {
    const projectName = name.trim();
    if (!projectName || creating) return;
    setCreating(true);
    setError("");
    try {
      const response = await fetch("/api/projects", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ name: projectName, template }),
      });
      const data = (await response.json()) as {
        project?: Project;
        error?: string;
      };
      if (response.ok && data.project) {
        window.location.href = `/workspace?project=${encodeURIComponent(data.project.id)}`;
        return;
      }
      setError(data.error ?? "Project could not be created.");
    } catch {
      setError("Project could not be created.");
    } finally {
      setCreating(false);
    }
  }

  async function deleteProject(project: Project) {
    if (!window.confirm(`Delete “${project.name}”? This cannot be undone.`)) {
      return;
    }
    try {
      const response = await fetch("/api/projects", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ id: project.id }),
      });
      if (response.ok) {
        setProjects((current) =>
          current.filter((item) => item.id !== project.id),
        );
        return;
      }
      const data = (await response.json()) as { error?: string };
      setError(data.error ?? "Project could not be deleted.");
    } catch {
      setError("Project could not be deleted.");
    }
  }

  return (
    <main className="dashboard">
      <header className="dashboard-header">
        <Link className="marketing-brand" href="/">
          <span className="marketing-logo"><i /></span>
          <strong>SkyCode</strong>
        </Link>
        <nav>
          <Link href="/docs">Docs</Link>
          <Link href="/security">Security</Link>
          <Link href="/workspace">Open workspace</Link>
        </nav>
        <div className="dashboard-user">
          <span>{displayName.slice(0, 2).toUpperCase()}</span>
          <b>{displayName}</b>
          {signOutPath && <a href={signOutPath}>Sign out</a>}
        </div>
      </header>
      <div className="dashboard-body">
        <aside>
          <strong>WORKSPACE</strong>
          <a className="active" href="#projects">⌘ &nbsp;Projects</a>
          <Link href="/workspace">✦ &nbsp;AI workspace</Link>
          <a href="#templates">▦ &nbsp;Templates</a>
          <span />
          <strong>MANAGE</strong>
          <Link href="/security">⌾ &nbsp;Security</Link>
          <Link href="/docs">? &nbsp;Documentation</Link>
        </aside>
        <section className="dashboard-content" id="projects">
          <div className="dashboard-title">
            <div>
              <span>PERSONAL WORKSPACE</span>
              <h1>Your projects</h1>
              <p>Build, revisit, and export from one place.</p>
            </div>
            <Link href="/workspace">＋ New blank project</Link>
          </div>

          {accountType === "guest" && (
            <div className="auth-card">
              <span>◈</span>
              <h2>Private beta browser session</h2>
              <p>
                Projects are stored securely for this browser. Keep the same
                browser data to reopen them; account sync can be added later.
              </p>
            </div>
          )}

          <section className="create-project-card" id="templates">
            <div>
              <span>✦</span>
              <div>
                <h2>What do you want to build?</h2>
                <p>Create a project, then describe the result to Sky AI.</p>
              </div>
            </div>
            <div className="create-project-form">
              <label>
                <span>Project name</span>
                <input
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  maxLength={80}
                  placeholder="Customer portal"
                />
              </label>
              <label>
                <span>Template</span>
                <select
                  value={template}
                  onChange={(event) => setTemplate(event.target.value)}
                >
                  <option value="web">Web starter</option>
                  <option value="react">React app</option>
                  <option value="blank">Blank project</option>
                </select>
              </label>
              <button
                onClick={createProject}
                disabled={!name.trim() || creating}
              >
                {creating ? "Creating…" : "Create project →"}
              </button>
            </div>
          </section>

          {error && <p className="dashboard-error">{error}</p>}
          <div className="projects-heading">
            <h2>Recent projects</h2>
            <span>{projects.length} total</span>
          </div>
          {loading ? (
            <div className="project-loading"><i /><i /><i /></div>
          ) : projects.length ? (
            <div className="project-grid">
              {projects.map((project) => (
                <article key={project.id}>
                  <Link href={`/workspace?project=${encodeURIComponent(project.id)}`}>
                    <div className="project-thumb">
                      <span>{project.template === "react" ? "⚛" : "◇"}</span>
                      <i /><i /><i />
                    </div>
                    <h3>{project.name}</h3>
                    <p>
                      {project.template} · Updated{" "}
                      {new Date(project.updatedAt).toLocaleDateString()}
                    </p>
                  </Link>
                  <button
                    aria-label={`Delete ${project.name}`}
                    onClick={() => deleteProject(project)}
                  >
                    •••
                  </button>
                </article>
              ))}
            </div>
          ) : (
            <div className="empty-projects">
              <span>◇</span>
              <h3>No saved projects yet</h3>
              <p>Create your first project above or open the blank workspace.</p>
            </div>
          )}
        </section>
      </div>
    </main>
  );
}
