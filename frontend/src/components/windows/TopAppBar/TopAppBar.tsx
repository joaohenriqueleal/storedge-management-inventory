import { useRef } from "react"

import Title from "@/components/ui/Title/Title"
import { Button } from "@/components/ui/button"

import type { TopAppBarProps } from "./TopAppBar.types"
import { FaChevronLeft } from "react-icons/fa"


export default function TopAppBar({ children, setShow, title }: TopAppBarProps) {
    const containerRef = useRef<HTMLDivElement>(null)

    const close = () => {
        if (!containerRef.current) return

        const el = containerRef.current
        el.classList.remove("animate-tab-open")
        el.classList.add("animate-tab-close")

        const handleEnd = () => {
            setShow(false)
            el.removeEventListener("animationend", handleEnd)
        }

        el.addEventListener("animationend", handleEnd)
    }

    return (
        <div
            ref={containerRef}
            className="
                fixed inset-0 h-screen w-screen z-999
                bg-white p-6 flex flex-col gap-10
                animate-tab-open"
        >
            <div className="flex items-center gap-4 text-black">
                <Button
                    className="
                        p-3 rounded-full hover:bg-purple-300 py-5
                        transition duration-200 text-xl cursor-pointer"
                    onClick={close}
                >
                    <FaChevronLeft />
                </Button>

                <Title
                    className="font-semibold text-xl text-gray-600"
                    level={1}
                >
                    {title || ""}
                </Title>
            </div>
            <div 
                className="pr-2 scrollbar-thin overflow-auto
                scrollbar-thumb-gray-300 scrollbar-track-transparent"
            >
                {children}
            </div>
        </div>
    )
}
