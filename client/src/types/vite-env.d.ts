/// <reference types="vite/client" />

interface ImportMetaEnv {
  readonly VITE_APP_BASE_URL?: string
  readonly VITE_AGENT_SKILL_URL?: string
  readonly VITE_GRAPHQL_SCHEMA_URL?: string
  readonly VITE_HTTP_LINK?: string
}

interface ImportMeta {
  readonly env: ImportMetaEnv
}
