export const LANGS = ["en", "es", "pt"] as const;
export type Lang = (typeof LANGS)[number];
export const DEFAULT_LANG: Lang = "en";
export function isValidLang(value: string | undefined): value is Lang {
  return !!value && LANGS.includes(value as Lang);
}