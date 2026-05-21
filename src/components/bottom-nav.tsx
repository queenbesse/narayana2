import { Link, useLocation } from "react-router-dom"
import { Hop as Home, Stethoscope, User, MapPin, CalendarPlus } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { cn } from "@/lib/utils"

const tabs = [
  { key: "nav.home", path: "/", icon: Home },
  { key: "nav.services", path: "/services", icon: Stethoscope },
  { key: "nav.contact", path: "/contact", icon: CalendarPlus },
  { key: "nav.locations", path: "/locations", icon: MapPin },
  { key: "nav.about", path: "/about", icon: User },
]

export function BottomNav() {
  const { t } = useI18n()
  const location = useLocation()

  return (
    <nav className="fixed bottom-0 left-0 right-0 z-50 border-t bg-background/95 backdrop-blur md:hidden supports-[backdrop-filter]:bg-background/80">
      <div className="flex h-16 items-center justify-around">
        {tabs.map((tab) => {
          const isActive = tab.path === "/"
            ? location.pathname === "/"
            : location.pathname.startsWith(tab.path)
          const Icon = tab.icon
          return (
            <Link
              key={tab.path}
              to={tab.path}
              className={cn(
                "flex flex-col items-center gap-0.5 px-2 py-1 text-[10px] transition-colors",
                isActive
                  ? "text-primary"
                  : "text-muted-foreground"
              )}
            >
              <Icon className={cn("h-5 w-5", isActive && "stroke-[2.5]")} />
              <span className="font-medium">{t(tab.key)}</span>
            </Link>
          )
        })}
      </div>
    </nav>
  )
}
