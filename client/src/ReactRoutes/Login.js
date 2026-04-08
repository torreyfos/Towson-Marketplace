import logo from "../Towson-Marketplace-Logo.png";

const Login = function () {

return (

    <div className="login">

        <div class="login-container">
            <img src={logo} alt="Towson University Logo" class="logo"/>

            <h1>TU Marketplace</h1>

            <form id="loginForm">
                <input type="text" id="tuId" placeholder="TU ID (7 digits)" required/>
                <input type="email" id="email" placeholder="TU Email (@students.towson.edu)" required/>
                <input type="password" id="password" placeholder="Password" required/>

                <button type="submit">Login</button>
            </form>

            <p id="error" class="error"></p>
            
        </div>
    </div>
)}

export default Login;