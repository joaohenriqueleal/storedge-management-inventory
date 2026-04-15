import { render, screen, fireEvent } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"

import Header from "./Header"

// Mock child components to isolate behavior
vi.mock("@/components/windows/TopAppBar/TopAppBar", () => ({
    default: ({ children, title }: any) => (
        <div data-testid="top-app-bar">
            <span>{title}</span>
            {children}
        </div>
    )
}))

vi.mock("@/components/tabs/AboutTAB/AboutTAB", () => ({
    default: () => <div data-testid="about-tab">About Content</div>
}))

vi.mock("@/components/ui/Title/Title", () => ({
    default: ({ children }: any) => <h1>{children}</h1>
}))

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    )
}))

vi.mock("../Container/Container", () => ({
    default: ({ children }: any) => <div>{children}</div>
}))

describe("Header component", () => {
    test("renders header with title", () => {
        render(<Header />)

        expect(screen.getByText("StorEdge")).toBeInTheDocument()
    })

    test("does not show About tab initially", () => {
        render(<Header />)

        expect(screen.queryByTestId("top-app-bar")).not.toBeInTheDocument()
        expect(screen.queryByTestId("about-tab")).not.toBeInTheDocument()
    })

    test("shows About tab when info button is clicked", () => {
        render(<Header />)

        const button = screen.getByRole("button")
        fireEvent.click(button)

        expect(screen.getByTestId("top-app-bar")).toBeInTheDocument()
        expect(screen.getByTestId("about-tab")).toBeInTheDocument()
        expect(screen.getByText("Sobre")).toBeInTheDocument()
    })
})
