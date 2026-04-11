import type { LoginPageProps } from "./LoginPage.types"

import Container from "@/components/containers/Container/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@/components/ui/link"
import Title from "@/components/ui/Title/Title"
import PageContainer from "../../components/containers/PageContainer/PageContainer"

import { loginUser } from "@/api/fn/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { defineCredentials } from "@/utils/storageCredentials"
import { useForm, type SubmitHandler } from "react-hook-form"

import type { LoginInputs } from "@/types/LoginInputs"
import { toast } from "sonner"

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
            defineCredentials(data.token, data.user.username)
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
        <PageContainer className="flex min-h-screen items-center justify-center px-4">
            <main className="bg-background w-full max-w-sm space-y-6 rounded-2xl border p-6 shadow-sm">
                <header className="space-y-2 text-center">
                    <Title level={1} className="text-heading-secondary">
                        Entrar
                    </Title>

                    <p className="text-muted-foreground text-sm">
                        Acesse sua conta para continuar
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <Container className="relative space-y-1">
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
                            <span className="text-destructive absolute -bottom-4 left-0 text-sm">
                                Email é obrigatório
                            </span>
                        )}
                    </Container>

                    <Container className="relative space-y-1">
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
                            <span className="text-destructive absolute -bottom-4 left-0 text-sm">
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

                <p className="text-muted-foreground text-center text-sm">
                    Não tem conta?
                    <Link href="/registro" variant="link" className="px-0.5!">
                        Criar conta
                    </Link>
                </p>
            </main>
        </PageContainer>
    )
}
