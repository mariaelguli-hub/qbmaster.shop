import React from 'react'
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js"

const PAYPAL_CLIENT_ID = "BAAR_2_Nb7AxH05XezwsnzZL4f1orQ3w7yXFyJlAsTWA870NvSzWOtYt9S5Rhv228W47AVPaxuCctZi-Wo"

export default function PayPalButton({ amount = 127.00, onSuccess }) {
  return (
    <div className="w-full my-4">
      <PayPalScriptProvider 
        options={{ 
          "client-id": PAYPAL_CLIENT_ID, 
          currency: "USD",
          locale: "en_US", // يفورسي لغة الواجهة بالإنجليزية
          components: "buttons", // حيدنا applepay و googlepay
          "enable-funding": "card", // تأكيد تفعيل بطاقات الائتمان/الخصم
          "disable-funding": "paylater,venmo" // تعطيل الوسائل غير المذكورة فـ السيت
        }}
      >
        <PayPalButtons
          style={{ 
            layout: "vertical", 
            color: "gold", 
            shape: "rect", 
            label: "paypal",
            height: 48 
          }}
          createOrder={(data, actions) => {
            return actions.order.create({
              purchase_units: [
                {
                  amount: {
                    value: Number(amount).toFixed(2),
                  },
                },
              ],
            })
          }}
          onApprove={async (data, actions) => {
            const orderDetails = await actions.order.capture()
            console.log("Payment Successful:", orderDetails)
            alert(`Thank you ${orderDetails.payer.name.given_name}! Your payment was successful.`)
            if (onSuccess) onSuccess(orderDetails)
          }}
          onError={(err) => {
            console.error("PayPal Error:", err)
            alert("Payment failed. Please try again.")
          }}
        />
      </PayPalScriptProvider>
    </div>
  )
}
