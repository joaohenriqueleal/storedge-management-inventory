import PageContainer from "@/components/containers/PageContainer/PageContainer"
import HomeNav from "@/components/navigation/HomeNav/HomeNav"
import Header from "@/components/containers/Header/Header"
import Main from "@/components/containers/Main/Main"


export default function Categories() {
    return (
        <PageContainer>
            <Header />
            <Main>
                <h1>Categorias</h1>
            </Main>
            <HomeNav />
        </PageContainer>
    )
}
