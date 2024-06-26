import React from "react"
import Image from "next/image"
import Link from "next/link"
import HeroImg from "@/public/pexels-tembela-bohle-1884581.jpg"

const Hero = () => {
    return (
        <div className="relative h-[32rem] md:h-[40rem]">
            {/* Background image */}
            <Image
                src={HeroImg}
                objectFit="cover"
                layout="fill"
                loading="eager"
                priority={true}
                draggable={false}
            />
            <div className="absolute h-full w-full bg-gray-800 opacity-80" />
            <div className="absolute h-full w-full z-10">
                <div className="relative h-full px-10 text-center">
                    <div className="h-full flex flex-col items-center justify-center space-y-6 sm:space-y-3">
                        {/* Content */}
                        <h1 className="text-white font-bold text-6xl">Welcome to Infinium Research</h1>
                        <h2 className="text-gray-200 font-regular">
                            An open-source ecommerce website template. Customizable and fully functional
                        </h2>
                        <Link href="/shop/all">
                            <a className="bg-white rounded-md text-black font-medium py-3 px-6 hover:bg-gray-200">
                                View Shop
                            </a>
                        </Link>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default Hero
