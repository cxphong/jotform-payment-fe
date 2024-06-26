import type { NextApiRequest, NextApiResponse } from "next"
import { getCookie, setCookie } from "cookies-next"
import prisma from "@/lib/prisma"
import loadStripePrivate from "@/lib/stripe/loadStripePrivate"
import type { Cart, CartInternal, Response } from "@/pages/api/cart/types"

const stripe = loadStripePrivate()

export function formatCartResponse(cart: CartInternal): Cart {
    return {
        items: cart.cartItems.map((cartItem) => ({
            productId: cartItem.productId,
            quantity: cartItem.quantity
        })),
        subtotal: calcCartTotal(cart)
    }
}

export async function getCartId(req: NextApiRequest, res: NextApiResponse<Response>) {
    let cartId
    const cartCookie = getCookie("cart", { req, res })
    
    if (isValidCartCookie(cartCookie)) {
        cartId = cartCookie as string

        const cart = await prisma.cart.findFirst({
            where: { id: cartId }
        })
        if (cart !== null) {
            return cartId
        }
    }
    // cartId = await createNewCart()
    setCookie("cart", cartId, { req, res })
    return cartId
}

export async function getCart(cartId: string) {
    return await prisma.cart.findUnique({
        where: { id: cartId },
        include: {
            cartItems: {
                include: {
                    product: true
                }
            },
            checkoutSession: {
                include: {
                    shippingAddress: true
                }
            }
        }
    })
}

export async function createNewCart() {
    const paymentIntent = await stripe.paymentIntents.create({
        amount: 100,
        currency: "usd",
        automatic_payment_methods: { enabled: true }
    })
    const cart = await prisma.cart.create({
        data: {
            checkoutSession: { create: { paymentIntentId: paymentIntent.id as string } }
        }
    })
    return cart.id
}

function isValidCartCookie(cartCookie: string | boolean) {
    return cartCookie !== undefined && cartCookie !== null && typeof cartCookie === "string"
}

export async function updateCheckoutTotal(cart: CartInternal) {
    let total = calcCartTotal(cart)
    if (total < 1) {
        total = 1
    }
    await stripe.paymentIntents.update(cart.checkoutSession.paymentIntentId, {
        amount: Math.round(total * 100.0)
    })
}

export function calcCartTotal(cart: CartInternal) {
    return cart.cartItems.reduce((sum, cartItem) => sum + cartItem.product.price * cartItem.quantity, 0)
}
