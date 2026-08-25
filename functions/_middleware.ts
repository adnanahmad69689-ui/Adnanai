type PagesContext = {
  request: Request;
  next: () => Promise<Response>;
};

const privateRoutes = new Set(["/admin", "/reset-password"]);
const crawlAssets = new Set(["/robots.txt", "/sitemap.xml"]);

function isStaticAsset(pathname: string) {
  const finalSegment = pathname.split("/").pop() ?? "";
  return finalSegment.includes(".");
}

export const onRequest = async ({ request, next }: PagesContext) => {
  const url = new URL(request.url);
  const response = await next();
  const headers = new Headers(response.headers);
  const isPrivate = privateRoutes.has(url.pathname);
  const isUnknownHtmlRoute = !isPrivate && !url.pathname.startsWith("/api/") && !isStaticAsset(url.pathname) && url.pathname !== "/";

  headers.set("X-Content-Type-Options", "nosniff");
  headers.set("Referrer-Policy", "strict-origin-when-cross-origin");
  headers.set("Permissions-Policy", "camera=(), geolocation=(), microphone=()");
  headers.set("Strict-Transport-Security", "max-age=31536000; includeSubDomains");
  if (crawlAssets.has(url.pathname)) {
    headers.set("Cache-Control", "public, max-age=0, must-revalidate");
  }

  if (isPrivate || isUnknownHtmlRoute) {
    headers.set("X-Robots-Tag", "noindex, nofollow, noarchive");
  }

  if (isPrivate && headers.get("content-type")?.includes("text/html")) {
    const html = await response.text();
    const privateHtml = html
      .replace(
        '<meta name="robots" content="index,follow,max-image-preview:large" />',
        '<meta name="robots" content="noindex,nofollow,noarchive" />'
      )
      .replace('<link rel="canonical" href="https://adnanai.com/" />', "");

    return new Response(privateHtml, { status: response.status, headers });
  }

  if (isUnknownHtmlRoute && headers.get("content-type")?.includes("text/html")) {
    return new Response(response.body, { status: 404, headers });
  }

  return new Response(response.body, { status: response.status, headers });
};
