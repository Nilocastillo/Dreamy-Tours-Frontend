import * as React from "react"
import { cva } from "class-variance-authority"
import { ChevronDownIcon } from "lucide-react"
import * as NavigationMenuPrimitive from "@radix-ui/react-navigation-menu"

import { cn } from "@/lib/utils"

/* -------------------------------------------------------------------------- */
/* ROOT                                                                       */
/* -------------------------------------------------------------------------- */

function NavigationMenu({
  className,
  children,
  viewport = false, // 👈 DESACTIVADO por defecto
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Root> & {
  viewport?: boolean
}) {
  return (
    <NavigationMenuPrimitive.Root
      data-slot="navigation-menu"
      data-viewport={viewport}
      className={cn(
        "relative flex max-w-max flex-1 items-center justify-center",
        className
      )}
      {...props}
    >
      {children}
    </NavigationMenuPrimitive.Root>
  )
}

/* -------------------------------------------------------------------------- */
/* LIST                                                                       */
/* -------------------------------------------------------------------------- */

function NavigationMenuList({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.List>) {
  return (
    <NavigationMenuPrimitive.List
      data-slot="navigation-menu-list"
      className={cn(
        "flex list-none items-center gap-1",
        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* ITEM                                                                       */
/* -------------------------------------------------------------------------- */

function NavigationMenuItem({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Item>) {
  return (
    <NavigationMenuPrimitive.Item
      data-slot="navigation-menu-item"
      className={cn("relative", className)} // 👈 CLAVE
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* TRIGGER                                                                    */
/* -------------------------------------------------------------------------- */

const navigationMenuTriggerStyle = cva(
  "group inline-flex h-9 items-center justify-center rounded-md bg-background px-4 py-2 text-base font-medium text-foreground/80 transition-colors duration-200 hover:text-primary focus:text-primary focus:outline-none"
)

function NavigationMenuTrigger({
  className,
  children,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Trigger>) {
  return (
    <NavigationMenuPrimitive.Trigger
      data-slot="navigation-menu-trigger"
      className={cn(navigationMenuTriggerStyle(), className)}
      {...props}
    >
      {children}
      <ChevronDownIcon
        className="ml-1 size-3 transition-transform duration-200 group-data-[state=open]:rotate-180"
        aria-hidden="true"
      />
    </NavigationMenuPrimitive.Trigger>
  )
}

/* -------------------------------------------------------------------------- */
/* CONTENT (DROPDOWN)                                                         */
/* -------------------------------------------------------------------------- */

function NavigationMenuContent({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Content>) {
  return (
    <NavigationMenuPrimitive.Content
      data-slot="navigation-menu-content"
      className={cn(
        // Posicionamiento CORRECTO
        "absolute left-1/2 top-full z-50 -translate-x-1/2 mt-2",

        // Estilo
        "w-max min-w-[220px] rounded-md bg-white p-4 shadow-lg",

        // Animaciones suaves
        "data-[motion^=from-]:animate-in data-[motion^=to-]:animate-out",
        "data-[motion^=from-]:fade-in data-[motion^=to-]:fade-out",
        "data-[motion=from-start]:slide-in-from-left-2",
        "data-[motion=from-end]:slide-in-from-right-2",

        className
      )}
      {...props}
    />
  )
}

/* -------------------------------------------------------------------------- */
/* LINK                                                                       */
/* -------------------------------------------------------------------------- */

function NavigationMenuLink({
  className,
  ...props
}: React.ComponentProps<typeof NavigationMenuPrimitive.Link>) {
  return (
    <NavigationMenuPrimitive.Link
      data-slot="navigation-menu-link"
      className={cn(
        "flex rounded-sm p-2 text-sm text-foreground/80 transition-colors duration-200 hover:text-primary focus:text-primary focus:outline-none",
        className
      )}
      {...props}
    />
  )
}


export {
  NavigationMenu,
  NavigationMenuList,
  NavigationMenuItem,
  NavigationMenuTrigger,
  NavigationMenuContent,
  NavigationMenuLink,
  navigationMenuTriggerStyle,
}