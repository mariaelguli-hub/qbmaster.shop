import React, { createContext, useContext, useState, useEffect } from 'react'

const CartContext = createContext()

export function CartProvider({ children }) {
  const [cartItems, setCartItems] = useState(() => {
    try {
      const savedCart = localStorage.getItem('qb_cart_items')
      return savedCart ? JSON.parse(savedCart) : []
    } catch (err) {
      console.error('Error loading cart from localStorage:', err)
      return []
    }
  })

  const [isCartOpen, setIsCartOpen] = useState(false)

  // حفظ محتوى السلة في localStorage تلقائياً عند أي تغيير
  useEffect(() => {
    try {
      localStorage.setItem('qb_cart_items', JSON.stringify(cartItems))
    } catch (err) {
      console.error('Error saving cart to localStorage:', err)
    }
  }, [cartItems])

  // إضافة منتج إلى السلة
  const addToCart = (product, variant = null, quantity = 1) => {
    const chosenVariant = variant || (product.variants && product.variants[0]) || {
      id: 'default',
      label: 'Standard',
      price: Number(product.price || 0)
    }

    const cartItemId = `${product.id || product.slug}_${chosenVariant.id || 'default'}`
    const itemPrice = Number(chosenVariant.price || product.price || 0)

    setCartItems((prevItems) => {
      const existingItemIndex = prevItems.findIndex((item) => item.cartItemId === cartItemId)

      if (existingItemIndex > -1) {
        const updated = [...prevItems]
        updated[existingItemIndex] = {
          ...updated[existingItemIndex],
          quantity: updated[existingItemIndex].quantity + quantity,
        }
        return updated
      }

      const newItem = {
        cartItemId,
        productId: product.id || product.slug,
        name: product.name || product.title,
        image: product.image || '/images/pro.jpg',
        category: product.category || 'Product',
        variant: chosenVariant,
        price: itemPrice,
        quantity: quantity,
      }

      return [...prevItems, newItem]
    })

    // فتح السلة الجانبية تلقائياً بعد الإضافة
    setIsCartOpen(true)
  }

  // حذف منتج بالكامل
  const removeFromCart = (cartItemId) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.cartItemId !== cartItemId))
  }

  // تعديل الكمية (+ أو -)
  const updateQuantity = (cartItemId, newQuantity) => {
    if (newQuantity <= 0) {
      removeFromCart(cartItemId)
      return
    }

    setCartItems((prevItems) =>
      prevItems.map((item) =>
        item.cartItemId === cartItemId ? { ...item, quantity: newQuantity } : item
      )
    )
  }

  // إفراغ السلة بالكامل بعد نجاح الدفع
  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem('qb_cart_items')
  }

  const openCart = () => setIsCartOpen(true)
  const closeCart = () => setIsCartOpen(false)
  const toggleCart = () => setIsCartOpen((prev) => !prev)

  // حساب المجموع الكلي ومجموع القطع
  const cartTotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const totalItemsCount = cartItems.reduce((sum, item) => sum + item.quantity, 0)

  return (
    <CartContext.Provider
      value={{
        cartItems,
        isCartOpen,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        openCart,
        closeCart,
        toggleCart,
        cartTotal,
        totalItemsCount,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) {
    throw new Error('useCart must be used within a CartProvider')
  }
  return context
}
