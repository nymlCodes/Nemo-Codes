'use server';

import { Project } from '../types';

/**
 * Fetch all projects directly from backend API.
 * Uses NEXT_PUBLIC_SERVER_URL from environment.
 * The API response is the exclusive source of truth.
 */
const getProjects = async (): Promise<Project[]> => {
  const rawServerUrl = process.env.NEXT_PUBLIC_SERVER_URL || '';
  const baseUrl = rawServerUrl ? rawServerUrl.replace(/\/+$/, '') : '';

  if (!baseUrl) {
    console.error('[API Error] NEXT_PUBLIC_SERVER_URL environment variable is not defined.');
    return [];
  }

  const endpoint = `${baseUrl}/projects`;

  try {
    const res = await fetch(endpoint, {
      cache: 'no-store',
    });

    if (!res.ok) {
      console.error(`[API Error] Failed to fetch projects (${res.status} ${res.statusText}) from ${endpoint}`);
      return [];
    }

    const projects: Project[] = await res.json();
    return Array.isArray(projects) ? projects : [];
  } catch (error) {
    console.error(`[API Error] Connection error while fetching projects from ${endpoint}:`, error);
    return [];
  }
};

export default getProjects;
