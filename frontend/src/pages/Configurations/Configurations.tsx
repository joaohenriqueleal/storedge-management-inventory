import { useEffect, useState } from "react"

import PageContainer from "@/components/containers/PageContainer/PageContainer"
import HomeNav from "@/components/navigation/HomeNav/HomeNav"
import Header from "@/components/common/Header/Header"
import Main from "@/components/containers/Main/Main"
import { Container } from "@/components/ui"
import { Button } from "@/components/ui"

import { loadUsername } from "@/lib/storageCredentials"
import { FaUser, FaSun, FaMoon } from "react-icons/fa"

// buttons
import LogOutButton from "@/components/common/buttons/LogOutButton"
import { useTheme } from "@/lib/theme"


interface ConfigurationsProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
}

export default function Configurations({ setAuthenticated } : ConfigurationsProps ) {
    const [username, setUsername] = useState<string>('')
    const {theme, toggleTheme} = useTheme()

    useEffect(() => {
        setUsername(loadUsername() || 'user')
    }, [username])

    return (
        <PageContainer>
            <Header />
            <Main className="flex flex-col gap-8 px-2 max-w-230 mx-auto">
                <Container
                    className="w-full h-max flex items-center justify-center py-8
                        dark:bg-black rounded-2xl rounded-b-[80px] shadow-md gap-8
                        bg-gray-200"
                    >
                    <FaUser className="bg-primary text-white w-28 h-28 p-4 rounded-full" />
                    <h1 className="text-xl">Olá, {username}</h1>
                </Container>
                <Container className="dark:bg-black p-4 rounded-2xl bg-gray-200">
                    <Button
                        className="p-6 bg-gray-800 cursor-pointer hover:bg-gray-700
                            transition duration-200"
                        onClick={toggleTheme}
                    >
                        Alterar tema {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </Button>
                    <LogOutButton setAuthenticated={setAuthenticated} />
                </Container>
            </Main>
            <HomeNav />
        </PageContainer>
    )
}
