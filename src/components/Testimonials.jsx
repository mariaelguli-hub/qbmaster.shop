import React from 'react'
import { Star, Sparkles, Quote, ExternalLink, MapPin } from 'lucide-react'
import { motion } from 'framer-motion'

const googleReviews = [
  {
    id: 1,
    name: 'Ralf Hasford',
    initials: 'RH',
    location: 'Google Maps Review',
    rating: 5,
    title: 'Timeless furniture & garden pieces',
    text: 'Very beautiful designer accessories and timeless modern furniture. From the couch to the garden chair and table. Exceptional quality and selection.',
    link: 'https://maps.app.goo.gl/CQAfYKLSrvE8PU717',
  },
  {
    id: 2,
    name: 'Sara Lopes',
    initials: 'SL',
    location: 'Google Maps Review',
    rating: 5,
    title: 'Amazing store & curated pieces',
    text: 'Always a pleasure to visit this amazing store. Wonderful selection of pieces and top-tier customer experience. Please open one in Lisbon!',
    link: 'https://maps.app.goo.gl/pKafLdM5zche6KhHA',
  },
  {
    id: 3,
    name: 'Theresia',
    initials: 'TH',
    location: 'Google Maps Review',
    rating: 5,
    title: 'Helpful styling & design advice',
    text: 'I received exceptional advice on the styling and color concepts for my home. The staff took their time, listened to my ideas, and gave truly helpful inspiration. Felt completely in good hands!',
    link: 'https://maps.app.goo.gl/GTTQwtFHAzv4j6MCA',
  },
  {
    id: 4,
    name: 'Andreas D.',
    initials: 'AD',
    location: 'Google Maps Review',
    rating: 5,
    title: 'Charming shop & superb quality',
    text: 'Charming shop with superb items for home and living. Extremely friendly, warm, and helpful staff throughout.',
    link: 'https://maps.app.goo.gl/WbpPBEDhwH8Udwon9',
  },
]

export default function Testimonials() {
  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-white via-purple-50/20 to-white relative overflow-hidden">
      
      {/* Background Subtle Glow Blobs */}
      <div className="absolute top-1/3 left-1/2 -translate-x-1/2 w-[700px] h-[350px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-black uppercase tracking-widest mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Google Maps Verified Reviews</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            What our customers say
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
            Real experiences and verified reviews from people loving their homes.
          </p>
        </motion.div>

        {/* 💬 Testimonials Cards Grid (Clickable to Google Maps) */}
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-6 text-left">
          {googleReviews.map((t, idx) => (
            <motion.a
              key={t.id}
              href={t.link}
              target="_blank"
              rel="noopener noreferrer"
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.45, delay: idx * 0.1 }}
              whileHover={{ y: -8 }}
              className="group relative bg-white p-6 sm:p-7 rounded-3xl border border-gray-200/80 shadow-sm hover:shadow-2xl hover:shadow-purple-950/10 hover:border-purple-500/40 transition-all duration-300 flex flex-col justify-between overflow-hidden cursor-pointer no-underline"
            >
              {/* Background Quote Watermark */}
              <div className="absolute top-6 right-6 text-purple-100 group-hover:text-purple-200/60 transition-colors pointer-events-none">
                <Quote className="w-10 h-10 rotate-180" />
              </div>

              <div>
                {/* Golden Stars Rating + Google Badge */}
                <div className="flex items-center justify-between gap-2 mb-4">
                  <div className="flex items-center gap-0.5">
                    {[...Array(t.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-amber-400 text-amber-400 stroke-amber-400" />
                    ))}
                  </div>

                  {/* Google Verified Indicator */}
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold text-gray-400 group-hover:text-purple-600 transition-colors">
                    <MapPin className="w-3 h-3 text-red-500" />
                    <span>Google</span>
                    <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                  </span>
                </div>

                {/* Review Title */}
                <h3 className="font-extrabold text-gray-900 text-base mb-2 group-hover:text-purple-700 transition-colors line-clamp-2">
                  {t.title}
                </h3>

                {/* Review Body Text */}
                <p className="text-xs sm:text-sm text-gray-600 leading-relaxed mb-6 font-medium relative z-10">
                  "{t.text}"
                </p>
              </div>

              {/* User Profile Info Footer */}
              <div className="flex items-center justify-between gap-3 pt-4 border-t border-gray-100 mt-auto">
                <div className="flex items-center gap-3">
                  {/* Initials Avatar */}
                  <div className="w-10 h-10 rounded-2xl bg-gradient-to-br from-purple-600 to-indigo-800 text-white flex items-center justify-center text-xs font-black shadow-md shadow-purple-900/10 border border-purple-400/30 shrink-0 group-hover:scale-105 transition-transform">
                    {t.initials}
                  </div>

                  <div>
                    <div className="text-xs sm:text-sm font-extrabold text-gray-900 leading-snug group-hover:text-purple-700 transition-colors">
                      {t.name}
                    </div>
                    <div className="text-[11px] font-semibold text-gray-400">
                      {t.location}
                    </div>
                  </div>
                </div>

                {/* Google Maps View Action */}
                <div className="w-7 h-7 rounded-full bg-purple-50 group-hover:bg-purple-600 text-purple-600 group-hover:text-white flex items-center justify-center transition-colors shrink-0">
                  <ExternalLink className="w-3.5 h-3.5" />
                </div>
              </div>

              {/* Bottom Subtle Gradient Hover Line */}
              <div className="absolute inset-x-0 bottom-0 h-1 bg-gradient-to-r from-purple-500 to-indigo-500 opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            </motion.a>
          ))}
        </div>

      </div>
    </section>
  )
}
