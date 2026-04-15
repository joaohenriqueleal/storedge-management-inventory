import { FaMoon, FaSun, FaUser, FaUserPlus } from "react-icons/fa"
import LogoStoredge from "../../../assets/logo.png"

import { Container } from "@/components/ui/container"
import { Button } from "@/components/ui/button"
import { Link } from "@/components/ui/link"
import { useTheme } from "@/lib/theme"
import Img from "../../ui/Img/Img"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger
} from "@/components/common/dropdown-menu"
import { Menu } from "lucide-react"

export default function Nav({
    navLinks
}: {
    navLinks: { label: string; to: string }[]
}) {
    const { theme, toggleTheme } = useTheme()

    return (
        <nav className="grid grid-cols-2 items-center gap-2 border-b px-4 py-2 md:grid-cols-3 lg:px-[10%]">
            <Link
                to="#inicio"
                className="aspect-square size-14! shrink-0 p-2!"
                variant="ghost"
            >
                <Img alt="Logo StorEdge" src={LogoStoredge} />
            </Link>

            <Container className="hidden items-center justify-center gap-2 md:flex">
                {navLinks.map((link) => (
                    <Link key={link.label} variant="ghost" to={link.to}>
                        {link.label}
                    </Link>
                ))}
            </Container>

            <Container className="hidden items-center justify-end gap-2 md:flex">
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
                            render={<Link variant="ghost" to={link.to} />}
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
        </nav>
    )
}
