/**
 * Centralized site configuration.
 * Allows custom domain configuration via NEXT_PUBLIC_SITE_URL environment variable
 * while maintaining a safe fallback to the default production domain.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL?.trim().replace(/\/+$/, '') || 'https://muneebhassan.dev'
)
