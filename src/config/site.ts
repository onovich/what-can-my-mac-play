const defaultSiteUrl = 'https://macplay.onovich.com'

export const siteUrl = import.meta.env.VITE_SITE_URL || defaultSiteUrl
export const siteHost = new URL(siteUrl).host
