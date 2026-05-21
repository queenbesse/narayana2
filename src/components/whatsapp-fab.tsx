import { MessageCircle } from "lucide-react"
import { openWhatsApp } from "@/lib/whatsapp"
import { useI18n } from "@/lib/i18n"

export function WhatsAppFab() {
  const { lang } = useI18n()

  const handleClick = () => {
    const message =
      lang === "hi"
        ? "नमस्ते, मुझे नारायणा फिजियो केयर के बारे में जानकारी चाहिए।"
        : "Hello, I would like to enquire about Narayana Physio Care services."
    openWhatsApp(message)
  }

  return (
    <button
      onClick={handleClick}
      className="fixed bottom-20 right-4 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-lg transition-transform hover:scale-105 active:scale-95 md:bottom-6"
      aria-label="Chat on WhatsApp"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  )
}
