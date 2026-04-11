import favicon from "../Towson_Marketplace_Favicon.png";
import {Link} from "react-router-dom";


const HeaderBar = function () {
    
return (

    <header className="headerbar">

        <img src={favicon} alt="TU Logo" class="logo-small" />
        <h1>TU Marketplace</h1>

        <nav>
            {/* links added to the header bar for nagivation */}
            <Link to = "/"> Marketplace </Link>
            <Link to = "/auth/login"> Login </Link>
            <Link to = "/auth/register" > Register </Link>
            <Link to = "/profile"> Profile </Link>
            <Link to = "/aboutUs" > About Us </Link>
        </nav>
        
    </header>

)}

export default HeaderBar;