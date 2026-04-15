import { render, screen, fireEvent } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import TopAppBar from "./TopAppBar"

vi.mock("@/components/ui/Title/Title", () => ({
    __esModule: true,
    default: ({ children }: any) => <h1>{children}</h1>
}))

vi.mock("@/components/ui/button", () => ({
    Button: ({ children, ...props }: any) => (
        <button {...props}>{children}</button>
    )
}))

describe("TopAppBar", () => {
    test("renders title correctly", () => {
        render(
            <TopAppBar setShow={() => {}} title="My Title">
                <div>Content</div>
            </TopAppBar>
        )

        expect(screen.getByText("My Title")).toBeInTheDocument()
    })

    test("renders children content", () => {
        render(
            <TopAppBar setShow={() => {}} title="Test">
                <div>Child Content</div>
            </TopAppBar>
        )

        expect(screen.getByText("Child Content")).toBeInTheDocument()
    })

    test("calls setShow(false) after animation ends when close button is clicked", () => {
        const setShow = vi.fn()

        const { container } = render(
            <TopAppBar setShow={setShow} title="Test">
                <div>Content</div>
            </TopAppBar>
        )

        const button = container.querySelector("button") as HTMLButtonElement
        fireEvent.click(button)

        const wrapper = container.firstChild as HTMLElement

        expect(wrapper.classList.contains("animate-tab-close")).toBe(true)

        fireEvent.animationEnd(wrapper)

        expect(setShow).toHaveBeenCalledWith(false)
    })

    test("does nothing if ref is null when close is triggered", () => {
        const setShow = vi.fn()

        const { container } = render(
            <TopAppBar setShow={setShow} title="Test">
                <div>Content</div>
            </TopAppBar>
        )

        const button = container.querySelector("button") as HTMLButtonElement

        fireEvent.click(button)

        expect(setShow).not.toHaveBeenCalled()
    })
})
