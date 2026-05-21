import { Routes, Route } from "react-router-dom"
import { Layout } from "@/components/layout"
import { HomePage } from "@/pages/home"
import { ServicesPage } from "@/pages/services"
import { ConditionsPage } from "@/pages/conditions"
import { AboutPage } from "@/pages/about"
import { LocationsPage } from "@/pages/locations"
import { ContactPage } from "@/pages/contact"
import { TipsPage } from "@/pages/tips"
import { TestimonialsPage } from "@/pages/testimonials"

export function App() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route index element={<HomePage />} />
        <Route path="services" element={<ServicesPage />} />
        <Route path="conditions" element={<ConditionsPage />} />
        <Route path="about" element={<AboutPage />} />
        <Route path="locations" element={<LocationsPage />} />
        <Route path="contact" element={<ContactPage />} />
        <Route path="tips" element={<TipsPage />} />
        <Route path="testimonials" element={<TestimonialsPage />} />
      </Route>
    </Routes>
  )
}

export default App
