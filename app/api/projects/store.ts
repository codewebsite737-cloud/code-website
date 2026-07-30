import { getD1Binding } from "../../../db";
import {
  MAX_PROJECTS_PER_USER,
  type ProjectFiles,
} from "./policy";

const AUDIT_RETENTION_DAYS = 180;

type ProjectRow = {
  id: string;
  owner_email: string;
  name: string;
  template: string;
  files_json: string;
  created_at: string;
  updated_at: string;
};

type ProjectSummaryRow = Pick<
  ProjectRow,
  "id" | "name" | "template" | "created_at" | "updated_at"
>;

export type NewProject = {
  id: string;
  ownerEmail: string;
  name: string;
  template: string;
  files: ProjectFiles;
  createdAt: string;
  updatedAt: string;
};

function auditCutoff() {
  return new Date(
    Date.now() - AUDIT_RETENTION_DAYS * 24 * 60 * 60 * 1000,
  ).toISOString();
}

export async function findOwnedProject(ownerEmail: string, id: string) {
  const row = await getD1Binding()
    .prepare(
      `SELECT
        id,
        owner_email,
        name,
        template,
        files_json,
        created_at,
        updated_at
      FROM projects
      WHERE id = ? AND owner_email = ?
      LIMIT 1`,
    )
    .bind(id, ownerEmail)
    .first<ProjectRow>();
  if (!row) return null;

  return {
    id: row.id,
    name: row.name,
    template: row.template,
    files: JSON.parse(row.files_json) as ProjectFiles,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  };
}

export async function listOwnedProjects(ownerEmail: string) {
  const result = await getD1Binding()
    .prepare(
      `SELECT id, name, template, created_at, updated_at
      FROM projects
      WHERE owner_email = ?
      ORDER BY updated_at DESC
      LIMIT ?`,
    )
    .bind(ownerEmail, MAX_PROJECTS_PER_USER)
    .all<ProjectSummaryRow>();

  return (result.results ?? []).map((row: ProjectSummaryRow) => ({
    id: row.id,
    name: row.name,
    template: row.template,
    createdAt: row.created_at,
    updatedAt: row.updated_at,
  }));
}

export async function createOwnedProject(project: NewProject) {
  const binding = getD1Binding();
  const eventId = crypto.randomUUID();
  const results = await binding.batch([
    binding
      .prepare(
        `INSERT INTO projects (
          id,
          owner_email,
          name,
          template,
          files_json,
          created_at,
          updated_at
        )
        SELECT ?, ?, ?, ?, ?, ?, ?
        WHERE (
          SELECT COUNT(*) FROM projects WHERE owner_email = ?
        ) < ?`,
      )
      .bind(
        project.id,
        project.ownerEmail,
        project.name,
        project.template,
        JSON.stringify(project.files),
        project.createdAt,
        project.updatedAt,
        project.ownerEmail,
        MAX_PROJECTS_PER_USER,
      ),
    binding
      .prepare(
        `INSERT INTO project_audit_events (
          id,
          owner_email,
          action,
          project_id,
          created_at
        )
        SELECT ?, ?, 'project.create', ?, ?
        WHERE EXISTS (
          SELECT 1 FROM projects WHERE id = ? AND owner_email = ?
        )`,
      )
      .bind(
        eventId,
        project.ownerEmail,
        project.id,
        project.createdAt,
        project.id,
        project.ownerEmail,
      ),
    binding
      .prepare("DELETE FROM project_audit_events WHERE created_at < ?")
      .bind(auditCutoff()),
  ]);

  return (results[0]?.meta.changes ?? 0) === 1;
}

export async function updateOwnedProject({
  id,
  ownerEmail,
  name,
  files,
  updatedAt,
}: {
  id: string;
  ownerEmail: string;
  name: string;
  files: ProjectFiles;
  updatedAt: string;
}) {
  const binding = getD1Binding();
  const results = await binding.batch([
    binding
      .prepare(
        `UPDATE projects
        SET name = ?, files_json = ?, updated_at = ?
        WHERE id = ? AND owner_email = ?`,
      )
      .bind(name, JSON.stringify(files), updatedAt, id, ownerEmail),
    binding
      .prepare(
        `INSERT INTO project_audit_events (
          id,
          owner_email,
          action,
          project_id,
          created_at
        )
        SELECT ?, ?, 'project.update', ?, ?
        WHERE EXISTS (
          SELECT 1 FROM projects WHERE id = ? AND owner_email = ?
        )`,
      )
      .bind(
        crypto.randomUUID(),
        ownerEmail,
        id,
        updatedAt,
        id,
        ownerEmail,
      ),
    binding
      .prepare("DELETE FROM project_audit_events WHERE created_at < ?")
      .bind(auditCutoff()),
  ]);

  return (results[0]?.meta.changes ?? 0) === 1;
}

export async function deleteOwnedProject(ownerEmail: string, id: string) {
  const binding = getD1Binding();
  const now = new Date().toISOString();
  const results = await binding.batch([
    binding
      .prepare(
        `INSERT INTO project_audit_events (
          id,
          owner_email,
          action,
          project_id,
          created_at
        )
        SELECT ?, ?, 'project.delete', ?, ?
        WHERE EXISTS (
          SELECT 1 FROM projects WHERE id = ? AND owner_email = ?
        )`,
      )
      .bind(crypto.randomUUID(), ownerEmail, id, now, id, ownerEmail),
    binding
      .prepare("DELETE FROM projects WHERE id = ? AND owner_email = ?")
      .bind(id, ownerEmail),
    binding
      .prepare("DELETE FROM project_audit_events WHERE created_at < ?")
      .bind(auditCutoff()),
  ]);

  return (results[1]?.meta.changes ?? 0) === 1;
}
