import React, { useEffect, useState, useRef } from 'react'
import { Helmet } from 'react-helmet-async'
import { 
  Trash2, RefreshCw, MessageSquare, Lock, Eye, EyeOff, Globe, Users, 
  Clock, Compass, ShieldAlert, Send, Bot, User, Image as ImageIcon, 
  LogOut, Download, FileSpreadsheet, PackageCheck,
  Search, Copy, ExternalLink, SlidersHorizontal, CheckCircle2, XCircle
} from 'lucide-react'
import { supabase } from '../utils/supabase'
import { toast } from 'react-hot-toast'
import productsData from '../data/csvProducts.json'

const ADMIN_PASSWORD = "MySecretAdminPassword2026!"
const SITE_DOMAIN = "https://qbmaster.shop"

export default function AdminDashboard() {
  const [isAuthenticated, setIsAuthenticated] = useState(false)
  const [passwordInput, setPasswordInput] = useState('')
  const [showPassword, setShowPassword] = useState(false)
  
  const [activeTab, setActiveTab] = useState('allproducts')
  const [messages, setMessages] = useState([])
  const [visitors, setVisitors] = useState([])
  
  // 🎛️ Visibility State (Synced with Supabase)
  const [productVisibility, setProductVisibility] = useState({})
  const [productSearch, setProductSearch] = useState('')
  const [productFilter, setProductFilter] = useState('all')

  // 💬 Chat States
  const [chatSessions, setChatSessions] = useState([])
  const [selectedSession, setSelectedSession] = useState(null)
  const [chatMessages, setChatMessages] = useState([])
  const [replyInput, setReplyInput] = useState('')
  const [loading, setLoading] = useState(false)
  const chatEndRef = useRef(null)

  useEffect(() => {
    if (localStorage.getItem('qb_admin_auth') === 'true') {
      setIsAuthenticated(true)
    }
  }, [])

  const handleLogin = (e) => {
    e.preventDefault()
    if (passwordInput === ADMIN_PASSWORD) {
      setIsAuthenticated(true)
      localStorage.setItem('qb_admin_auth', 'true')
      toast.success('Access Granted!')
    } else {
      toast.error('Incorrect Password!')
    }
  }

  const handleLogout = () => {
    setIsAuthenticated(false)
    localStorage.removeItem('qb_admin_auth')
    toast.success('Logged out')
  }

  const fetchData = async () => {
    setLoading(true)
    
    // 1. رسائل Contact Form
    const { data: msgData } = await supabase
      .from('messages')
      .select('*')
      .order('created_at', { ascending: false })
    setMessages(msgData || [])

    // 2. سجل الزوار
    const { data: visData } = await supabase
      .from('visitors')
      .select('*')
      .order('last_seen', { ascending: false })
      .limit(100)
    setVisitors(visData || [])

    // 3. جلسات الشات
    const { data: chatData } = await supabase
      .from('chat_sessions')
      .select('*')
      .order('updated_at', { ascending: false })
    setChatSessions(chatData || [])

    // 4. جلب إعدادات Visibility من Supabase
    try {
      const { data: settingsData } = await supabase
        .from('site_settings')
        .select('value')
        .eq('key', 'qb_products_visibility')
        .maybeSingle()

      if (settingsData && settingsData.value) {
        setProductVisibility(settingsData.value)
        localStorage.setItem('qb_products_visibility', JSON.stringify(settingsData.value))
      } else {
        const local = JSON.parse(localStorage.getItem('qb_products_visibility') || '{}')
        setProductVisibility(local)
      }
    } catch (err) {
      console.error('Error reading visibility from Supabase:', err)
    }

    setLoading(false)
  }

  useEffect(() => {
    if (isAuthenticated) {
      fetchData()
      const interval = setInterval(fetchData, 8000)
      return () => clearInterval(interval)
    }
  }, [isAuthenticated])

  // 🔄 تبديل الحالة وحفظها في Supabase
  const toggleProductVisibility = async (slugOrId) => {
    const currentStatus = productVisibility[slugOrId] !== undefined 
      ? productVisibility[slugOrId] 
      : true

    const updatedStatus = !currentStatus
    const updatedMap = { ...productVisibility, [slugOrId]: updatedStatus }

    setProductVisibility(updatedMap)
    localStorage.setItem('qb_products_visibility', JSON.stringify(updatedMap))

    try {
      const { error } = await supabase
        .from('site_settings')
        .upsert({
          key: 'qb_products_visibility',
          value: updatedMap
        })

      if (error) throw error
      toast.success(updatedStatus ? 'Product is now VISIBLE on Storefront' : 'Product is now HIDDEN from Storefront')
    } catch (err) {
      console.error('Error saving visibility to Supabase:', err)
      toast.error('Saved locally, but failed to sync with database')
    }
  }

  const copyProductLink = (slugOrId) => {
    const link = `${SITE_DOMAIN}/product/${slugOrId}`
    navigator.clipboard.writeText(link)
    toast.success('Direct link copied to clipboard!')
  }

  const allCombinedProducts = (Array.isArray(productsData) ? productsData : []).map(p => ({
    ...p,
    source: 'Physical (Catalog)',
    isPhysical: true
  }))

  const filteredProductsList = allCombinedProducts.filter(p => {
    const slugOrId = p.slug || p.id
    const isVisibleOnHome = productVisibility[slugOrId] !== undefined ? productVisibility[slugOrId] : true
    
    if (productFilter === 'visible' && !isVisibleOnHome) return false
    if (productFilter === 'hidden' && isVisibleOnHome) return false

    if (!productSearch.trim()) return true
    const q = productSearch.toLowerCase()
    return (
      (p.name || p.title || '').toLowerCase().includes(q) ||
      (p.slug || '').toLowerCase().includes(q) ||
      (p.category || '').toLowerCase().includes(q) ||
      (p.id || '').toLowerCase().includes(q)
    )
  })

  // تصدير منتجات Google Merchant Center (Home & Garden)
  const exportGmcCsv = () => {
    try {
      const headers = [
        'id', 'title', 'description', 'link', 'image_link', 'availability', 'price', 'brand', 'condition', 'google_product_category'
      ]

      const targetProds = allCombinedProducts.filter(p => {
        const slugOrId = p.slug || p.id
        return productVisibility[slugOrId] !== undefined ? productVisibility[slugOrId] : true
      })

      const rows = targetProds.map((p) => {
        const cleanDesc = (p.description || '').replace(/"/g, '""')
        const priceNum = Number(p.price || 49.99).toFixed(2)
        const priceFormatted = `${priceNum} USD`
        const productLink = `${SITE_DOMAIN}/product/${p.slug || p.id}`
        const rawImg = p.image_link || p.image || '/images/default.jpg'
        const imageLink = rawImg.startsWith('http') ? rawImg : `${SITE_DOMAIN}${rawImg}`

        return [
          `"${p.id}"`, `"${p.name || p.title}"`, `"${cleanDesc}"`, `"${productLink}"`, `"${imageLink}"`, '"in_stock"', `"${priceFormatted}"`, '"QB Master"', '"new"', '"Home & Garden"'
        ].join(',')
      })

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `gmc_feed_qbmaster_${new Date().toISOString().slice(0, 10)}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)
      toast.success('GMC Feed CSV Downloaded!')
    } catch (err) {
      console.error(err)
      toast.error('Failed to export CSV.')
    }
  }

  // تصدير CSV الشامل
  const exportProductsCsv = (onlyHidden = false) => {
    try {
      const targetProducts = onlyHidden 
        ? allCombinedProducts.filter(p => {
            const slugOrId = p.slug || p.id
            const isVisible = productVisibility[slugOrId] !== undefined ? productVisibility[slugOrId] : true
            return !isVisible
          })
        : allCombinedProducts

      if (targetProducts.length === 0) {
        toast.error('No products found matching the criteria!')
        return
      }

      const headers = ['id', 'name', 'slug', 'category', 'price', 'status', 'source', 'direct_link']
      const rows = targetProducts.map(p => {
        const price = p.price || 49.99
        const name = (p.name || p.title || 'Unknown').replace(/"/g, '""')
        const slug = p.slug || p.id || 'item'
        const category = p.category || 'Home & Garden'
        const slugOrId = p.slug || p.id
        const isVisible = productVisibility[slugOrId] !== undefined ? productVisibility[slugOrId] : true
        const status = isVisible ? 'Visible on Store' : 'Hidden from Store'
        const link = `${SITE_DOMAIN}/product/${slug}`

        return [
          `"${p.id || 'item'}"`, `"${name}"`, `"${slug}"`, `"${category}"`, `"${price}"`, `"${status}"`, `"${p.source}"`, `"${link}"`
        ].join(',')
      })

      const csvContent = 'data:text/csv;charset=utf-8,\uFEFF' + [headers.join(','), ...rows].join('\n')
      const encodedUri = encodeURI(csvContent)
      const link = document.createElement('a')
      link.setAttribute('href', encodedUri)
      link.setAttribute('download', `${onlyHidden ? 'hidden_products' : 'all_products'}_export_${Date.now()}.csv`)
      document.body.appendChild(link)
      link.click()
      document.body.removeChild(link)

      toast.success(`Exported ${targetProducts.length} products successfully!`)
    } catch (err) {
      console.error(err)
      toast.error('Failed to export products CSV.')
    }
  }

  // المحادثات المباشرة
  useEffect(() => {
    if (!selectedSession) return

    const fetchSessionMessages = async () => {
      const { data } = await supabase
        .from('chat_messages')
        .select('*')
        .eq('session_id', selectedSession.id)
        .order('created_at', { ascending: true })
      setChatMessages(data || [])
    }

    fetchSessionMessages()

    const channel = supabase
      .channel(`admin_chat_${selectedSession.id}`)
      .on('postgres_changes', {
        event: 'INSERT',
        schema: 'public',
        table: 'chat_messages',
        filter: `session_id=eq.${selectedSession.id}`
      }, (payload) => {
        setChatMessages(prev => {
          if (prev.some(m => m.id === payload.new.id)) return prev
          return [...prev, payload.new]
        })
      })
      .subscribe()

    return () => supabase.removeChannel(channel)
  }, [selectedSession])

  useEffect(() => {
    chatEndRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [chatMessages])

  const handleSendAgentReply = async (e) => {
    e.preventDefault()
    if (!replyInput.trim() || !selectedSession) return

    const messageText = replyInput.trim()
    setReplyInput('')

    const agentMsg = {
      session_id: selectedSession.id,
      sender: 'agent',
      message: messageText,
      created_at: new Date().toISOString()
    }

    setChatMessages(prev => [...prev, agentMsg])

    const { error: msgError } = await supabase
      .from('chat_messages')
      .insert([agentMsg])

    if (msgError) {
      console.error('Error sending agent reply:', msgError)
      toast.error(`Failed to send: ${msgError.message}`)
      return
    }

    await supabase
      .from('chat_sessions')
      .update({ status: 'agent', updated_at: new Date().toISOString() })
      .eq('id', selectedSession.id)

    setSelectedSession(prev => ({ ...prev, status: 'agent' }))
    toast.success('Reply sent successfully!')
  }

  const handleEndSessionFromAdmin = async () => {
    if (!selectedSession) return

    if (window.confirm("Are you sure you want to end this live conversation?")) {
      const closeMsg = {
        session_id: selectedSession.id,
        sender: 'agent',
        message: 'This conversation has been closed by support. Thank you for contacting QB MASTER!',
        created_at: new Date().toISOString()
      }

      await supabase.from('chat_messages').insert([closeMsg])

      const { error } = await supabase
        .from('chat_sessions')
        .update({ status: 'ended', updated_at: new Date().toISOString() })
        .eq('id', selectedSession.id)

      if (!error) {
        setSelectedSession(prev => ({ ...prev, status: 'ended' }))
        setChatSessions(prev => prev.map(s => s.id === selectedSession.id ? { ...s, status: 'ended' } : s))
        toast.success("Conversation ended!")
      } else {
        toast.error("Failed to end chat.")
      }
    }
  }

  const deleteVisitor = async (id) => {
    const { error } = await supabase.from('visitors').delete().eq('id', id)
    if (!error) {
      setVisitors(visitors.filter(v => v.id !== id))
      toast.success('Visitor log removed')
    }
  }

  const deleteMessage = async (id) => {
    if (!window.confirm('Delete this message?')) return
    const { error } = await supabase.from('messages').delete().eq('id', id)
    if (!error) {
      setMessages(messages.filter(m => m.id !== id))
      toast.success('Message deleted')
    }
  }

  const formatTime = (seconds) => {
    if (!seconds) return '0s'
    const mins = Math.floor(seconds / 60)
    const secs = seconds % 60
    return mins > 0 ? `${mins}m ${secs}s` : `${secs}s`
  }

  if (!isAuthenticated) {
    return (
      <div className="min-h-[80vh] flex items-center justify-center bg-purple-50/20 px-4">
        <Helmet><title>Admin Login — QB MASTER</title></Helmet>
        <div className="bg-white p-8 rounded-3xl border border-purple-100 shadow-xl max-w-md w-full text-center space-y-6">
          <div className="w-16 h-16 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
            <Lock className="w-8 h-8" />
          </div>
          <div>
            <h1 className="text-2xl font-bold text-gray-900">Admin Restricted Access</h1>
            <p className="text-xs text-gray-500 mt-1">Enter password to manage dashboard.</p>
          </div>
          <form onSubmit={handleLogin} className="space-y-4">
            <div className="relative">
              <input 
                type={showPassword ? "text" : "password"}
                value={passwordInput}
                onChange={(e) => setPasswordInput(e.target.value)}
                placeholder="Enter password..."
                className="w-full border border-gray-200 rounded-xl px-4 py-3 text-sm pr-10 outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                required
              />
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-3 top-3.5 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
              </button>
            </div>
            <button 
              type="submit" 
              className="w-full bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 rounded-xl text-sm transition-all shadow-md shadow-purple-600/20 cursor-pointer"
            >
              Unlock Dashboard
            </button>
          </form>
        </div>
      </div>
    )
  }

  return (
    <>
      <Helmet><title>Admin Control Panel — QB MASTER</title></Helmet>

      <div className="min-h-screen bg-purple-50/20 py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-7xl mx-auto space-y-6">
          
          {/* Header */}
          <div className="flex flex-wrap items-center justify-between gap-4 bg-white p-6 rounded-3xl border border-purple-100 shadow-sm">
            <div>
              <h1 className="text-2xl font-bold text-gray-900">Admin Control Panel</h1>
              <p className="text-xs text-gray-500">Catalog manager, visitor analytics, and real-time support</p>
            </div>
            <div className="flex items-center gap-2">
              <button 
                onClick={fetchData}
                className="inline-flex items-center gap-2 px-4 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 rounded-xl text-sm font-medium transition-all cursor-pointer"
              >
                <RefreshCw className={`w-4 h-4 ${loading ? 'animate-spin' : ''}`} /> Refresh
              </button>
              <button 
                onClick={handleLogout}
                className="px-4 py-2 bg-red-50 hover:bg-red-100 text-red-600 rounded-xl text-sm font-medium transition-all cursor-pointer"
              >
                Logout
              </button>
            </div>
          </div>

          {/* Tabs Navigation */}
          <div className="flex flex-wrap gap-3 border-b border-purple-100/60 pb-2">
            <button
              onClick={() => setActiveTab('allproducts')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'allproducts' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-purple-100'
              }`}
            >
              <PackageCheck className="w-4 h-4" /> Catalog Manager ({allCombinedProducts.length})
            </button>

            <button
              onClick={() => setActiveTab('visitors')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'visitors' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-purple-100'
              }`}
            >
              <Users className="w-4 h-4" /> Visitor Logs ({visitors.length})
            </button>

            <button
              onClick={() => setActiveTab('livechat')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'livechat' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-purple-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Live Chat ({chatSessions.length})
            </button>

            <button
              onClick={() => setActiveTab('messages')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'messages' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-purple-100'
              }`}
            >
              <MessageSquare className="w-4 h-4" /> Contact Forms ({messages.length})
            </button>

            <button
              onClick={() => setActiveTab('gmc')}
              className={`inline-flex items-center gap-2 px-5 py-2.5 rounded-xl font-semibold text-sm transition-all cursor-pointer ${
                activeTab === 'gmc' 
                  ? 'bg-purple-600 text-white shadow-lg shadow-purple-600/20' 
                  : 'bg-white text-gray-600 hover:bg-purple-50 hover:text-purple-700 border border-purple-100'
              }`}
            >
              <FileSpreadsheet className="w-4 h-4" /> GMC Exporter
            </button>
          </div>

          {/* 🛍️ TAB 1: ALL PRODUCTS MANAGER */}
          {activeTab === 'allproducts' && (
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm p-6 space-y-6">
              
              <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4 border-b border-purple-100/60 pb-5">
                <div>
                  <h2 className="font-bold text-gray-900 text-lg flex items-center gap-2">
                    <SlidersHorizontal className="w-5 h-5 text-purple-600" /> Store Catalog Control
                  </h2>
                  <p className="text-xs text-gray-500 mt-1">
                    Manage active products directly from your verified CSV feed.
                  </p>
                </div>
                
                <div className="flex flex-wrap items-center gap-2.5">
                  <div className="relative flex-1 sm:w-64">
                    <Search className="w-4 h-4 absolute left-3 top-3 text-gray-400" />
                    <input 
                      type="text"
                      value={productSearch}
                      onChange={(e) => setProductSearch(e.target.value)}
                      placeholder="Search by title, slug, ID..."
                      className="w-full bg-gray-50 border border-gray-200 rounded-xl pl-9 pr-4 py-2 text-xs outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                    />
                  </div>

                  <div className="flex items-center border border-gray-200 rounded-xl p-0.5 bg-gray-50 text-xs font-semibold">
                    <button 
                      onClick={() => setProductFilter('all')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${productFilter === 'all' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      All ({allCombinedProducts.length})
                    </button>
                    <button 
                      onClick={() => setProductFilter('visible')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${productFilter === 'visible' ? 'bg-white text-green-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      Visible
                    </button>
                    <button 
                      onClick={() => setProductFilter('hidden')}
                      className={`px-3 py-1.5 rounded-lg transition-all ${productFilter === 'hidden' ? 'bg-white text-purple-700 shadow-sm' : 'text-gray-500 hover:text-gray-900'}`}
                    >
                      Hidden
                    </button>
                  </div>

                  <button
                    onClick={() => exportProductsCsv(false)}
                    className="inline-flex items-center gap-1.5 px-3.5 py-2 bg-purple-50 hover:bg-purple-100 text-purple-700 border border-purple-200 rounded-xl text-xs font-bold transition-all cursor-pointer"
                  >
                    <Download className="w-3.5 h-3.5" /> Export All CSV
                  </button>
                </div>
              </div>

              {filteredProductsList.length === 0 ? (
                <div className="p-12 text-center text-gray-400 text-xs">
                  No products matched your search or active filter.
                </div>
              ) : (
                <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
                  {filteredProductsList.map((p) => {
                    const slugOrId = p.slug || p.id
                    const isVisible = productVisibility[slugOrId] !== undefined ? productVisibility[slugOrId] : true
                    const price = p.price || 49.99
                    const directUrl = `/product/${slugOrId}`

                    return (
                      <div 
                        key={slugOrId} 
                        className={`rounded-2xl border p-4.5 flex flex-col justify-between transition-all ${
                          isVisible 
                            ? 'bg-white border-purple-100 shadow-sm' 
                            : 'bg-purple-50/20 border-dashed border-purple-200 opacity-90'
                        }`}
                      >
                        <div className="space-y-3">
                          <div className="flex items-center justify-between gap-2">
                            <span className="text-[10px] font-extrabold uppercase px-2 py-0.5 rounded-md bg-emerald-100 text-emerald-800">
                              Home & Garden
                            </span>
                            
                            <span className={`inline-flex items-center gap-1 text-[11px] font-extrabold px-2.5 py-0.5 rounded-full ${
                              isVisible 
                                ? 'bg-green-100 text-green-800' 
                                : 'bg-purple-100 text-purple-800'
                            }`}>
                              {isVisible ? <CheckCircle2 className="w-3 h-3" /> : <EyeOff className="w-3 h-3" />}
                              {isVisible ? 'Storefront Visible' : 'Hidden URL Only'}
                            </span>
                          </div>

                          <div className="flex items-start gap-3">
                            <img 
                              src={p.image_link || p.image || '/images/default.jpg'} 
                              alt={p.name || p.title} 
                              className="w-14 h-14 object-contain rounded-xl bg-white border border-gray-100 p-1 shrink-0" 
                            />
                            <div className="min-w-0">
                              <h3 className="font-bold text-gray-900 text-xs leading-snug line-clamp-2">{p.name || p.title}</h3>
                              <p className="text-[11px] font-bold text-purple-700 mt-1">${price} USD</p>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 pt-3 border-t border-gray-100 space-y-2.5">
                          <div className="flex items-center justify-between">
                            <button
                              onClick={() => toggleProductVisibility(slugOrId)}
                              className={`inline-flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                                isVisible
                                  ? 'bg-amber-50 hover:bg-amber-100 text-amber-800 border border-amber-200'
                                  : 'bg-green-50 hover:bg-green-100 text-green-800 border border-green-200'
                              }`}
                            >
                              {isVisible ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                              {isVisible ? 'Hide from Store' : 'Show on Store'}
                            </button>

                            <div className="flex items-center gap-1">
                              <button
                                onClick={() => copyProductLink(slugOrId)}
                                title="Copy direct link"
                                className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <Copy className="w-3.5 h-3.5" />
                              </button>

                              <a
                                href={directUrl}
                                target="_blank"
                                rel="noreferrer"
                                title="Open product page"
                                className="p-1.5 text-gray-500 hover:text-purple-600 hover:bg-purple-50 rounded-lg transition-colors cursor-pointer"
                              >
                                <ExternalLink className="w-3.5 h-3.5" />
                              </a>
                            </div>
                          </div>

                          <div className="text-[10px] text-gray-400 font-mono truncate">
                            {directUrl}
                          </div>
                        </div>
                      </div>
                    )
                  })}
                </div>
              )}
            </div>
          )}

          {/* 👥 TAB 2: VISITOR LOGS */}
          {activeTab === 'visitors' && (
            <div className="bg-white rounded-3xl border border-purple-100 shadow-sm overflow-hidden">
              <div className="p-6 border-b border-purple-100/60 flex items-center justify-between">
                <div>
                  <h2 className="font-bold text-gray-900 flex items-center gap-2">
                    <Compass className="w-5 h-5 text-purple-600" /> Visitor History Logs
                  </h2>
                  <p className="text-xs text-gray-400 mt-0.5">Complete tracking log for all site visits</p>
                </div>
                <span className="text-xs text-purple-700 bg-purple-50 px-3 py-1 rounded-full font-bold">
                  Total Tracked: {visitors.length}
                </span>
              </div>

              {visitors.length === 0 ? (
                <div className="p-12 text-center text-gray-500">No visitors tracked yet.</div>
              ) : (
                <div className="overflow-x-auto">
                  <table className="w-full text-left border-collapse text-sm">
                    <thead>
                      <tr className="bg-purple-50/50 text-gray-500 text-xs uppercase border-b border-purple-100/60">
                        <th className="p-4">Visit Date & Time</th>
                        <th className="p-4">Visitor IP</th>
                        <th className="p-4">Location</th>
                        <th className="p-4">Visited Page</th>
                        <th className="p-4">Time Spent</th>
                        <th className="p-4 text-right">Action</th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-purple-100/60">
                      {visitors.map((v) => (
                        <tr key={v.id} className="hover:bg-purple-50/30 transition-colors">
                          <td className="p-4 text-xs text-gray-500 font-medium">
                            {new Date(v.last_seen).toLocaleString()}
                          </td>
                          <td className="p-4 font-mono text-xs font-semibold text-gray-900">
                            {v.ip_address || 'Unknown'}
                          </td>
                          <td className="p-4 text-gray-600">
                            <span className="inline-flex items-center gap-1.5 bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg text-xs font-medium">
                              <Globe className="w-3.5 h-3.5 text-purple-600" /> {v.location || 'Unknown'}
                            </span>
                          </td>
                          <td className="p-4 font-medium text-purple-700">
                            <span className="bg-gray-100 px-2.5 py-1 rounded-md text-xs font-mono">
                              {v.current_page || '/'}
                            </span>
                          </td>
                          <td className="p-4 text-gray-600 font-medium">
                            <span className="inline-flex items-center gap-1 text-xs">
                              <Clock className="w-3.5 h-3.5 text-gray-400" /> {formatTime(v.time_spent)}
                            </span>
                          </td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => deleteVisitor(v.id)}
                              className="p-1.5 text-red-500 hover:bg-red-50 rounded-lg transition-colors cursor-pointer"
                            >
                              <Trash2 className="w-4 h-4" />
                            </button>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              )}
            </div>
          )}

          {/* 💬 TAB 3: LIVE CHAT */}
          {activeTab === 'livechat' && (
            <div className="grid md:grid-cols-3 gap-6 h-[600px]">
              <div className="md:col-span-1 bg-white rounded-3xl border border-purple-100 p-4 overflow-y-auto space-y-2 shadow-sm">
                <h3 className="font-bold text-gray-900 text-sm mb-3">Chat Conversations ({chatSessions.length})</h3>
                {chatSessions.length === 0 ? (
                  <p className="text-xs text-gray-400 text-center py-8">No live chats yet.</p>
                ) : (
                  chatSessions.map((s) => (
                    <div
                      key={s.id}
                      onClick={() => setSelectedSession(s)}
                      className={`p-3.5 rounded-2xl cursor-pointer border transition-all ${
                        selectedSession?.id === s.id
                          ? 'bg-purple-50 border-purple-300 shadow-sm'
                          : 'bg-gray-50/60 hover:bg-purple-50/50 border-gray-100'
                      }`}
                    >
                      <div className="flex justify-between items-center mb-1">
                        <span className="font-mono text-xs font-bold text-gray-800">
                          Session #{s.id.substring(0, 6)}
                        </span>
                        <span className={`text-[10px] px-2 py-0.5 rounded-full font-bold ${
                          s.status === 'ended' ? 'bg-red-100 text-red-700' : s.status === 'agent' ? 'bg-amber-100 text-amber-800' : 'bg-purple-100 text-purple-800'
                        }`}>
                          {s.status === 'ended' ? 'Ended' : s.status === 'agent' ? 'Agent Active' : 'AI Bot'}
                        </span>
                      </div>
                      <p className="text-[11px] text-gray-400">{new Date(s.updated_at).toLocaleString()}</p>
                    </div>
                  ))
                )}
              </div>

              <div className="md:col-span-2 bg-white rounded-3xl border border-purple-100 shadow-sm flex flex-col overflow-hidden">
                {selectedSession ? (
                  <>
                    <div className="p-4 border-b border-purple-100/60 bg-purple-50/30 flex items-center justify-between">
                      <div>
                        <h4 className="font-bold text-sm text-gray-900">Session ID: {selectedSession.id}</h4>
                        <p className="text-xs text-purple-700 font-medium">Status: {selectedSession.status?.toUpperCase()}</p>
                      </div>

                      {selectedSession.status !== 'ended' && (
                        <button
                          onClick={handleEndSessionFromAdmin}
                          className="bg-red-50 hover:bg-red-100 text-red-600 border border-red-200 px-3 py-1.5 rounded-xl text-xs font-bold transition-all flex items-center gap-1 cursor-pointer"
                        >
                          <LogOut className="w-3.5 h-3.5" /> End Conversation
                        </button>
                      )}
                    </div>

                    <div className="flex-1 p-4 overflow-y-auto space-y-3 bg-gray-50/30 text-xs">
                      {chatMessages.map((m, idx) => (
                        <div key={m.id || idx} className={`flex ${m.sender === 'agent' ? 'justify-end' : 'justify-start'}`}>
                          <div className={`max-w-[75%] p-3 rounded-2xl ${
                            m.sender === 'agent' 
                              ? 'bg-purple-600 text-white rounded-br-none' 
                              : m.sender === 'user' 
                              ? 'bg-gray-800 text-white rounded-bl-none' 
                              : 'bg-white text-gray-800 border border-gray-200 rounded-bl-none'
                          }`}>
                            <div className="text-[10px] opacity-75 font-bold mb-1 uppercase">
                              {m.sender === 'agent' ? 'You (Agent)' : m.sender === 'user' ? 'Visitor' : 'AI Bot'}
                            </div>
                            {m.image_url && (
                              <img src={m.image_url} alt="Uploaded" className="rounded-xl max-h-40 w-full object-cover mb-2" />
                            )}
                            <p>{m.message}</p>
                          </div>
                        </div>
                      ))}
                      <div ref={chatEndRef} />
                    </div>

                    {selectedSession.status === 'ended' ? (
                      <div className="p-3 bg-gray-100 text-center text-xs text-gray-500 font-semibold">
                        This session has been closed.
                      </div>
                    ) : (
                      <form onSubmit={handleSendAgentReply} className="p-3 border-t border-purple-100/60 flex gap-2">
                        <input 
                          type="text"
                          value={replyInput}
                          onChange={(e) => setReplyInput(e.target.value)}
                          placeholder="Reply to visitor as Live Agent..."
                          className="flex-1 border border-gray-200 rounded-xl px-4 py-2.5 text-xs outline-none focus:ring-2 focus:ring-purple-500/20 focus:border-purple-500"
                        />
                        <button 
                          type="submit"
                          className="bg-purple-600 hover:bg-purple-700 text-white px-5 py-2.5 rounded-xl text-xs font-bold transition-all inline-flex items-center gap-1.5 cursor-pointer shadow-md shadow-purple-600/20"
                        >
                          <Send className="w-3.5 h-3.5" /> Reply
                        </button>
                      </form>
                    )}
                  </>
                ) : (
                  <div className="flex-1 flex items-center justify-center text-gray-400 text-xs">
                    Select a conversation from the left panel to start chatting.
                  </div>
                )}
              </div>
            </div>
          )}

          {/* 📩 TAB 4: CONTACT FORMS */}
          {activeTab === 'messages' && (
            <div className="grid gap-4">
              {messages.length === 0 ? (
                <div className="bg-white rounded-3xl p-12 text-center text-gray-500 border border-purple-100">
                  No messages received yet.
                </div>
              ) : (
                messages.map((msg) => (
                  <div key={msg.id} className="bg-white rounded-2xl p-6 border border-purple-100 shadow-sm">
                    <div className="flex justify-between items-center border-b border-purple-100/60 pb-3 mb-3">
                      <div>
                        <span className="font-bold text-gray-900">{msg.name}</span>
                        <a href={`mailto:${msg.email}`} className="ml-2 text-xs text-purple-600 font-semibold underline">
                          {msg.email}
                        </a>
                      </div>
                      <span className="text-xs text-gray-400">{new Date(msg.created_at).toLocaleString()}</span>
                    </div>
                    <h3 className="font-semibold text-gray-800 text-sm mb-2">Subject: {msg.subject}</h3>
                    <p className="text-gray-600 text-sm mb-4 whitespace-pre-wrap">{msg.message}</p>
                    <div className="flex flex-wrap items-center justify-between gap-2 border-t border-purple-100/60 pt-3 text-xs">
                      <div className="flex items-center gap-2 text-gray-500">
                        {msg.ip_address && (
                          <span className="inline-flex items-center gap-1 bg-gray-100 px-2.5 py-1 rounded-lg font-mono text-[11px]">
                            <ShieldAlert className="w-3.5 h-3.5 text-gray-400" /> IP: {msg.ip_address}
                          </span>
                        )}
                        {msg.location && (
                          <span className="inline-flex items-center gap-1 bg-purple-50 text-purple-900 px-2.5 py-1 rounded-lg font-medium text-[11px]">
                            <Globe className="w-3.5 h-3.5 text-purple-600" /> {msg.location}
                          </span>
                        )}
                      </div>
                      <button 
                        onClick={() => deleteMessage(msg.id)}
                        className="inline-flex items-center gap-1 px-3 py-1.5 font-semibold text-red-600 bg-red-50 hover:bg-red-100 rounded-lg transition-colors cursor-pointer"
                      >
                        <Trash2 className="w-3.5 h-3.5" /> Delete
                      </button>
                    </div>
                  </div>
                ))
              )}
            </div>
          )}

          {/* 📊 TAB 5: GMC FEED EXPORTER */}
          {activeTab === 'gmc' && (
            <div className="bg-white rounded-3xl p-8 border border-purple-100 shadow-sm max-w-2xl mx-auto text-center space-y-4">
              <div className="w-14 h-14 bg-purple-50 text-purple-600 rounded-2xl flex items-center justify-center mx-auto">
                <FileSpreadsheet className="w-7 h-7" />
              </div>
              <div>
                <h2 className="text-xl font-bold text-gray-900">Google Merchant Center Feed Exporter</h2>
                <p className="text-xs text-gray-500 mt-1 max-w-md mx-auto">
                  Export catalog products formatted according to Google Merchant Center Home & Garden specifications.
                </p>
              </div>

              <div className="pt-4 flex flex-wrap justify-center gap-3">
                <button
                  onClick={exportGmcCsv}
                  className="inline-flex items-center justify-center gap-2 px-8 py-3.5 bg-gradient-to-r from-purple-600 to-indigo-700 text-white font-extrabold text-sm rounded-2xl shadow-lg shadow-purple-600/30 hover:scale-105 active:scale-95 transition-all cursor-pointer"
                >
                  <Download className="w-5 h-5" /> Download GMC Feed (.CSV)
                </button>
              </div>
            </div>
          )}

        </div>
      </div>
    </>
  )
}
