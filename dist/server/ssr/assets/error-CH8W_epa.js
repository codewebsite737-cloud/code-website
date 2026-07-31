import { t as require_jsx_runtime, w as __toESM, y as require_react } from "../index.js";
import { t as Link } from "./link-ZKziRYeH.js";
//#region app/error.tsx
var import_react = /* @__PURE__ */ __toESM(require_react(), 1);
var import_jsx_runtime = require_jsx_runtime();
function ErrorPage({ error, reset }) {
	(0, import_react.useEffect)(() => {
		console.error("SkyCode route error", error);
	}, [error]);
	return /* @__PURE__ */ (0, import_jsx_runtime.jsxs)("main", {
		className: "route-error",
		role: "alert",
		children: [
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("span", { children: "SKYCODE" }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("h1", { children: "Something interrupted this page." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("p", { children: "Your local edits have not been intentionally cleared. Try loading the current route again." }),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)("button", {
				onClick: reset,
				children: "Try again"
			}),
			/* @__PURE__ */ (0, import_jsx_runtime.jsx)(Link, {
				href: "/",
				children: "Return home"
			})
		]
	});
}
//#endregion
export { ErrorPage as default };
