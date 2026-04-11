import { render, screen, waitFor } from "@testing-library/react"
import { expect, vi, test, describe, beforeEach } from "vitest"
import userEvent from "@testing-library/user-event"
import RegisterPage from "./RegisterPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


// mocks
vi.mock("@/api/fn/auth", () => ({
    registerUser: vi.fn()
}))

vi.mock("@/utils/storageCredentials", () => ({
    defineCredentials: vi.fn()
}))

vi.mock("sonner", () => ({
    toast: {
        success: vi.fn(),
        error: vi.fn()
    }
}))

import { registerUser } from "@/api/fn/auth"
import { defineCredentials } from "@/utils/storageCredentials"
import { toast } from "sonner"

const renderComponent = (setAuthenticated = vi.fn()) => {
    const queryClient = new QueryClient()

    return render(
        <QueryClientProvider client={queryClient}>
            <RegisterPage setAuthenticated={setAuthenticated} />
        </QueryClientProvider>
    )
}

describe("RegisterPage", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("should render title and description", () => {
        renderComponent()

        expect(
            screen.getByRole("heading", { name: /criar conta/i })
        ).toBeInTheDocument()

        expect(
            screen.getByText(/preencha os dados para começar/i)
        ).toBeInTheDocument()
    })

    test("should render all inputs", () => {
        renderComponent()

        expect(
            screen.getByPlaceholderText(/seu nome/i)
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(/seu@email.com/i)
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(/••••••••/)
        ).toBeInTheDocument()
    })

    test("should render submit button", () => {
        renderComponent()

        expect(
            screen.getByRole("button", { name: /criar conta/i })
        ).toBeInTheDocument()
    })

    test("should allow typing into inputs", async () => {
        const user = userEvent.setup()
        renderComponent()

        const nameInput = screen.getByPlaceholderText(/seu nome/i)
        const emailInput = screen.getByPlaceholderText(/seu@email.com/i)
        const passwordInput = screen.getByPlaceholderText(/••••••••/)

        await user.type(nameInput, "vortex")
        await user.type(emailInput, "vortex@email.com")
        await user.type(passwordInput, "123456")

        expect(nameInput).toHaveValue("vortex")
        expect(emailInput).toHaveValue("vortex@email.com")
        expect(passwordInput).toHaveValue("123456")
    })

    test("should show validation errors when submitting empty form", async () => {
        const user = userEvent.setup()
        renderComponent()

        await user.click(
            screen.getByRole("button", { name: /criar conta/i })
        )

        expect(await screen.findByText(/nome é obrigatório/i)).toBeInTheDocument()
        expect(await screen.findByText(/e-mail é obrigatório/i)).toBeInTheDocument()
        expect(await screen.findByText(/senha é obrigatória/i)).toBeInTheDocument()
    })

    test("should call registerUser on valid submit", async () => {
        const user = userEvent.setup()

        vi.mocked(registerUser).mockResolvedValue({
            token: "fake-token",
            user: { username: "vortex" }
        })

        renderComponent()

        await user.type(
            screen.getByPlaceholderText(/seu nome/i),
            "vortex"
        )

        await user.type(
            screen.getByPlaceholderText(/seu@email.com/i),
            "vortex@email.com"
        )

        await user.type(
            screen.getByPlaceholderText(/••••••••/),
            "123456"
        )

        await user.click(
            screen.getByRole("button", { name: /criar conta/i })
        )

        await waitFor(() => {
            expect(registerUser).toHaveBeenCalled()
        })
    })

    test("should handle success flow correctly", async () => {
        const user = userEvent.setup()
        const setAuthenticated = vi.fn()

        vi.mocked(registerUser).mockResolvedValue({
            token: "fake-token",
            user: { username: "vortex" }
        })

        renderComponent(setAuthenticated)

        await user.type(
            screen.getByPlaceholderText(/seu nome/i),
            "vortex"
        )

        await user.type(
            screen.getByPlaceholderText(/seu@email.com/i),
            "vortex@email.com"
        )

        await user.type(
            screen.getByPlaceholderText(/••••••••/),
            "123456"
        )

        await user.click(
            screen.getByRole("button", { name: /criar conta/i })
        )

        await waitFor(() => {
            expect(defineCredentials).toHaveBeenCalledWith(
                "fake-token",
                "vortex"
            )

            expect(setAuthenticated).toHaveBeenCalledWith(true)

            expect(toast.success).toHaveBeenCalled()
        })
    })

    test("should handle error flow correctly", async () => {
        const user = userEvent.setup()

        vi.mocked(registerUser).mockRejectedValue(new Error("error"))

        renderComponent()

        await user.type(
            screen.getByPlaceholderText(/seu nome/i),
            "vortex"
        )

        await user.type(
            screen.getByPlaceholderText(/seu@email.com/i),
            "vortex@email.com"
        )

        await user.type(
            screen.getByPlaceholderText(/••••••••/),
            "123456"
        )

        await user.click(
            screen.getByRole("button", { name: /criar conta/i })
        )

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled()
        })
    })
})
