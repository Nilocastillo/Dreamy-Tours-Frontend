"use client";

import { useState } from "react";
import type { Menu as MenuType, MenuItem, Link, Logo } from "@/interface/global";
import type { Lang } from "@/lib/i18n";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
} from "@/components/ui/navigation-menu";
import { Menu, X, ChevronDown } from "lucide-react";
import { LanguageSwitcher } from "./LanguageSwitcher";

interface MainMenuProps {
  menu: MenuType;
  logo: Logo;
  lang: Lang;
}

export default function MainMenu({ menu, logo, lang }: MainMenuProps) {
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      {/* =======================
          DESKTOP (lg+)
          ======================= */}
      <NavigationMenu className="hidden lg:flex w-full mx-auto">
        <NavigationMenuList className="gap-4">
          {menu?.menuItems?.map((menuItem: MenuItem) => {
            const hasChildren =
              Array.isArray(menuItem.item) && menuItem.item.length > 0;

            return (
              <NavigationMenuItem key={menuItem.id}>
                {hasChildren ? (
                  <>
                    <NavigationMenuTrigger
                      onClick={() => {
                        if (menuItem.link?.url) {
                          window.location.href = menuItem.link.url;
                        }
                      }}
                    >
                      {menuItem.link.label}
                    </NavigationMenuTrigger>

                    <NavigationMenuContent>
                      <ul className="grid w-[320px] gap-2 p-4 md:w-[420px] md:grid-cols-2">
                        {menuItem.item.map((subItem: Link) => (
                          <li key={subItem.id}>
                            <NavigationMenuLink asChild>
                              <a
                                href={subItem.url || "#"}
                                className="block rounded-md px-3 py-2 text-sm text-foreground/70 transition-colors duration-200 hover:text-primary"
                              >
                                {subItem.label}
                              </a>
                            </NavigationMenuLink>
                          </li>
                        ))}
                      </ul>
                    </NavigationMenuContent>
                  </>
                ) : (
                  <NavigationMenuLink asChild>
                    <a
                      href={menuItem.link.url || "#"}
                      className="px-4 py-2 text-base font-medium text-foreground/80 transition-colors duration-200 hover:text-primary"
                    >
                      {menuItem.link.label}
                    </a>
                  </NavigationMenuLink>
                )}
              </NavigationMenuItem>
            );
          })}
        </NavigationMenuList>
      </NavigationMenu>

      {/* =======================
          MOBILE (< lg)
          ======================= */}
      <div className="lg:hidden">
        {/* Mobile Header: Hamburguesa, Idioma, Logo */}
        <div className="flex items-center justify-between px-4 py-3 bg-background">
          {/* Logo a la derecha */}
          <div className="flex-1 flex">
            {logo && (
              <a
                href={logo.url || "/"}
                target={logo.isExternal ? "_blank" : "_self"}
                rel={logo.isExternal ? "noopener noreferrer" : undefined}
                className="block"
              >
                {logo.imagen && (
                  <img
                    src={`http://localhost:1337${logo.imagen.url}`}
                    alt={logo.imagen.alternativeText ?? logo.label ?? "Logo"}
                    className="h-10 w-auto"
                  />
                )}
              </a>
            )}
          </div>
          {/* Idioma al medio */}
          <div className="flex-1 flex justify-center">
            {lang && <LanguageSwitcher currentLang={lang} />}
          </div>
          {/* Hamburgesa */}
          <div className="flex-1 flex justify-end">
            <button
              onClick={() => setMobileOpen(!mobileOpen)}
              className="p-2 rounded-md -ml-2 text-foreground/70 transition-colors duration-200 hover:text-primary"
              aria-label="Toggle menu"
            >
              {mobileOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

        </div>

        {/* Mobile menu dropdown and overlay */}
        {mobileOpen && (
          <>
            {/* Overlay */}
            <div
              className="fixed inset-0 z-40 bg-black/50"
              onClick={() => setMobileOpen(false)}
              aria-hidden="true"
            />
            {/* Menu items */}
            <div className="absolute top-[64px] left-0 w-full z-50 bg-background pb-4 rounded-b-lg">
              {/* Botón de cerrar */}
              <div className="flex justify-end px-4 pt-4">
                <button
                  onClick={() => setMobileOpen(false)}
                  className="p-2 -mr-2 rounded-md text-muted-foreground transition-colors duration-200 hover:text-primary"
                  aria-label="Cerrar menú"
                >
                  <X size={24} />
                </button>
              </div>

              <ul className="flex flex-col divide-y divide-border/50 px-4 py-2">
                {menu?.menuItems?.map((menuItem: MenuItem) => {
                  const hasChildren =
                    Array.isArray(menuItem.item) && menuItem.item.length > 0;

                  return (
                    <li key={menuItem.id}>
                      {hasChildren ? (
                        <MobileAccordion item={menuItem} closeMenu={() => setMobileOpen(false)} />
                      ) : (
                        <a
                          href={menuItem.link.url || "#"}
                          className="block py-3 font-medium text-foreground/80 transition-colors duration-200 hover:text-primary"
                          onClick={() => setMobileOpen(false)}
                        >
                          {menuItem.link.label}
                        </a>
                      )}
                    </li>
                  );
                })}
              </ul>
            </div>
          </>
        )}
      </div>
    </>
  );
}

/* =======================
   MOBILE ACCORDION
   ======================= */
interface MobileAccordionProps {
  item: MenuItem;
  closeMenu: () => void;
}

function MobileAccordion({ item, closeMenu }: MobileAccordionProps) {
  const [open, setOpen] = useState(false);

  return (
    <div>
      {/* TÍTULO = TOGGLE */}
      <button
        onClick={() => setOpen(!open)}
        className="flex w-full items-center justify-between py-3 font-medium text-foreground/80 transition-colors duration-200 hover:text-primary"
        aria-expanded={open}
      >
        {item.link.label}
        <ChevronDown
          size={18}
          className={`transition-transform ${open ? "rotate-180" : ""
            }`}
        />
      </button>

      {/* Submenu */}
      {open && (
        <ul className="ml-4 mt-2 flex flex-col gap-1">
          {item.item.map((subItem: Link) => (
            <li key={subItem.id}>
              <a
                href={subItem.url || "#"}
                className="block rounded px-2 py-1.5 text-sm text-foreground/60 transition-colors duration-200 hover:text-primary"
                onClick={closeMenu}
              >
                {subItem.label}
              </a>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}