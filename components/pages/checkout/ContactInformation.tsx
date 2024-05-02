import React, { useEffect, useState } from "react"
import * as yup from "yup"
import { useFormik } from "formik"
import { GoCheck } from "react-icons/go"
import { getCountries, getCountry } from "@/lib/countries"
import FormInput from "@/components/pages/checkout/FormInput"
import FormLabel from "@/components/pages/checkout/FormLabel"
import FormSelect from "@/components/pages/checkout/FormSelect"
import type { FormSelectOption } from "@/components/pages/checkout/FormSelect"
import Loader from "@/components/global/Loader"
import type { CheckoutState } from "@/components/pages/checkout/types"
import type { Checkout, Response } from "@/pages/api/cart/checkout/types"
import { LinkAuthenticationElement } from "@stripe/react-stripe-js"


type Props = {
    checkout: Checkout
    checkoutState: CheckoutState
}
const ContactInformation = ({ checkout, checkoutState }: Props) => {
    
    return (
        <div className="flex flex-col border-b border-b-slate-200 pb-6">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold flex items-center">Contact Information</h1>
            </div>

            <div>
                <LinkAuthenticationElement />
            </div>
        </div>
    )
}

export default ContactInformation
