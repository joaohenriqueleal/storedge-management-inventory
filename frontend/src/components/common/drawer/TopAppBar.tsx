import { useRef } from "react"

import { Button } from "@/components/ui/button"

import { Typography } from "@/components/ui"
import { FaChevronLeft } from "react-icons/fa"
import type { TopAppBarProps } from "./TopAppBar.types"

export default function TopAppBar({
    children,
    setShow,
    title = ""
}: TopAppBarProps) {
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
            className="animate-tab-open fixed inset-0 z-999 flex h-screen w-screen flex-col gap-10 bg-white p-6"
        >
            <div className="flex items-center gap-4 text-black">
                <Button
                    className="cursor-pointer rounded-full p-3 py-5 text-xl transition duration-200 hover:bg-purple-300"
                    onClick={close}
                >
                    <FaChevronLeft />
                </Button>

                <Typography variant="h1" className="text-xl xl:text-xl md:text-xl">{title}</Typography>
            </div>
            <div className="scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-transparent overflow-auto pr-2">
                {children}
            </div>
        </div>
    )
}
