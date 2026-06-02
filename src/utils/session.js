import CryptoJS from "crypto-js";

const SESSION_KEY = "__app_session";
const MAX_AGE_MS = 2 * 60 * 60 * 1000; // 2 hours
const SECRET_KEY =
  import.meta.env.VITE_APP_CRYPTO_KEY || "A-R-Key";

// ─── Native cookie helpers (zero external dependencies) ───
function setCookie(name, value, hours) {
  const expires = new Date(Date.now() + hours * 60 * 60 * 1000).toUTCString();
  const secure = window.location.protocol === "https:" ? "; Secure" : "";
  document.cookie = `${name}=${encodeURIComponent(value)}; expires=${expires}; path=/; SameSite=Lax${secure}`;
}

function getCookie(name) {
  const all = document.cookie.split(";");
  for (const c of all) {
    const trimmed = c.trim();
    if (!trimmed.startsWith(name + "=")) continue;
    const value = trimmed.slice(name.length + 1);
    try {
      return decodeURIComponent(value);
    } catch (e) {
      console.warn("[session] decodeURIComponent failed, returning raw", e);
      return value;
    }
  }
  return null;
}

function deleteCookie(name) {
  document.cookie = `${name}=; expires=Thu, 01 Jan 1970 00:00:00 GMT; path=/; SameSite=Lax`;
}

// ─── Encryption ───
function encrypt(data) {
  const json = JSON.stringify(data);
  try {
    return CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
  } catch (e) {
    console.warn("[session] AES failed, using base64 fallback", e);
    return "b64:" + btoa(json);
  }
}

function decrypt(ciphertext) {
  if (!ciphertext) return null;
  try {
    if (ciphertext.startsWith("b64:")) {
      return JSON.parse(atob(ciphertext.slice(4)));
    }
    const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
    const str = bytes.toString(CryptoJS.enc.Utf8);
    if (!str) {
      console.warn("[session] AES decrypted to empty string");
      return null;
    }
    return JSON.parse(str);
  } catch (e) {
    console.error("[session] decrypt failed:", e);
    return null;
  }
}

// ─── Public API ───
export const session = {
  set(data) {
    const payload = { ...data, _issuedAt: Date.now() };
    const encrypted = encrypt(payload);
    setCookie(SESSION_KEY, encrypted, 2);
    console.log("[session] cookie SET");
  },

  get() {
    const raw = getCookie(SESSION_KEY);
    if (!raw) {
      console.log("[session] cookie NOT FOUND");
      return null;
    }

    const payload = decrypt(raw);
    if (!payload || !payload._issuedAt) {
      console.warn("[session] invalid payload, clearing");
      this.remove();
      return null;
    }

    const elapsed = Date.now() - payload._issuedAt;
    if (elapsed > MAX_AGE_MS) {
      console.log("[session] EXPIRED, elapsed:", elapsed);
      this.remove();
      return null;
    }

    console.log("[session] VALID, elapsed:", elapsed, "ms");
    return payload;
  },

  remove() {
    deleteCookie(SESSION_KEY);
    console.log("[session] removed");
  },

  isValid() {
    return this.get() !== null;
  },
};

// ─── Debug helper (type in browser console) ───
window.checkSession = () => {
  console.log("document.cookie:", document.cookie);
  console.log("parsed:", session.get());
};