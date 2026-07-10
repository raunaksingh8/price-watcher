import { useState, useEffect } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import { ToastContainer, Zoom } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

import LandingPage from "./pages/Landingpage";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import Dashboard from "./pages/Dashboard";

import ProtectedRoute from "./components/ProtectedRoute";
import PublicRoute from "./components/PublicRoute";
import Loader from "./components/Loader";

function App() {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);

    // Called after a successful login/signup API response.
    // Expects { token, user } shape, matching your backend's response.
    const login = ({ token, user }) => {
        localStorage.setItem("token", token);
        localStorage.setItem("user", JSON.stringify(user));
        setUser(user);
    };

    const logout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        setUser(null);
    };

    // Runs once on app start. Checks localStorage, restores the user
    // if a token exists, and sets loading to false once done. This is
    // what prevents the "flash of dashboard" bug: nothing route-related
    // renders until this finishes.
    useEffect(() => {
        const token = localStorage.getItem("token");
        const savedUser = localStorage.getItem("user");

        if (token && savedUser) {
            try {
                setUser(JSON.parse(savedUser));
            } catch {
                localStorage.removeItem("token");
                localStorage.removeItem("user");
            }
        }

        setLoading(false);
    }, []);

    // While we haven't finished checking localStorage yet, show the
    // loader instead of any route.
    if (loading) {
        return <Loader />;
    }

    return (
        <BrowserRouter>
            <Routes>
                <Route
                    path="/"
                    element={
                        <PublicRoute isAuthenticated={Boolean(user)}>
                            <LandingPage />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/login"
                    element={
                        <PublicRoute isAuthenticated={Boolean(user)}>
                            <Login onLogin={login} />
                        </PublicRoute>
                    }
                />

                <Route
                    path="/signup"
                    element={
                        <PublicRoute isAuthenticated={Boolean(user)}>
                            <Signup onLogin={login} />
                        </PublicRoute>
                    }
                />

                <Route
                    element={<ProtectedRoute isAuthenticated={Boolean(user)} />}
                >
                    <Route
                        path="/dashboard"
                        element={<Dashboard user={user} onLogout={logout} />}
                    />
                </Route>
            </Routes>

            <ToastContainer
                position="top-center"
                autoClose={3000}
                limit={2}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick={false}
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
                theme="light"
                transition={Zoom}
            />
        </BrowserRouter>
    );
}

export default App;