"use client";

import { useEffect } from "react";

const LAST_PROJECT_KEY = "skycode:last-project-id:v1";
const STUDIO_LAYOUT_KEY = "skycode:workspace-layout-version:v1";

function currentProjectId() {
  return new URLSearchParams(window.location.search).get("project");
}

function rememberCurrentProject() {
  const projectId = currentProjectId();
  if (projectId) window.localStorage.setItem(LAST_PROJECT_KEY, projectId);
}

function isEditableTarget(target: EventTarget | null) {
  return (
    target instanceof HTMLElement &&
    (target.matches("input, textarea, select, [contenteditable='true']") ||
      Boolean(target.closest("input, textarea, select, [contenteditable='true']")))
  );
}

export function WorkspaceEnhancements() {
  useEffect(() => {
    window.localStorage.setItem(STUDIO_LAYOUT_KEY, "studio");
    rememberCurrentProject();

    let saveTimer = 0;
    let resumeTimer = 0;

    const cleanLegacyChrome = () => {
      document
        .querySelectorAll<HTMLButtonElement>(".layout-version-switcher button")
        .forEach((button) => {
          button.hidden = true;
          button.tabIndex = -1;
        });

      document.querySelectorAll<HTMLButtonElement>("button").forEach((button) => {
        const label = button.textContent?.replace(/\s+/g, " ").trim() ?? "";
        if (
          /^(Version 1|Version 2|Open Sky AI|Sky AI)$/i.test(label) ||
          button.getAttribute("aria-label")?.toLowerCase().includes("sky ai")
        ) {
          button.hidden = true;
          button.tabIndex = -1;
        }
      });

      document.querySelectorAll<HTMLElement>(".avatars span").forEach((avatar) => {
        if (avatar.textContent?.trim().toUpperCase() === "AI") avatar.hidden = true;
      });

      const mobileAiButton = Array.from(
        document.querySelectorAll<HTMLButtonElement>(".mobile-workspace-nav button"),
      ).find((button) => button.textContent?.trim().toUpperCase() === "AI");
      if (mobileAiButton) {
        mobileAiButton.hidden = true;
        mobileAiButton.tabIndex = -1;
      }

      rememberCurrentProject();

      if (!document.querySelector(".ai-builder-overlay")) {
        document.documentElement.classList.remove("skycode-resuming-project");
      }
    };

    const saveCurrentProject = () => {
      if (document.querySelector(".ai-builder-overlay")) return;
      const saveButton = document.querySelector<HTMLButtonElement>(
        ".workspace .save-state",
      );
      if (!saveButton || saveButton.disabled) return;
      saveButton.click();
      window.setTimeout(rememberCurrentProject, 250);
    };

    const scheduleSave = (delay = 900) => {
      window.clearTimeout(saveTimer);
      saveTimer = window.setTimeout(saveCurrentProject, delay);
    };

    const handleInput = (event: Event) => {
      if (!(event.target instanceof Element)) return;
      if (!event.target.closest(".workspace")) return;
      scheduleSave();
    };

    const handleClick = (event: MouseEvent) => {
      const button =
        event.target instanceof Element
          ? event.target.closest<HTMLButtonElement>("button")
          : null;
      if (!button || !button.closest(".workspace")) return;
      if (button.matches(".save-state")) return;

      const label = button.textContent?.replace(/\s+/g, " ").trim() ?? "";
      if (
        /apply|update|duplicate|delete|remove|move|build my project|import|commit|restore/i.test(
          label,
        )
      ) {
        scheduleSave(1100);
      }
    };

    const handleShortcut = (event: KeyboardEvent) => {
      if (!(event.metaKey || event.ctrlKey) || event.altKey) return;
      const key = event.key.toLowerCase();
      if (key !== "z" && key !== "y") return;
      if (isEditableTarget(event.target)) return;

      const wantsRedo = key === "y" || (key === "z" && event.shiftKey);
      const selector = wantsRedo
        ? '[aria-label="Redo section change"]:not(:disabled)'
        : '[aria-label="Undo section change"]:not(:disabled)';
      const action = document.querySelector<HTMLButtonElement>(selector);
      if (!action) return;

      event.preventDefault();
      action.click();
      scheduleSave(1100);
    };

    const observer = new MutationObserver(() => {
      cleanLegacyChrome();
      if (!document.querySelector(".ai-builder-overlay")) scheduleSave(1400);
    });

    document.addEventListener("input", handleInput, true);
    document.addEventListener("change", handleInput, true);
    document.addEventListener("click", handleClick, true);
    window.addEventListener("keydown", handleShortcut, true);
    window.addEventListener("popstate", rememberCurrentProject);
    observer.observe(document.body, { childList: true, subtree: true });

    cleanLegacyChrome();
    resumeTimer = window.setTimeout(() => {
      document.documentElement.classList.remove("skycode-resuming-project");
      cleanLegacyChrome();
    }, 4000);

    return () => {
      window.clearTimeout(saveTimer);
      window.clearTimeout(resumeTimer);
      observer.disconnect();
      document.removeEventListener("input", handleInput, true);
      document.removeEventListener("change", handleInput, true);
      document.removeEventListener("click", handleClick, true);
      window.removeEventListener("keydown", handleShortcut, true);
      window.removeEventListener("popstate", rememberCurrentProject);
    };
  }, []);

  return null;
}
