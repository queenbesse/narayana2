import { Helmet } from "react-helmet-async"
import { ArrowRight, BookOpen, Clock } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp } from "@/lib/whatsapp"

const tips = [
  {
    title: "5 Rules for Correct Posture",
    titleHi: "सही पोस्चर के 5 नियम",
    category: "Posture",
    categoryHi: "पोस्चर",
    img: "/tip-posture.webp",
    readTime: "3 min",
    content: "Maintaining correct posture is essential for preventing back and neck pain. Keep your shoulders back, chin tucked, and core engaged. When sitting, ensure your feet are flat on the floor and your screen is at eye level.",
    contentHi: "सही पोस्चर बनाए रखना पीठ और गर्दन के दर्द को रोकने के लिए आवश्यक है। अपने कंधों को पीछे रखें, ठुड्डी अंदर और कोर लगा हुआ। बैठते समय सुनिश्चित करें कि आपके पैर फर्श पर सपाट हों और स्क्रीन आंखों के स्तर पर हो।",
  },
  {
    title: "Home Remedies for Back Pain",
    titleHi: "कमर दर्द के घरेलू उपाय",
    category: "Back Pain",
    categoryHi: "कमर दर्द",
    img: "/tip-back-pain.webp",
    readTime: "4 min",
    content: "For mild back pain, try hot/cold therapy, gentle stretches, and maintaining activity. Ice for first 48 hours, then switch to heat. Cat-cow stretches and child's pose can provide relief. Avoid prolonged bed rest.",
    contentHi: "हल्के कमर दर्द के लिए, गर्म/ठंडी सिकाई, हल्की स्ट्रेचिंग और गतिविधि बनाए रखें। पहले 48 घंटे बर्फ लगाएं, फिर गर्मी। कैट-काउ स्ट्रेच और चाइल्ड पोज़ राहत दे सकते हैं। लंबे समय तक बेड रेस्ट से बचें।",
  },
  {
    title: "Exercises to Strengthen Knees",
    titleHi: "घुटने मजबूत करने के व्यायाम",
    category: "Knee Health",
    categoryHi: "घुटने का स्वास्थ्य",
    img: "/tip-knee-exercise.webp",
    readTime: "5 min",
    content: "Strengthen your knees with wall sits, straight leg raises, hamstring curls, and step-ups. Start with 10 reps, gradually increase. Always warm up first. Avoid deep squats if you have knee issues.",
    contentHi: "वॉल सिट्स, स्ट्रेट लेग रेज़, हैमस्ट्रिंग कर्ल और स्टेप-अप से अपने घुटनों को मजबूत करें। 10 रेप्स से शुरू करें, धीरे-धीरे बढ़ाएं। हमेशा पहले वार्म अप करें। घुटने की समस्या हो तो गहरी स्क्वाट से बचें।",
  },
  {
    title: "Neck Pain from Phone Use",
    titleHi: "फोन के उपयोग से गर्दन दर्द",
    category: "Neck Pain",
    categoryHi: "गर्दन दर्द",
    img: "/service-taping-therapy.webp",
    readTime: "3 min",
    content: "Text neck is caused by looking down at your phone for extended periods. Hold your phone at eye level, take breaks every 20 minutes, and do chin tucks and neck rotations to relieve tension.",
    contentHi: "टेक्स्ट नेक लंबे समय तक फोन पर नीचे देखने से होता है। फोन को आंखों के स्तर पर रखें, हर 20 मिनट में ब्रेक लें, और तनाव कम करने के लिए चिन टक और गर्दन के रोटेशन करें।",
  },
  {
    title: "When to Visit a Physiotherapist",
    titleHi: "फिजियोथेरेपिस्ट कब दिखाएं",
    category: "General",
    categoryHi: "सामान्य",
    img: "/hero-physio-treatment.webp",
    readTime: "4 min",
    content: "See a physiotherapist if pain lasts more than 2 weeks, daily activities become difficult, you have numbness or tingling, or post-surgery rehabilitation is needed. Early intervention leads to faster recovery.",
    contentHi: "फिजियोथेरेपिस्ट दिखाएं यदि दर्द 2 सप्ताह से अधिक रहे, दैनिक गतिविधियां कठिन हों, सुन्नपन या झुनझुनी हो, या सर्जरी के बाद पुनर्वास की आवश्यकता हो। शुरुआती हस्तक्षेप से तेजी से रिकवरी होती है।",
  },
  {
    title: "Shoulder Stretches for Desk Workers",
    titleHi: "डेस्क वर्कर्स के लिए कंधे की स्ट्रेचिंग",
    category: "Shoulder",
    categoryHi: "कंधा",
    img: "/service-mfr-therapy.webp",
    readTime: "3 min",
    content: "Relieve shoulder tension with doorway stretches, cross-body arm pulls, and shoulder blade squeezes. Do these every 2 hours during desk work. Maintain ergonomic desk setup to prevent recurring issues.",
    contentHi: "दरवाजे पर स्ट्रेच, क्रॉस-बॉडी आर्म पुल और शोल्डर ब्लेड स्क्वीज़ से कंधे का तनाव दूर करें। डेस्क वर्क के दौरान हर 2 घंटे ये करें। बार-बार होने वाली समस्याओं को रोकने के लिए एर्गोनोमिक सेटअप बनाएं।",
  },
]

export function TipsPage() {
  const { t, lang } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t("seo.tipsTitle")}</title>
        <meta name="description" content={t("seo.tipsDesc")} />
        <meta property="og:title" content={t("seo.tipsTitle")} />
        <meta property="og:description" content={t("seo.tipsDesc")} />
        <link rel="canonical" href="https://narayanaphysiocare.com/tips" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-3">{t("clinic.name")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("section.tips")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("section.tipsSubtitle")}</p>
        </div>
      </section>

      {/* Featured Tip */}
      <section className="py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="overflow-hidden">
            <div className="grid md:grid-cols-2">
              <div className="h-56 md:h-72">
                <img
                  src={tips[0].img}
                  alt={lang === "hi" ? tips[0].titleHi : tips[0].title}
                  className="h-full w-full object-cover"
                  loading="eager"
                />
              </div>
              <CardContent className="flex flex-col justify-center p-6">
                <Badge variant="secondary" className="w-fit mb-3">{lang === "hi" ? "विशेष लेख" : "Featured"}</Badge>
                <h2 className="text-xl font-bold">{lang === "hi" ? tips[0].titleHi : tips[0].title}</h2>
                <p className="mt-3 text-sm text-muted-foreground">
                  {lang === "hi" ? tips[0].contentHi : tips[0].content}
                </p>
                <div className="mt-4 flex items-center gap-3 text-xs text-muted-foreground">
                  <span className="flex items-center gap-1"><Clock className="h-3 w-3" /> {tips[0].readTime}</span>
                  <span className="flex items-center gap-1"><BookOpen className="h-3 w-3" /> {lang === "hi" ? tips[0].categoryHi : tips[0].category}</span>
                </div>
              </CardContent>
            </div>
          </Card>
        </div>
      </section>

      {/* All Tips */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "सभी स्वास्थ्य सुझाव" : "All Health Tips"}
            subtitle={lang === "hi" ? "अपने शारीरिक स्वास्थ्य को बेहतर बनाने के लिए पढ़ें" : "Read to improve your physical health"}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {tips.map((tip, i) => (
              <Card key={i} className="group overflow-hidden">
                <div className="h-40 overflow-hidden">
                  <img
                    src={tip.img}
                    alt={lang === "hi" ? tip.titleHi : tip.title}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                </div>
                <CardContent className="p-4">
                  <div className="flex items-center gap-2 mb-2">
                    <Badge variant="outline" className="text-[10px]">{lang === "hi" ? tip.categoryHi : tip.category}</Badge>
                    <span className="text-[10px] text-muted-foreground flex items-center gap-1">
                      <Clock className="h-2.5 w-2.5" /> {tip.readTime}
                    </span>
                  </div>
                  <h3 className="text-sm font-semibold">{lang === "hi" ? tip.titleHi : tip.title}</h3>
                  <p className="mt-2 text-xs text-muted-foreground line-clamp-3">
                    {lang === "hi" ? tip.contentHi : tip.content}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Exercise Videos placeholder */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "व्यायाम वीडियो" : "Exercise Videos"}
            subtitle={lang === "hi" ? "घर पर करने योग्य व्यायाम" : "Exercises you can do at home"}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[
              { en: "Morning Stretching Routine", hi: "सुबह की स्ट्रेचिंग दिनचर्या" },
              { en: "Back Pain Relief Exercises", hi: "कमर दर्द राहत व्यायाम" },
              { en: "Knee Strengthening at Home", hi: "घर पर घुटने मजबूत करना" },
            ].map((video) => (
              <Card key={video.en} className="overflow-hidden">
                <div className="h-40 bg-muted flex items-center justify-center">
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-primary/10 border-2 border-primary/20">
                    <div className="h-0 w-0 border-t-[8px] border-t-transparent border-l-[14px] border-l-primary border-b-[8px] border-b-transparent ml-1" />
                  </div>
                </div>
                <CardContent className="p-4">
                  <h3 className="text-sm font-semibold">{lang === "hi" ? video.hi : video.en}</h3>
                  <p className="text-xs text-muted-foreground mt-1">
                    {lang === "hi" ? "जल्द आ रहा है" : "Coming Soon"}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-xl font-bold md:text-2xl">
            {lang === "hi" ? "व्यक्तिगत व्यायाम मार्गदर्शन चाहिए?" : "Need personalized exercise guidance?"}
          </h2>
          <p className="mt-2 text-sm text-muted-foreground">
            {lang === "hi"
              ? "डॉ. अंजू से अपनी स्थिति के लिए अनुकूलित व्यायाम योजना प्राप्त करें"
              : "Get a customized exercise plan for your condition from Dr. Anju"}
          </p>
          <Button
            className="mt-6 gap-2"
            onClick={() =>
              openWhatsApp(
                lang === "hi"
                  ? "नमस्ते, मुझे अपनी स्थिति के लिए व्यायाम मार्गदर्शन चाहिए।"
                  : "Hello, I need exercise guidance for my condition."
              )
            }
          >
            {t("cta.whatsappUs")} <ArrowRight className="h-4 w-4" />
          </Button>
        </div>
      </section>
    </>
  )
}
