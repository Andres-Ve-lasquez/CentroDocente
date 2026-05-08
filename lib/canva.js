import crypto from "node:crypto";
import { cookies } from "next/headers";

const CANVA_API_BASE = "https://api.canva.com/rest/v1";
const CANVA_AUTH_URL = "https://www.canva.com/api/oauth/authorize";
const DEFAULT_SCOPES = ["design:meta:read", "design:permission:read", "folder:read", "asset:read"];

function base64Url(buffer) {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/g, "");
}

export function createPkcePair() {
  const verifier = base64Url(crypto.randomBytes(64));
  const challenge = base64Url(crypto.createHash("sha256").update(verifier).digest());
  return { verifier, challenge };
}

export function getCanvaConfig() {
  const clientId = process.env.CANVA_CLIENT_ID;
  const clientSecret = process.env.CANVA_CLIENT_SECRET;
  const redirectUri = process.env.CANVA_REDIRECT_URI;

  if (!clientId || !clientSecret || !redirectUri) {
    throw new Error("Canva no esta configurado. Define CANVA_CLIENT_ID, CANVA_CLIENT_SECRET y CANVA_REDIRECT_URI.");
  }

  return { clientId, clientSecret, redirectUri };
}

export function buildCanvaAuthorizationUrl({ challenge, state, scopes = DEFAULT_SCOPES }) {
  const config = getCanvaConfig();
  const url = new URL(CANVA_AUTH_URL);
  url.searchParams.set("code_challenge", challenge);
  url.searchParams.set("code_challenge_method", "S256");
  url.searchParams.set("scope", scopes.join(" "));
  url.searchParams.set("response_type", "code");
  url.searchParams.set("client_id", config.clientId);
  url.searchParams.set("state", state);
  url.searchParams.set("redirect_uri", config.redirectUri);
  return url;
}

function basicAuthHeader() {
  const config = getCanvaConfig();
  const credentials = Buffer.from(`${config.clientId}:${config.clientSecret}`).toString("base64");
  return `Basic ${credentials}`;
}

export async function exchangeCanvaCode({ code, verifier }) {
  const config = getCanvaConfig();
  const body = new URLSearchParams({
    grant_type: "authorization_code",
    code_verifier: verifier,
    code,
    redirect_uri: config.redirectUri
  });

  const response = await fetch(`${CANVA_API_BASE}/oauth/token`, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body,
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "No se pudo obtener token de Canva.");
  }
  return data;
}

export async function getCanvaAccessToken() {
  const cookieStore = await cookies();
  return cookieStore.get("canva_access_token")?.value || process.env.CANVA_ACCESS_TOKEN || "";
}

export async function canvaRequest(path, options = {}) {
  const accessToken = await getCanvaAccessToken();
  if (!accessToken) {
    throw new Error("Canva no esta conectado. Usa el boton Conectar Canva.");
  }

  const url = path.startsWith("http")
    ? path
    : `${CANVA_API_BASE}${path.startsWith("/") ? path : `/${path}`}`;

  const response = await fetch(url, {
    ...options,
    headers: {
      Authorization: `Bearer ${accessToken}`,
      "Content-Type": "application/json",
      ...(options.headers || {})
    },
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || `Canva API ${response.status}`);
  }
  return data;
}

export async function introspectCanvaToken(token) {
  const response = await fetch(`${CANVA_API_BASE}/oauth/introspect`, {
    method: "POST",
    headers: {
      Authorization: basicAuthHeader(),
      "Content-Type": "application/x-www-form-urlencoded"
    },
    body: new URLSearchParams({ token }),
    cache: "no-store"
  });

  const data = await response.json();
  if (!response.ok) {
    throw new Error(data.message || "No se pudo validar token de Canva.");
  }
  return data;
}
