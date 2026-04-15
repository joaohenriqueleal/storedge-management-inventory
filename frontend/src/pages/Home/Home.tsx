<<<<<<< HEAD
import { Container } from "@/components/ui"
import type { HomeProps } from "./Home.types"

import Header from "@/components/common/Header/Header"

export default function Home({ setAuthenticated }: HomeProps) {
=======
import PageContainer from "@/components/containers/PageContainer/PageContainer"
import HomeNav from "@/components/navigation/HomeNav/HomeNav"
import Header from "@/components/containers/Header/Header"
import Main from "@/components/containers/Main/Main"


export default function Home() {
>>>>>>> frontend/feature/home
    return (
        <Container>
            <Header />
<<<<<<< HEAD
        </Container>
=======
            <Main className="pb-20">
                <h1>Home</h1>
            </Main>
            <HomeNav />
        </PageContainer>
>>>>>>> frontend/feature/home
    )
}
