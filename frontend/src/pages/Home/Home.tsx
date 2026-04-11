import type { HomeProps } from "./Home.types"

import PageContainer from "@/components/containers/PageContainer/PageContainer"
import Header from "@/components/containers/Header/Header"


export default function Home({ setAuthenticated } : HomeProps ) {
    return (
        <PageContainer>
            <Header />
        </PageContainer>
    )
}
