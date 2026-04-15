import { FaChartBar, FaCog, FaTags, FaBox, FaLayerGroup } from 'react-icons/fa'
import { Link, useLocation } from 'react-router-dom'

import Container from '@/components/containers/Container/Container'


export default function NavBar() {
    const linksStyles = `flex flex-col gap-2 items-center hover:text-gray-500 trnasition
        duration-200`
    const linkSelectedStyles = "text-gray-500 flex flex-col gap-2 items-center"
    const legendStyles = "text-xs md:text-sm font-bold"
    const iconsStyles = "h-7 md:h-9"
    const location = useLocation()

    const path = location.pathname

    const isHome = path === '/' || path.endsWith('/todo-app') || path.endsWith('/todo-app/')
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
                className="flex items-center justify-between w-full max-w-230 px-4 md:px-0"
            >
                <Link
                    className={`${isHome ? linkSelectedStyles : linksStyles}`}
                    to="/home"
                >
                    <FaChartBar size={32} className={iconsStyles} />
                    <p className={legendStyles}>Home</p>
                </Link>
                <Link
                    className={`${isCategories ? linkSelectedStyles : linksStyles}`}
                    to="/categorias"
                >
                    <FaTags size={32} className={iconsStyles} />
                    <p className={legendStyles}>Categorias</p>
                </Link>
                <Link
                    className={`${isProducts ? linkSelectedStyles : linksStyles}`}
                    to="/produtos"
                >
                    <FaBox size={32} className={iconsStyles} />
                    <p className={legendStyles}>Produtos</p>
                </Link>
                <Link
                    className={`${isCombos ? linkSelectedStyles : linksStyles}`}
                    to="/combos"
                >
                    <FaLayerGroup size={32} className={iconsStyles} />
                    <p className={legendStyles}>Combos</p>
                </Link>
                <Link
                    className={`nav-link-mobile ${isConfig ? linkSelectedStyles : linksStyles}`}
                    to="/configuracoes"
                >
                    <FaCog size={32} className={iconsStyles} />
                    <p className={legendStyles}>Perfil</p>
                </Link>
            </Container>
        </nav>
    )
}
