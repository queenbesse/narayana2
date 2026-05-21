const PRIMARY_PHONE = "919871001508"
const SECONDARY_PHONE = "917011389138"

export function getWhatsAppUrl(message: string, useSecondary = false): string {
  const phone = useSecondary ? SECONDARY_PHONE : PRIMARY_PHONE
  const encoded = encodeURIComponent(message)
  return `https://wa.me/${phone}?text=${encoded}`
}

export function openWhatsApp(message: string, useSecondary = false) {
  const url = getWhatsAppUrl(message, useSecondary)
  window.open(url, "_blank", "noopener,noreferrer")
}

export function buildAppointmentMessage(data: {
  name: string
  phone: string
  date?: string
  time?: string
  location?: string
  condition?: string
  lang?: "en" | "hi"
}): string {
  if (data.lang === "hi") {
    return `नमस्ते, मैं नारायणा फिजियो केयर में अपॉइंटमेंट बुक करना चाहता/चाहती हूं।

नाम: ${data.name}
फोन: ${data.phone}${data.date ? `\nपसंदीदा तिथि: ${data.date}` : ""}${data.time ? `\nपसंदीदा समय: ${data.time}` : ""}${data.location ? `\nस्थान: ${data.location}` : ""}${data.condition ? `\nस्थिति: ${data.condition}` : ""}

कृपया पुष्टि करें।`
  }

  return `Hello, I would like to book an appointment at Narayana Physio Care.

Name: ${data.name}
Phone: ${data.phone}${data.date ? `\nPreferred Date: ${data.date}` : ""}${data.time ? `\nPreferred Time: ${data.time}` : ""}${data.location ? `\nLocation: ${data.location}` : ""}${data.condition ? `\nCondition: ${data.condition}` : ""}

Please confirm.`
}

export function buildHomeVisitMessage(data: {
  name: string
  phone: string
  address: string
  condition?: string
  lang?: "en" | "hi"
}): string {
  if (data.lang === "hi") {
    return `नमस्ते, मुझे होम विजिट फिजियोथेरेपी सेवा चाहिए।

नाम: ${data.name}
फोन: ${data.phone}
पता: ${data.address}${data.condition ? `\nस्थिति: ${data.condition}` : ""}

कृपया पुष्टि करें।`
  }

  return `Hello, I need home visit physiotherapy service.

Name: ${data.name}
Phone: ${data.phone}
Address: ${data.address}${data.condition ? `\nCondition: ${data.condition}` : ""}

Please confirm.`
}

export function buildServiceEnquiryMessage(
  serviceName: string,
  lang: "en" | "hi" = "en"
): string {
  if (lang === "hi") {
    return `नमस्ते, मुझे "${serviceName}" के बारे में जानकारी चाहिए। कृपया विवरण साझा करें।`
  }
  return `Hello, I would like to enquire about "${serviceName}". Please share details.`
}

export function buildConditionEnquiryMessage(
  conditionName: string,
  lang: "en" | "hi" = "en"
): string {
  if (lang === "hi") {
    return `नमस्ते, मुझे "${conditionName}" के लिए उपचार योजना चाहिए। कृपया मार्गदर्शन करें।`
  }
  return `Hello, I need a treatment plan for "${conditionName}". Please guide me.`
}
