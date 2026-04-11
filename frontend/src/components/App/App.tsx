import { Route, BrowserRouter as Router, Routes, Navigate } from "react-router-dom"

import type { AppProps } from "./App.types"

// Pages
import RegisterPage from "../../pages/RegisterPage/RegisterPage"
import WelcomePage from "../../pages/WelcomePage/WelcomePage"
import LoginPage from "../../pages/LoginPage/LoginPage"
import Home from "@/pages/Home/Home"

export default function App({ authenticated, setAuthenticated }: AppProps) {
    return (
        <Router>
            <Routes>
                <Route
                    path="/"
                    element={
                        authenticated ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <WelcomePage />
                        )
                    }
                />
                <Route
                    path="/login"
                    element={
                        authenticated ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <LoginPage setAuthenticated={setAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/home"
                    element={
                        authenticated ? (
                            <Home setAuthenticated={setAuthenticated} />
                        ) : (
                            <Navigate to="/login" replace />
                        )
                    }
                />

                <Route
                    path="/registro"
                    element={
                        authenticated ? (
                            <Navigate to="/home" replace />
                        ) : (
                            <RegisterPage setAuthenticated={setAuthenticated} />
                        )
                    }
                />
            </Routes>
        </Router>
    )
}
