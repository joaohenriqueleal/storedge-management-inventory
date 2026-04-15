import {
    Navigate,
    Route,
    BrowserRouter as Router,
    Routes
} from "react-router-dom"

// Pages
import Configurations from "@/pages/Configurations/Configurations"
import RegisterPage from "@/pages/RegisterPage/RegisterPage"
import WelcomePage from "@/pages/WelcomePage/WelcomePage"
import Categories from "@/pages/Categories/Categories"
import LoginPage from "@/pages/LoginPage/LoginPage"
import Products from "@/pages/Products/Products"
import Combos from "@/pages/Combos/Combos"
import Home from "@/pages/Home/Home"


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
                    path="/categorias"
                    element={
                        authenticated ? (
                            <Categories />
                        ) : (
                            <LoginPage setAuthenticated={setAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/configuracoes"
                    element={
                        authenticated ? (
                            <Configurations />
                        ) : (
                            <LoginPage setAuthenticated={setAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/combos"
                    element={
                        authenticated ? (
                            <Combos />
                        ) : (
                            <LoginPage setAuthenticated={setAuthenticated} />
                        )
                    }
                />
                <Route
                    path="/produtos"
                    element={
                        authenticated ? (
                            <Products />
                        ) : (
                            <LoginPage setAuthenticated={setAuthenticated} />
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
                            <Home />
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
