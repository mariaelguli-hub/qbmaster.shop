import React, { useState } from 'react'
import { ChevronDown, HelpCircle, MessageCircle, Sparkles } from 'lucide-react'
import { Link } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'

const faqs = [
  {
    question: 'How fast is shipping and delivery?',
    answer: 'Orders are processed, inspected, and packed within 24 to 48 hours. Standard insured doorstep delivery typically takes between 3 to 7 business days with live tracking.'
  },
  {
    question: 'How do I track my shipment?',
    answer: 'Once your order leaves our fulfillment center, you will immediately receive a shipping confirmation email containing your direct tracking number and live status link.'
  },
  {
    question: 'What is the quality of your home & garden products?',
    answer: 'All our products are crafted from premium, heavy-duty materials designed for long-lasting everyday use. Each item undergoes strict quality inspections before dispatch.'
  },
  {
    question: 'Which payment methods do you accept?',
    answer: 'We accept all major credit and debit cards (Visa, MasterCard, American Express) as well as PayPal through our bank-grade 256-bit SSL encrypted checkout.'
  },
  {
    question: 'Do you offer a money-back guarantee?',
    answer: 'Yes! We stand behind our products with a 30-day risk-free money-back guarantee. If you are not completely satisfied, contact us for a smooth return or replacement.'
  },
  {
    question: 'What if my package arrives damaged during transit?',
    answer: 'Every shipment is 100% insured. In the rare event that an item arrives damaged or broken, send our support team a quick photo and we will ship a free replacement immediately.'
  }
]

export default function FAQAccordion() {
  const [openIndex, setOpenIndex] = useState(0) // Premier ouvert par défaut

  const toggleFAQ = (index) => {
    setOpenIndex(openIndex === index ? null : index)
  }

  return (
    <section className="py-20 lg:py-28 bg-gradient-to-b from-purple-50/30 via-white to-purple-50/30 relative overflow-hidden">
      
      {/* Background Decorative Glow */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[350px] bg-purple-500/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10 text-center">
        
        {/* Header Badge & Title */}
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="max-w-2xl mx-auto mb-14"
        >
          <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-purple-50 border border-purple-200/60 text-purple-700 text-xs font-black uppercase tracking-widest mb-4 shadow-2xs">
            <Sparkles className="w-3.5 h-3.5 text-purple-600 animate-pulse" />
            <span>Got Questions?</span>
          </div>

          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black text-gray-900 tracking-tight mb-4">
            Frequently Asked Questions
          </h2>
          
          <p className="text-gray-500 text-base sm:text-lg font-medium leading-relaxed">
            Everything you need to know about our home & garden products, shipping, and guarantees.
          </p>
        </motion.div>

        {/* ❓ Accordion Cards Container */}
        <div className="space-y-4 text-left">
          {faqs.map((faq, index) => {
            const isOpen = openIndex === index

            return (
              <motion.div
                key={index}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-3xl border transition-all duration-300 overflow-hidden ${
                  isOpen
                    ? 'bg-white border-purple-500/50 shadow-xl shadow-purple-950/5 ring-1 ring-purple-500/20'
                    : 'bg-white/80 border-gray-200/80 hover:border-gray-300 hover:bg-white shadow-xs'
                }`}
              >
                {/* Question Header Button */}
                <button
                  onClick={() => toggleFAQ(index)}
                  className="w-full p-6 sm:p-7 flex items-center justify-between gap-4 text-left cursor-pointer transition-colors"
                >
                  <div className="flex items-center gap-3.5">
                    <div className={`p-2 rounded-2xl transition-colors shrink-0 ${
                      isOpen ? 'bg-purple-100 text-purple-700' : 'bg-gray-100 text-gray-500'
                    }`}>
                      <HelpCircle className="w-5 h-5 stroke-[2.2]" />
                    </div>

                    <span className={`font-extrabold text-base sm:text-lg transition-colors ${
                      isOpen ? 'text-purple-900' : 'text-gray-900'
                    }`}>
                      {faq.question}
                    </span>
                  </div>

                  {/* Arrow Chevron Icon */}
                  <div className={`p-2 rounded-full transition-all duration-300 shrink-0 ${
                    isOpen ? 'bg-purple-600 text-white rotate-180 shadow-xs' : 'bg-gray-100 text-gray-500'
                  }`}>
                    <ChevronDown className="w-4 h-4 stroke-[3]" />
                  </div>
                </button>

                {/* Animated Answer Body */}
                <AnimatePresence initial={false}>
                  {isOpen && (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.3, ease: 'easeInOut' }}
                    >
                      <div className="px-6 pb-7 sm:px-7 text-xs sm:text-sm text-gray-600 leading-relaxed font-medium border-t border-purple-100/60 mt-1 pt-4">
                        {faq.answer}
                      </div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>

        {/* Footer Link Section */}
        <motion.div 
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-12 text-center text-sm font-semibold text-gray-500 flex items-center justify-center gap-2"
        >
          <MessageCircle className="w-4 h-4 text-purple-600" />
          <span>Still have questions?</span>
          <Link to="/contact" className="text-purple-700 font-extrabold hover:underline underline-offset-4 transition-colors">
            contact us
          </Link>
        </motion.div>

      </div>
    </section>
  )
}
