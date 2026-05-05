import logo from "../Towson-Marketplace-Logo.png";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = function () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleLogin = async function (e) {
        e.preventDefault();

        if (!email.endsWith("@students.towson.edu")) {
            setError("Please use your Towson email");
            return;
        }
        if (!password.trim()) {
            setError("Password is required");
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password })
            });

            const result = await response.json();

            if (!response.ok) {
                setError(result.message);
                return;
            }

            localStorage.setItem("token", result.token);
            localStorage.setItem("user", result.email);
            navigate("/");

        } catch (err) {
            setError("Something went wrong. Try again.");
        }
    };

    return (
        <div className="login-container">
            <img src={logo} alt="Towson University Logo" id="logo"/>
            <h1>TU Marketplace</h1>
            <h2>Login</h2>

            <form id="loginForm" onSubmit={handleLogin}>
                <input type="email"
                    id="email"
                    placeholder="TU Email (@students.towson.edu)"
                    required
                    onChange={(e) => setEmail(e.target.value)}
                    value={email}
                />
                <input type="password"
                    id="password"
                    placeholder="Password"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                    value={password}
                />
                <button type="submit">Login</button>
            </form>
            {error && <p style={{color: "red"}}>{error}</p>}
        </div>
    );
}

export default Login;