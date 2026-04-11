import { render, screen, waitFor } from "@testing-library/react"
import { expect, vi, test, describe, beforeEach } from "vitest"
import userEvent from "@testing-library/user-event"
import LoginPage from "./LoginPage"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"


// mocks
vi.mock("@/api/fn/auth", () => ({
    loginUser: vi.fn()
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

import { loginUser } from "@/api/fn/auth"
import { defineCredentials } from "@/utils/storageCredentials"
import { toast } from "sonner"

const renderComponent = () => {
    const queryClient = new QueryClient()

    return render(
        <QueryClientProvider client={queryClient}>
            <LoginPage setAuthenticated={vi.fn()} />
        </QueryClientProvider>
    )
}

describe("LoginPage", () => {
    beforeEach(() => {
        vi.clearAllMocks()
    })

    test("should render title and description", () => {
        renderComponent()

        expect(
            screen.getByRole("heading", { name: /entrar/i })
        ).toBeInTheDocument()

        expect(
            screen.getByText(/acesse sua conta para continuar/i)
        ).toBeInTheDocument()
    })

    test("should render email and password inputs", () => {
        renderComponent()

        expect(
            screen.getByPlaceholderText(/digite seu email/i)
        ).toBeInTheDocument()

        expect(
            screen.getByPlaceholderText(/••••••••/)
        ).toBeInTheDocument()
    })

    test("should render submit button", () => {
        renderComponent()

        expect(
            screen.getByRole("button", { name: /entrar/i })
        ).toBeInTheDocument()
    })

    test("should allow typing into inputs", async () => {
        const user = userEvent.setup()
        renderComponent()

        const emailInput = screen.getByPlaceholderText(/digite seu email/i)
        const passwordInput = screen.getByPlaceholderText(/••••••••/)

        await user.type(emailInput, "test@email.com")
        await user.type(passwordInput, "123456")

        expect(emailInput).toHaveValue("test@email.com")
        expect(passwordInput).toHaveValue("123456")
    })

    test("should show validation errors when submitting empty form", async () => {
        const user = userEvent.setup()
        renderComponent()

        const button = screen.getByRole("button", { name: /entrar/i })

        await user.click(button)

        expect(await screen.findByText(/email é obrigatório/i)).toBeInTheDocument()
        expect(await screen.findByText(/senha é obrigatória/i)).toBeInTheDocument()
    })

    test("should call loginUser on valid submit", async () => {
        const user = userEvent.setup()

        vi.mocked(loginUser).mockResolvedValue({
            token: "fake-token",
            user: { username: "vortex" }
        })

        renderComponent()

        await user.type(
            screen.getByPlaceholderText(/digite seu email/i),
            "test@email.com"
        )

        await user.type(
            screen.getByPlaceholderText(/••••••••/),
            "123456"
        )

        await user.click(
            screen.getByRole("button", { name: /entrar/i })
        )

        await waitFor(() => {
            expect(loginUser).toHaveBeenCalled()
        })
    })

    test("should handle success flow correctly", async () => {
        const user = userEvent.setup()
        const setAuthenticated = vi.fn()

        vi.mocked(loginUser).mockResolvedValue({
            token: "fake-token",
            user: { username: "vortex" }
        })

        const queryClient = new QueryClient()

        render(
            <QueryClientProvider client={queryClient}>
                <LoginPage setAuthenticated={setAuthenticated} />
            </QueryClientProvider>
        )

        await user.type(
            screen.getByPlaceholderText(/digite seu email/i),
            "test@email.com"
        )

        await user.type(
            screen.getByPlaceholderText(/••••••••/),
            "123456"
        )

        await user.click(
            screen.getByRole("button", { name: /entrar/i })
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

        vi.mocked(loginUser).mockRejectedValue(new Error("error"))

        renderComponent()

        await user.type(
            screen.getByPlaceholderText(/digite seu email/i),
            "test@email.com"
        )

        await user.type(
            screen.getByPlaceholderText(/••••••••/),
            "123456"
        )

        await user.click(
            screen.getByRole("button", { name: /entrar/i })
        )

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalled()
        })
    })
})
