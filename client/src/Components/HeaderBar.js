import favicon from "../Towson_Marketplace_Favicon.png";
import {Link} from "react-router-dom";

const HeaderBar = function () {
    
return (

    <header className="headerbar">
        <div>

            <img src = {favicon} id = "favicon"/>

            <Link to = "/">TU Marketplace</Link>

            <Link to = "/auth/login"> <p>Login</p> </Link>
            <Link to = "/auth/register" > <p>Register</p> </Link>
            <Link to = "/profile"> <p>Profile</p> </Link>

        </div>  
    </header>


)}

export default HeaderBar;