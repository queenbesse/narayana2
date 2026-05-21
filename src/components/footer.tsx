import { Link } from "react-router-dom"
import { Phone, MapPin, Clock, MessageCircle } from "lucide-react"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp } from "@/lib/whatsapp"
import { asset } from "@/lib/utils"

export function Footer() {
  const { t, lang } = useI18n()

  return (
    <footer className="hidden border-t bg-card md:block">
      <div className="mx-auto max-w-7xl px-4 py-12">
        <div className="grid gap-8 sm:grid-cols-2 lg:grid-cols-4">
          <div>
            <div className="flex items-center gap-2 mb-4">
              <img src={asset("/logo.webp")} alt="Narayana Physio Care" className="h-9 w-9 rounded-lg object-contain" />
              <div>
                <p className="text-sm font-semibold">{t("clinic.name")}</p>
                <p className="text-[10px] text-muted-foreground">{t("clinic.tagline")}</p>
              </div>
            </div>
            <p className="text-sm text-muted-foreground mb-4">
              {t("doctor.name")} - {t("doctor.qualifications")}
            </p>
            <div className="flex gap-2">
              <a href="tel:9871001508" className="rounded-md border p-2 hover:bg-accent transition-colors">
                <Phone className="h-4 w-4" />
              </a>
              <button
                onClick={() =>
                  openWhatsApp(
                    lang === "hi"
                      ? "नमस्ते, मुझे जानकारी चाहिए।"
                      : "Hello, I need information."
                  )
                }
                className="rounded-md border p-2 hover:bg-accent transition-colors"
              >
                <MessageCircle className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("footer.quickLinks")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/" className="hover:text-primary transition-colors">{t("nav.home")}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t("nav.services")}</Link></li>
              <li><Link to="/conditions" className="hover:text-primary transition-colors">{t("nav.conditions")}</Link></li>
              <li><Link to="/about" className="hover:text-primary transition-colors">{t("nav.about")}</Link></li>
              <li><Link to="/testimonials" className="hover:text-primary transition-colors">{t("nav.testimonials")}</Link></li>
              <li><Link to="/tips" className="hover:text-primary transition-colors">{t("nav.tips")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("footer.services")}</h3>
            <ul className="space-y-2 text-sm text-muted-foreground">
              <li><Link to="/services" className="hover:text-primary transition-colors">{t("service.laser")}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t("service.cupping")}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t("service.dryNeedling")}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t("service.taping")}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t("service.mfr")}</Link></li>
              <li><Link to="/services" className="hover:text-primary transition-colors">{t("service.homeVisit")}</Link></li>
            </ul>
          </div>

          <div>
            <h3 className="mb-4 text-sm font-semibold">{t("footer.contact")}</h3>
            <ul className="space-y-3 text-sm text-muted-foreground">
              <li className="flex gap-2">
                <Phone className="h-4 w-4 shrink-0 mt-0.5" />
                <div>
                  <a href="tel:9871001508" className="hover:text-primary block transition-colors">9871001508</a>
                  <a href="tel:7011389138" className="hover:text-primary block transition-colors">7011389138</a>
                </div>
              </li>
              <li className="flex gap-2">
                <MapPin className="h-4 w-4 shrink-0 mt-0.5" />
                <span className="text-xs">{t("location.atsKocoonAddr")}</span>
              </li>
              <li className="flex gap-2">
                <Clock className="h-4 w-4 shrink-0 mt-0.5" />
                <div className="text-xs">
                  <p>{t("timing.days")}</p>
                  <p>{t("timing.morning")}</p>
                  <p>{t("timing.evening")}</p>
                </div>
              </li>
            </ul>
          </div>
        </div>

        <div className="mt-8 border-t pt-6 text-center text-xs text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} {t("clinic.name")}. {t("footer.rights")}.</p>
        </div>
      </div>
    </footer>
  )
}
