import React, { useState } from "react"
import { Elements, LinkAuthenticationElement } from "@stripe/react-stripe-js"
import { getCart, getCartId } from "@/pages/api/cart/utils"
import Navbar from "@/components/pages/checkout/Navbar"
import OrderSummary from "@/components/pages/checkout/OrderSummary"
import ShippingAddressForm from "@/components/pages/checkout/ShippingAddressForm"
import PaymentInfoForm from "@/components/pages/checkout/PaymentInfoForm"
import loadStripePublic from "@/lib/stripe/loadStripePublic"
import { formatCheckoutResponse } from "@/pages/api/cart/checkout/utils"
import stripeElementOptions from "@/components/pages/checkout/stripeElementOptions"
import type { Checkout } from "@/pages/api/cart/checkout/types"
import type { CheckoutState } from "@/components/pages/checkout/types"
import ContactInformation from "@/components/pages/checkout/ContactInformation"

type Props = {
    checkout: Checkout
}
const CheckoutPage = ({ checkout }: Props) => {
    const [shippingAddressCompleted, setShippingAddressCompleted] = useState(false)
    const [shippingMethodCompleted, setShippingMethodCompleted] = useState(false)
    const [paymentInfoCompleted, setPaymentInfoCompleted] = useState(false)
    const checkoutState: CheckoutState = {
        shippingAddressCompleted,
        shippingMethodCompleted,
        paymentInfoCompleted,
        setShippingAddressCompleted,
        setShippingMethodCompleted,
        setPaymentInfoCompleted
    }

    const stripePromise = loadStripePublic()
    if (checkout) {
        stripeElementOptions.clientSecret = checkout.clientSecret
    }

    return (
        <div className="flex flex-col min-h-screen bg-gray-50">
            <Navbar />
            <div className="md:max-w-4xl 2xl:max-w-7xl mx-auto py-0 md:py-8">
                <div className="text-center flex flex-col items-center">
                    <div className="grid grid-cols-1 md:grid-cols-5 md:gap-4 w-full text-left pt-6 px-6">
                        <Elements stripe={stripePromise} options={stripeElementOptions}>
                            <div className="md:col-span-3 flex flex-col space-y-6 py-6 md:py-0 md:pr-8 2xl:w-[40rem]">
                                <ContactInformation checkout={checkout} checkoutState={checkoutState} />
                                <ShippingAddressForm checkout={checkout} checkoutState={checkoutState} />
                                {/* <ShippingMethodForm checkout={checkout} checkoutState={checkoutState} /> */}
                                <PaymentInfoForm checkout={checkout} checkoutState={checkoutState} />
                            </div>
                            <OrderSummary checkout={checkout} checkoutState={checkoutState} />
                        </Elements>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default CheckoutPage
