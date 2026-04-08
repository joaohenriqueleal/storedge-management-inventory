import PageContainer from "../../components/containers/PageContainer/PageContainer"
import Container from "../../components/containers/Container/Container"
import Section from "../../components/containers/Section/Section"
import Footer from "../../components/containers/Footer/Footer"
import Main from "../../components/containers/Main/Main"
import Nav from "../../components/navigation/Nav/Nav"
import Title from "../../components/ui/Title/Title"


export default function WelcomePage() {
    return (
        <PageContainer>
            <Nav />

            <Main>
                <Section id="inicio">
                    <Container>
                        <Title level={1}>Seja bem-vindo</Title>
                        <p>
                            Sistema de gerenciamento de estoque para controle de produtos,
                            entradas, saídas e relatórios.
                        </p>
                    </Container>

                    <article>
                        <Title level={2}>Principais funcionalidades</Title>
                        <ul>
                            <li>Cadastro de produtos</li>
                            <li>Controle de entrada e saída</li>
                            <li>Gestão de fornecedores</li>
                            <li>Relatórios de estoque</li>
                        </ul>
                    </article>
                </Section>

                <Section id="sobre">
                    <article>
                        <Title level={2}>Sobre o sistema</Title>
                        <p>
                            Este sistema foi desenvolvido para facilitar o controle de estoque,
                            permitindo melhor organização e tomada de decisões.
                        </p>
                    </article>
                </Section>

                <Section id="suporte">
                    <article>
                        <Title level={2}>Suporte</Title>
                        <p>
                            Em caso de dúvidas ou problemas, entre em contato com o suporte técnico.
                        </p>
                    </article>
                </Section>
            </Main>
            <Footer>
                <Container>
                    <Section>
                        <Title level={2}>Contato</Title>
                        <address>
                            <p>
                                Email:{" "}
                                <a href="mailto:suporte@storedge.com">
                                    suporte@storedge.com
                                </a>
                            </p>
                        </address>
                    </Section>

                    <Section>
                        <Title level={2}>Links úteis</Title>
                        <nav>
                            <ul>
                                <li><a href="#inicio">Início</a></li>
                                <li><a href="#sobre">Sobre</a></li>
                                <li><a href="#suporte">Suporte</a></li>
                            </ul>
                        </nav>
                    </Section>

                    <Section>
                        <Title level={2}>StorEdge</Title>
                        <p>
                            Plataforma de gerenciamento de estoque para controle eficiente de produtos,
                            movimentações e relatórios.
                        </p>
                    </Section>
                    <small>
                        &copy; {new Date().getFullYear()} StorEdge. Todos os direitos reservados.
                    </small>
                </Container>
            </Footer>
        </PageContainer>
    )
}
