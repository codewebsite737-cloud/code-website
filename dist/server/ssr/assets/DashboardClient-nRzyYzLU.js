import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { t as Link } from "./link-ZKziRYeH.js";
//#region app/dashboard/DashboardClient.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function DashboardClient({ displayName, authenticated, signOutPath }) {
	const [projects, setProjects] = (0, import_react.useState)([]);
	const [loading, setLoading] = (0, import_react.useState)(authenticated);
	const [error, setError] = (0, import_react.useState)("");
	const [name, setName] = (0, import_react.useState)("");
	const [template, setTemplate] = (0, import_react.useState)("web");
	const [creating, setCreating] = (0, import_react.useState)(false);
	(0, import_react.useEffect)(() => {
		if (!authenticated) return;
		let cancelled = false;
		fetch("/api/projects", { cache: "no-store" }).then(async (response) => {
			const data = await response.json();
			if (!response.ok) throw new Error(data.error ?? "Projects could not be loaded.");
			return data.projects ?? [];
		}).then((items) => {
			if (!cancelled) setProjects(items);
		}).catch((loadError) => {
			if (!cancelled) setError(loadError instanceof Error ? loadError.message : "Projects could not be loaded.");
		}).finally(() => {
			if (!cancelled) setLoading(false);
		});
		return () => {
			cancelled = true;
		};
	}, [authenticated]);
	async function createProject() {
		const projectName = name.trim();
		if (!projectName || creating) return;
		setCreating(true);
		setError("");
		const response = await fetch("/api/projects", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({
				name: projectName,
				template
			})
		});
		const data = await response.json();
		if (response.ok && data.project) {
			window.location.href = `/workspace?project=${encodeURIComponent(data.project.id)}`;
			return;
		}
		setError(data.error ?? "Project could not be created.");
		setCreating(false);
	}
	async function deleteProject(project) {
		if (!window.confirm(`Delete “${project.name}”? This cannot be undone.`)) return;
		const response = await fetch("/api/projects", {
			method: "DELETE",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify({ id: project.id })
		});
		if (response.ok) setProjects((current) => current.filter((item) => item.id !== project.id));
		else setError((await response.json()).error ?? "Project could not be deleted.");
	}
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "dashboard",
		children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("header", {
			className: "dashboard-header",
			children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
					className: "marketing-brand",
					href: "/",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {
						className: "marketing-logo",
						children: /* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
					}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "SkyCode" })]
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("nav", { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/docs",
						children: "Docs"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/security",
						children: "Security"
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/workspace",
						children: "Open workspace"
					})
				] }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dashboard-user",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: displayName.slice(0, 2).toUpperCase() }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("b", { children: displayName }),
						signOutPath && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: signOutPath,
							children: "Sign out"
						})
					]
				})
			]
		}), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
			className: "dashboard-body",
			children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("aside", { children: [
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "WORKSPACE" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					className: "active",
					href: "#projects",
					children: "⌘ \xA0Projects"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/workspace",
					children: "✦ \xA0AI workspace"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
					href: "#templates",
					children: "▦ \xA0Templates"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", {}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)("strong", { children: "MANAGE" }),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/security",
					children: "⌾ \xA0Security"
				}),
				/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
					href: "/docs",
					children: "? \xA0Documentation"
				})
			] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
				className: "dashboard-content",
				id: "projects",
				children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "dashboard-title",
					children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "PERSONAL WORKSPACE" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Your projects" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Build, revisit, and publish from one place." })
					] }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
						href: "/workspace",
						children: "＋ New blank project"
					})]
				}), !authenticated ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
					className: "auth-card",
					children: [
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Sign in to save projects" }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your editor works without an account. Sign in to create durable projects, access them across sessions, and publish." }),
						/* @__PURE__ */ (0, import_jsx_runtime.jsx)("a", {
							href: "/signin-with-chatgpt?return_to=%2Fdashboard",
							children: "Sign in with ChatGPT"
						})
					]
				}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)(import_jsx_runtime.Fragment, { children: [
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("section", {
						className: "create-project-card",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "✦" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "What do you want to build?" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create a project, then describe the result to Sky AI." })] })] }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
							className: "create-project-form",
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Project name" }), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("input", {
									value: name,
									onChange: (event) => setName(event.target.value),
									maxLength: 80,
									placeholder: "Customer portal"
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("label", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "Template" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("select", {
									value: template,
									onChange: (event) => setTemplate(event.target.value),
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "web",
											children: "Web starter"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "react",
											children: "React app"
										}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("option", {
											value: "blank",
											children: "Blank project"
										})
									]
								})] }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
									onClick: createProject,
									disabled: !name.trim() || creating,
									children: creating ? "Creating…" : "Create project →"
								})
							]
						})]
					}),
					error && /* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", {
						className: "dashboard-error",
						children: error
					}),
					/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "projects-heading",
						children: [/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h2", { children: "Recent projects" }), /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("span", { children: [projects.length, " total"] })]
					}),
					loading ? /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "project-loading",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
						]
					}) : projects.length ? /* @__PURE__ */ (0, import_jsx_runtime.jsx)("div", {
						className: "project-grid",
						children: projects.map((project) => /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("article", { children: [/* @__PURE__ */ (0, import_jsx_runtime.jsxs)(Link, {
							href: `/workspace?project=${encodeURIComponent(project.id)}`,
							children: [
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
									className: "project-thumb",
									children: [
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: project.template === "react" ? "⚛" : "◇" }),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {}),
										/* @__PURE__ */ (0, import_jsx_runtime.jsx)("i", {})
									]
								}),
								/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: project.name }),
								/* @__PURE__ */ (0, import_jsx_runtime.jsxs)("p", { children: [
									project.template,
									" · Updated ",
									new Date(project.updatedAt).toLocaleDateString()
								] })
							]
						}), /* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
							"aria-label": `Delete ${project.name}`,
							onClick: () => deleteProject(project),
							children: "•••"
						})] }, project.id))
					}) : /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("div", {
						className: "empty-projects",
						children: [
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "◇" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h3", { children: "No saved projects yet" }),
							/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Create your first project above or open the blank workspace." })
						]
					})
				] })]
			})]
		})]
	});
}
//#endregion
export { DashboardClient as default };
