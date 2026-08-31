import React, { useState } from 'react'
import { motion, AnimatePresence } from 'framer-motion'
import { ChevronDown, Sparkles, HelpCircle, MessageCircle } from 'lucide-react'
import { Link } from 'react-router-dom'

const faqs = [
  {
    question: 'How fast is shipping and order delivery?',
    answer: 'Orders are processed and inspected within 24 to 48 hours. Standard insured doorstep delivery typically takes between 3 to 7 business days depending on your location.'
  },
  {
    question: 'How can I track my shipment?',
    answer: 'As soon as your package is dispatched, you will receive an automated shipping confirmation email containing your direct tracking number and link to follow your parcel in real time.'
  },
  {
    question: 'What is the quality of your home & garden products?',
    answer: 'All our products are crafted from premium, heavy-duty materials designed for long-lasting everyday use. Each item undergoes strict quality checks before packaging.'
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, Mastercard) as well as PayPal. Every payment is protected by bank-level 256-bit SSL encryption.'
  },
  {
    question: 'What is your 30-day money-back guarantee policy?',
    answer: "We offer a 30-day risk-free return and refund guarantee. If you are not completely satisfied with your order, simply reach out to our support team for a smooth return or exchange."
  },
  {
    question: 'What happens if my package arrives damaged?',
    answer: 'Every shipment is 100% insured. In the rare event that an item arrives broken or damaged during transit, send us a quick photo and we will dispatch a free replacement immediately.'
  }
]

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0) // أول سؤال مفتوح افتراضياً

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 lg:py-28 bg-white relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-black uppercase tracking-widest mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
            Everything you need to know about our home & garden products, delivery, and guarantees.
          </p>
        </motion.div>

        {/* ❓ Accordion FAQ List */}
        <div className="space-y-4">
          {faqs.map((faq, idx) => {
            const isOpen = openIndex === idx

            return (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: idx * 0.08 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen 
                    ? 'bg-purple-50/20 border-purple-500/40 shadow-lg shadow-purple-900/5' 
                    : 'bg-white border-gray-200/80 hover:border-gray-300 shadow-xs'
                }`}
              >
                <button
                  type="button"
                  onClick={() => toggleFAQ(idx)}
                  className="w-full py-5 px-6 sm:px-8 flex items-center justify-between text-left gap-4 cursor-pointer select-none"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-xl transition-colors shrink-0 ${
                      isOpen ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <HelpCircle className="w-5 h-5" />
                    </div>
                    <span className={`text-base sm:text-lg font-extrabold transition-colors ${
                      isOpen ? 'text-purple-900' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  <div className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform duration-300 shrink-0 ${
                    isOpen ? 'bg-purple-600 text-white rotate-180' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </button>

                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 sm:px-8 pb-6 pt-2 text-sm sm:text-base text-gray-600 leading-relaxed border-t border-purple-100/60 font-medium">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Bottom Contact Help Link */}
        <div className="text-center mt-12 flex items-center justify-center gap-2 text-sm font-semibold text-gray-500">
          <MessageCircle className="w-4 h-4 text-purple-600" />
          <span>Still have questions?</span>
          <Link to="/contact" className="text-purple-600 font-extrabold hover:underline">
            contact us
          </Link>
        </div>

      </div>
    </section>
  )
}
