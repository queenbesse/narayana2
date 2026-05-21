import { Helmet } from "react-helmet-async"
import { Star, ArrowRight, MessageCircle, Quote, ExternalLink } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Badge } from "@/components/ui/badge"
import { SectionHeader } from "@/components/section-header"
import { useI18n } from "@/lib/i18n"
import { openWhatsApp } from "@/lib/whatsapp"

const GOOGLE_REVIEWS_URL = "https://www.google.com/search?q=Narayana+Physio+Care&sourceid=chrome&ie=UTF-8#lrd=0x390d191bcc09a10d:0x2e669bc448c7df1b,1,,,,"

const reviews = [
  { name: "Bonita Roy Choudhury", rating: 5, text: "Dr Anju is extremely superb in her work. I came to her with lot of pain in my shoulder post the injury. She really took good care and today I am recovered. I strongly recommend Dr Anju for any physio issue." },
  { name: "Kewal Krishan Marwah", rating: 5, text: "Anju Tokas has played a vital role for my fitness. I was struggling to walk post my foot surgery and within few weeks she helped me recover with a confident walk now. She has been closely involved with me on each development and guided way on this journey. Thank you for all the support and guidance!" },
  { name: "Megha Gulati", rating: 5, text: "The physiotherapy treatment is really good. Dr Anju is very patient and has good expertise. She helped me with my shoulder and neck problems. The exercises she prescribed were easy to follow and showed results quickly." },
  { name: "Pranav Agarwal", rating: 5, text: "Dr. Anju is an excellent physiotherapist. I consulted her for sports injury-related knee and shoulder tendonitis. She designed a comprehensive care plan covering pain management, inflammation reduction, and muscle strengthening. She combined therapies (including IFT, ultrasound, cupping, needling, massage) with medication and exercise. Her proactive communication and caring approach produced great results. Her facility is small but very effective. Highly recommended!" },
  { name: "Shreenu Mukherjee", rating: 5, text: "I came to Dr. Anju with knee pain just two weeks before a 5K run, and thanks to her meticulous care, I was able to run injury free. Since then, I've continued working with her to address chronic pains and imbalances, and the progress has been remarkable. She is extremely attentive and truly gives 100% to every patient. Highly recommended for anyone seeking effective, personalized physiotherapy." },
  { name: "Paavan Mehra", rating: 5, text: "Excellent physiotherapy with accurate diagnosis. Dr. Anju listens carefully and explains the problem clearly so you understand exactly what's happening. The exercises she prescribes are simple and effective, making it easy to continue the recovery at home. Highly Recommended!" },
  { name: "Shweta Aggarwal", rating: 5, text: "I went to see Anju because of excruciating pain in my neck from a massage gone wrong! She not only addressed that pain instantly but also then helped relieve pain in my hip and very tight IT band over the course of 10 days of treatment almost daily. I highly recommend Anju for her approach, knowledge and experience. I live in the UK and have seen multiple physiotherapists for my hip and IT band, none of whom have treated the pain as well as she did." },
  { name: "Anju Khurana", rating: 5, text: "I had a severe back pain for more than 2 weeks. Got MRI done but nothing conclusive. My orthopaedic Dr. Kakria suggested few multivitamin and physiotherapy. He suggested physio Anju Jakhar. She did magic. I took 10 sittings and my pain is gone. I highly recommend Anju Jakhar if anyone needs physiotherapy." },
  { name: "Deepti Goswami", rating: 5, text: "Dr Anju has excellent knowledge and is very kind. I came here in pain and got relief from physiotherapy given by her. I got treated for carpal tunnel as well as cervical spondylitis. Feeling a lot better after treatment. Highly recommended!" },
  { name: "Preeti Khanna", rating: 5, text: "Dr Anju Jakhar is a very pleasant and caring person. She understands your problems well then treats accordingly. Her approach to each patient is personalized and she takes the time to explain every step of the recovery process." },
  { name: "Shiva Varma", rating: 5, text: "Recently underwent seven Physiotherapy sessions with Dr. Anju for sciatica and spondylitis. Apart from heat and SWD treatments she made me do exercises specific to the ailments. At the end of the seventh session my pains had disappeared. Thanks Dr. Anju for the treatment." },
  { name: "Neelamm Chowdhry", rating: 5, text: "Dr. Anju is pleasant, approachable and extremely professional. Her treatment helped me significantly with my chronic pain issues. She knows her job well and provides clear guidance on exercises to do at home for continued recovery." },
  { name: "Khushal Singh Bisht", rating: 5, text: "I had a knee problem and ankle pain. Doctor suggested me for physiotherapy so I went to Dr Anju. She gave me 15 sittings, and now my pain has gone. Dr Anju knows her job very well and gave me good treatment. She is very kind. I highly recommend Dr Anju if anyone needs physiotherapy." },
  { name: "Nitin Chamoli", rating: 5, text: "Good therapy centre. They approach the issue with a holistic view. Rather than providing short term solution they focus more on overall strength development which helps in long term. The exercises and treatment plan are well thought out. Overall good experience." },
  { name: "Seema Malhotra", rating: 5, text: "Anju is extremely professional. She is very soft spoken and caring in her approach to treatment. She makes you feel comfortable right from the first session and explains the treatment plan clearly. The results speak for themselves." },
  { name: "Thakur Punam", rating: 5, text: "Dr Anju is really experienced and handles every case with all care. She takes the time to understand the root cause of pain and designs a treatment plan that actually works. Very happy with the results of my treatment." },
  { name: "Yesha Kulshreshtha", rating: 5, text: "Dr. Anju is very professional and helped me with my sciatica and lower back problem very effectively. Her targeted exercises and therapy sessions brought noticeable improvement within just a few visits. Would definitely recommend to anyone." },
  { name: "Deepti Rastogi", rating: 5, text: "Dr Anju is sincere and hardworking. She knows her craft well and applies the right combination of therapies for each patient's specific condition. I felt a significant improvement in my mobility after the treatment sessions." },
  { name: "Komalika Tokas", rating: 5, text: "Dr. Anju R Jakhar is an amazing therapist with nice behaviour and good hospitality. She makes every patient feel welcome and takes genuine interest in their recovery journey. The clinic environment is clean and well-maintained." },
  { name: "Manish Tokas", rating: 5, text: "Excellent location, nice facilities. Dr Anju is very experienced, professional and helpful. She explains the treatment process clearly and ensures you are comfortable throughout each session. Highly satisfied with the results." },
  { name: "Priti Gupta", rating: 5, text: "Dr. Anju is very cooperative and hard working. She goes above and beyond to ensure her patients recover well. Her dedication to physiotherapy and patient care is truly commendable. The treatment sessions are always well-organized and effective." },
  { name: "Om Prakash Malik", rating: 5, text: "We took treatment for my mother and for self. Dr. Anju gave professional advice and treatment to cure the pain. She is sincere and listens attentively to the patients' symptoms and customises the treatment as per requirements to deliver the timely results. Appreciated very much for the very good treatment. Narayana Physio Care is the clinic for timely and effective treatment." },
  { name: "Ajay Aggarwal", rating: 5, text: "I have been having shoulder pain, consulted couple of specialists. I was advised physiotherapy. I took physiotherapy sessions from Dr Anju. After 5 sessions I am already feeling much better with pain having been reduced drastically with improvement in range of movement. She is really good at her work. Highly recommended." },
  { name: "Sam Mahapatro", rating: 5, text: "It was an excellent treatment and I recovered in 15 days. Dr. Anju's approach was thorough and the combination of therapies she used was very effective. The clinic is well-equipped and the overall experience was very positive." },
  { name: "Ankita Baldewa", rating: 5, text: "Dr Anju is an excellent therapist. She is punctual and her treatment goes beyond just using machines for recovery. She incorporates targeted exercises and manual therapy that make a real difference. Definitely recommended physiotherapist." },
  { name: "Devi Rajani", rating: 5, text: "Dr. Anju has been giving physiotherapy to my mother since 10 days and she is feeling 70-80 percent better with less pain. All credit goes to Anju Ma'am. She has been working on her physical and emotional health simultaneously with her emotion management techniques, which helped my mom to get rid of pain so fast. Thank you Ma'am, may God bless you with a bright future for your hard work and dedication." },
  { name: "Nidhi Arya", rating: 5, text: "Dr. Anju is an excellent physiotherapist! I went to her with severe back pain and sciatica, and her personalized treatment made a huge difference. She carefully understands the root cause and designs exercises that actually work. Within a short time, my pain reduced significantly and mobility improved. Highly recommended for anyone dealing with back pain related issues!" },
  { name: "Tamanna Sharma", rating: 5, text: "I got very good relief from my tennis elbow after taking therapy at Narayana Physio Care Centre. You are a very good and supportive doctor, and you guided me very well throughout the recovery process. Thank you so much, mam." },
  { name: "Kavita Gandhi", rating: 5, text: "Dr. Anju is an excellent physiotherapist -- professional, caring, and highly effective. Her treatment made a real difference, and I'm very grateful for her guidance and support throughout my recovery journey." },
]

export function TestimonialsPage() {
  const { t, lang } = useI18n()

  return (
    <>
      <Helmet>
        <title>{t("seo.testimonialsTitle")}</title>
        <meta name="description" content={t("seo.testimonialsDesc")} />
        <meta property="og:title" content={t("seo.testimonialsTitle")} />
        <meta property="og:description" content={t("seo.testimonialsDesc")} />
        <link rel="canonical" href="https://narayanaphysiocare.com/testimonials" />
      </Helmet>

      {/* Page Hero */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4">
          <Badge variant="secondary" className="mb-3">{t("clinic.name")}</Badge>
          <h1 className="text-3xl font-bold tracking-tight md:text-4xl">{t("section.testimonials")}</h1>
          <p className="mt-2 text-muted-foreground max-w-2xl">{t("section.testimonialsSubtitle")}</p>
        </div>
      </section>

      {/* Google Rating Badge */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4">
          <Card className="border-primary/20">
            <CardContent className="flex flex-col items-center gap-6 p-6 sm:flex-row sm:justify-between">
              <div className="flex flex-col items-center gap-1 sm:items-start">
                <div className="flex items-center gap-2">
                  <p className="text-4xl font-bold">5.0</p>
                  <div className="flex gap-0.5">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <Star key={i} className="h-5 w-5 fill-primary text-primary" />
                    ))}
                  </div>
                </div>
                <p className="text-sm text-muted-foreground">
                  {lang === "hi" ? "Google पर परफेक्ट 5-स्टार रेटिंग" : "Perfect 5-star rating on Google"}
                </p>
                <p className="text-xs text-muted-foreground">
                  {lang === "hi" ? `${reviews.length}+ सत्यापित रोगी समीक्षाएं` : `${reviews.length}+ verified patient reviews`}
                </p>
              </div>
              <a
                href={GOOGLE_REVIEWS_URL}
                target="_blank"
                rel="noopener noreferrer"
              >
                <Button variant="outline" className="gap-2">
                  {lang === "hi" ? "Google पर समीक्षाएं देखें" : "View on Google"}
                  <ExternalLink className="h-3.5 w-3.5" />
                </Button>
              </a>
            </CardContent>
          </Card>
        </div>
      </section>

      {/* Reviews Grid */}
      <section className="py-8 md:py-12">
        <div className="mx-auto max-w-7xl px-4">
          <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {reviews.map((review, i) => (
              <Card key={i} className="relative">
                <CardContent className="p-5">
                  <Quote className="absolute top-4 right-4 h-6 w-6 text-primary/10" />
                  <div className="flex gap-0.5 mb-3">
                    {Array.from({ length: 5 }).map((_, j) => (
                      <Star key={j} className="h-3.5 w-3.5 fill-primary text-primary" />
                    ))}
                  </div>
                  <p className="text-sm text-muted-foreground italic leading-relaxed">
                    "{review.text}"
                  </p>
                  <div className="mt-4 flex items-center gap-3 border-t pt-3">
                    <div className="h-9 w-9 rounded-full bg-primary/10 flex items-center justify-center">
                      <span className="text-sm font-semibold text-primary">
                        {review.name.charAt(0)}
                      </span>
                    </div>
                    <div>
                      <p className="text-sm font-medium">{review.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {lang === "hi" ? "Google समीक्षा" : "Google Review"}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* View More on Google */}
      <section className="py-8">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <a
            href={GOOGLE_REVIEWS_URL}
            target="_blank"
            rel="noopener noreferrer"
          >
            <Button variant="outline" size="lg" className="gap-2">
              {lang === "hi" ? "Google पर और समीक्षाएं देखें" : "See More Reviews on Google"}
              <ExternalLink className="h-4 w-4" />
            </Button>
          </a>
        </div>
      </section>

      {/* Share Your Experience */}
      <section className="bg-card py-12 md:py-16">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <SectionHeader
            title={lang === "hi" ? "अपना अनुभव साझा करें" : "Share Your Experience"}
            subtitle={lang === "hi" ? "हमें बताएं कि हमने आपकी कैसे मदद की" : "Tell us how we helped you on your recovery journey"}
          />
          <Button
            className="gap-2"
            onClick={() =>
              openWhatsApp(
                lang === "hi"
                  ? "नमस्ते, मैं नारायणा फिजियो केयर में अपने उपचार अनुभव के बारे में अपनी समीक्षा साझा करना चाहता/चाहती हूं।"
                  : "Hello, I would like to share my review about my treatment experience at Narayana Physio Care."
              )
            }
          >
            <MessageCircle className="h-4 w-4" />
            {lang === "hi" ? "समीक्षा साझा करें" : "Share Review"}
          </Button>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-primary py-10 md:py-14">
        <div className="mx-auto max-w-7xl px-4 text-center">
          <h2 className="text-xl font-bold text-primary-foreground md:text-2xl">
            {lang === "hi" ? "हजारों मरीजों ने हम पर भरोसा किया" : "Thousands of patients have trusted us"}
          </h2>
          <p className="mt-2 text-sm text-primary-foreground/80">
            {lang === "hi"
              ? "अगला कदम उठाएं और अपनी रिकवरी शुरू करें"
              : "Take the next step and begin your recovery"}
          </p>
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
