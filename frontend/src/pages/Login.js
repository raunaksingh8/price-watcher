import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import '../styles/Login.css';
import { toast } from "react-toastify";
import Loader from "../components/Loader";

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:8000';

export default function Login({ onLogin }) {
    const navigate = useNavigate();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');
        setLoading(true);

        try {
            const res = await fetch(`${API_URL}/api/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ email, password }),
            });

            const data = await res.json();

            if (!res.ok) {
                toast(data.message || "Login failed. Please Try Again");
                setLoading(false);
                return;
            }

            toast(data.message || "Login Successfull !");

            onLogin({
                token: data.token,
                user: data.user,
            });

            // Redirect to dashboard 
            navigate("/dashboard", { replace: true });
        } catch (err) {
            console.error("Login error:", err);
            toast("Oops ! Unable to connect to server");
            setLoading(false);
        }
    };

    return (
        <div className="auth-page">

            {loading && <Loader />}
            {/* Floating colour blobs */}
            <div className="blob blob--cyan" aria-hidden="true" />
            <div className="blob blob--pink" aria-hidden="true" />
            <div className="blob blob--purple" aria-hidden="true" />

            {/* Logo */}
            <Link to="/" className="auth-logo">
                Price<span className="logo-highlight">Dekho</span>App
            </Link>

            {/* Glass card */}
            <div className="auth-card">
                <h1>Welcome back</h1>
                <p className="auth-subtext">
                    Log in to compare prices and track your savings
                </p>

                <form className="auth-form" onSubmit={handleSubmit}>
                    <div className="auth-field">
                        <label htmlFor="login-email">Email</label>
                        <input
                            id="login-email"
                            type="email"
                            placeholder="you@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            required
                            autoComplete="email"
                        />
                    </div>

                    <div className="auth-field">
                        <label htmlFor="login-password">Password</label>
                        <input
                            id="login-password"
                            type="password"
                            placeholder="Enter your password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            required
                            autoComplete="current-password"
                        />
                    </div>

                    {error && <div className="auth-error">{error}</div>}

                    <button
                        type="submit"
                        className="auth-submit"
                        disabled={loading}
                    >
                        {loading ? 'Logging in…' : 'Login'}
                    </button>
                </form>

                <p className="auth-switch">
                    Don't have an account?{' '}
                    <Link to="/signup">Sign up</Link>
                </p>
            </div>
        </div>
    );
}
