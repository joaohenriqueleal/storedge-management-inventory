import { FaChartBar, FaCog, FaTags, FaBox, FaLayerGroup } from 'react-icons/fa'
import { useLocation } from 'react-router-dom'

import Link from "@/components/navigation/Link/Link"
import { Container } from "@/components/ui/container"


export default function HomeNav() {
    const linksStyles = `flex flex-col gap-2 items-center hover:text-gray-500
        transition duration-200`
    const linkSelectedStyles = `text-gray-500 flex flex-col gap-2 items-center border-b-4
        border-gray-500 p-2`
    const legendStyles = "text-xs md:text-sm font-bold hidden md:block"
    const iconsStyles = "h-6 md:h-9 text-black dark:text-gray-300"
    const location = useLocation()

    const path = location.pathname

    const isHome = path === '/home'
    const isCategories = path.includes('categorias')
    const isConfig = path.includes('configuracoes')
    const isProducts = path.includes('produtos')
    const isCombos = path.includes('combos')

    return (
        <nav
            className="fixed bottom-0 left-0 w-full z-3 text-gray-200 backdrop-blur-xs
                bg-gray-50 dark:bg-black/96 p-4 flex items-center justify-center"
        >
            <Container
                className="flex items-center justify-between w-full max-w-230 px-4 md:px-0
                    flex-row"
            >
                <Link
                    className={`${isHome ? linkSelectedStyles : linksStyles}`}
                    href="/home"
                >
                    <FaChartBar size={32} className={iconsStyles} />
                    <p className={legendStyles}>Home</p>
                </Link>
                <Link
                    className={`${isCategories ? linkSelectedStyles : linksStyles}`}
                    href="/categorias"
                >
                    <FaTags size={32} className={iconsStyles} />
                    <p className={legendStyles}>Categorias</p>
                </Link>
                <Link
                    className={`${isProducts ? linkSelectedStyles : linksStyles}`}
                    href="/produtos"
                >
                    <FaBox size={32} className={iconsStyles} />
                    <p className={legendStyles}>Produtos</p>
                </Link>
                <Link
                    className={`${isCombos ? linkSelectedStyles : linksStyles}`}
                    href="/combos"
                >
                    <FaLayerGroup size={32} className={iconsStyles} />
                    <p className={legendStyles}>Combos</p>
                </Link>
                <Link
                    className={`nav-link-mobile ${isConfig ? linkSelectedStyles : linksStyles}`}
                    href="/configuracoes"
                >
                    <FaCog size={32} className={iconsStyles} />
                    <p className={legendStyles}>Perfil</p>
                </Link>
            </Container>
        </nav>
    )
}
