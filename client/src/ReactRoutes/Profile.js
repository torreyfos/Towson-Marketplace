import {Link} from "react-router-dom";


const Profile = function () {
    
    return (  
        <div className="profile">
            <h1>Profile</h1>

            <Link to = "/create" >
                <button id = "createListing">Create Listing</button>
            </Link>
            
            <div className="userListings">

                <h3>Your Listings:</h3>
                
            </div>  

        </div>

)}
 
export default Profile;