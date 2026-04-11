import { useState, useEffect } from "react"

import { QueryClient, QueryClientProvider } from "@tanstack/react-query"
import { Toaster } from "@/components/ui/toast"
import App from "../../App/App"

import { loadToken } from "@/utils/storageCredentials"
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
