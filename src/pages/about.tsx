import { Helmet } from "react-helmet-async"
import { Link } from "react-router-dom"
import {
  Award, Calendar, Users, Heart,
  Shield, ArrowRight, GraduationCap, Building2
} from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp } from "@/lib/whatsapp"
import { asset } from "@/lib/utils"

const milestones = [
  { year: "2012", en: "Started clinical practice", hi: "नैदानिक अभ्यास शुरू किया" },
  { year: "2015", en: "Completed advanced training in Manual Therapy", hi: "मैनुअल थेरेपी में उन्नत प्रशिक्षण पूरा किया" },
  { year: "2018", en: "Opened Narayana Physio Care at ATS Kocoon, Sector 109", hi: "ATS कोकून, सेक्टर 109 में नारायणा फिजियो केयर खोला" },
  { year: "2020", en: "Launched Home Visit Physiotherapy Service", hi: "होम विजिट फिजियोथेरेपी सेवा शुरू की" },
  { year: "2024", en: "5000+ patients successfully treated", hi: "5000+ मरीजों का सफल उपचार" },
]

export function AboutPage() {
  const { t, lang } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t("seo.aboutTitle")}</title>
        <meta name="description" content={t("seo.aboutDesc")} />
        <meta property="og:title" content={t("seo.aboutTitle")} />
        <meta property="og:description" content={t("seo.aboutDesc")} />
        <link rel="canonical" href="https://narayanaphysiocare.com/about" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-3">{t("clinic.name")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("section.about")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("section.aboutSubtitle")}</p>
        </div>
      </section>

      {/* Doctor Profile */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-8 md:grid-cols-2 items-center">
            <div className="relative">
              <img
                src={asset("/images/dr-anju2.jpeg")}
                alt={t("doctor.name")}
                className="rounded-2xl w-full h-80 md:h-[480px] object-cover"
                loading="eager"
              />
              <div className="absolute bottom-4 left-4 right-4 rounded-xl bg-card/95 backdrop-blur p-4 shadow-lg">
                <div className="flex items-center gap-3">
                  <div className="flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <Award className="h-6 w-6 text-primary" />
                  </div>
                  <div>
                    <p className="font-semibold">{t("doctor.name")}</p>
                    <p className="text-sm text-muted-foreground">{t("doctor.qualifications")}</p>
                  </div>
                </div>
              </div>
            </div>
            <div>
              <h2 className="text-2xl font-bold">{t("doctor.name")}</h2>
              <p className="mt-1 text-primary font-medium text-lg">{t("doctor.qualifications")}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                <Badge variant="outline">{t("doctor.registration")}</Badge>
                <Badge variant="outline">{t("doctor.experience")}</Badge>
              </div>
              <p className="mt-4 text-muted-foreground">
                {lang === "hi"
                  ? "डॉ. अंजू जाखड़ एक अत्यधिक योग्य और अनुभवी फिजियोथेरेपिस्ट हैं जिन्हें ऑर्थोपेडिक फिजियोथेरेपी में विशेषज्ञता प्राप्त है। 12 वर्षों से अधिक के नैदानिक अनुभव के साथ, उन्होंने हजारों मरीजों को दर्द-मुक्त जीवन जीने में मदद की है।"
                  : "Dr. Anju Jakhar is a highly qualified and experienced physiotherapist specializing in Orthopedic Physiotherapy. With over 12 years of clinical experience, she has helped thousands of patients live a pain-free life."}
              </p>
              <div className="mt-6 space-y-3">
                {[
                  { icon: GraduationCap, text: lang === "hi" ? "M.P.T (ऑर्थोपेडिक्स) - विशेषज्ञता" : "M.P.T (Orthopedics) - Specialization" },
                  { icon: Award, text: "FNMT - " + (lang === "hi" ? "प्रमाणित न्यूरो मस्कुलर टेपिंग" : "Fellowship in Neuro Muscular Taping") },
                  { icon: Shield, text: lang === "hi" ? "I.A.P पंजीकृत (L-33200)" : "I.A.P Registered (L-33200)" },
                  { icon: Building2, text: lang === "hi" ? "प्रतिष्ठित अस्पतालों के साथ 12 वर्ष का अनुभव" : "12 years experience with reputed hospitals" },
                  { icon: Heart, text: lang === "hi" ? "रोगी-केंद्रित, साक्ष्य-आधारित दृष्टिकोण" : "Patient-centered, evidence-based approach" },
                ].map((item) => (
                  <div key={item.text} className="flex items-center gap-3">
                    <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                      <item.icon className="h-4 w-4 text-primary" />
                    </div>
                    <span className="text-sm">{item.text}</span>
                  </div>
                ))}
              </div>
              <Button
                className="mt-6 gap-2"
                onClick={() =>
                  openWhatsApp(
                    lang === "hi"
                      ? "नमस्ते डॉ. अंजू, मुझे परामर्श चाहिए।"
                      : "Hello Dr. Anju, I would like to schedule a consultation."
                  )
                }
              >
                {t("cta.bookAppointment")} <ArrowRight className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-6 md:grid-cols-3">
            {[
              {
                title: lang === "hi" ? "हमारा मिशन" : "Our Mission",
                text: lang === "hi" ? "प्रत्येक मरीज को किफायती, साक्ष्य-आधारित फिजियोथेरेपी सेवाएं प्रदान करना और उन्हें दर्द-मुक्त, सक्रिय जीवन जीने में मदद करना।" : "To provide affordable, evidence-based physiotherapy services to every patient and help them live a pain-free, active life.",
                icon: Target,
              },
              {
                title: lang === "hi" ? "हमारा दृष्टिकोण" : "Our Vision",
                text: lang === "hi" ? "गुरुग्राम और आसपास के क्षेत्रों में सबसे विश्वसनीय फिजियोथेरेपी केंद्र बनना, जहां हर मरीज को व्यक्तिगत देखभाल मिले।" : "To become the most trusted physiotherapy center in Gurugram and surrounding areas, where every patient receives personalized care.",
                icon: Heart,
              },
              {
                title: lang === "hi" ? "हमारा दृष्टिकोण" : "Our Approach",
                text: lang === "hi" ? "हम समग्र, रोगी-केंद्रित दृष्टिकोण अपनाते हैं जो लक्षणों के बजाय मूल कारण का इलाज करता है, दीर्घकालिक राहत सुनिश्चित करता है।" : "We follow a holistic, patient-centered approach that treats the root cause rather than symptoms, ensuring long-term relief.",
                icon: Shield,
              },
            ].map((item) => (
              <Card key={item.title}>
                <CardContent className="p-6 text-center">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-primary/10">
                    <item.icon className="h-6 w-6 text-primary" />
                  </div>
                  <h3 className="font-semibold">{item.title}</h3>
                  <p className="mt-2 text-sm text-muted-foreground">{item.text}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Milestones */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "हमारी यात्रा" : "Our Journey"}
            subtitle={lang === "hi" ? "उत्कृष्टता के वर्ष" : "Years of excellence"}
          />
          <div className="mx-auto max-w-2xl">
            <div className="relative border-l-2 border-primary/20 pl-6 space-y-8">
              {milestones.map((m) => (
                <div key={m.year} className="relative">
                  <div className="absolute -left-[31px] flex h-5 w-5 items-center justify-center rounded-full bg-primary">
                    <div className="h-2 w-2 rounded-full bg-primary-foreground" />
                  </div>
                  <p className="text-xs font-bold text-primary">{m.year}</p>
                  <p className="text-sm mt-0.5">{lang === "hi" ? m.hi : m.en}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Clinic Gallery */}
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
        </div>
      </section>

      {/* Stats */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid grid-cols-2 gap-6 md:grid-cols-4">
            {[
              { value: "12+", label: lang === "hi" ? "वर्ष अनुभव" : "Years Experience", icon: Calendar },
              { value: "5000+", label: lang === "hi" ? "मरीजों का इलाज" : "Patients Treated", icon: Users },
              { value: "1", label: lang === "hi" ? "क्लिनिक स्थान" : "Clinic Location", icon: Building2 },
              { value: "98%", label: lang === "hi" ? "संतुष्टि दर" : "Satisfaction Rate", icon: Heart },
            ].map((stat) => (
              <Card key={stat.label}>
                <CardContent className="flex flex-col items-center p-6 text-center">
                  <stat.icon className="h-8 w-8 text-primary mb-2" />
                  <p className="text-2xl font-bold">{stat.value}</p>
                  <p className="text-xs text-muted-foreground mt-1">{stat.label}</p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">
            {lang === "hi" ? "अपनी रिकवरी की शुरुआत करें" : "Start Your Recovery Today"}
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {lang === "hi"
              ? "डॉ. अंजू जाखड़ से मिलें और अपनी समस्या का समाधान पाएं"
              : "Meet Dr. Anju Jakhar and find the solution to your problem"}
          </p>
          <Link to="/contact">
            <Button variant="secondary" size="lg" className="mt-6 gap-2">
              {t("cta.bookAppointment")} <ArrowRight className="h-4 w-4" />
            </Button>
          </Link>
        </div>
      </section>
    </>
  )
}

const Target = ({ className }: { className?: string }) => (
  <svg className={className} fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
    <circle cx="12" cy="12" r="10" />
    <circle cx="12" cy="12" r="6" />
    <circle cx="12" cy="12" r="2" />
  </svg>
)
