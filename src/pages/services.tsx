import { Helmet } from "react-helmet-async"
import { Zap, Target, Activity, Shield, Sparkles, Hop as HomeIcon, CircleCheck as CheckCircle, ArrowRight, Clock, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp, buildServiceEnquiryMessage } from "@/lib/whatsapp"

const serviceDetails = [
  {
    key: "laser",
    icon: Zap,
    img: "/service-laser-therapy.webp",
    duration: "15-20 min",
    sessions: "8-12",
    benefits: ["Deep tissue healing", "Pain reduction", "Inflammation control", "Accelerated recovery", "Non-invasive treatment"],
    benefitsHi: ["गहरे ऊतक उपचार", "दर्द कम करना", "सूजन नियंत्रण", "तेजी से रिकवरी", "गैर-आक्रामक उपचार"],
  },
  {
    key: "cupping",
    icon: Target,
    img: "/service-cupping-therapy.webp",
    duration: "20-30 min",
    sessions: "6-10",
    benefits: ["Improved blood circulation", "Muscle tension relief", "Toxin removal", "Pain reduction", "Promotes natural healing"],
    benefitsHi: ["रक्त संचार में सुधार", "मांसपेशियों के तनाव से राहत", "विषाक्त पदार्थों को हटाना", "दर्द में कमी", "प्राकृतिक उपचार को बढ़ावा"],
  },
  {
    key: "dryNeedling",
    icon: Activity,
    img: "/service-dry-needling.webp",
    duration: "20-30 min",
    sessions: "6-8",
    benefits: ["Trigger point release", "Muscle pain relief", "Improved flexibility", "Faster recovery", "Increased range of motion"],
    benefitsHi: ["ट्रिगर पॉइंट रिलीज", "मांसपेशियों के दर्द में राहत", "बेहतर लचीलापन", "तेजी से रिकवरी", "गति की सीमा में वृद्धि"],
  },
  {
    key: "taping",
    icon: Shield,
    img: "/service-taping-therapy.webp",
    duration: "15-20 min",
    sessions: "As needed",
    benefits: ["Joint support", "Pain management", "Muscle activation", "Injury prevention", "Supports during recovery"],
    benefitsHi: ["जोड़ों का सहारा", "दर्द प्रबंधन", "मांसपेशियों की सक्रियता", "चोट की रोकथाम", "रिकवरी के दौरान सहायता"],
  },
  {
    key: "mfr",
    icon: Sparkles,
    img: "/service-mfr-therapy.webp",
    duration: "30-45 min",
    sessions: "8-12",
    benefits: ["Fascial tension release", "Improved mobility", "Chronic pain relief", "Posture correction", "Reduced muscle stiffness"],
    benefitsHi: ["फेशियल तनाव रिलीज", "बेहतर गतिशीलता", "पुराने दर्द से राहत", "पोस्चर सुधार", "मांसपेशियों की कठोरता में कमी"],
  },
  {
    key: "homeVisit",
    icon: HomeIcon,
    img: "/service-home-visit.webp",
    duration: "45-60 min",
    sessions: "Based on condition",
    benefits: ["Treatment at your doorstep", "All therapies available", "Portable equipment", "Flexible scheduling", "Comfortable environment"],
    benefitsHi: ["आपके दरवाजे पर उपचार", "सभी थेरेपी उपलब्ध", "पोर्टेबल उपकरण", "लचीला शेड्यूल", "आरामदायक वातावरण"],
  },
]

const specializations = [
  { en: "Orthopedic Rehabilitation", hi: "ऑर्थोपेडिक पुनर्वास" },
  { en: "Neurological Rehabilitation", hi: "न्यूरोलॉजिकल पुनर्वास" },
  { en: "Sports Injury Management", hi: "खेल चोट प्रबंधन" },
  { en: "Geriatric Physiotherapy", hi: "वृद्ध फिजियोथेरेपी" },
  { en: "Post-Surgical Rehabilitation", hi: "सर्जरी के बाद पुनर्वास" },
  { en: "Pain Management", hi: "दर्द प्रबंधन" },
]

export function ServicesPage() {
  const { t, lang } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t("seo.servicesTitle")}</title>
        <meta name="description" content={t("seo.servicesDesc")} />
        <meta property="og:title" content={t("seo.servicesTitle")} />
        <meta property="og:description" content={t("seo.servicesDesc")} />
        <link rel="canonical" href="https://narayanaphysiocare.com/services" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-3">{t("clinic.name")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("section.services")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("section.servicesSubtitle")}</p>
        </div>
      </section>

      {/* All Therapies */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 space-y-12">
          {serviceDetails.map((service, idx) => {
            const Icon = service.icon
            const isEven = idx % 2 === 0
            return (
              <div key={service.key} className="scroll-mt-20" id={service.key}>
                <div className={`grid gap-6 md:grid-cols-2 items-center ${!isEven ? "md:[direction:rtl]" : ""}`}>
                  <div className={!isEven ? "md:[direction:ltr]" : ""}>
                    <img
                      src={service.img}
                      alt={t(`service.${service.key}`)}
                      className="rounded-xl w-full h-56 md:h-72 object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className={!isEven ? "md:[direction:ltr]" : ""}>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex h-9 w-9 items-center justify-center rounded-lg bg-primary/10">
                        <Icon className="h-5 w-5 text-primary" />
                      </div>
                      <h2 className="text-xl font-bold">{t(`service.${service.key}`)}</h2>
                    </div>
                    <p className="text-sm text-muted-foreground">{t(`service.${service.key}Desc`)}</p>
                    <div className="mt-4 flex gap-4 text-xs text-muted-foreground">
                      <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {service.duration}</span>
                      <span className="flex items-center gap-1"><Calendar className="h-3.5 w-3.5" /> {service.sessions} {lang === "hi" ? "सत्र" : "sessions"}</span>
                    </div>
                    <div className="mt-4 space-y-2">
                      {(lang === "hi" ? service.benefitsHi : service.benefits).map((b) => (
                        <div key={b} className="flex items-center gap-2">
                          <CheckCircle className="h-3.5 w-3.5 text-primary shrink-0" />
                          <span className="text-sm">{b}</span>
                        </div>
                      ))}
                    </div>
                    <Button
                      className="mt-5 gap-2"
                      onClick={() => openWhatsApp(buildServiceEnquiryMessage(t(`service.${service.key}`), lang))}
                    >
                      {t("cta.enquireNow")}
                      <ArrowRight className="h-4 w-4" />
                    </Button>
                  </div>
                </div>
                {idx < serviceDetails.length - 1 && <Separator className="mt-12" />}
              </div>
            )
          })}
        </div>
      </section>

      {/* Specializations */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "हमारी विशेषज्ञताएं" : "Our Specializations"}
            subtitle={lang === "hi" ? "विभिन्न क्षेत्रों में व्यापक देखभाल" : "Comprehensive care across multiple domains"}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {specializations.map((spec) => (
              <Card key={spec.en} className="transition-shadow hover:shadow-md">
                <CardContent className="flex items-center gap-3 p-4">
                  <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                    <CheckCircle className="h-4 w-4 text-primary" />
                  </div>
                  <span className="text-sm font-medium">{lang === "hi" ? spec.hi : spec.en}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "हमारे उपकरण और तकनीक" : "Our Equipment & Technology"}
            subtitle={lang === "hi" ? "अत्याधुनिक उपकरणों से उन्नत उपचार" : "Advanced treatment with state-of-the-art equipment"}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { en: "Therapeutic Laser Machine", hi: "थेराप्यूटिक लेजर मशीन" },
              { en: "TENS/IFT Unit", hi: "TENS/IFT यूनिट" },
              { en: "Ultrasound Therapy", hi: "अल्ट्रासाउंड थेरेपी" },
              { en: "Cupping Set", hi: "कपिंग सेट" },
              { en: "Kinesiology Tapes", hi: "किनेसियोलॉजी टेप" },
              { en: "Dry Needling Kit", hi: "ड्राई नीडलिंग किट" },
              { en: "Exercise Bands & Balls", hi: "एक्सरसाइज बैंड और बॉल" },
              { en: "Hot & Cold Packs", hi: "हॉट और कोल्ड पैक" },
            ].map((item) => (
              <Card key={item.en}>
                <CardContent className="flex items-center gap-2 p-4">
                  <Zap className="h-4 w-4 text-primary shrink-0" />
                  <span className="text-sm">{lang === "hi" ? item.hi : item.en}</span>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Not Sure CTA */}
      <section className="bg-primary py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">
            {lang === "hi" ? "कौन सी थेरेपी आपके लिए सही है?" : "Not sure which therapy is right for you?"}
          </h2>
          <p className="mt-2 text-primary-foreground/80 text-sm">
            {lang === "hi"
              ? "हमारे विशेषज्ञ से बात करें और अपनी स्थिति के लिए सबसे उपयुक्त उपचार जानें"
              : "Talk to our expert and find the most suitable treatment for your condition"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Button
              variant="secondary"
              size="lg"
              className="gap-2"
              onClick={() =>
                openWhatsApp(
                  lang === "hi"
                    ? "नमस्ते, मुझे सही थेरेपी चुनने में मदद चाहिए।"
                    : "Hello, I need help choosing the right therapy for my condition."
                )
              }
            >
              {t("cta.whatsappUs")}
              <ArrowRight className="h-4 w-4" />
            </Button>
            <a href="tel:9871001508">
              <Button variant="outline" size="lg" className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10">
                <Phone className="h-4 w-4" />
                {t("cta.callNow")}
              </Button>
            </a>
          </div>
        </div>
      </section>
    </>
  )
}
