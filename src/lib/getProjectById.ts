import { Project } from '../types';

/**
 * Fetch a single project by ID or slug directly from backend API.
 * Uses NEXT_PUBLIC_SERVER_URL from environment.
 * The API response is the exclusive source of truth.
 */
export default async function getProjectById(id: string): Promise<Project | null> {
  const rawServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
  const baseUrl = rawServerUrl ? rawServerUrl.replace(/\/+$/, '') : '';

  if (!baseUrl) {
    console.error('[API Error] NEXT_PUBLIC_SERVER_URL is not set.');
    return null;
  }

  // 1. If ID is a 24-character hex string (MongoDB ObjectId), query /projects/:id directly
  const isObjectId = /^[0-9a-fA-F]{24}$/.test(id);
  if (isObjectId) {
    try {
      const endpoint = `${baseUrl}/projects/${id}`;
      const res = await fetch(endpoint, { cache: 'no-store' });
      if (res.ok) {
        const project: Project = await res.json();
        if (project && (project.title || project._id)) {
          return project;
        }
      }
    } catch (err) {
      console.error(`[API Error] Failed to fetch project ${id} directly:`, err);
    }
  }

  // 2. Query /projects list to resolve by slug, title, or _id
  try {
    const listEndpoint = `${baseUrl}/projects`;
    const res = await fetch(listEndpoint, { cache: 'no-store' });
    if (res.ok) {
      const projects: Project[] = await res.json();
      if (Array.isArray(projects)) {
        const match = projects.find(
          (p) =>
            p._id === id ||
            p.id === id ||
            p.title.toLowerCase().replace(/\s+/g, '-') === id.toLowerCase() ||
            p.title.toLowerCase() === id.toLowerCase()
        );
        if (match) return match;
      }
    }
  } catch (err) {
    console.error(`[API Error] Failed to resolve project from ${baseUrl}/projects:`, err);
  }

  return null;
}
