import { StrictMode } from "react"
import { createRoot } from "react-dom/client"

import AppWrapper from "./components/App/AppWrapper"
import "./styles/style.css"

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <AppWrapper />
    </StrictMode>
)
