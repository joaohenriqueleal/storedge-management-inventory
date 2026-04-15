import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom"

import Home from "@/pages/Home/Home"
import LoginPage from "@/pages/LoginPage/LoginPage"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"
import WelcomePage from "@/pages/WelcomePage/WelcomePage"

export interface AppProps {
    setAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
    authenticated: boolean
}

export default function App({ authenticated, setAuthenticated }: AppProps) {
    return (
        <Router>
            <Routes >
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
