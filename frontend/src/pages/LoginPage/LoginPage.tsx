import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

import { loginUser } from "@/api/fn/auth"
import {
    Button,
    Card,
    Container,
    Input,
    Link,
    Typography
} from "@/components/ui"
import { defineCredentials } from "@/lib/storageCredentials"
import type { LoginInputs } from "@/types/LoginInputs"
import type { LoginPageProps } from "./LoginPage.types"

export default function LoginPage({ setAuthenticated }: LoginPageProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<LoginInputs>()

    const mutation = useMutation({
        mutationFn: loginUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success("Login realizado com sucesso!")
            defineCredentials(data.token, data.user.username, data.user.email)
            setAuthenticated(true)
            console.log(data)
        },
        onError: () => {
            toast.error("Erro ao fazer login")
        }
    })

    const onSubmit: SubmitHandler<LoginInputs> = (data) => {
        mutation.mutate(data)
    }

    return (
        <Container layout className="min-h-screen items-center justify-center">
            <Card as="main" gap="lg" className="w-full max-w-lg" padding="lg">
                <Container as="header" gap="sm" className="text-center">
                    <Typography as="h1" variant="h2">
                        Entrar
                    </Typography>
                    <Typography color="muted">
                        Acesse sua conta para continuar
                    </Typography>
                </Container>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <Container gap="xs" className="relative">
                        <label
                            htmlFor="email"
                            className="flex text-sm font-medium"
                        >
                            Email
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="Digite seu email"
                            autoComplete="username"
                            aria-invalid={!!errors.email}
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-destructive absolute -bottom-5 left-0 text-sm">
                                Email é obrigatório
                            </span>
                        )}
                    </Container>

                    <Container gap="xs" className="relative">
                        <label
                            htmlFor="password"
                            className="flex text-sm font-medium"
                        >
                            Senha
                        </label>
                        <Input
                            id="password"
                            type="password"
                            placeholder="••••••••"
                            autoComplete="current-password"
                            aria-invalid={!!errors.password}
                            {...register("password", { required: true })}
                        />
                        {errors.password && (
                            <span className="text-destructive absolute -bottom-5 left-0 text-sm">
                                Senha é obrigatória
                            </span>
                        )}
                    </Container>

                    <Button
                        type="submit"
                        className="mt-2 w-full"
                        disabled={mutation.isPending}
                    >
                        {mutation.isPending ? "Entrando..." : "Entrar"}
                    </Button>
                </form>

                <Typography color="muted" size="sm" align="center">
                    Não tem conta?
                    <Link
                        to="/registro"
                        variant="link"
                        className="px-0.5!"
                        replace
                    >
                        Criar conta
                    </Link>
                </Typography>
            </Card>
        </Container>
    )
}
