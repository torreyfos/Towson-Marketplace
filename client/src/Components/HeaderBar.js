import favicon from "../Towson_Marketplace_Favicon.png";
import {Link, useNavigate} from "react-router-dom";


const HeaderBar = function () {
    const token = localStorage.getItem('token');
    const navigate = useNavigate();

    const handleSignout = function(){
        localStorage.removeItem('token');
        localStorage.removeItem('user');
        navigate('/auth/login');
    };
    
return (

    <header className="headerbar">
        <img src={favicon} alt="TU Logo" className="logo-small" />
        <h1>TU Marketplace</h1>

        <nav>
            {/* links added to the header bar for nagivation */}
            {token && <Link to = "/"> Marketplace </Link>}
            {!token && <Link to = "/auth/login"> Login </Link>}
            {!token && <Link to = "/auth/register" > Register </Link>}
            {token && <Link to = "/profile"> Profile </Link>}
            {token && <button onClick={handleSignout}> Sign Out</button>}
            {token && <Link to = "/aboutUs" > About Us </Link>}   
        </nav>
        
    </header>

)}

export default HeaderBar;