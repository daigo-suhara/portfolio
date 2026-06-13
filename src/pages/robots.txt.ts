import type { APIRoute } from "astro";

export const GET: APIRoute = ({ site }) => {
  const siteUrl = site?.href ?? "https://daigo-suhara.com";
  return new Response(
    `User-agent: *\nAllow: /\n\nSitemap: ${siteUrl}sitemap-index.xml\n`,
    { headers: { "Content-Type": "text/plain" } },
  );
};
