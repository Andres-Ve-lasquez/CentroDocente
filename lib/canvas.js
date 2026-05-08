function normalizeBaseUrl(value) {
  return String(value || "").replace(/\/+$/, "");
}

export function getCanvasConfig() {
  const baseUrl = normalizeBaseUrl(process.env.CANVAS_BASE_URL);
  const accessToken = process.env.CANVAS_ACCESS_TOKEN;

  if (!baseUrl || !accessToken) {
    throw new Error("Canvas no esta configurado. Define CANVAS_BASE_URL y CANVAS_ACCESS_TOKEN.");
  }

  return {
    baseUrl,
    accessToken,
    accountId: process.env.CANVAS_ACCOUNT_ID || "1"
  };
}

function parseNextLink(linkHeader) {
  if (!linkHeader) return null;
  const links = linkHeader.split(",").map((part) => part.trim());
  const next = links.find((part) => part.includes('rel="next"'));
  const match = next?.match(/<([^>]+)>/);
  return match?.[1] ?? null;
}

export async function canvasRequest(path, options = {}) {
  const config = getCanvasConfig();
  const url = path.startsWith("http")
    ? path
    : `${config.baseUrl}/api/v1${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${config.accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    cache: "no-store"
  });

  if (!response.ok) {
    const text = await response.text();
    throw new Error(`Canvas API ${response.status}: ${text.slice(0, 400)}`);
  }

  if (response.status === 204) {
    return { data: null, nextUrl: null };
  }

  return {
    data: await response.json(),
    nextUrl: parseNextLink(response.headers.get("link"))
  };
}

export async function canvasPaginatedRequest(path, maxPages = 5) {
  let nextPath = path;
  const results = [];
  let pages = 0;

  while (nextPath && pages < maxPages) {
    const { data, nextUrl } = await canvasRequest(nextPath);
    results.push(...(Array.isArray(data) ? data : [data]));
    nextPath = nextUrl;
    pages += 1;
  }

  return results;
}
