import { Link, useLocation } from "react-router-dom"
import { Menu, Phone, X } from "lucide-react"
import * as React from "react"
import { Button } from "@/components/ui/button"
import { Sheet, SheetContent, SheetTrigger, SheetTitle } from "@/components/ui/sheet"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const navItems = [
  { key: "nav.home", path: "/" },
  { key: "nav.services", path: "/services" },
  { key: "nav.conditions", path: "/conditions" },
  { key: "nav.about", path: "/about" },
  { key: "nav.locations", path: "/locations" },
  { key: "nav.tips", path: "/tips" },
  { key: "nav.testimonials", path: "/testimonials" },
]

export function Header() {
  const { t, lang, setLang } = useI18n()
  const location = useLocation()
  const [open, setOpen] = React.useState(false)

  return (
    <header className="sticky top-0 z-50 border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="mx-auto flex h-14 max-w-7xl items-center justify-between px-4 md:h-16">
        <Link to="/" className="flex items-center gap-2">
          <img src="/logo.webp" alt="Narayana Physio Care" className="h-9 w-9 rounded-lg object-contain" />
          <div className="hidden sm:block">
            <p className="text-sm font-semibold leading-tight">{t("clinic.name")}</p>
            <p className="text-[10px] text-muted-foreground leading-tight">{t("clinic.tagline")}</p>
          </div>
        </Link>

        <nav className="hidden lg:flex items-center gap-1">
          {navItems.map((item) => (
            <Link
              key={item.path}
              to={item.path}
              className={cn(
                "px-3 py-2 text-sm rounded-md transition-colors",
                location.pathname === item.path
                  ? "bg-primary/10 text-primary font-medium"
                  : "text-muted-foreground hover:text-foreground hover:bg-accent"
              )}
            >
              {t(item.key)}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-2">
          <button
            onClick={() => setLang(lang === "en" ? "hi" : "en")}
            className="rounded-md border px-2 py-1 text-xs font-medium transition-colors hover:bg-accent"
            aria-label="Toggle language"
          >
            {lang === "en" ? "हिंदी" : "EN"}
          </button>

          <Link to="/contact" className="hidden md:inline-flex">
            <Button size="sm" className="gap-1.5">
              <Phone className="h-3.5 w-3.5" />
              {t("cta.bookAppointment")}
            </Button>
          </Link>

          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger asChild className="lg:hidden">
              <Button variant="ghost" size="icon" className="h-9 w-9">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right" className="w-72 p-0">
              <SheetTitle className="sr-only">Navigation Menu</SheetTitle>
              <div className="flex h-14 items-center justify-between border-b px-4">
                <span className="font-semibold text-sm">{t("clinic.name")}</span>
                <Button variant="ghost" size="icon" className="h-8 w-8" onClick={() => setOpen(false)}>
                  <X className="h-4 w-4" />
                </Button>
              </div>
              <nav className="flex flex-col p-4 gap-1">
                {navItems.map((item) => (
                  <Link
                    key={item.path}
                    to={item.path}
                    onClick={() => setOpen(false)}
                    className={cn(
                      "rounded-md px-3 py-2.5 text-sm transition-colors",
                      location.pathname === item.path
                        ? "bg-primary/10 text-primary font-medium"
                        : "text-muted-foreground hover:text-foreground hover:bg-accent"
                    )}
                  >
                    {t(item.key)}
                  </Link>
                ))}
                <div className="mt-4 border-t pt-4">
                  <Link to="/contact" onClick={() => setOpen(false)}>
                    <Button className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      {t("cta.bookAppointment")}
                    </Button>
                  </Link>
                </div>
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  )
}
