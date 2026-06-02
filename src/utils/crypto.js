import CryptoJS from "crypto-js";

const SECRET_KEY =
  import.meta.env.VITE_APP_CRYPTO_KEY || "A-R-Key";

export const crypto = {
  encrypt(data) {
    try {
      const json = JSON.stringify(data);
      const encrypted = CryptoJS.AES.encrypt(json, SECRET_KEY).toString();
      console.log("[crypto] encrypt success, length:", encrypted.length);
      return encrypted;
    } catch (e) {
      console.error("[crypto] encrypt failed:", e);
      throw e;
    }
  },

  decrypt(ciphertext) {
    try {
      if (!ciphertext) return null;
      const bytes = CryptoJS.AES.decrypt(ciphertext, SECRET_KEY);
      const str = bytes.toString(CryptoJS.enc.Utf8);
      if (!str) {
        console.warn("[crypto] decrypt returned empty string");
        return null;
      }
      return JSON.parse(str);
    } catch (e) {
      console.error("[crypto] decrypt failed:", e);
      return null;
    }
  },
};