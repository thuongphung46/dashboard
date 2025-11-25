/** @format */

/// <reference types="vite/client" />
// Provide typing for import.meta.env used in the project.
// Add any VITE_ variables you expect to use here.

interface ImportMetaEnv {
  readonly VITE_API_BASE_URL?: string;
  // more env vars...
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
