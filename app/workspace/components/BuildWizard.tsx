"use client";

import Link from "next/link";
import {
  categoryOptions,
  type ProjectCategory,
} from "../project-generator";
import { Icon } from "./WorkspaceIcons";

export type AiMode = "instant" | "cloud";

type BuildWizardProps = {
  open: boolean;
  selectedCategory: ProjectCategory | null;
  buildPrompt: string;
  aiMode: AiMode;
  cloudConnected: boolean;
  cloudConfigured: boolean;
  cloudAuthenticated: boolean;
  cloudConnecting: boolean;
  aiWorking: boolean;
  onClose: () => void;
  onSelectCategory: (category: ProjectCategory | null) => void;
  onPromptChange: (prompt: string) => void;
  onAiModeChange: (mode: AiMode) => void;
  onConnectCloudAi: () => void;
  onDisconnectCloudAi: () => void;
  onSubmit: () => void;
};

export function BuildWizard({
  open,
  selectedCategory,
  buildPrompt,
  aiMode,
  cloudConnected,
  cloudConfigured,
  cloudAuthenticated,
  cloudConnecting,
  aiWorking,
  onClose,
  onSelectCategory,
  onPromptChange,
  onAiModeChange,
  onConnectCloudAi,
  onDisconnectCloudAi,
  onSubmit,
}: BuildWizardProps) {
  if (!open) return null;

  const selectedCategoryOption = categoryOptions.find(
    (option) => option.id === selectedCategory,
  );

  return (
    <div className="ai-builder-overlay" role="presentation">
      <section
        className="ai-builder-dialog"
        role="dialog"
        aria-modal="true"
        aria-labelledby="ai-builder-title"
      >
        <div className="builder-topline">
          <Link className="builder-brand" href="/" aria-label="SkyCode home">
            <span className="logo-mark"><i /></span>
            <strong>SkyCode</strong>
          </Link>
          <span className="free-builder-badge">FREE BUILDER</span>
          <button
            className="builder-close"
            onClick={onClose}
            aria-label="Close build wizard"
          >
            ×
          </button>
        </div>

        {!selectedCategory ? (
          <div className="builder-category-step">
            <span className="builder-step">STEP 1 OF 2</span>
            <h1 id="ai-builder-title">What do you want to build?</h1>
            <p>
              Choose a project type first. Sky AI will shape the files, layout,
              and interactions around it.
            </p>
            <div className="category-grid">
              {categoryOptions.map((option) => (
                <button
                  key={option.id}
                  onClick={() => onSelectCategory(option.id)}
                >
                  <span>{option.icon}</span>
                  <div>
                    <b>{option.title}</b>
                    <small>{option.description}</small>
                  </div>
                  <i>→</i>
                </button>
              ))}
            </div>
            <div className="builder-trust-row">
              <span>✓ No payment</span>
              <span>✓ No login for Instant Builder</span>
              <span>✓ Live sandbox preview</span>
            </div>
          </div>
        ) : (
          <div className="builder-prompt-step">
            <button
              className="builder-back"
              onClick={() => onSelectCategory(null)}
            >
              ← Back
            </button>
            <span className="builder-step">STEP 2 OF 2</span>
            <div className="selected-category">
              <span>{selectedCategoryOption?.icon}</span>
              <div>
                <b>{selectedCategoryOption?.title}</b>
                <small>{selectedCategoryOption?.description}</small>
              </div>
            </div>
            <h1 id="ai-builder-title">Describe your idea</h1>
            <p>
              Include the purpose, style, colors, sections, and functions you
              want. You can write in Kurdish or English.
            </p>
            <div className="builder-prompt-input">
              <textarea
                autoFocus
                value={buildPrompt}
                onChange={(event) => onPromptChange(event.target.value)}
                onKeyDown={(event) => {
                  if (
                    event.key === "Enter" &&
                    (event.metaKey || event.ctrlKey)
                  ) {
                    event.preventDefault();
                    onSubmit();
                  }
                }}
                placeholder={selectedCategoryOption?.example}
                maxLength={3000}
              />
              <div>
                <button
                  onClick={() =>
                    onPromptChange(selectedCategoryOption?.example ?? "")
                  }
                >
                  Use example
                </button>
                <span>{buildPrompt.length}/3000</span>
              </div>
            </div>

            <div className="engine-heading">
              <span>Choose how to build</span>
              <small>You can switch later</small>
            </div>
            <div className="engine-options">
              <button
                className={aiMode === "instant" ? "active" : ""}
                onClick={() => onAiModeChange("instant")}
              >
                <span className="engine-icon">⚡</span>
                <div>
                  <b>Instant Builder <em>RECOMMENDED</em></b>
                  <p>
                    Always free, no account, runs immediately in your browser.
                  </p>
                </div>
                <i>{aiMode === "instant" ? "✓" : ""}</i>
              </button>
              <button
                className={
                  aiMode === "cloud" && cloudConnected
                    ? "active cloud"
                    : "cloud"
                }
                onClick={() => {
                  if (cloudConnected) onAiModeChange("cloud");
                  else onConnectCloudAi();
                }}
                disabled={cloudConnecting}
              >
                <span className="engine-icon">☁</span>
                <div>
                  <b>
                    Server Cloud AI {cloudConnected && <em>READY</em>}
                  </b>
                  <p>
                    {cloudConnected
                      ? "Uses the protected backend API key and per-user quota."
                      : !cloudConfigured
                        ? "Backend ready; add the server API key to activate it."
                        : !cloudAuthenticated
                          ? "Sign in with ChatGPT to protect usage and cost."
                          : "Activate stronger model-powered edits."}
                  </p>
                </div>
                <i>
                  {aiMode === "cloud" && cloudConnected
                    ? "✓"
                    : cloudConnecting
                      ? "…"
                      : "↗"}
                </i>
              </button>
            </div>
            <p className="cloud-privacy-note">
              {cloudConnected ? (
                <>
                  Prompts and current project files pass through SkyCode&apos;s
                  protected backend to OpenRouter. The API key never enters the
                  browser.{" "}
                  <button onClick={onDisconnectCloudAi}>Disconnect</button>
                </>
              ) : (
                "Instant Builder remains free and local. Server Cloud AI requires sign-in and is protected by rate and daily limits."
              )}
            </p>

            <button
              className="build-project-button"
              disabled={
                !buildPrompt.trim() ||
                aiWorking ||
                (aiMode === "cloud" && !cloudConnected)
              }
              onClick={onSubmit}
            >
              <Icon name="spark" size={17} />
              {aiWorking ? "Building your project…" : "Build my project"}
              <span>→</span>
            </button>
            <small className="builder-shortcut">
              Ctrl / ⌘ + Enter to build
            </small>
          </div>
        )}
      </section>
    </div>
  );
}
