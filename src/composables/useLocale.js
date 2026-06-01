import { ref, watch } from "vue";
import { useI18n } from "vue-i18n";
import { useLocale as useVuetifyLocale } from "vuetify";
import { loadLocaleMessages } from "@/i18n";

const RTL_LOCALES = ["ar", "he", "ur", "fa", "ps", "dv"];

export function useLocale() {
  const { locale } = useI18n();
  const { current: vuetifyLocale } = useVuetifyLocale();
  const isRtl = ref(RTL_LOCALES.includes(locale.value));

  const updateHtml = (lang) => {
    const html = document.documentElement;
    const rtl = RTL_LOCALES.includes(lang);

    html.dir = rtl ? "rtl" : "ltr";
    html.lang = lang;

    html.classList.remove("rtl", "ltr");
    html.classList.add(rtl ? "rtl" : "ltr");

    Array.from(html.classList).forEach((cls) => {
      if (cls.startsWith("lang-")) html.classList.remove(cls);
    });
    html.classList.add(`lang-${lang}`);

    localStorage.setItem("locale", lang);
    isRtl.value = rtl;
  };

  const setLocale = async (lang) => {
    if (locale.value === lang) return;
    await loadLocaleMessages(lang);
    locale.value = lang;
    vuetifyLocale.value = lang;
    updateHtml(lang);
  };

  // Initialize on first call
  updateHtml(locale.value);

  // Safety net: if i18n locale changes from elsewhere
  watch(locale, (newLang) => {
    vuetifyLocale.value = newLang;
    updateHtml(newLang);
  });

  return {
    locale,
    isRtl,
    setLocale,
  };
}
