import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi, beforeEach } from "vitest"
import userEvent from "@testing-library/user-event"
import Nav from "./Nav"


// mock theme
const toggleThemeMock = vi.fn()

vi.mock("@/lib/theme", () => ({
    useTheme: () => ({
        theme: "light",
        toggleTheme: toggleThemeMock
    })
}))

// mock image (evita erro com import de asset)
vi.mock("../../../assets/logo.png", () => ({
    default: "logo.png"
}))

const navLinks = [
    { label: "Home", href: "#home" },
    { label: "About", href: "#about" }
]

describe("Nav", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("should render navigation", () => {
        render(<Nav navLinks={navLinks} />)

        expect(screen.getByRole("navigation")).toBeInTheDocument()
    })

    test("should render logo", () => {
        render(<Nav navLinks={navLinks} />)

        expect(
            screen.getByAltText(/logo storedge/i)
        ).toBeInTheDocument()
    })

    test("should render nav links (desktop)", () => {
        render(<Nav navLinks={navLinks} />)

        expect(screen.getByText("Home")).toBeInTheDocument()
        expect(screen.getByText("About")).toBeInTheDocument()
    })

    test("should render auth links", () => {
        render(<Nav navLinks={navLinks} />)

        expect(screen.getByText(/login/i)).toBeInTheDocument()
        expect(screen.getByText(/registrar/i)).toBeInTheDocument()
    })

    test("should call toggleTheme when clicking theme button", async () => {
        const user = userEvent.setup()
        render(<Nav navLinks={navLinks} />)

        const buttons = screen.getAllByRole("button")

        // primeiro botão de tema (desktop)
        await user.click(buttons[0])

        expect(toggleThemeMock).toHaveBeenCalled()
    })

    test("should render mobile menu trigger", () => {
        render(<Nav navLinks={navLinks} />)

        // botão do menu (ícone)
        const buttons = screen.getAllByRole("button")
        expect(buttons.length).toBeGreaterThan(0)
    })

    test("should open menu and show mobile links", async () => {
        const user = userEvent.setup()
        render(<Nav navLinks={navLinks} />)

        const buttons = screen.getAllByRole("button")

        // último botão costuma ser o menu mobile
        const menuButton = buttons[buttons.length - 1]

        await user.click(menuButton)

        expect(await screen.findByText("Home")).toBeInTheDocument()
        expect(await screen.findByText("About")).toBeInTheDocument()
    })
})
