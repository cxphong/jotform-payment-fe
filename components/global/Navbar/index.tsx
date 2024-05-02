import React, { useState } from "react"
import useSWR from "swr"
import Link from "next/link"
import Image from "next/image"
import { RiShoppingBagLine, RiMenuLine } from "react-icons/ri"
import OrpheusLogo from "@/public/photos/orpheus.png"
import MobileNavPopover from "@/components/global/Navbar/MobileNavPopover"
import NavbarItem from "@/components/global/Navbar/NavbarItem"
import NavbarItemWithSubcategory from "@/components/global/Navbar/NavbarItemWithSubcategory"
import type { NavItem } from "@/components/global/Navbar/types"
import { calcCartItemCount } from "@/utils/cartItem"

const Navbar = () => {
    const [showMobileNav, setShowMobileNav] = useState(false)

    let cartItems
    // const { data, error } = useSWR("/api/cart", (...args) => fetch(...args).then((res) => res.json()), {
    //     revalidateOnFocus: false
    // })
    // if (!error && data) {
    //     cartItems = data.cart.items
    // }

    return (
        <header className="py-4 border-b border-b-gray-200 bg-white">
            <div className="px-4 sm:px-6 md:px-8">
                {/* Left Side */}
                <div className="relative flex justify-between items-center">
                    {/* Mobile nav toggle */}
                    <button className="md:hidden" onClick={() => setShowMobileNav(true)}>
                        <RiMenuLine size={28} />
                    </button>
                    <div className="flex space-x-12">
                        {/* Logo Element */}
                        <Link href="/">
                            <a className="flex flex-row space-x-3 items-center">
                                <Image
                                    src={OrpheusLogo}
                                    width={34}
                                    height={34}
                                    loading="eager"
                                    priority={true}
                                />
                                <h1 className="font-gilroy font-bold text-xl">Infinium Research</h1>
                            </a>
                        </Link>
                    </div>
                    {/* Right Side */}
                </div>
            </div>
            <MobileNavPopover
                showMobileNav={showMobileNav}
                setShowMobileNav={setShowMobileNav}
                navItems={[]}
            />
        </header>
    )
}

export default Navbar
