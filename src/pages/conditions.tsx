import { Helmet } from "react-helmet-async"
import { useState } from "react"
import { Activity, Search, ArrowRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Input } from "@/components/ui/input"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp, buildConditionEnquiryMessage } from "@/lib/whatsapp"

const conditionCategories = {
  general: {
    en: "General & Chronic",
    hi: "सामान्य और पुरानी",
    conditions: [
      { en: "Arthritis & Osteoarthritis", hi: "गठिया और ऑस्टियोआर्थराइटिस", desc: "Joint inflammation causing pain, stiffness, and reduced mobility", descHi: "जोड़ों में सूजन जो दर्द, कठोरता और कम गतिशीलता का कारण बनती है" },
      { en: "Low Back Pain / Sciatica", hi: "कमर दर्द / साइटिका", desc: "Pain in the lower back often radiating to legs due to nerve compression", descHi: "पीठ के निचले हिस्से में दर्द जो अक्सर तंत्रिका दबाव के कारण पैरों तक फैलता है" },
      { en: "Frozen Shoulder", hi: "फ्रोजन शोल्डर", desc: "Stiffness and pain in the shoulder joint limiting movement", descHi: "कंधे के जोड़ में कठोरता और दर्द जो गति को सीमित करता है" },
      { en: "Cervical Spondylosis", hi: "सर्वाइकल स्पॉन्डिलोसिस", desc: "Age-related wear of the spinal discs in the neck", descHi: "गर्दन में रीढ़ की डिस्क का उम्र संबंधित घिसाव" },
      { en: "Cerebral Palsy", hi: "सेरेब्रल पाल्सी", desc: "Movement and posture disorders requiring specialized rehabilitation", descHi: "गति और मुद्रा विकार जिनके लिए विशेष पुनर्वास की आवश्यकता होती है" },
      { en: "Hemiplegia", hi: "हेमिप्लेजिया", desc: "Paralysis of one side of the body requiring neuro rehabilitation", descHi: "शरीर के एक तरफ का पक्षाघात जिसके लिए न्यूरो पुनर्वास की आवश्यकता होती है" },
      { en: "Soft Tissue Injuries", hi: "सॉफ्ट टिश्यू चोटें", desc: "Damage to muscles, ligaments, and tendons from injury or overuse", descHi: "चोट या अत्यधिक उपयोग से मांसपेशियों, लिगामेंट्स और टेंडन को नुकसान" },
      { en: "Post Fracture Cases", hi: "फ्रैक्चर के बाद", desc: "Rehabilitation after bone fractures to restore strength and mobility", descHi: "ताकत और गतिशीलता बहाल करने के लिए हड्डी के फ्रैक्चर के बाद पुनर्वास" },
      { en: "Joint Replacement (TKR, THR)", hi: "जॉइंट रिप्लेसमेंट (TKR, THR)", desc: "Post-surgical rehabilitation for knee and hip replacement surgeries", descHi: "घुटने और कूल्हे की रिप्लेसमेंट सर्जरी के बाद पुनर्वास" },
    ],
  },
  headNeck: {
    en: "Head & Neck",
    hi: "सिर और गर्दन",
    conditions: [
      { en: "Headaches", hi: "सिरदर्द", desc: "Tension headaches and cervicogenic headaches treated with manual therapy", descHi: "मैनुअल थेरेपी से इलाज किए जाने वाले तनाव सिरदर्द" },
      { en: "Neck Pain", hi: "गर्दन दर्द", desc: "Pain and stiffness in the cervical region from posture or injury", descHi: "मुद्रा या चोट से गर्दन के क्षेत्र में दर्द और कठोरता" },
      { en: "Cervical Spine Issues", hi: "सर्वाइकल स्पाइन", desc: "Disc problems, nerve compression, and degenerative changes in neck", descHi: "गर्दन में डिस्क समस्याएं, तंत्रिका दबाव और अपक्षयी परिवर्तन" },
    ],
  },
  upperBody: {
    en: "Upper Body",
    hi: "ऊपरी शरीर",
    conditions: [
      { en: "Catching Shoulder", hi: "कैचिंग शोल्डर", desc: "Shoulder impingement causing pain during arm movement", descHi: "कंधे का इम्पिंजमेंट जो भुजा की गति के दौरान दर्द का कारण बनता है" },
      { en: "Carpal Tunnel Syndrome", hi: "कार्पल टनल सिंड्रोम", desc: "Numbness and tingling in hand due to nerve compression at wrist", descHi: "कलाई पर तंत्रिका दबाव के कारण हाथ में सुन्नपन और झुनझुनी" },
      { en: "Tennis/Golfers Elbow", hi: "टेनिस/गोल्फर्स एल्बो", desc: "Pain in the elbow from repetitive forearm movements", descHi: "दोहराव वाली अग्रबाहु गतिविधियों से कोहनी में दर्द" },
      { en: "Wrist Pain", hi: "कलाई का दर्द", desc: "Pain from overuse, injury, or conditions like tendinitis", descHi: "अत्यधिक उपयोग, चोट या टेंडिनाइटिस जैसी स्थितियों से दर्द" },
    ],
  },
  lowerBody: {
    en: "Lower Body",
    hi: "निचला शरीर",
    conditions: [
      { en: "Hip Pain", hi: "कूल्हे का दर्द", desc: "Pain in the hip joint from arthritis, bursitis, or injury", descHi: "गठिया, बर्साइटिस या चोट से कूल्हे के जोड़ में दर्द" },
      { en: "Knee Pain", hi: "घुटने का दर्द", desc: "Pain from osteoarthritis, ligament injuries, or meniscal tears", descHi: "ऑस्टियोआर्थराइटिस, लिगामेंट चोटों या मेनिस्कल टियर से दर्द" },
      { en: "Hamstring Strain", hi: "हैमस्ट्रिंग स्ट्रेन", desc: "Muscle tears at the back of thigh from sports or sudden movements", descHi: "खेल या अचानक गतिविधियों से जांघ के पीछे की मांसपेशियों में खिंचाव" },
      { en: "Calf Strain", hi: "पिंडली का खिंचाव", desc: "Injury to calf muscles causing pain during walking or running", descHi: "पिंडली की मांसपेशियों में चोट जो चलने या दौड़ने में दर्द करती है" },
      { en: "Shin Splints", hi: "शिन स्प्लिंट्स", desc: "Pain along the shin bone from overuse during exercise", descHi: "व्यायाम के दौरान अत्यधिक उपयोग से पिंडली की हड्डी में दर्द" },
    ],
  },
  footAnkle: {
    en: "Foot & Ankle",
    hi: "पैर और टखना",
    conditions: [
      { en: "Achilles Tendon", hi: "एकिलीज टेंडन", desc: "Inflammation or tears of the tendon connecting calf to heel", descHi: "पिंडली को एड़ी से जोड़ने वाले कंडरा में सूजन या दरार" },
      { en: "Sprained Ankle", hi: "मोच आई टखना", desc: "Ligament injury from ankle twisting requiring rehabilitation", descHi: "टखने के मुड़ने से लिगामेंट की चोट जिसके लिए पुनर्वास की आवश्यकता है" },
      { en: "Plantar Fasciitis", hi: "प्लांटर फेसाइटिस", desc: "Heel pain from inflammation of the tissue connecting heel to toes", descHi: "एड़ी को पैर की उंगलियों से जोड़ने वाले ऊतक की सूजन से एड़ी में दर्द" },
      { en: "Heel Pain", hi: "एड़ी का दर्द", desc: "Pain under or behind the heel from various causes", descHi: "विभिन्न कारणों से एड़ी के नीचे या पीछे दर्द" },
    ],
  },
}

export function ConditionsPage() {
  const { t, lang } = useI18n()
  const [searchQuery, setSearchQuery] = useState("")

  const allConditions = Object.values(conditionCategories).flatMap((cat) => cat.conditions)
  const filteredConditions = searchQuery
    ? allConditions.filter(
        (c) =>
          c.en.toLowerCase().includes(searchQuery.toLowerCase()) ||
          c.hi.includes(searchQuery)
      )
    : null

  return (
    <>
      <Helmet>
        <title>{t("seo.conditionsTitle")}</title>
        <meta name="description" content={t("seo.conditionsDesc")} />
        <meta property="og:title" content={t("seo.conditionsTitle")} />
        <meta property="og:description" content={t("seo.conditionsDesc")} />
        <link rel="canonical" href="https://narayanaphysiocare.com/conditions" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-3">{t("clinic.name")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("section.conditions")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("section.conditionsSubtitle")}</p>
        </div>
      </section>

      {/* Search */}
      <section className="py-6 border-b">
        <div className="mx-auto max-w-7xl px-4">
          <div className="relative max-w-md">
            <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
            <Input
              placeholder={lang === "hi" ? "बीमारी खोजें..." : "Search conditions..."}
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="pl-9"
            />
          </div>
        </div>
      </section>

      {/* Search Results or Tabbed Content */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          {filteredConditions ? (
            <div>
              <p className="text-sm text-muted-foreground mb-6">
                {filteredConditions.length} {lang === "hi" ? "परिणाम मिले" : "results found"}
              </p>
              <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                {filteredConditions.map((condition) => (
                  <Card key={condition.en}>
                    <CardContent className="p-4">
                      <div className="flex items-start gap-3">
                        <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                          <Activity className="h-4 w-4 text-primary" />
                        </div>
                        <div className="flex-1">
                          <h3 className="text-sm font-semibold">{lang === "hi" ? condition.hi : condition.en}</h3>
                          <p className="mt-1 text-xs text-muted-foreground">{lang === "hi" ? condition.descHi : condition.desc}</p>
                          <Button
                            variant="ghost"
                            size="sm"
                            className="mt-2 gap-1 px-0 text-xs text-primary"
                            onClick={() => openWhatsApp(buildConditionEnquiryMessage(lang === "hi" ? condition.hi : condition.en, lang))}
                          >
                            {t("cta.getTreatmentPlan")} <ArrowRight className="h-3 w-3" />
                          </Button>
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          ) : (
            <Tabs defaultValue="general">
              <TabsList className="mb-8 flex-wrap h-auto gap-1">
                {Object.entries(conditionCategories).map(([key, cat]) => (
                  <TabsTrigger key={key} value={key} className="text-xs">
                    {lang === "hi" ? cat.hi : cat.en}
                  </TabsTrigger>
                ))}
              </TabsList>
              {Object.entries(conditionCategories).map(([key, cat]) => (
                <TabsContent key={key} value={key}>
                  <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
                    {cat.conditions.map((condition) => (
                      <Card key={condition.en} className="transition-shadow hover:shadow-md">
                        <CardContent className="p-4">
                          <div className="flex items-start gap-3">
                            <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-primary/10">
                              <Activity className="h-4 w-4 text-primary" />
                            </div>
                            <div className="flex-1">
                              <h3 className="text-sm font-semibold">{lang === "hi" ? condition.hi : condition.en}</h3>
                              <p className="mt-1 text-xs text-muted-foreground">{lang === "hi" ? condition.descHi : condition.desc}</p>
                              <Button
                                variant="ghost"
                                size="sm"
                                className="mt-2 gap-1 px-0 text-xs text-primary"
                                onClick={() => openWhatsApp(buildConditionEnquiryMessage(lang === "hi" ? condition.hi : condition.en, lang))}
                              >
                                {t("cta.getTreatmentPlan")} <ArrowRight className="h-3 w-3" />
                              </Button>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                </TabsContent>
              ))}
            </Tabs>
          )}
        </div>
      </section>

      {/* Detailed Conditions Accordion */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "प्रमुख स्थितियों का विवरण" : "Major Conditions in Detail"}
            subtitle={lang === "hi" ? "प्रत्येक स्थिति के बारे में विस्तृत जानकारी" : "Detailed information about each condition"}
          />
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible>
              {conditionCategories.general.conditions.slice(0, 6).map((condition, i) => (
                <AccordionItem key={i} value={`detail-${i}`}>
                  <AccordionTrigger className="text-sm text-left">
                    {lang === "hi" ? condition.hi : condition.en}
                  </AccordionTrigger>
                  <AccordionContent>
                    <p className="text-sm text-muted-foreground mb-3">
                      {lang === "hi" ? condition.descHi : condition.desc}
                    </p>
                    <p className="text-xs text-muted-foreground mb-3">
                      {lang === "hi"
                        ? "हमारा उपचार: मैनुअल थेरेपी, इलेक्ट्रोथेरेपी, और चिकित्सीय व्यायाम का संयोजन। व्यक्तिगत उपचार योजना डॉ. अंजू जाखड़ द्वारा तैयार की जाती है।"
                        : "Our treatment: A combination of manual therapy, electrotherapy, and therapeutic exercises. Personalized treatment plan prepared by Dr. Anju Jakhar."}
                    </p>
                    <Button
                      size="sm"
                      className="gap-1"
                      onClick={() => openWhatsApp(buildConditionEnquiryMessage(lang === "hi" ? condition.hi : condition.en, lang))}
                    >
                      {t("cta.getTreatmentPlan")} <ArrowRight className="h-3 w-3" />
                    </Button>
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      {/* When to See a Physio */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "फिजियोथेरेपिस्ट कब दिखाएं?" : "When to See a Physiotherapist?"}
            subtitle={lang === "hi" ? "इन संकेतों पर ध्यान दें" : "Watch for these warning signs"}
          />
          <div className="grid gap-3 sm:grid-cols-2 lg:grid-cols-3 max-w-4xl mx-auto">
            {[
              { en: "Pain lasting more than 2 weeks", hi: "2 सप्ताह से अधिक समय तक दर्द" },
              { en: "Difficulty in daily activities", hi: "दैनिक गतिविधियों में कठिनाई" },
              { en: "Numbness or tingling sensation", hi: "सुन्नपन या झुनझुनी का अनुभव" },
              { en: "Post-surgery rehabilitation needed", hi: "सर्जरी के बाद पुनर्वास की आवश्यकता" },
              { en: "Recurring sports injuries", hi: "बार-बार होने वाली खेल चोटें" },
              { en: "Limited range of motion", hi: "गति की सीमित सीमा" },
            ].map((item) => (
              <div key={item.en} className="flex items-center gap-3 rounded-lg border p-3">
                <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full bg-destructive/10">
                  <Activity className="h-4 w-4 text-destructive" />
                </div>
                <span className="text-sm">{lang === "hi" ? item.hi : item.en}</span>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">
            {lang === "hi" ? "अपनी स्थिति बताएं, विशेषज्ञ सलाह पाएं" : "Describe your condition, get expert advice"}
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {lang === "hi"
              ? "व्हाट्सएप पर अपनी समस्या बताएं और डॉ. अंजू से मार्गदर्शन प्राप्त करें"
              : "Share your problem on WhatsApp and get guidance from Dr. Anju"}
          </p>
          <Button
            variant="secondary"
            size="lg"
            className="mt-6 gap-2"
            onClick={() =>
              openWhatsApp(
                lang === "hi"
                  ? "नमस्ते डॉ. अंजू, मुझे अपनी स्थिति के बारे में सलाह चाहिए।"
                  : "Hello Dr. Anju, I need advice about my condition."
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
