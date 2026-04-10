import logo from "../Towson-Marketplace-Logo.png";
import {useState } from "react";

const Login = function () {

    const [name, setName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

return (

    <div className="login">

        <div className="login-container">
            <img src={logo} alt="Towson University Logo" className="logo"/>

            <h1>TU Marketplace</h1>
            <h2>Login</h2>

            <form id="loginForm">

                <input type="text" id="name" 
                    placeholder="Firstname" 
                    required
                    onChange = {function (e) {setName (e.target.value)}}
                    value = {name}
                    />

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

                <button type="submit">Login</button>
            </form>

            <p id="error" class="error"></p>
            
        </div>
    </div>
)}

export default Login;