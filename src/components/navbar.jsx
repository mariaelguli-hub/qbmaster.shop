import React, { useState } from 'react'
import { Link, NavLink } from 'react-router-dom'
import { ShoppingBag, Menu, X, Sparkles } from 'lucide-react'
import { useCart } from '../context/CartContext'

export default function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false)
  const { openCart, totalItemsCount } = useCart()

  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Shop All', path: '/shop' },
    { name: 'About Us', path: '/about' },
    { name: 'FAQ', path: '/faq' },
    { name: 'Contact', path: '/contact' },
  ]

  return (
    <header className="sticky top-0 z-40 bg-white/90 backdrop-blur-md border-b border-gray-100 shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-20">
          
          {/* 🏷️ Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <div className="w-10 h-10 rounded-2xl bg-gradient-to-tr from-purple-700 to-indigo-600 flex items-center justify-center text-white font-black text-lg shadow-md shadow-purple-600/30 group-hover:scale-105 transition-transform">
              QB
            </div>
            <div className="flex flex-col">
              <span className="font-black text-lg text-gray-900 leading-tight tracking-tight flex items-center gap-1">
                QB DEALS <Sparkles className="w-3.5 h-3.5 text-purple-600" />
              </span>
              <span className="text-[10px] text-gray-400 font-bold uppercase tracking-wider">
                Home & Garden Store
              </span>
            </div>
          </Link>

          {/* 💻 Desktop Navigation Links */}
          <nav className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <NavLink
                key={link.name}
                to={link.path}
                className={({ isActive }) =>
                  `text-xs font-extrabold uppercase tracking-wider transition-colors hover:text-purple-600 ${
                    isActive ? 'text-purple-700 border-b-2 border-purple-600 pb-1' : 'text-gray-600'
                  }`
                }
              >
                {link.name}
              </NavLink>
            ))}
          </nav>

          {/* 🛒 Right Actions: Cart Button & Mobile Menu Toggle */}
          <div className="flex items-center gap-3">
            
            {/* Cart Trigger Button */}
            <button
              onClick={openCart}
              className="relative p-3 rounded-2xl bg-purple-50 hover:bg-purple-100 text-purple-900 border border-purple-100 transition-all duration-200 cursor-pointer active:scale-95 shadow-xs flex items-center justify-center"
              title="Open Shopping Cart"
            >
              <ShoppingBag className="w-5 h-5 text-purple-700" />
              
              {/* Badge عداد المنتجات */}
              {totalItemsCount > 0 && (
                <span className="absolute -top-1.5 -right-1.5 min-w-5 h-5 px-1 bg-purple-600 text-white text-[11px] font-black rounded-full flex items-center justify-center border-2 border-white shadow-md animate-in zoom-in-50 duration-200">
                  {totalItemsCount}
                </span>
              )}
            </button>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2.5 rounded-xl text-gray-600 hover:bg-gray-100 transition-colors cursor-pointer"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>

          </div>

        </div>
      </div>

      {/* 📱 Mobile Dropdown Menu */}
      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-gray-100 px-4 pt-2 pb-6 space-y-2 animate-in slide-in-from-top duration-200">
          {navLinks.map((link) => (
            <Link
              key={link.name}
              to={link.path}
              onClick={() => setMobileMenuOpen(false)}
              className="block px-4 py-3 rounded-xl text-sm font-bold text-gray-700 hover:bg-purple-50 hover:text-purple-700 transition-colors"
            >
              {link.name}
            </Link>
          ))}
        </div>
      )}
    </header>
  )
}
