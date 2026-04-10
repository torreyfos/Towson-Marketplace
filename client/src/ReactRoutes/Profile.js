import {Link} from "react-router-dom";


const Profile = function () {
    
    return (  
        <div className="profile">
            <h1>Profile</h1>

            <Link to = "/create" >
                <button id = "createListing">Create Listing</button>
            </Link>
            

        </div>

)}
 
export default Profile;