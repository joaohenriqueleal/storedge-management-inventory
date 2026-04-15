import { Container } from "@/components/ui"
import type { HomeProps } from "./Home.types"

import Header from "@/components/common/Header/Header"

export default function Home({ setAuthenticated }: HomeProps) {
    return (
        <Container>
            <Header />
        </Container>
    )
}
