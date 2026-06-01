import { createI18n } from "vue-i18n";
import en from "./locales/en.json";

const savedLocale = localStorage.getItem("locale") || "en";

const i18n = createI18n({
  legacy: false,
  locale: savedLocale,
  fallbackLocale: "en",
  globalInjection: true,
  messages: { en }, // initial bundled locale
});

// Lazy-load other locales on demand
export async function loadLocaleMessages(locale) {
  if (i18n.global.availableLocales.includes(locale)) return;
  const messages = await import(`./locales/${locale}.json`);
  i18n.global.setLocaleMessage(locale, messages.default);
}

export default i18n;
