export const fallbackLng = "en";
export const languages = [fallbackLng, "ru", "ua"];
export const defaultNS = "translations";
export const cookieName = "language";

export const languageToLocale = (lng: string) => (lng === "ua" ? "uk" : lng);
export const localeToLanguage = (locale: string) => (locale === "uk" ? "ua" : locale);

export function getOptions(lng = fallbackLng, ns = defaultNS) {
  return {
    supportedLngs: languages,
    fallbackLng,
    lng,
    fallbackNS: defaultNS,
    defaultNS,
    ns,
  };
}
