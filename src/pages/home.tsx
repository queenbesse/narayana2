import { Link } from "react-router-dom"
import { Helmet } from "react-helmet-async"
import { Phone, Clock, MapPin, Star, Hop as HomeIcon, Zap, Shield, Heart, Users, Award, CircleCheck as CheckCircle, ArrowRight, ChevronRight, Activity, Target, Sparkles, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp, buildServiceEnquiryMessage } from "@/lib/whatsapp"
import { asset } from "@/lib/utils"

const services = [
  { key: "laser", icon: Zap, img: "/service-laser-therapy.webp" },
  { key: "cupping", icon: Target, img: "/service-cupping-therapy.webp" },
  { key: "dryNeedling", icon: Activity, img: "/service-dry-needling.webp" },
  { key: "taping", icon: Shield, img: "/service-taping-therapy.webp" },
  { key: "mfr", icon: Sparkles, img: "/service-mfr-therapy.webp" },
  { key: "homeVisit", icon: HomeIcon, img: "/service-home-visit.webp" },
]

const conditions = [
  "Arthritis", "Low Back Pain", "Frozen Shoulder", "Cervical Spondylosis",
  "Knee Pain", "Sciatica", "Tennis Elbow", "Plantar Fasciitis",
  "Post Fracture", "Joint Replacement", "Hemiplegia", "Neck Pain",
]

const conditionsHi = [
  "गठिया", "कमर दर्द", "फ्रोजन शोल्डर", "सर्वाइकल स्पॉन्डिलोसिस",
  "घुटने का दर्द", "साइटिका", "टेनिस एल्बो", "प्लांटर फेसाइटिस",
  "फ्रैक्चर के बाद", "जॉइंट रिप्लेसमेंट", "हेमिप्लेजिया", "गर्दन दर्द",
]

const testimonials = [
  { name: "Bonita Roy Choudhury", nameHi: "बोनिता रॉय चौधरी", condition: "Shoulder Injury", conditionHi: "कंधे की चोट", rating: 5, text: "Dr Anju is extremely superb in her work. I came to her with lot of pain in my shoulder post the injury. She really took good care and today I am recovered.", textHi: "डॉ. अंजू अपने काम में बेहद शानदार हैं। मैं चोट के बाद कंधे में बहुत दर्द लेकर उनके पास आई। उन्होंने वास्तव में अच्छी देखभाल की और आज मैं ठीक हो गई हूं।" },
  { name: "Shreenu Mukherjee", nameHi: "श्रीनू मुखर्जी", condition: "Knee Pain", conditionHi: "घुटने का दर्द", rating: 5, text: "I came to Dr. Anju with knee pain just two weeks before a 5K run, and thanks to her meticulous care, I was able to run injury free.", textHi: "मैं 5K दौड़ से सिर्फ दो सप्ताह पहले घुटने के दर्द के साथ डॉ. अंजू के पास आई, और उनकी सावधानीपूर्ण देखभाल की बदौलत मैं बिना चोट के दौड़ सकी।" },
  { name: "Nidhi Arya", nameHi: "निधि आर्या", condition: "Back Pain & Sciatica", conditionHi: "कमर दर्द और साइटिका", rating: 5, text: "Dr. Anju is an excellent physiotherapist! Her personalized treatment made a huge difference. Within a short time, my pain reduced significantly.", textHi: "डॉ. अंजू एक उत्कृष्ट फिजियोथेरेपिस्ट हैं! उनके व्यक्तिगत उपचार ने बहुत बड़ा अंतर बनाया। कम समय में मेरा दर्द काफी कम हो गया।" },
]

const faqs = [
  { q: "How many sessions will I need?", qHi: "मुझे कितने सत्रों की आवश्यकता होगी?", a: "The number of sessions varies based on your condition. Most patients see improvement within 6-12 sessions. Dr. Anju will assess and provide a treatment plan during your first visit.", aHi: "सत्रों की संख्या आपकी स्थिति पर निर्भर करती है। अधिकांश मरीज 6-12 सत्रों में सुधार देखते हैं। डॉ. अंजू पहली विजिट में मूल्यांकन करके उपचार योजना बताएंगी।" },
  { q: "Is physiotherapy painful?", qHi: "क्या फिजियोथेरेपी दर्दनाक है?", a: "Most physiotherapy techniques are gentle and pain-free. Some treatments like dry needling may cause mild discomfort initially, but overall the therapies are designed to reduce your pain.", aHi: "अधिकांश फिजियोथेरेपी तकनीकें सौम्य और दर्द-मुक्त हैं। कुछ उपचार जैसे ड्राई नीडलिंग में शुरू में हल्की असुविधा हो सकती है, लेकिन कुल मिलाकर थेरेपी आपके दर्द को कम करने के लिए डिज़ाइन की गई हैं।" },
  { q: "Do you provide home visit services?", qHi: "क्या आप होम विजिट सेवाएं प्रदान करते हैं?", a: "Yes! We provide complete physiotherapy treatment at your home for patients who cannot visit the clinic. This includes all our therapies with portable equipment.", aHi: "हां! हम उन मरीजों के लिए घर पर पूर्ण फिजियोथेरेपी उपचार प्रदान करते हैं जो क्लिनिक नहीं आ सकते। इसमें पोर्टेबल उपकरणों के साथ हमारी सभी थेरेपी शामिल हैं।" },
  { q: "What should I wear for my appointment?", qHi: "अपॉइंटमेंट के लिए मुझे क्या पहनना चाहिए?", a: "Wear comfortable, loose-fitting clothes that allow access to the affected area. For lower back or leg treatments, shorts or track pants are ideal.", aHi: "आरामदायक, ढीले कपड़े पहनें जो प्रभावित क्षेत्र तक पहुंच की अनुमति दें। कमर या पैर के उपचार के लिए शॉर्ट्स या ट्रैक पैंट आदर्श हैं।" },
  { q: "Is prior appointment necessary?", qHi: "क्या पूर्व अपॉइंटमेंट आवश्यक है?", a: "While walk-ins are welcome, we recommend booking an appointment via WhatsApp or call to avoid waiting time and ensure dedicated attention.", aHi: "वॉक-इन का स्वागत है, लेकिन हम प्रतीक्षा समय से बचने और समर्पित ध्यान सुनिश्चित करने के लिए व्हाट्सएप या कॉल द्वारा अपॉइंटमेंट बुक करने की सलाह देते हैं।" },
]

export function HomePage() {
  const { t, lang } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t("seo.homeTitle")}</title>
        <meta name="description" content={t("seo.homeDesc")} />
        <meta property="og:title" content={t("seo.homeTitle")} />
        <meta property="og:description" content={t("seo.homeDesc")} />
        <meta property="og:type" content="website" />
        <link rel="canonical" href="https://narayanaphysiocare.com" />
      </Helmet>

      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-b from-primary/5 to-background">
        <div className="mx-auto max-w-7xl px-4 py-12 md:py-20">
          <div className="grid gap-8 md:grid-cols-2 md:items-center">
            <div>
              <Badge variant="secondary" className="mb-4 gap-1.5">
                <HomeIcon className="h-3 w-3" />
                {t("hero.homeVisitBadge")}
              </Badge>
              <h1 className="text-3xl font-bold tracking-tight md:text-5xl lg:text-6xl">
                {t("hero.title")}
              </h1>
              <p className="mt-4 text-muted-foreground md:text-lg max-w-lg">
                {t("hero.subtitle")}
              </p>
              <div className="mt-4 flex items-center gap-2 text-sm text-muted-foreground">
                <Award className="h-4 w-4 text-primary" />
                <span>{t("doctor.name")} - {t("doctor.qualifications")}</span>
              </div>
              <div className="mt-6 flex flex-wrap gap-3">
                <Link to="/contact">
                  <Button size="lg" className="gap-2">
                    <Calendar className="h-4 w-4" />
                    {t("cta.bookAppointment")}
                  </Button>
                </Link>
                <a href="tel:9871001508">
                  <Button variant="outline" size="lg" className="gap-2">
                    <Phone className="h-4 w-4" />
                    {t("cta.callNow")}
                  </Button>
                </a>
              </div>
            </div>
            <div className="relative">
              <img
                src={asset("/hero-physio-treatment.webp")}
                alt="Physiotherapy treatment session"
                className="rounded-2xl object-cover w-full h-64 md:h-96 shadow-lg"
                loading="eager"
              />
              <div className="absolute -bottom-4 -left-4 rounded-xl bg-card p-3 shadow-lg border md:p-4">
                <div className="flex items-center gap-2">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10">
                    <Star className="h-5 w-5 text-primary" />
                  </div>
                  <div>
                    <p className="text-sm font-semibold">12+</p>
                    <p className="text-xs text-muted-foreground">{lang === "hi" ? "वर्ष अनुभव" : "Years Experience"}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Quick Stats Bar */}
      <section className="border-y bg-card">
        <div className="mx-auto max-w-7xl px-4 py-6">
          <div className="grid grid-cols-2 gap-4 md:grid-cols-4">
            {[
              { value: "12+", label: lang === "hi" ? "वर्ष अनुभव" : "Years Experience", icon: Award },
              { value: "5000+", label: lang === "hi" ? "मरीजों का इलाज" : "Patients Treated", icon: Users },
              { value: "6+", label: lang === "hi" ? "उन्नत थेरेपी" : "Advanced Therapies", icon: Zap },
              { value: "7", label: lang === "hi" ? "दिन खुला" : "Days Open", icon: Calendar },
            ].map((stat) => (
              <div key={stat.label} className="flex items-center gap-3">
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                  <stat.icon className="h-5 w-5 text-primary" />
                </div>
                <div>
                  <p className="text-lg font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground">{stat.label}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Services Overview */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.services")} subtitle={t("section.servicesSubtitle")} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => {
              const Icon = service.icon
              return (
                <Card key={service.key} className="group overflow-hidden transition-shadow hover:shadow-md">
                  <div className="relative h-40 overflow-hidden">
                    <img
                      src={asset(service.img)}
                      alt={t(`service.${service.key}`)}
                      className="h-full w-full object-cover transition-transform group-hover:scale-105"
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                    <div className="absolute bottom-3 left-3 flex items-center gap-2">
                      <div className="flex h-8 w-8 items-center justify-center rounded-full bg-white/90">
                        <Icon className="h-4 w-4 text-primary" />
                      </div>
                      <h3 className="text-sm font-semibold text-white">{t(`service.${service.key}`)}</h3>
                    </div>
                  </div>
                  <CardContent className="p-4">
                    <p className="text-sm text-muted-foreground line-clamp-2">{t(`service.${service.key}Desc`)}</p>
                    <Button
                      variant="ghost"
                      size="sm"
                      className="mt-3 gap-1 px-0 text-primary hover:text-primary"
                      onClick={() => openWhatsApp(buildServiceEnquiryMessage(t(`service.${service.key}`), lang))}
                    >
                      {t("cta.enquireNow")}
                      <ChevronRight className="h-3.5 w-3.5" />
                    </Button>
                  </CardContent>
                </Card>
              )
            })}
          </div>
          <div className="mt-8 text-center">
            <Link to="/services">
              <Button variant="outline" className="gap-2">
                {t("cta.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* About Doctor Preview */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.about")} subtitle={t("section.aboutSubtitle")} />
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="relative">
              <img
                src={asset("/images/DrAnjuJakhar..jpeg")}
                alt={t("doctor.name")}
                className="rounded-2xl w-full h-72 md:h-96 object-cover"
                loading="lazy"
              />
            </div>
            <div>
              <h3 className="text-xl font-bold">{t("doctor.name")}</h3>
              <p className="mt-1 text-primary font-medium">{t("doctor.qualifications")}</p>
              <p className="mt-1 text-sm text-muted-foreground">{t("doctor.registration")}</p>
              <div className="mt-4 space-y-3">
                {[
                  t("doctor.experienceDetail"),
                  lang === "hi" ? "ऑर्थोपेडिक फिजियोथेरेपी में विशेषज्ञता" : "Specialization in Orthopedic Physiotherapy",
                  lang === "hi" ? "उन्नत मैनुअल थेरेपी तकनीकों में प्रशिक्षित" : "Trained in advanced manual therapy techniques",
                  lang === "hi" ? "साक्ष्य-आधारित उपचार दृष्टिकोण" : "Evidence-based treatment approach",
                ].map((item) => (
                  <div key={item} className="flex gap-2">
                    <CheckCircle className="h-4 w-4 shrink-0 text-primary mt-0.5" />
                    <span className="text-sm text-muted-foreground">{item}</span>
                  </div>
                ))}
              </div>
              <div className="mt-6">
                <Link to="/about">
                  <Button variant="outline" className="gap-2">
                    {t("cta.learnMore")}
                    <ArrowRight className="h-4 w-4" />
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Home Visit Service Banner */}
      <section className="relative overflow-hidden bg-primary py-12 md:py-16">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,_rgba(255,255,255,0.1),transparent)]" />
        </div>
        <div className="relative mx-auto max-w-7xl px-4 text-center">
          <div className="mx-auto max-w-2xl">
            <HomeIcon className="mx-auto mb-4 h-10 w-10 text-primary-foreground" />
            <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">{t("section.homeVisit")}</h2>
            <p className="mt-3 text-primary-foreground/80">{t("section.homeVisitSubtitle")}</p>
            <p className="mt-2 text-sm text-primary-foreground/70">
              {lang === "hi"
                ? "गुरुग्राम में सभी क्षेत्रों में उपलब्ध - सेक्टर 109, पालम विहार, द्वारका एक्सप्रेसवे और आसपास"
                : "Available across all areas in Gurugram - Sector 109, Palam Vihar, Dwarka Expressway & surroundings"}
            </p>
            <div className="mt-6 flex flex-wrap justify-center gap-3">
              <Button
                variant="secondary"
                size="lg"
                className="gap-2"
                onClick={() =>
                  openWhatsApp(
                    lang === "hi"
                      ? "नमस्ते, मुझे होम विजिट फिजियोथेरेपी सेवा के बारे में जानकारी चाहिए।"
                      : "Hello, I would like to enquire about home visit physiotherapy service."
                  )
                }
              >
                {t("cta.bookHomeVisit")}
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
        </div>
      </section>

      {/* Conditions Treated Preview */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.conditions")} subtitle={t("section.conditionsSubtitle")} />
          <div className="grid grid-cols-2 gap-3 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
            {(lang === "hi" ? conditionsHi : conditions).map((condition, i) => (
              <Card key={i} className="group cursor-pointer transition-colors hover:border-primary/50">
                <CardContent className="flex flex-col items-center p-4 text-center">
                  <div className="mb-2 flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 group-hover:bg-primary/20 transition-colors">
                    <Activity className="h-5 w-5 text-primary" />
                  </div>
                  <p className="text-xs font-medium">{condition}</p>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/conditions">
              <Button variant="outline" className="gap-2">
                {t("cta.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.whyChooseUs")} subtitle={t("section.whyChooseUsSubtitle")} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {[
              { key: "experience", icon: Award },
              { key: "advanced", icon: Zap },
              { key: "homeVisit", icon: HomeIcon },
              { key: "affordable", icon: Heart },
              { key: "personalized", icon: Target },
              { key: "qualified", icon: Shield },
              { key: "allDays", icon: Calendar },
              { key: "evidence", icon: CheckCircle },
            ].map((item) => (
              <Card key={item.key} className="transition-shadow hover:shadow-md">
                <CardContent className="p-5">
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary/10 mb-3">
                    <item.icon className="h-5 w-5 text-primary" />
                  </div>
                  <h3 className="text-sm font-semibold">{t(`why.${item.key}`)}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t(`why.${item.key}Desc`)}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Dry Needling Spotlight */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div>
              <Badge variant="secondary" className="mb-3">
                {lang === "hi" ? "विशेष उपचार" : "Featured Therapy"}
              </Badge>
              <h2 className="text-2xl font-bold tracking-tight md:text-3xl">{t("section.dryNeedling")}</h2>
              <p className="mt-3 text-muted-foreground">{t("dryNeedling.goal")}</p>
              <div className="mt-6 space-y-3">
                {["benefit1", "benefit2", "benefit3"].map((key) => (
                  <div key={key} className="flex items-center gap-3">
                    <div className="flex h-6 w-6 items-center justify-center rounded-full bg-primary/10">
                      <CheckCircle className="h-3.5 w-3.5 text-primary" />
                    </div>
                    <span className="text-sm">{t(`dryNeedling.${key}`)}</span>
                  </div>
                ))}
              </div>
              <Button
                className="mt-6 gap-2"
                onClick={() => openWhatsApp(buildServiceEnquiryMessage(t("service.dryNeedling"), lang))}
              >
                {t("cta.enquireNow")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
            <div>
              <img
                src={asset("/dry-needling-detail.webp")}
                alt="Dry Needling Therapy"
                className="rounded-2xl w-full h-64 md:h-80 object-cover"
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Treatment Process */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.process")} subtitle={t("section.processSubtitle")} />
          <div className="relative">
            <div className="hidden md:block absolute top-8 left-0 right-0 h-0.5 bg-border" />
            <div className="grid gap-6 md:grid-cols-5">
              {["step1", "step2", "step3", "step4", "step5"].map((step, i) => (
                <div key={step} className="relative flex flex-col items-center text-center">
                  <div className="relative z-10 flex h-14 w-14 items-center justify-center rounded-full bg-primary text-primary-foreground font-bold text-lg mb-3">
                    {i + 1}
                  </div>
                  <h3 className="text-sm font-semibold">{t(`process.${step}`)}</h3>
                  <p className="mt-1 text-xs text-muted-foreground">{t(`process.${step}Desc`)}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.testimonials")} subtitle={t("section.testimonialsSubtitle")} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {testimonials.map((item, i) => (
              <Card key={i}>
                <CardContent className="p-5">
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: item.rating }).map((_, j) => (
                      <Star key={j} className="h-4 w-4 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic">
                    "{lang === "hi" ? item.textHi : item.text}"
                  </p>
                  <div className="mt-4 flex items-center gap-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {(lang === "hi" ? item.nameHi : item.name).charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{lang === "hi" ? item.nameHi : item.name}</p>
                      <p className="text-xs text-muted-foreground">{lang === "hi" ? item.conditionHi : item.condition}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
          <div className="mt-8 text-center">
            <Link to="/testimonials">
              <Button variant="outline" className="gap-2">
                {t("cta.viewAll")}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Our Clinic */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "हमारा क्लिनिक" : "Our Clinic"}
            subtitle={lang === "hi" ? "आधुनिक सुविधाओं से लैस" : "Equipped with modern facilities"}
          />
          <div className="grid grid-cols-2 gap-3 md:grid-cols-4">
            {[
              "/images/clinic-images/clinic-image1.jpeg",
              "/images/clinic-images/our-clinic2.jpeg",
              "/images/clinic-images/our-clinic3.jpeg",
              "/images/clinic-images/our-clinic4.jpeg",
            ].map((src, i) => (
              <img
                key={i}
                src={asset(src)}
                alt={`Clinic interior ${i + 1}`}
                className="rounded-xl h-40 md:h-52 w-full object-cover"
                loading="lazy"
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            <Link to="/about">
              <Button variant="outline" className="gap-2">
                {lang === "hi" ? "और जानें" : "Learn More About Us"}
                <ArrowRight className="h-4 w-4" />
              </Button>
            </Link>
          </div>
        </div>
      </section>

      {/* Clinic Locations */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.locations")} subtitle={t("section.locationsSubtitle")} />
          <div className="grid gap-4 md:grid-cols-2">
            {[
              { name: t("location.atsKocoon"), addr: t("location.atsKocoonAddr"), mapQuery: "ATS+Kocoon+Sector+109+Gurugram" },
            ].map((loc) => (
              <Card key={loc.name}>
                <CardContent className="p-5">
                  <div className="flex items-start gap-3">
                    <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <MapPin className="h-5 w-5 text-primary" />
                    </div>
                    <div className="flex-1">
                      <h3 className="font-semibold text-sm">{loc.name}</h3>
                      <p className="mt-1 text-xs text-muted-foreground">{loc.addr}</p>
                      <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                        <Clock className="h-3.5 w-3.5" />
                        <span>{t("timing.days")} | {t("timing.morning")} | {t("timing.evening")}</span>
                      </div>
                      <a
                        href={`https://www.google.com/maps/search/${loc.mapQuery}`}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="mt-3 inline-flex items-center gap-1 text-xs font-medium text-primary hover:underline"
                      >
                        {t("cta.getDirections")}
                        <ArrowRight className="h-3 w-3" />
                      </a>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* FAQ Section */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.faq")} subtitle={t("section.faqSubtitle")} />
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq, i) => (
                <AccordionItem key={i} value={`faq-${i}`}>
                  <AccordionTrigger className="text-left text-sm">
                    {lang === "hi" ? faq.qHi : faq.q}
                  </AccordionTrigger>
                  <AccordionContent className="text-sm text-muted-foreground">
                    {lang === "hi" ? faq.aHi : faq.a}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* Health Tips Preview */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader title={t("section.tips")} subtitle={t("section.tipsSubtitle")} />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { title: lang === "hi" ? "सही पोस्चर के 5 नियम" : "5 Rules for Correct Posture", img: "/tip-posture.webp" },
              { title: lang === "hi" ? "कमर दर्द से बचने के घरेलू उपाय" : "Home Remedies to Prevent Back Pain", img: "/tip-back-pain.webp" },
              { title: lang === "hi" ? "घुटने मजबूत करने के व्यायाम" : "Exercises to Strengthen Knees", img: "/tip-knee-exercise.webp" },
            ].map((tip, i) => (
              <Card key={i} className="group overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={asset(tip.img)}
                    alt={tip.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold">{tip.title}</h3>
                  <Link to="/tips" className="mt-2 inline-flex items-center gap-1 text-xs text-primary font-medium hover:underline">
                    {t("cta.learnMore")}
                    <ChevronRight className="h-3 w-3" />
                  </Link>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA Banner */}
      <section className="bg-primary py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-2xl font-bold text-primary-foreground md:text-3xl">
            {t("cta.startRecovery")}
          </h2>
          <p className="mt-3 text-primary-foreground/80 max-w-md mx-auto">
            {lang === "hi"
              ? "अभी अपॉइंटमेंट बुक करें और दर्द-मुक्त जीवन की ओर पहला कदम उठाएं"
              : "Book your appointment today and take the first step towards a pain-free life"}
          </p>
          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <Link to="/contact">
              <Button variant="secondary" size="lg" className="gap-2">
                <Calendar className="h-4 w-4" />
                {t("cta.bookAppointment")}
              </Button>
            </Link>
            <Button
              variant="outline"
              size="lg"
              className="gap-2 border-primary-foreground/30 text-primary-foreground hover:bg-primary-foreground/10"
              onClick={() =>
                openWhatsApp(
                  lang === "hi"
                    ? "नमस्ते, मुझे अपॉइंटमेंट बुक करना है।"
                    : "Hello, I would like to book an appointment."
                )
              }
            >
              {t("cta.whatsappUs")}
              <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
          <div className="mt-6 flex flex-wrap justify-center gap-4 text-sm text-primary-foreground/70">
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> 9871001508</span>
            <span className="flex items-center gap-1"><Phone className="h-3.5 w-3.5" /> 7011389138</span>
            <span className="flex items-center gap-1"><Clock className="h-3.5 w-3.5" /> {t("timing.days")}</span>
          </div>
        </div>
      </section>
    </>
  )
}
