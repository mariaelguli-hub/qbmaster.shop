export default function AnnouncementBar() {
  return (
    <div className="bg-gradient-to-r from-purple-900 via-violet-800 to-indigo-900 text-white text-center py-2 px-4 text-xs sm:text-sm border-b border-purple-700/40 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-center gap-4 sm:gap-8 flex-wrap font-medium">
        <span className="flex items-center gap-1.5 text-purple-100">🔒 Secure checkout</span>
        <span className="flex items-center gap-1.5 text-purple-100">⚡ Instant email delivery</span>
        <span className="flex items-center gap-1.5 text-purple-100">💳 One-time payment</span>
        <span className="flex items-center gap-1.5 text-purple-100">✅ 30-day money-back guarantee</span>
      </div>
    </div>
  )
}
