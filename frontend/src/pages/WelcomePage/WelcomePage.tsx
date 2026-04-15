import { Menu } from "lucide-react"
import {
    FaBolt,
    FaBox,
    FaChartBar,
    FaCheckCircle,
    FaExchangeAlt,
    FaHandshake,
    FaMoon,
    FaSun,
    FaUser,
    FaUserPlus
} from "react-icons/fa"

import LogoStoredge from "@/assets/logo.png"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuTrigger
} from "@/components/common/dropdown-menu"
import { NavBar } from "@/components/common/nav-bar"
import {
    Button,
    Card,
    Container,
    Image,
    Link,
    Typography
} from "@/components/ui"
import { useTheme } from "@/lib/theme"

const navLinks = [
    { label: "Início", href: "#inicio" },
    { label: "Sobre", href: "#sobre" },
    { label: "Suporte", href: "#suporte" }
]

const features = [
    {
        icon: FaBox,
        title: "Cadastro de produtos",
        desc: "Organize itens com categorias, variações e detalhes completos"
    },
    {
        icon: FaExchangeAlt,
        title: "Entradas e saídas",
        desc: "Acompanhe movimentações com histórico claro"
    },
    {
        icon: FaHandshake,
        title: "Fornecedores",
        desc: "Centralize contatos e relações comerciais"
    },
    {
        icon: FaChartBar,
        title: "Relatórios",
        desc: "Tenha visão estratégica do seu estoque"
    }
]

export default function WelcomePage() {
    const { theme, toggleTheme } = useTheme()

    return (
        <Container gap="2xl">
            <NavBar className="grid grid-cols-2 items-center gap-2 border-b py-2 md:grid-cols-3">
                <Link
                    to="#inicio"
                    className="aspect-square size-14! shrink-0 p-2!"
                    variant="ghost"
                >
                    <Image alt="Logo StorEdge" src={LogoStoredge} />
                </Link>

                <Container
                    gap="sm"
                    flexRow
                    className="hidden items-center justify-center md:flex"
                >
                    {navLinks.map((link) => (
                        <Link key={link.label} variant="ghost" to={link.href}>
                            {link.label}
                        </Link>
                    ))}
                </Container>

                <Container
                    flexRow
                    className="hidden items-center justify-end gap-2 md:flex"
                >
                    <Button variant="ghost" size="icon" onClick={toggleTheme}>
                        {theme === "dark" ? <FaSun /> : <FaMoon />}
                    </Button>
                    <Link to="/login" variant="ghost">
                        Login <FaUser />
                    </Link>
                    <Link to="/registro">
                        Registrar <FaUserPlus />
                    </Link>
                </Container>

                <DropdownMenu>
                    <DropdownMenuTrigger
                        nativeButton
                        render={
                            <Button
                                variant="ghost"
                                className="ml-auto md:hidden"
                                size="icon"
                            />
                        }
                    >
                        <Menu />
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="space-y-2 *:w-full!">
                        {navLinks.map((link) => (
                            <DropdownMenuItem
                                key={link.label}
                                render={<Link variant="ghost" to={link.href} />}
                            >
                                {link.label}
                            </DropdownMenuItem>
                        ))}
                        <DropdownMenuItem
                            render={<Link to="/login" variant="ghost" />}
                        >
                            Login <FaUser />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            render={<Link to="/registro" variant="ghost" />}
                        >
                            Criar <FaUserPlus />
                        </DropdownMenuItem>
                        <DropdownMenuItem
                            nativeButton
                            closeOnClick={false}
                            render={
                                <Button
                                    variant="ghost"
                                    size="icon"
                                    onClick={toggleTheme}
                                />
                            }
                        >
                            {theme === "dark" ? <FaSun /> : <FaMoon />}
                        </DropdownMenuItem>
                    </DropdownMenuContent>
                </DropdownMenu>
            </NavBar>

            <Container as="main" layout gap="2xl">
                <Container
                    as="section"
                    id="inicio"
                    gap="lg"
                    className="relative mx-auto max-w-2xl text-center"
                >
                    <div className="from-primary/30 to-secondary/30 absolute top-0 left-1/2 -z-10 mx-auto h-80 w-80 -translate-x-1/2 rounded-full bg-linear-to-r blur-3xl" />

                    <Typography variant="h1">
                        Controle de estoque
                        <Typography variant="span" color="gradient">
                            simples e poderoso
                        </Typography>
                    </Typography>

                    <Typography as="p" variant="h3" color="muted">
                        Gerencie produtos, movimentações e relatórios em uma
                        plataforma moderna, rápida e intuitiva.
                    </Typography>

                    <Container flexRow className="flex-wrap justify-center">
                        <Link
                            to="#sobre"
                            variant="default"
                            size="lg"
                            animation="scale-on-hover"
                        >
                            Começar
                        </Link>
                        <Link
                            to="#suporte"
                            variant="outline"
                            size="lg"
                            animation="scale-on-hover"
                        >
                            Suporte
                        </Link>
                    </Container>

                    <Container
                        flexRow
                        gap="lg"
                        className="text-muted-foreground flex-wrap items-center justify-center *:text-xs"
                    >
                        <Typography className="flex items-center gap-2">
                            <FaCheckCircle /> Simples
                        </Typography>
                        <Typography className="flex items-center gap-2">
                            <FaBolt /> Rápido
                        </Typography>
                        <Typography className="flex items-center gap-2">
                            <FaChartBar /> Escalável
                        </Typography>
                    </Container>
                </Container>

                <Container as="section" id="features" gap="xl">
                    <Typography variant="h2" align="center">
                        Funcionalidades
                    </Typography>

                    <Container
                        gap="lg"
                        className="grid sm:grid-cols-2 lg:grid-cols-4"
                    >
                        {features.map(({ icon: Icon, title, desc }) => (
                            <Card key={title} variant="interactive-on-hover">
                                <Container className="bg-background flex size-12 items-center justify-center rounded-xl shadow-sm">
                                    <Icon />
                                </Container>

                                <Typography variant="h3">{title}</Typography>

                                <Typography color="muted" size="sm">
                                    {desc}
                                </Typography>
                            </Card>
                        ))}
                    </Container>
                </Container>

                <Container
                    as="section"
                    id="sobre"
                    gap="lg"
                    className="mx-auto max-w-2xl text-center"
                >
                    <Typography variant="h2">Sobre o sistema</Typography>

                    <Typography>
                        O StorEdge foi criado para simplificar a gestão de
                        estoque, oferecendo clareza nas movimentações e ajudando
                        na tomada de decisões com dados confiáveis.
                    </Typography>

                    <Container gap="lg" className="grid sm:grid-cols-3">
                        {["Organização", "Produtividade", "Controle"].map(
                            (item) => (
                                <Card
                                    key={item}
                                    as="p"
                                    variant="interactive-on-hover"
                                >
                                    {item}
                                </Card>
                            )
                        )}
                    </Container>
                </Container>

                <Container
                    as="section"
                    id="suporte"
                    gap="lg"
                    className="text-center"
                >
                    <Typography variant="h2">Precisa de ajuda?</Typography>

                    <Typography>
                        Fale com nosso suporte e resolva rapidamente qualquer
                        problema.
                    </Typography>

                    <Link
                        to="mailto:suporte@storedge.com"
                        variant="default"
                        animation="scale-on-hover"
                        className="mx-auto"
                    >
                        suporte@storedge.com
                    </Link>
                </Container>
            </Container>

            <Container as="footer" className="bg-card border-t">
                <Container layout className="grid py-12 md:grid-cols-3">
                    <Container as="address" className="not-italic">
                        <Typography variant="h3">Contato</Typography>
                        <Typography color="muted">
                            suporte@storedge.com
                        </Typography>
                    </Container>

                    <Container as="nav">
                        <Typography variant="h3">Navegação</Typography>
                        <Container as="ul" gap="sm">
                            {navLinks.map((link) => (
                                <li key={link.label}>
                                    <Link to={link.href} variant="link">
                                        {link.label}
                                    </Link>
                                </li>
                            ))}
                        </Container>
                    </Container>

                    <Container>
                        <Typography variant="h3">StorEdge</Typography>
                        <Typography color="muted">
                            Sistema moderno de gestão de estoque focado em
                            simplicidade e eficiência.
                        </Typography>
                    </Container>
                </Container>

                <Typography
                    color="muted"
                    align="center"
                    size="xs"
                    className="border-t py-4"
                >
                    © {new Date().getFullYear()} StorEdge. Todos os direitos
                    reservados.
                </Typography>
            </Container>
        </Container>
    )
}
