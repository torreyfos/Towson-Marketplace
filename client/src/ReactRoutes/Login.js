import logo from "../Towson-Marketplace-Logo.png";
import {useState } from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../CustomHooks/useAuthContext";


const Login = function () {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const {dispatch} = useAuthContext();

    const handleLogin = async (e) => {
        e.preventDefault();

        if (!email.trim() || !email.endsWith("@students.towson.edu")) { setError("Please use your Towson email"); return; }
        if (!password.trim()) { setError("Please enter a password"); return; }
        if (password.length < 8) { setError("Password must be at least 8 characters"); return; }

        try {
            const res = await fetch("http://localhost:5000/auth/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({email, password })
            });
            const result = await res.json();
            console.log("Result:", result);

            //if the account was successfully created
            if (res.ok) {

                //saving user to local storage
                localStorage.setItem("user", JSON.stringify(result));

                dispatch({type: "LOGIN", payload: result});

                //display success alert to user
                alert("Login Successful!");

            } else {
                alert("Couldn't login: " + result.message);
            }

        } catch (err) {
            console.error("Login error", err);
        }
    };

return (

        <div className = "login-container">
            
            <img src={logo} alt="Towson University Logo" id="logo"/>

            <h1>TU Marketplace</h1>
            <h2>Login</h2>

            <form id="loginForm" onSubmit={handleLogin}>

                <input type="email" 
                    id="email" 
                    placeholder="TU Email (@students.towson.edu)" 
                    required
                    onChange = {function (e) {setEmail (e.target.value)}}
                    value = {email}
                    />

                <input type="password" 
                    id="password" 
                    placeholder="Password" 
                    required
                    onChange = {function (e) {setPassword (e.target.value)}}
                    value = {password}
                    />

                <p id="error" className = "error">{error}</p>
                <button type="submit">Login</button>

                <br />
            <Link to = "/auth/register" id = "redirect"><h4>Don't Have An Account? Register</h4></Link>
            </form>

            
            
        </div>
)}

export default Login;