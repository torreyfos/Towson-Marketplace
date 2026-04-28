import { useState } from "react";
import {Link} from "react-router-dom";
import { useAuthContext } from "../CustomHooks/useAuthContext";

const Register = function () {
    
    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [psw, setPsw] = useState("");
    const [confirmPsw, setConfirmPsw] = useState("");
    const [error, setError] = useState("");
    const {dispatch} = useAuthContext();

    const handleSignup = async (e) => {
        e.preventDefault();

        if (!name.trim()) { setError("Please enter your name"); return; }
        if (!email.trim() || !email.endsWith("@students.towson.edu")) { setError("Please use your Towson email"); return; }
        if (!psw.trim()) { setError("Please enter a password"); return; }
        if (psw.length < 8) { setError("Password must be at least 8 characters"); return; }
        if (psw !== confirmPsw) { setError("Passwords do not match"); return; }

        try {
            const res = await fetch("http://localhost:5000/auth/register", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ name, email, password: psw })
            });

            const result = await res.json();
            console.log("Result:", result);

            //if the account was successfully created
            if (res.ok) {

                //saving user to local storage
                localStorage.setItem("user", JSON.stringify(result));

                dispatch({type: "LOGIN", payload: result});

                //display success alert to user
                alert("Account created! Please login.");

            } else {
                alert("Couldn't create account: " + result.message);
            }

        } catch (err) {
            console.error("Signup error", err);
        }
    };

    return (
        <div className = "signup-container">
            <h1>TU Marketplace Sign-up</h1>
            <form onSubmit={handleSignup}>
                <label>Full Name:</label><br />
                <input type="text" value={name} onChange={(e) => setName(e.target.value)} required /><br />

                <label>TU Email:</label><br />
                <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} placeholder="name@students.towson.edu" required /><br />

                <label>Password:</label><br />
                <input type="password" value={psw} onChange={(e) => setPsw(e.target.value)} required /><br />

                <label>Confirm Password:</label><br />
                <input type="password" value={confirmPsw} onChange={(e) => setConfirmPsw(e.target.value)} required /><br />

                <p style={{ color: "red" }}>{error}</p>
                <button type="submit">Sign Up</button>
            </form>

            <Link to = "/auth/login" id = "redirect"><h4>Already Have An Account? Login</h4></Link>
        </div>
    );
}

export default Register;