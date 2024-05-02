import React, { useEffect, useState } from "react"
import Navbar from "@/components/global/Navbar"
import Footer from "@/components/global/Footer"
import Hero from "@/components/pages/home/Hero"
import CheckoutPage from "./checkout"
import { getCartId } from "./api/cart/utils"
import { formatCheckoutResponse } from "./api/cart/checkout/utils"

// eslint-disable-next-line react/prop-types
const HomePage = ({ checkout }) => {
//   const [subtotal, setSubtotal] = useState(0)

//   useEffect(() => {
//     const search = window.location.search
//     const params = new URLSearchParams(search)
//     const amount = params.get("amount")

//     if (amount) {
//       setSubtotal(parseFloat(amount))
//     }
//   }, [])

//   useEffect(() => {
//     if (subtotal) {
//       // Update the checkout state with the new subtotal
//       checkout.cart.subtotal = subtotal
//     }
//   }, [subtotal])

  return (
    <div className="min-h-full relative">
      <Navbar />
      <CheckoutPage checkout={checkout} />
      <div className="max-w-6xl 2xl:max-w-7xl mx-auto py-4 pb-20">
        {/* Content */}
      </div>
      <Footer />
    </div>
  )
};

export async function getServerSideProps({ req, res }) {

  try {
    
    const NextRequestMetaSymbol = Reflect.ownKeys(req).find(
        (key) => key.toString() === 'Symbol(NextRequestMeta)'
    ) as string;
    
    const NextRequestMeta = req[NextRequestMetaSymbol];
    const amount = NextRequestMeta.__NEXT_INIT_QUERY.amount;
    const submission_id = NextRequestMeta.__NEXT_INIT_QUERY.submission_id;

    console.log('amount', amount);

    const response = await fetch(
      "https://2btr3spmef.execute-api.us-east-1.amazonaws.com/default/jotform-stripe-payment-intent",
      {
        method: "POST",
        body: JSON.stringify({
            amount: amount,
            metadata: {
                submission_id:  submission_id
            }
        }),
        headers: {
          "Content-Type": "application/json",
        },
      }
    )

    if (!response.ok) {
      throw new Error("Failed to fetch payment intent")
    }

    const data = await response.json()

    const checkout = {
      cart: {
        subtotal: parseFloat(amount),
        totalItems: 1,
      },
      paymentIntentId: data.payment_id,
      clientSecret: data.payment_client_secret,
      shippingAddress: null,
    }

    return { props: { checkout } }
  } catch (error) {
    console.error("Error fetching payment intent:", error)
    return { props: { checkout: null } }
  }
}

export default HomePage
