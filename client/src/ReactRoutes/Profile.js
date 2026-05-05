import {useState, useEffect } from "react";
import {Link} from "react-router-dom";



const Profile = function () {
    const [listings, setListings] = useState(null);
    const [error, setError] = useState(null); 
    
    const token = localStorage.getItem('token');

    useEffect(function () {
        const getUserListings = async function(){
            const response = await fetch (`http://localhost:5000/listings/user`,{
                headers: {"Authorization": `Bearer ${token}`}
            });
            const json = await response.json();
            if(response.ok) {
                setListings(json);
            }
        };
        getUserListings();
    },[token]);

    //DELETING LISTINGS======================
    const handleDelete = async function(id){
        const response = await fetch(`http://localhost:5000/listings/${id}`, {
            method: "DELETE",
            headers: {"Authorization": `Bearer ${token}`}
        });
        if(response.ok){
            setListings(listings.filter(listing => listing._id !== id));
        }
    };
    //END DELETING LISTINGS==================

    //LISTING STATUS [AVAILABLE OR SOLD]=====
    const handleStatusChange = async function(id, currentStatus){
        const newStatus = currentStatus === "Available" ? "Sold" : "Available";
        const response = await fetch(`http://localhost:5000/listings/${id}`,{
            method: "PATCH",
            headers: {
                "Authorization": `Bearer ${token}`,
                "Content-Type": "application/json"
            },
            body: JSON.stringify({status: newStatus})   
        });
        if(response.ok){
            setListings(listings.map(listing => 
                listings._id === id ? {...listing, status: newStatus} : listing
            ));
        }
    };
    //LISTING STATUSE END ===================

    return (  
        <div className="profile">
            <h1>Profile</h1>

            <Link to = "/create" >
                <button id = "createListing">Create Listing</button>
            </Link>
            
            <div className="userListings">
                <h3>Your Listings:</h3>
                
                {listings && listings.map(listing => (
                    <div key= {listing._id} className="profileListing">
                        <img src= {listing.images && listing.images[0] ? listing.images[0] : "placeholder.png"} alt={listing.title} />
                        <p><strong>{listing.title}</strong></p>
                        <p>${listing.price}</p>
                        <p>{listing.category}</p>
                        <p>Status: {listing.status}</p>

                        <button onClick={() => handleStatusChange(listing._id, listing.status)}>
                            Mark as {listing.status === "Available" ? "Sold" : "Available"}
                        </button>

                        <Link to={`/edit/${listing._id}`}>
                            <button>Edit</button>
                        </Link>

                    <button onClick={() => handleDelete(listing._id)}>Delete</button>

                    {error && <p style = {{color: "red"}}> {error}</p>}

                    </div>
                ))}
 
            </div>  
        </div>
    );
}
 
export default Profile;