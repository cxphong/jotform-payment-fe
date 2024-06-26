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
import { AddressElement, useElements } from "@stripe/react-stripe-js"

const countries = getCountries()

type Props = {
    checkout: Checkout
    checkoutState: CheckoutState
}
const ShippingAddressForm = ({ checkout, checkoutState }: Props) => {
    const showForm = !checkoutState.shippingAddressCompleted
    const [showLoader, setShowLoader] = useState(false)
    const [formSubmitted, setFormSubmitted] = useState(false)
    const [validateOnBlur, setValidateOnBlur] = useState(false)
    const elements = useElements()

    const onSubmit = async () => {
        console.log(elements)
        setShowLoader(true)
        // const response = await fetch(
        //     "https://2btr3spmef.execute-api.us-east-1.amazonaws.com/default/jotform-stripe-payment-intent",
        //     {
        //         method: "PUT",
        //         headers: {
        //             accept: "application/json",
        //             "content-type": "application/json"
        //         },
        //         body: JSON.stringify({ 
        //             paymentIntentId: checkout.paymentIntentId,
        //             // shippingAddress: values 
        //         })
        // })
        setShowLoader(false)
        // if (response.status === 200) {
        //     setFormSubmitted(true)
        //     checkoutState.setShippingAddressCompleted(true)
        // }
    }

    // const validation = yup.object({
    //     emailAddress: yup.string().email().required(),
    //     firstName: yup.string().required(),
    //     lastName: yup.string().required(),
    //     countryName: yup.string().required(),
    //     address1: yup.string().required(),
    //     address2: yup.string().optional().nullable(),
    //     city: yup.string().required(),
    //     state: yup.string().required(),
    //     zipCode: yup.number().required()
    // })
    // const formik = useFormik({
    //     initialValues: {
    //         emailAddress: "",
    //         firstName: "",
    //         lastName: "",
    //         countryName: "US",
    //         address1: "",
    //         address2: "",
    //         city: "",
    //         state: "",
    //         zipCode: ""
    //     },
    //     validationSchema: validation,
    //     validateOnBlur,
    //     validateOnChange: validateOnBlur,
    //     enableReinitialize: true,
    //     onSubmit
    // })

    // // Set field values if user has already submitted shipping address previously
    // useEffect(() => {
    //     ;(async () => {
    //         try {
    //             await validation.validate({
    //                 ...checkout.shippingAddress
    //             })
    //             for (const fieldName in checkout.shippingAddress) {
    //                 await formik.setFieldValue(fieldName, checkout.shippingAddress[fieldName])
    //             }
    //             setFormSubmitted(true)
    //             checkoutState.setShippingAddressCompleted(true)
    //         } catch (ValidationError) {}
    //     })()
    // }, [])

    const onEdit = () => {
        checkoutState.setShippingAddressCompleted(false)
        setFormSubmitted(false)
    }

    const countryOptions = countries.map((country) => ({ name: country.name, value: country.code }))
    const [stateOptions, setStateOptions] = useState<FormSelectOption[]>([])
    // useEffect(() => {
    //     const states = getCountry(formik.values.countryName).states.map((state) => ({
    //         name: state,
    //         value: state
    //     }))
    //     setStateOptions(states)
    //     if (states.length > 0) {
    //         formik.setFieldValue("state", states[0].value)
    //     }
    // }, [formik.values.countryName])
    return (
        <div className="flex flex-col border-b border-b-slate-200 pb-6">
            <div className="flex justify-between">
                <h1 className="text-lg font-semibold flex items-center">
                    Billing Address
                    {formSubmitted && <GoCheck className="ml-2 text-emerald-500" size={24} />}
                </h1>
                {formSubmitted && (
                    <button className="text-sm font-medium text-sky-600" onClick={onEdit}>
                        Edit
                    </button>
                )}
            </div>

            <div>
                <AddressElement
                    options={{
                        mode: "billing",
                    display: {
                            name: "split"
                    },
                    defaultValues: {
                        address: {
                            state: 'CA',
                            country: 'US',
                        },
                    },
                    fields: {
                        phone: 'always',
                    }
                }}
                />
            </div>

            {/* Shipping details preview */}
            {/* <div className={`${formSubmitted ? "block pt-2" : "hidden"}`}>
                <p className="text-sm text-slate-600">
                    {formik.values.firstName} {formik.values.lastName}
                </p>
                <p className="text-sm text-slate-600">{formik.values.emailAddress}</p>
                <p className="text-sm text-slate-600">
                    {formik.values.address1} {formik.values.address2}
                </p>
                <p className="text-sm text-slate-600">
                    {formik.values.city}, {formik.values.state} {formik.values.zipCode}
                </p>
            </div> */}

            {/* <div className="pt-6">
                        <button onClick={onSubmit} className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full hover:bg-slate-800 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:bg-slate-400 disabled:cursor-not-allowed">
                            {showLoader ? <Loader /> : "Continue"}
                        </button>
                    </div> */}
            {/* Shipping address form */}
            {/* <div className={`${showForm ? "block pt-6" : "hidden"}`}>
                <form
                    onSubmit={(e) => {
                        setValidateOnBlur(true)
                        formik.handleSubmit(e)
                    }}
                >
                    <div className="grid grid-cols-6 gap-4">
                        <div className="col-span-6">
                            <FormLabel>Email Address</FormLabel>
                            <FormInput
                                type="email"
                                id="emailAddress"
                                autoComplete="email"
                                placeholder="Enter email address"
                                onChange={formik.handleChange}
                                value={formik.values.emailAddress}
                                hasError={"emailAddress" in formik.errors}
                            />
                        </div>
                        <div className="col-span-3">
                            <FormLabel>First Name</FormLabel>
                            <FormInput
                                type="text"
                                id="firstName"
                                autoComplete="given-name"
                                placeholder="Enter first name"
                                onChange={formik.handleChange}
                                value={formik.values.firstName}
                                hasError={"firstName" in formik.errors}
                            />
                        </div>
                        <div className="col-span-3">
                            <FormLabel>Last Name</FormLabel>
                            <FormInput
                                type="text"
                                id="lastName"
                                autoComplete="family-name"
                                placeholder="Enter last name"
                                onChange={formik.handleChange}
                                value={formik.values.lastName}
                                hasError={"lastName" in formik.errors}
                            />
                        </div>

                        <div className="col-span-6">
                            <FormLabel>Country</FormLabel>
                            <FormSelect
                                id="countryName"
                                autoComplete="country-name"
                                onChange={formik.handleChange}
                                value={formik.values.countryName}
                                hasError={"countryName" in formik.errors}
                                options={countryOptions}
                            />
                        </div>

                        <div className="col-span-4">
                            <FormLabel>Address</FormLabel>
                            <FormInput
                                type="text"
                                id="address1"
                                autoComplete="street-address"
                                placeholder="Enter address"
                                onChange={formik.handleChange}
                                value={formik.values.address1}
                                hasError={"address1" in formik.errors}
                            />
                        </div>
                        <div className="col-span-2">
                            <FormLabel>Apt / Suite</FormLabel>
                            <FormInput
                                type="text"
                                id="address2"
                                autoComplete="street-address"
                                placeholder="Enter apt/suite #"
                                onChange={formik.handleChange}
                                value={formik.values.address2}
                                hasError={"address2" in formik.errors}
                            />
                        </div>
                        <div className="col-span-6 md:col-span-2">
                            <FormLabel>City</FormLabel>
                            <FormInput
                                type="text"
                                id="city"
                                autoComplete="address-level2"
                                placeholder="Enter city"
                                onChange={formik.handleChange}
                                value={formik.values.city}
                                hasError={"city" in formik.errors}
                            />
                        </div>

                        <div className="col-span-3 md:col-span-2">
                            <FormLabel>State</FormLabel>
                            <FormSelect
                                id="state"
                                autoComplete="address-level1"
                                onChange={formik.handleChange}
                                value={formik.values.state}
                                hasError={"state" in formik.errors}
                                options={stateOptions}
                            />
                        </div>

                        <div className="col-span-3 md:col-span-2">
                            <FormLabel>ZIP</FormLabel>
                            <FormInput
                                type="text"
                                id="zipCode"
                                autoComplete="postal-code"
                                placeholder="Enter ZIP code"
                                onChange={formik.handleChange}
                                value={formik.values.zipCode}
                                hasError={"zipCode" in formik.errors}
                            />
                        </div>
                    </div>
                    <div className="pt-6">
                        <button className="font-semibold bg-black text-white rounded-md border border-black py-2 px-5 text-sm w-full hover:bg-slate-800 disabled:bg-slate-400 disabled:border-slate-400 disabled:hover:bg-slate-400 disabled:cursor-not-allowed">
                            {showLoader ? <Loader /> : "Continue"}
                        </button>
                    </div>
                </form>
            </div> */}
        </div>
    )
}

export default ShippingAddressForm
