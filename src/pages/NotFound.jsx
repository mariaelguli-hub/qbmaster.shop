import React from 'react'
import { Link } from 'react-router-dom'
import { ArrowLeft, Sparkles, AlertCircle } from 'lucide-react'

export default function NotFound() {
  return (
    <section className="py-24 bg-purple-50/20 min-h-[70vh] flex items-center justify-center font-sans">
      <div className="max-w-md w-full mx-auto px-4 text-center">
        
        {/* Error Badge */}
        <div className="w-20 h-20 bg-purple-50 rounded-full flex items-center justify-center mx-auto mb-6 border border-purple-100/80 shadow-inner">
          <AlertCircle className="w-10 h-10 text-purple-600 animate-bounce" />
        </div>

        <h1 className="text-7xl font-black text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 mb-3 tracking-tight">
          404
        </h1>

        <h2 className="text-xl font-bold text-gray-900 mb-2">
          Page not found
        </h2>

        <p className="text-gray-500 text-sm mb-8 leading-relaxed">
          The page you are looking for doesn't exist or has been moved. Let's get you back on track.
        </p>

        <Link 
          to="/" 
          className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 via-violet-600 to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-purple-600/30 hover:shadow-purple-600/50 hover:scale-105 active:scale-95 transition-all duration-300 cursor-pointer group"
        >
          <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
          <span>Back to home</span>
        </Link>

      </div>
    </section>
  )
}
