import { useState } from "react"

import { Button } from "@/components/ui/button"
import { FaInfo } from "react-icons/fa"

import TopAppBar from "@/components/windows/TopAppBar/TopAppBar"
import Title from "@/components/ui/Title/Title"


export default function Header() {
    const [showTABAbout, setshowTABAbout] = useState<boolean>(false)

    return (
        <>
            <header
                className="bg-background/70 sticky top-0 z-50 border-b backdrop-blur-xl
                    p-4 flex items-center justify-between"
                >
                <Title
                    className="text-primary text-2xl"
                    level={1} 
                >
                    StorEdge
                </Title>
                <Button
                    className="text-black/70 bg-transparent hover:bg-gray-200 transition
                        duration-300 cursor-pointer px-3 py-5 rounded-full"
                    onClick={() => setshowTABAbout(true)}
                >
                    <FaInfo />
                </Button>
            </header>
            {showTABAbout && (
                <TopAppBar title="Sobre" setShow={setshowTABAbout}>
                    <></>
                </TopAppBar>
            )}
        </>
    )
}
