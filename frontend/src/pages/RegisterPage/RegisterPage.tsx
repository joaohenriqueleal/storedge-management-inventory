import { useMutation, useQueryClient } from "@tanstack/react-query"
import { useForm, type SubmitHandler } from "react-hook-form"
import { toast } from "sonner"

import { registerUser } from "@/api/fn/auth"
import {
    Button,
    Card,
    Container,
    Input,
    Link,
    Typography
} from "@/components/ui"
import { defineCredentials } from "@/lib/storageCredentials"
import type { RegisterInputs } from "@/types/RegisterInputs"
import type { RegisterPageProps } from "./RegisterPage.types"

export default function RegisterPage({ setAuthenticated }: RegisterPageProps) {
    const queryClient = useQueryClient()

    const {
        register,
        handleSubmit,
        formState: { errors }
    } = useForm<RegisterInputs>()

    const mutation = useMutation({
        mutationFn: registerUser,
        onSuccess: (data) => {
            queryClient.invalidateQueries({ queryKey: ["user"] })
            toast.success("Conta criada com sucesso!")
            defineCredentials(data.token, data.user.username)
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
        <Container layout className="min-h-screen items-center justify-center">
            <Card as="main" gap="lg" className="w-full max-w-lg" padding="lg">
                <Container as="header" gap="sm" className="text-center">
                    <Typography as="h1" variant="h2">
                        Criar conta
                    </Typography>
                    <Typography color="muted">
                        Preencha os dados para começar
                    </Typography>
                </Container>

                <form
                    onSubmit={handleSubmit(onSubmit)}
                    className="flex flex-col gap-6"
                >
                    <Container gap="xs" className="relative">
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
                            <span className="text-destructive absolute -bottom-5 left-0 text-sm">
                                Nome é obrigatório
                            </span>
                        )}
                    </Container>

                    <Container gap="xs" className="relative">
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
                            <span className="text-destructive absolute -bottom-5 left-0 text-sm">
                                E-mail é obrigatório
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
                            autoComplete="new-password"
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
                        {mutation.isPending
                            ? "Criando conta..."
                            : "Criar conta"}
                    </Button>
                </form>

                <Typography color="muted" size="sm" align="center">
                    Já tem conta?
                    <Link
                        to="/login"
                        variant="link"
                        className="px-0.5!"
                        replace
                    >
                        Entrar
                    </Link>
                </Typography>
            </Card>
        </Container>
    )
}
