import { render, screen } from "@testing-library/react"
import { describe, test, expect, vi } from "vitest"
import React from "react"
import AboutTAB from "./AboutTAB"

vi.mock("framer-motion", () => ({
    motion: {
        div: (props: any) => <div {...props} />
    }
}))

vi.mock("@/components/containers/Container/Container", () => ({
    default: ({ children }: any) => <div data-testid="container">{children}</div>
}))

vi.mock("@/components/ui/Title/Title", () => ({
    default: ({ children, level }: any) => {
        return React.createElement(`h${level}`, null, children)
    }
}))

describe("AboutTAB", () => {
    test("renders main title", () => {
        render(<AboutTAB />)

        expect(
            screen.getByRole("heading", { name: /o que é storedge\?/i })
        ).toBeInTheDocument()
    })

    test("renders descriptive paragraphs", () => {
        render(<AboutTAB />)

        expect(
            screen.getByText(/plataforma moderna de gerenciamento de estoque/i)
        ).toBeInTheDocument()

        expect(
            screen.getByText(/interface intuitiva e arquitetura escalável/i)
        ).toBeInTheDocument()
    })

    test("renders the three features", () => {
        render(<AboutTAB />)

        expect(screen.getByText("Rápido")).toBeInTheDocument()
        expect(screen.getByText("Seguro")).toBeInTheDocument()
        expect(screen.getByText("Escalável")).toBeInTheDocument()
    })

    test("renders feature descriptions", () => {
        render(<AboutTAB />)

        expect(
            screen.getByText(/baixa latência/i)
        ).toBeInTheDocument()

        expect(
            screen.getByText(/criptografia moderna/i)
        ).toBeInTheDocument()

        expect(
            screen.getByText(/cresce conforme sua necessidade/i)
        ).toBeInTheDocument()
    })

    test("uses Container as wrapper", () => {
        render(<AboutTAB />)

        expect(screen.getByTestId("container")).toBeInTheDocument()
    })

    test("renders exactly 3 feature headings", () => {
        render(<AboutTAB />)

        const headings = screen.getAllByRole("heading", { level: 3 })
        expect(headings).toHaveLength(3)
    })
})
