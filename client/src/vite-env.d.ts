interface ViteTypeOptions {
  strictImportMetaEnv: true;
}

interface ImportMetaEnv {
  VITE_BACKEND_URL: string;
}

interface ImportMeta {
  readonly env: ImportMetaEnv;
}
