import { Container } from "../ui"

export function NavBar(props: React.ComponentProps<typeof Container>) {
    return (
        <nav className="bg-background/70 sticky top-0 z-50 border-b backdrop-blur-xl">
            <Container layout {...props} />
        </nav>
    )
}
