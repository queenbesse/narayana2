import { Helmet } from "react-helmet-async"
import { Zap, Target, Activity, Shield, Sparkles, Hop as HomeIcon, CircleCheck as CheckCircle, ArrowRight, Clock, Phone, Calendar } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { Separator } from "@/components/ui/separator"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp, buildServiceEnquiryMessage, buildConditionEnquiryMessage } from "@/lib/whatsapp"
import { asset } from "@/lib/utils"

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

const conditionsTreated = [
  {
    en: "Arthritis & Osteoarthritis",
    hi: "गठिया और ऑस्टियोआर्थराइटिस",
    desc: "Joint inflammation causing pain, stiffness, and reduced mobility",
    descHi: "जोड़ों में सूजन जो दर्द, कठोरता और कम गतिशीलता का कारण बनती है",
    img: "https://images.pexels.com/photos/7298685/pexels-photo-7298685.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Low Back Pain / Sciatica",
    hi: "कमर दर्द / साइटिका",
    desc: "Pain in the lower back often radiating to legs due to nerve compression",
    descHi: "पीठ के निचले हिस्से में दर्द जो अक्सर तंत्रिका दबाव के कारण पैरों तक फैलता है",
    img: "https://images.pexels.com/photos/5473184/pexels-photo-5473184.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Frozen Shoulder",
    hi: "फ्रोजन शोल्डर",
    desc: "Stiffness and pain in the shoulder joint limiting movement",
    descHi: "कंधे के जोड़ में कठोरता और दर्द जो गति को सीमित करता है",
    img: "https://images.pexels.com/photos/5473186/pexels-photo-5473186.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Cervical Spondylosis",
    hi: "सर्वाइकल स्पॉन्डिलोसिस",
    desc: "Age-related wear of the spinal discs in the neck",
    descHi: "गर्दन में रीढ़ की डिस्क का उम्र संबंधित घिसाव",
    img: "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Knee Pain",
    hi: "घुटने का दर्द",
    desc: "Pain from osteoarthritis, ligament injuries, or meniscal tears",
    descHi: "ऑस्टियोआर्थराइटिस, लिगामेंट चोटों या मेनिस्कल टियर से दर्द",
    img: "https://images.pexels.com/photos/4506109/pexels-photo-4506109.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Neck Pain",
    hi: "गर्दन दर्द",
    desc: "Pain and stiffness in the cervical region from posture or injury",
    descHi: "मुद्रा या चोट से गर्दन के क्षेत्र में दर्द और कठोरता",
    img: "https://images.pexels.com/photos/5473177/pexels-photo-5473177.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Cerebral Palsy",
    hi: "सेरेब्रल पाल्सी",
    desc: "Movement and posture disorders requiring specialized rehabilitation",
    descHi: "गति और मुद्रा विकार जिनके लिए विशेष पुनर्वास की आवश्यकता होती है",
    img: "https://images.pexels.com/photos/6111610/pexels-photo-6111610.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Hemiplegia",
    hi: "हेमिप्लेजिया",
    desc: "Paralysis of one side of the body requiring neuro rehabilitation",
    descHi: "शरीर के एक तरफ का पक्षाघात जिसके लिए न्यूरो पुनर्वास की आवश्यकता होती है",
    img: "https://images.pexels.com/photos/6551142/pexels-photo-6551142.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Post Fracture Rehabilitation",
    hi: "फ्रैक्चर के बाद पुनर्वास",
    desc: "Rehabilitation after bone fractures to restore strength and mobility",
    descHi: "ताकत और गतिशीलता बहाल करने के लिए हड्डी के फ्रैक्चर के बाद पुनर्वास",
    img: "https://images.pexels.com/photos/5473170/pexels-photo-5473170.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Joint Replacement (TKR, THR)",
    hi: "जॉइंट रिप्लेसमेंट (TKR, THR)",
    desc: "Post-surgical rehabilitation for knee and hip replacement surgeries",
    descHi: "घुटने और कूल्हे की रिप्लेसमेंट सर्जरी के बाद पुनर्वास",
    img: "https://images.pexels.com/photos/7298902/pexels-photo-7298902.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Tennis / Golfers Elbow",
    hi: "टेनिस / गोल्फर्स एल्बो",
    desc: "Pain in the elbow from repetitive forearm movements",
    descHi: "दोहराव वाली अग्रबाहु गतिविधियों से कोहनी में दर्द",
    img: "https://images.pexels.com/photos/5473223/pexels-photo-5473223.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Plantar Fasciitis",
    hi: "प्लांटर फेसाइटिस",
    desc: "Heel pain from inflammation of the tissue connecting heel to toes",
    descHi: "एड़ी को पैर की उंगलियों से जोड़ने वाले ऊतक की सूजन से एड़ी में दर्द",
    img: "https://images.pexels.com/photos/5473195/pexels-photo-5473195.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Carpal Tunnel Syndrome",
    hi: "कार्पल टनल सिंड्रोम",
    desc: "Numbness and tingling in hand due to nerve compression at wrist",
    descHi: "कलाई पर तंत्रिका दबाव के कारण हाथ में सुन्नपन और झुनझुनी",
    img: "https://images.pexels.com/photos/4506106/pexels-photo-4506106.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Hip Pain",
    hi: "कूल्हे का दर्द",
    desc: "Pain in the hip joint from arthritis, bursitis, or injury",
    descHi: "गठिया, बर्साइटिस या चोट से कूल्हे के जोड़ में दर्द",
    img: "https://images.pexels.com/photos/4506217/pexels-photo-4506217.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Soft Tissue Injuries",
    hi: "सॉफ्ट टिश्यू चोटें",
    desc: "Damage to muscles, ligaments, and tendons from injury or overuse",
    descHi: "चोट या अत्यधिक उपयोग से मांसपेशियों, लिगामेंट्स और टेंडन को नुकसान",
    img: "https://images.pexels.com/photos/3760275/pexels-photo-3760275.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Headaches",
    hi: "सिरदर्द",
    desc: "Tension headaches and cervicogenic headaches treated with manual therapy",
    descHi: "मैनुअल थेरेपी से इलाज किए जाने वाले तनाव सिरदर्द",
    img: "https://images.pexels.com/photos/3807730/pexels-photo-3807730.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Sprained Ankle",
    hi: "मोच आई टखना",
    desc: "Ligament injury from ankle twisting requiring rehabilitation",
    descHi: "टखने के मुड़ने से लिगामेंट की चोट जिसके लिए पुनर्वास की आवश्यकता है",
    img: "https://images.pexels.com/photos/3760262/pexels-photo-3760262.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Shin Splints",
    hi: "शिन स्प्लिंट्स",
    desc: "Pain along the shin bone from overuse during exercise",
    descHi: "व्यायाम के दौरान अत्यधिक उपयोग से पिंडली की हड्डी में दर्द",
    img: "https://images.pexels.com/photos/3756042/pexels-photo-3756042.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Hamstring Strain",
    hi: "हैमस्ट्रिंग स्ट्रेन",
    desc: "Muscle tears at the back of thigh from sports or sudden movements",
    descHi: "खेल या अचानक गतिविधियों से जांघ के पीछे की मांसपेशियों में खिंचाव",
    img: "https://images.pexels.com/photos/3760790/pexels-photo-3760790.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Achilles Tendon",
    hi: "एकिलीज टेंडन",
    desc: "Inflammation or tears of the tendon connecting calf to heel",
    descHi: "पिंडली को एड़ी से जोड़ने वाले कंडरा में सूजन या दरार",
    img: "https://images.pexels.com/photos/4498155/pexels-photo-4498155.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Heel Pain",
    hi: "एड़ी का दर्द",
    desc: "Pain under or behind the heel from various causes",
    descHi: "विभिन्न कारणों से एड़ी के नीचे या पीछे दर्द",
    img: "https://images.pexels.com/photos/5473195/pexels-photo-5473195.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Wrist Pain",
    hi: "कलाई का दर्द",
    desc: "Pain from overuse, injury, or conditions like tendinitis",
    descHi: "अत्यधिक उपयोग, चोट या टेंडिनाइटिस जैसी स्थितियों से दर्द",
    img: "https://images.pexels.com/photos/4506106/pexels-photo-4506106.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Calf Strain",
    hi: "पिंडली का खिंचाव",
    desc: "Injury to calf muscles causing pain during walking or running",
    descHi: "पिंडली की मांसपेशियों में चोट जो चलने या दौड़ने में दर्द करती है",
    img: "https://images.pexels.com/photos/3756165/pexels-photo-3756165.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Catching Shoulder",
    hi: "कैचिंग शोल्डर",
    desc: "Shoulder impingement causing pain during arm movement",
    descHi: "कंधे का इम्पिंजमेंट जो भुजा की गति के दौरान दर्द का कारण बनता है",
    img: "https://images.pexels.com/photos/5473186/pexels-photo-5473186.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
  {
    en: "Cervical Spine Issues",
    hi: "सर्वाइकल स्पाइन",
    desc: "Disc problems, nerve compression, and degenerative changes in neck",
    descHi: "गर्दन में डिस्क समस्याएं, तंत्रिका दबाव और अपक्षयी परिवर्तन",
    img: "https://images.pexels.com/photos/5473182/pexels-photo-5473182.jpeg?auto=compress&cs=tinysrgb&w=600",
  },
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
                      src={asset(service.img)}
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

      {/* Conditions We Treat */}
      <section className="py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4">
          <SectionHeader
            title={lang === "hi" ? "हम किन स्थितियों का इलाज करते हैं" : "Conditions We Treat"}
            subtitle={lang === "hi" ? "विभिन्न दर्द और गतिशीलता समस्याओं के लिए विशेषज्ञ फिजियोथेरेपी" : "Expert physiotherapy for a wide range of pain and mobility conditions"}
          />
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
            {conditionsTreated.map((condition) => (
              <Card key={condition.en} className="group overflow-hidden transition-shadow hover:shadow-md">
                <div className="relative h-36 overflow-hidden">
                  <img
                    src={condition.img}
                    alt={lang === "hi" ? condition.hi : condition.en}
                    className="h-full w-full object-cover transition-transform group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <h3 className="absolute bottom-2 left-3 right-3 text-sm font-semibold text-white">
                    {lang === "hi" ? condition.hi : condition.en}
                  </h3>
                </div>
                <CardContent className="p-3">
                  <p className="text-xs text-muted-foreground line-clamp-2">
                    {lang === "hi" ? condition.descHi : condition.desc}
                  </p>
                  <Button
                    variant="ghost"
                    size="sm"
                    className="mt-2 gap-1 px-0 text-xs text-primary hover:text-primary"
                    onClick={() => openWhatsApp(buildConditionEnquiryMessage(lang === "hi" ? condition.hi : condition.en, lang))}
                  >
                    {t("cta.enquireNow")}
                    <ArrowRight className="h-3 w-3" />
                  </Button>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Equipment */}
      <section className="bg-card py-12 md:py-16">
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
