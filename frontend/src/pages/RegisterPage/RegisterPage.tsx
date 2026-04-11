import type { RegisterPageProps } from "./RegisterPage.types"

import Container from "@/components/containers/Container/Container"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Link } from "@/components/ui/link"
import Title from "@/components/ui/Title/Title"
import PageContainer from "../../components/containers/PageContainer/PageContainer"

import { registerUser } from "@/api/fn/auth"
import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form"

import type { RegisterInputs } from "@/types/RegisterInputs"
import { toast } from "sonner"

export default function RegisterPage({ setAuthenticated }: RegisterPageProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterInputs>()

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: () => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success("Conta criada com sucesso!")
            setAuthenticated(true)
        },
        onError: () => {
            toast.error("Erro ao criar conta")
        }
    })

    const onSubmit: SubmitHandler<RegisterInputs> = (data) => {
        mutation.mutate(data)
    }

    return (
        <PageContainer className="flex min-h-screen items-center justify-center px-4">
            <main className="bg-background w-full max-w-sm space-y-6 rounded-2xl border p-6 shadow-sm">
                <header className="space-y-2 text-center">
                    <Title level={1} className="text-heading-secondary">
                        Criar conta
                    </Title>
                    <p className="text-muted-foreground text-sm">
                        Preencha os dados para começar
                    </p>
                </header>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-4"
                >
                    <Container className="relative space-y-1">
                        <label
                            htmlFor="name"
                            className="flex text-sm font-medium"
                        >
                            Nome
                        </label>
                        <Input
                            id="name"
                            type="text"
                            placeholder="Seu nome"
                            autoComplete="name"
                            aria-invalid={!!errors.username}
                            {...register("username", { required: true })}
                        />
                        {errors.username && (
                            <span className="text-destructive absolute -bottom-4 left-0 text-sm">
                                Nome é obrigatório
                            </span>
                        )}
                    </Container>

                    <Container className="relative space-y-1">
                        <label
                            htmlFor="email"
                            className="flex text-sm font-medium"
                        >
                            E-mail
                        </label>
                        <Input
                            id="email"
                            type="email"
                            placeholder="seu@email.com"
                            autoComplete="email"
                            aria-invalid={!!errors.email}
                            {...register("email", { required: true })}
                        />
                        {errors.email && (
                            <span className="text-destructive absolute -bottom-4 left-0 text-sm">
                                E-mail é obrigatório
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
                            autoComplete="new-password"
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
                        {mutation.isPending
                            ? "Criando conta..."
                            : "Criar conta"}
                    </Button>
                </form>

                <p className="text-muted-foreground text-center text-sm">
                    Já tem conta?
                    <Link href="/login" variant="link" className="px-0.5!">
                        Entrar
                    </Link>
                </p>
            </main>
        </PageContainer>
    )
}
