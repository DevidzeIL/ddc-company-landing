import { createContext, useContext } from "react";
import { translations, type Locale, type Translations } from "./translations";

export const LocaleContext = createContext<Locale>("ru");

export function useT(): Translations {
  const locale = useContext(LocaleContext);
  return translations[locale] as Translations;
}

export function useLocale(): Locale {
  return useContext(LocaleContext);
}
