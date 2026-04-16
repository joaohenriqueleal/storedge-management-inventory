import PageContainer from "@/components/containers/PageContainer/PageContainer"
import HomeNav from "@/components/navigation/HomeNav/HomeNav"
import Header from "@/components/common/Header/Header"
import Main from "@/components/containers/Main/Main"

export default function Home() {
    return (
        <PageContainer>
            <Header />
            <Main className="pb-20">
                <h1>Home</h1>
            </Main>
            <HomeNav />
        </PageContainer>
    )
}
