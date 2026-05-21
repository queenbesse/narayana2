import { Helmet } from "react-helmet-async"
import { MapPin, Clock, Phone, Navigation, ArrowRight, Brain as Train } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp } from "@/lib/whatsapp"

const locations = [
  {
    nameKey: "location.atsKocoon",
    addrKey: "location.atsKocoonAddr",
    mapQuery: "ATS+Kocoon+Sector+109+Gurugram",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3508.5!2d76.95!3d28.4!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMjjCsDI0JzAwLjAiTiA3NsKwNTcnMDAuMCJF!5e0!3m2!1sen!2sin!4v1",
    landmarks: {
      en: ["Near Dwarka Expressway", "Opposite ATS Pristine Tower", "5 min from Sector 109 Bus Stand"],
      hi: ["द्वारका एक्सप्रेसवे के पास", "ATS प्रिस्टीन टॉवर के सामने", "सेक्टर 109 बस स्टैंड से 5 मिनट"],
    },
    transit: {
      en: ["Nearest Metro: Dwarka Sector 21 (10 min drive)", "Bus: Route 709 stops at Sector 109", "Parking available"],
      hi: ["निकटतम मेट्रो: द्वारका सेक्टर 21 (10 मिनट ड्राइव)", "बस: रूट 709 सेक्टर 109 पर रुकती है", "पार्किंग उपलब्ध"],
    },
  },
]

export function LocationsPage() {
  const { t, lang } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t("seo.locationsTitle")}</title>
        <meta name="description" content={t("seo.locationsDesc")} />
        <meta property="og:title" content={t("seo.locationsTitle")} />
        <meta property="og:description" content={t("seo.locationsDesc")} />
        <link rel="canonical" href="https://narayanaphysiocare.com/locations" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-3">{t("clinic.name")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("section.locations")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("section.locationsSubtitle")}</p>
        </div>
      </section>

      {/* Locations */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 space-y-10">
          {locations.map((loc, idx) => (
            <div key={loc.nameKey}>
              <Card className="overflow-hidden">
                <div className="grid md:grid-cols-2">
                  <div className="h-56 md:h-80 bg-muted">
                    <iframe
                      src={loc.mapEmbed}
                      className="h-full w-full border-0"
                      allowFullScreen
                      loading="lazy"
                      referrerPolicy="no-referrer-when-downgrade"
                      title={t(loc.nameKey)}
                    />
                  </div>
                  <CardContent className="p-6">
                    <div className="flex items-center gap-2 mb-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10">
                        <MapPin className="h-5 w-5 text-primary" />
                      </div>
                      <div>
                        <h2 className="font-bold">{t(loc.nameKey)}</h2>
                        <p className="text-sm text-muted-foreground">{t(loc.addrKey)}</p>
                      </div>
                    </div>

                    <div className="space-y-4">
                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Clock className="h-4 w-4 text-primary" />
                          {t("timing.title")}
                        </div>
                        <div className="ml-6 text-sm text-muted-foreground space-y-0.5">
                          <p>{t("timing.days")}</p>
                          <p>{t("timing.morning")}</p>
                          <p>{t("timing.evening")}</p>
                        </div>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Navigation className="h-4 w-4 text-primary" />
                          {lang === "hi" ? "प्रमुख स्थल" : "Landmarks"}
                        </div>
                        <ul className="ml-6 text-sm text-muted-foreground space-y-1">
                          {(lang === "hi" ? loc.landmarks.hi : loc.landmarks.en).map((l) => (
                            <li key={l} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-primary" />
                              {l}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div>
                        <div className="flex items-center gap-2 text-sm font-medium mb-2">
                          <Train className="h-4 w-4 text-primary" />
                          {lang === "hi" ? "कैसे पहुंचें" : "How to Reach"}
                        </div>
                        <ul className="ml-6 text-sm text-muted-foreground space-y-1">
                          {(lang === "hi" ? loc.transit.hi : loc.transit.en).map((t) => (
                            <li key={t} className="flex items-center gap-2">
                              <div className="h-1 w-1 rounded-full bg-primary" />
                              {t}
                            </li>
                          ))}
                        </ul>
                      </div>

                      <div className="flex flex-wrap gap-2 pt-2">
                        <a
                          href={`https://www.google.com/maps/search/${loc.mapQuery}`}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          <Button size="sm" className="gap-1.5">
                            <Navigation className="h-3.5 w-3.5" />
                            {t("cta.getDirections")}
                          </Button>
                        </a>
                        <a href="tel:9871001508">
                          <Button variant="outline" size="sm" className="gap-1.5">
                            <Phone className="h-3.5 w-3.5" />
                            {t("cta.callNow")}
                          </Button>
                        </a>
                      </div>
                    </div>
                  </CardContent>
                </div>
              </Card>
              {idx < locations.length - 1 && <Separator className="mt-10" />}
            </div>
          ))}
        </div>
      </section>

      {/* Timings */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("timing.title")} />
          <div className="mx-auto max-w-md">
            <Card>
              <CardContent className="p-6">
                <div className="text-center mb-6">
                  <Clock className="mx-auto h-10 w-10 text-primary mb-2" />
                  <p className="font-semibold">{t("timing.days")}</p>
                </div>
                <div className="grid grid-cols-2 gap-4 text-center">
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground mb-1">{lang === "hi" ? "सुबह" : "Morning"}</p>
                    <p className="font-semibold text-sm">10:30 AM - 1:00 PM</p>
                  </div>
                  <div className="rounded-lg border p-4">
                    <p className="text-xs text-muted-foreground mb-1">{lang === "hi" ? "शाम" : "Evening"}</p>
                    <p className="font-semibold text-sm">5:30 PM - 8:30 PM</p>
                  </div>
                </div>
                <p className="mt-4 text-xs text-center text-muted-foreground">
                  {lang === "hi"
                    ? "होम विजिट: सुबह 9:00 AM से शाम 7:00 PM तक (अपॉइंटमेंट द्वारा)"
                    : "Home Visits: 9:00 AM to 7:00 PM (by appointment)"}
                </p>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Facilities */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "सुविधाएं" : "Facilities"}
            subtitle={lang === "hi" ? "मरीजों की सुविधा के लिए उपलब्ध" : "Available for patient comfort"}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4 max-w-4xl mx-auto">
            {[
              { en: "Air-Conditioned Treatment Rooms", hi: "वातानुकूलित उपचार कक्ष" },
              { en: "Modern Equipment", hi: "आधुनिक उपकरण" },
              { en: "Wheelchair Accessible", hi: "व्हीलचेयर सुगम" },
              { en: "Private Treatment Areas", hi: "निजी उपचार क्षेत्र" },
              { en: "Waiting Area with Seating", hi: "बैठने की व्यवस्था के साथ प्रतीक्षा क्षेत्र" },
              { en: "Clean & Hygienic", hi: "स्वच्छ और स्वास्थ्यकर" },
              { en: "Parking Available", hi: "पार्किंग उपलब्ध" },
              { en: "Easy Ground Floor Access", hi: "ग्राउंड फ्लोर पर आसान पहुंच" },
            ].map((item) => (
              <div key={item.en} className="flex items-center gap-2 rounded-lg border p-3">
                <div className="h-2 w-2 rounded-full bg-primary shrink-0" />
                <span className="text-sm">{lang === "hi" ? item.hi : item.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Contact CTA */}
      <section className="bg-primary py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">
            {lang === "hi" ? "आज ही मिलें" : "Visit Us Today"}
          </h2>
          <div className="mt-4 flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/80">
            <a href="tel:9871001508" className="flex items-center gap-1 hover:text-primary-foreground"><Phone className="h-4 w-4" /> 9871001508</a>
            <a href="tel:7011389138" className="flex items-center gap-1 hover:text-primary-foreground"><Phone className="h-4 w-4" /> 7011389138</a>
          </div>
          <Button
            variant="secondary"
            size="lg"
            className="mt-6 gap-2"
            onClick={() =>
              openWhatsApp(
                lang === "hi"
                  ? "नमस्ते, मुझे अपॉइंटमेंट बुक करना है।"
                  : "Hello, I would like to book an appointment."
              )
            }
          >
            {t("cta.bookAppointment")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
