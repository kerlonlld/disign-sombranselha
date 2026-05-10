import { motion } from 'framer-motion'
import { useState } from 'react'
import HeroSection from './components/HeroSection.jsx'
import BookingSection from './components/BookingSection.jsx'
import CalendarSection from './components/CalendarSection.jsx'
import ExperienceSection from './components/ExperienceSection.jsx'
import GallerySection from './components/GallerySection.jsx'
import Footer from './components/Footer.jsx'

function App() {
  const [calendarRefreshTrigger, setCalendarRefreshTrigger] = useState(0)

  const handleAppointmentSaved = () => {
    // Incrementa o trigger para forçar o refresh do calendário
    setCalendarRefreshTrigger(prev => prev + 1)
  }

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100">
      <div className="relative overflow-hidden">
        <div className="pointer-events-none absolute inset-x-0 top-0 h-96 bg-gradient-to-b from-fuchsia-600/20 via-transparent to-transparent" />
        <div className="pointer-events-none absolute right-0 top-24 h-96 w-96 rounded-full bg-pink-500/10 blur-3xl" />
        <div className="pointer-events-none absolute left-0 top-72 h-80 w-80 rounded-full bg-amber-400/10 blur-3xl" />
        <div className="relative z-10 mx-auto max-w-7xl px-6 py-8 sm:px-8 lg:px-12">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <HeroSection />
          </motion.div>
          <main className="space-y-24 py-12">
            <BookingSection onAppointmentSaved={handleAppointmentSaved} />
            <CalendarSection refreshTrigger={calendarRefreshTrigger} />
            <ExperienceSection />
            <GallerySection />
          </main>
          <Footer />
        </div>
      </div>
    </div>
  )
}

export default App
