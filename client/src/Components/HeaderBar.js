import favicon from "../Towson_Marketplace_Favicon.png";
import {Link} from "react-router-dom";
import { useLogout } from "../CustomHooks/useLogout";
import { useAuthContext } from "../CustomHooks/useAuthContext";

const HeaderBar = function () {

    const {user} = useAuthContext();
    const {logout} = useLogout();

    const handleLogout = function () {

        logout();
        alert("We're sad to see you go :(");
    }

return (

    <header className = "headerbar">

        <img src={favicon} alt="TU Logo" className = "logo-small" />
        <h1>TU Marketplace</h1>

        <nav>
            {/* links added to the header bar for nagivation */}
            <Link to = "/"> Marketplace </Link>
            <Link to = "/aboutUs" > About Us </Link>

            {/* only displays the profile and logout button once a user IS logged in */}
            {user && (
                <div>
                    <Link to = "/profile"> Profile </Link>
                    <Link onClick = {handleLogout}>Logout</Link>
                </div>
            )}

            {/* only displays the register and login button when the user is NOT logged in */}
            {(!user) && (
                <div>
                    <Link to = "/auth/login"> Login </Link>
                    <Link to = "/auth/register" > Register </Link>
                </div>
            )}
            
        </nav>
        
    </header>

)}

export default HeaderBar;