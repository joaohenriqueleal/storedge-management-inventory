import { useState } from "react"

import { FaInfo } from "react-icons/fa"

import TopAppBar from "@/components/windows/TopAppBar/TopAppBar"
import AboutTAB from "@/components/tabs/AboutTAB/AboutTAB"
import Title from "@/components/ui/Title/Title"
import { Button } from "@/components/ui/button"
import Container from "../Container/Container"


export default function Header() {
    const [showTABAbout, setshowTABAbout] = useState<boolean>(false)

    return (
        <>
            <header
                className="bg-background/70 sticky top-0 z-50 border-b backdrop-blur-xl
                    p-4"
                >
                <Container className="flex items-center justify-between max-w-230 mx-auto">
                    <Title
                        className="text-primary text-2xl"
                        level={1}
                    >
                        StorEdge
                    </Title>
                    <Button
                        className="text-black/70 bg-transparent hover:bg-gray-200 transition
                            duration-300 cursor-pointer px-3 py-5 rounded-full dark:text-primary
                            dark:bg-gray-900 dark:hover:bg-black"
                        onClick={() => setshowTABAbout(true)}
                    >
                        <FaInfo />
                    </Button>
                </Container>
            </header>
            {showTABAbout && (
                <TopAppBar title="Sobre" setShow={setshowTABAbout}>
                    <AboutTAB />
                </TopAppBar>
            )}
        </>
    )
}
