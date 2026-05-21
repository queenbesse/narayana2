import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { Phone, MapPin, Clock, MessageCircle, Hop as HomeIcon } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Label } from "@/components/ui/label"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp, buildAppointmentMessage, buildHomeVisitMessage } from "@/lib/whatsapp"

export function ContactPage() {
  const { t, lang } = useI18n()

  const [appointment, setAppointment] = useState({ name: "", phone: "", date: "", time: "", location: "", condition: "" })
  const [homeVisit, setHomeVisit] = useState({ name: "", phone: "", address: "", condition: "" })

  const handleAppointmentSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = buildAppointmentMessage({ ...appointment, lang })
    openWhatsApp(message)
  }

  const handleHomeVisitSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    const message = buildHomeVisitMessage({ ...homeVisit, lang })
    openWhatsApp(message)
  }

  return (
    <>
      <Helmet>
        <title>{t("seo.contactTitle")}</title>
        <meta name="description" content={t("seo.contactDesc")} />
        <meta property="og:title" content={t("seo.contactTitle")} />
        <meta property="og:description" content={t("seo.contactDesc")} />
        <link rel="canonical" href="https://narayanaphysiocare.com/contact" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-3">{t("clinic.name")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("section.contact")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("section.contactSubtitle")}</p>
        </div>
      </section>

      {/* Quick Contact Cards */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-4">
            <a href="tel:9871001508">
              <Card className="transition-shadow hover:shadow-md cursor-pointer h-full">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{lang === "hi" ? "कॉल करें" : "Call Us"}</p>
                    <p className="text-sm font-semibold">9871001508</p>
                  </div>
                </CardContent>
              </Card>
            </a>
            <a href="tel:7011389138">
              <Card className="transition-shadow hover:shadow-md cursor-pointer h-full">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <Phone className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-xs text-muted-foreground">{lang === "hi" ? "वैकल्पिक नंबर" : "Alternate"}</p>
                    <p className="text-sm font-semibold">7011389138</p>
                  </div>
                </CardContent>
              </Card>
            </a>
            <Card
              className="transition-shadow hover:shadow-md cursor-pointer"
              onClick={() => openWhatsApp(lang === "hi" ? "नमस्ते" : "Hello")}
            >
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-[#25D366]/10">
                  <MessageCircle className="h-5 w-5 text-[#25D366]" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">WhatsApp</p>
                  <p className="text-sm font-semibold">{t("cta.whatsappUs")}</p>
                </div>
              </CardContent>
            </Card>
            <Card className="transition-shadow hover:shadow-md">
              <CardContent className="flex items-center gap-3 p-4">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <Clock className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-xs text-muted-foreground">{t("timing.title")}</p>
                  <p className="text-xs font-medium">10:30-1:00 | 5:30-8:30</p>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </section>

      {/* Appointment Form */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 lg:grid-cols-5">
            <div className="lg:col-span-3">
              <Tabs defaultValue="appointment">
                <TabsList className="mb-6">
                  <TabsTrigger value="appointment">{t("cta.bookAppointment")}</TabsTrigger>
                  <TabsTrigger value="homeVisit">{t("cta.bookHomeVisit")}</TabsTrigger>
                </TabsList>

                <TabsContent value="appointment">
                  <Card>
                    <CardContent className="p-6">
                      <form onSubmit={handleAppointmentSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="apt-name">{t("form.name")}</Label>
                            <Input
                              id="apt-name"
                              required
                              value={appointment.name}
                              onChange={(e) => setAppointment({ ...appointment, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apt-phone">{t("form.phone")}</Label>
                            <Input
                              id="apt-phone"
                              type="tel"
                              required
                              value={appointment.phone}
                              onChange={(e) => setAppointment({ ...appointment, phone: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="apt-date">{t("form.date")}</Label>
                            <Input
                              id="apt-date"
                              type="date"
                              value={appointment.date}
                              onChange={(e) => setAppointment({ ...appointment, date: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="apt-time">{t("form.time")}</Label>
                            <Input
                              id="apt-time"
                              type="time"
                              value={appointment.time}
                              onChange={(e) => setAppointment({ ...appointment, time: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apt-location">{t("form.location")}</Label>
                          <select
                            id="apt-location"
                            className="flex h-9 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                            value={appointment.location}
                            onChange={(e) => setAppointment({ ...appointment, location: e.target.value })}
                          >
                            <option value="">{lang === "hi" ? "चुनें" : "Select"}</option>
                            <option value="ATS Kocoon, Sector 109">{t("location.atsKocoon")}</option>
                          </select>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="apt-condition">{t("form.condition")}</Label>
                          <Textarea
                            id="apt-condition"
                            rows={3}
                            value={appointment.condition}
                            onChange={(e) => setAppointment({ ...appointment, condition: e.target.value })}
                          />
                        </div>
                        <Button type="submit" className="w-full gap-2">
                          <MessageCircle className="h-4 w-4" />
                          {t("form.submit")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>

                <TabsContent value="homeVisit">
                  <Card>
                    <CardContent className="p-6">
                      <div className="mb-4 flex items-center gap-2 rounded-lg bg-primary/5 p-3">
                        <HomeIcon className="h-4 w-4 text-primary" />
                        <span className="text-xs text-muted-foreground">
                          {lang === "hi"
                            ? "हम गुरुग्राम के सभी क्षेत्रों में होम विजिट सेवा प्रदान करते हैं"
                            : "We provide home visit service across all areas in Gurugram"}
                        </span>
                      </div>
                      <form onSubmit={handleHomeVisitSubmit} className="space-y-4">
                        <div className="grid gap-4 sm:grid-cols-2">
                          <div className="space-y-2">
                            <Label htmlFor="hv-name">{t("form.name")}</Label>
                            <Input
                              id="hv-name"
                              required
                              value={homeVisit.name}
                              onChange={(e) => setHomeVisit({ ...homeVisit, name: e.target.value })}
                            />
                          </div>
                          <div className="space-y-2">
                            <Label htmlFor="hv-phone">{t("form.phone")}</Label>
                            <Input
                              id="hv-phone"
                              type="tel"
                              required
                              value={homeVisit.phone}
                              onChange={(e) => setHomeVisit({ ...homeVisit, phone: e.target.value })}
                            />
                          </div>
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hv-address">{t("form.address")}</Label>
                          <Textarea
                            id="hv-address"
                            required
                            rows={2}
                            value={homeVisit.address}
                            onChange={(e) => setHomeVisit({ ...homeVisit, address: e.target.value })}
                          />
                        </div>
                        <div className="space-y-2">
                          <Label htmlFor="hv-condition">{t("form.condition")}</Label>
                          <Textarea
                            id="hv-condition"
                            rows={3}
                            value={homeVisit.condition}
                            onChange={(e) => setHomeVisit({ ...homeVisit, condition: e.target.value })}
                          />
                        </div>
                        <Button type="submit" className="w-full gap-2">
                          <MessageCircle className="h-4 w-4" />
                          {t("form.submit")}
                        </Button>
                      </form>
                    </CardContent>
                  </Card>
                </TabsContent>
              </Tabs>
            </div>

            {/* Sidebar */}
            <div className="lg:col-span-2 space-y-4">
              <Card>
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-3 flex items-center gap-2">
                    <MapPin className="h-4 w-4 text-primary" />
                    {t("location.atsKocoon")}
                  </h3>
                  <p className="text-sm text-muted-foreground">{t("location.atsKocoonAddr")}</p>
                  <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                    <Clock className="h-3.5 w-3.5" />
                    {t("timing.morning")} | {t("timing.evening")}
                  </div>
                </CardContent>
              </Card>
              <Card className="border-destructive/30 bg-destructive/5">
                <CardContent className="p-5">
                  <h3 className="font-semibold mb-2 text-sm">
                    {lang === "hi" ? "आपातकालीन / तीव्र दर्द?" : "Emergency / Acute Pain?"}
                  </h3>
                  <p className="text-xs text-muted-foreground mb-3">
                    {lang === "hi"
                      ? "तीव्र दर्द के लिए तुरंत कॉल करें। हम शीघ्र अपॉइंटमेंट की व्यवस्था करेंगे।"
                      : "For acute pain, call immediately. We will arrange an early appointment."}
                  </p>
                  <a href="tel:9871001508">
                    <Button variant="destructive" size="sm" className="w-full gap-2">
                      <Phone className="h-4 w-4" />
                      {t("cta.callNow")} - 9871001508
                    </Button>
                  </a>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Map */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "हमें खोजें" : "Find Us"}
          />
          <div className="h-64 md:h-96 rounded-xl overflow-hidden border">
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d56114.0!2d76.95!3d28.43!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x390d229e5c0db9f3%3A0x4e44f97e3cb1ce90!2sGurugram%2C%20Haryana!5e0!3m2!1sen!2sin!4v1"
              className="h-full w-full border-0"
              allowFullScreen
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
              title="Narayana Physio Care Location"
            />
          </div>
        </div>
      </section>
    </>
  )
}
