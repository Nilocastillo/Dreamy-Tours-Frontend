"use client";

import * as React from "react";
import {
  Combobox,
  ComboboxInput,
  ComboboxContent,
  ComboboxList,
  ComboboxItem,
} from "@/components/ui/combobox";
import { LANGS, type Lang } from "@/lib/i18n";

const languageNames: Record<Lang, string> = {
  en: "Ingles",
  es: "Español",
  pt: "Portugues",
};

export function LanguageSwitcher({ currentLang }: { currentLang: Lang }) {
  const [value, setValue] = React.useState(currentLang);

  const handleValueChange = (val: string | null) => {
    if (!val || val === currentLang) return;

    setValue(val as Lang);

    const pathname = window.location.pathname;
    let newPathname = pathname;

    // Buscar mapa de slugs para tours localizados
    const slugMapEl = document.getElementById("tour-slug-map");
    if (slugMapEl) {
      try {
        const slugMap: Record<string, string> = JSON.parse(
          slugMapEl.textContent ?? "{}"
        );
        const targetSlug = slugMap[val];
        if (targetSlug) {
          newPathname = `/${val}/${targetSlug}`;
          window.location.href = newPathname;
          return;
        }
      } catch { }
    }

    // Fallback: reemplazar solo el prefijo de idioma
    const currentPrefix = LANGS.find(l => pathname.startsWith(`/${l}`) && (pathname.length === l.length + 1 || pathname.charAt(l.length + 1) === '/'));

    if (currentPrefix) {
      newPathname = pathname.replace(`/${currentPrefix}`, val === 'en' ? '' : `/${val}`);
      if (newPathname === '') newPathname = '/';
    } else {
      if (val !== 'en') {
        newPathname = `/${val}${pathname === '/' ? '' : pathname}`;
      }
    }

    window.location.href = newPathname;
  };

  return (
    <div className="w-30">
      <Combobox
        value={value}
        onValueChange={(val) => handleValueChange(val as string)}
      >
        <ComboboxInput
          readOnly
          showTrigger
          showClear={false}
          value={languageNames[value as Lang]}
          className="cursor-pointer bg-white border shadow-sm"
        />
        <ComboboxContent align="end" sideOffset={4}>
          <ComboboxList>
            {LANGS.map((lang) => (
              <ComboboxItem key={lang} value={lang}>
                {languageNames[lang]}
              </ComboboxItem>
            ))}
          </ComboboxList>
        </ComboboxContent>
      </Combobox>
    </div>
  );
}
