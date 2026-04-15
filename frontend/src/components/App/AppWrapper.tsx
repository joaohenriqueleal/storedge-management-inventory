import { useEffect, useState } from "react"

import { Toaster } from "@/components/ui/toast"
import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import App from "./App"

import { loadToken } from "@/lib/storageCredentials"
import "@/lib/theme"

export default function AppWrapper() {
    useEffect(() => {
        if (loadToken()) {
            setAuthenticated(true)
        }
    }, [])

    const [authenticated, setAuthenticated] = useState<boolean>(false)
    const queryClient = new QueryClient()

    return (
        <QueryClientProvider client={queryClient}>
            <App
                setAuthenticated={setAuthenticated}
                authenticated={authenticated}
            />
            <Toaster />
        </QueryClientProvider>
    )
}
