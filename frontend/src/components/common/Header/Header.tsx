import { useState } from "react"

import { FaInfo } from "react-icons/fa"

import TopAppBar from "@/components/common/drawer/TopAppBar"
import AboutTAB from "@/components/tabs/AboutTAB/AboutTAB"
import { Button } from "@/components/ui/button"
import { Container } from "@/components/ui"
import { Typography } from "@/components/ui"


export default function Header() {
    const [showTABAbout, setshowTABAbout] = useState<boolean>(false)

    return (
        <>
            <header className="bg-background/70 sticky top-0 z-50 border-b p-4 backdrop-blur-xl">
                <Container
                    className="flex flex-row items-center justify-between w-full mx-auto
                        max-w-230"
                    >
                    <Typography variant="h1" color="primary">
                        StorEdge
                    </Typography>
                    <Button
                        className="cursor-pointer rounded-full bg-primary px-3 py-5 text-black/70 transition duration-300"
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
