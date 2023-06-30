export const serverPort = Number(process.env.PORT ?? 3000);

export const siteName: string = process.env.NEXT_PUBLIC_SITE_NAME ?? "Unknown";

export const siteUrl: string = process.env.NEXT_PUBLIC_SITE_URL ?? "/";
