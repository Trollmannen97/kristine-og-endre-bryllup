// Server-side only: never import this module into a client component.
export const ACCESS_COOKIE = "wedding-access";
export const SESSION_SECONDS = 60 * 60 * 24 * 7;
const PASSWORD_SALT = "1c16ae1a39698538954bbb75237fc4a1";
const PASSWORD_HASH = "d0ccdb3cef076f20b5f0b021862ff44954282c5682566e989af2a1d350ecd222";
// Private repository configuration; rotate this key to invalidate all sessions.
const SESSION_KEY = "3b8d50cdb52bd387f804daa22215c3d3ea417df9e303d597fb6aae06dce2aa7e";
const encoder = new TextEncoder();

function hex(bytes: ArrayBuffer) {
  return [...new Uint8Array(bytes)].map(byte => byte.toString(16).padStart(2, "0")).join("");
}

export async function checkPassword(password: string) {
  const key = await crypto.subtle.importKey("raw", encoder.encode(password), "PBKDF2", false, ["deriveBits"]);
  const bits = await crypto.subtle.deriveBits({ name: "PBKDF2", hash: "SHA-256", salt: encoder.encode(PASSWORD_SALT), iterations: 210000 }, key, 256);
  return hex(bits) === PASSWORD_HASH;
}

async function signingKey() {
  return crypto.subtle.importKey("raw", encoder.encode(SESSION_KEY), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

export async function createSession() {
  const expires = String(Math.floor(Date.now() / 1000) + SESSION_SECONDS);
  const signature = await crypto.subtle.sign("HMAC", await signingKey(), encoder.encode(expires));
  return `${expires}.${hex(signature)}`;
}

export async function validSession(token?: string) {
  if (!token || !/^\d{10}\.[a-f0-9]{64}$/.test(token)) return false;
  const [expires, signature] = token.split(".");
  const now = Math.floor(Date.now() / 1000);
  if (Number(expires) <= now || Number(expires) > now + SESSION_SECONDS) return false;
  const bytes = Uint8Array.from(signature.match(/../g)!, byte => parseInt(byte, 16));
  return crypto.subtle.verify("HMAC", await signingKey(), bytes, encoder.encode(expires));
}
