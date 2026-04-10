import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import logo from "../Towson-Marketplace-Logo.png";

const Homepage = function () {

    const [listings, setListings] = useState(null);

    //gets all listings when the page renders/loads
    useEffect( function () {
        const getListings = async function () {

            //calls the api to get all the listings from the database
            const response = await fetch("http://localhost:5000/listings/");
            const json = await response.json();

            if (response.ok) {
                setListings(json);
            }
        }

        getListings();
    }, []);

    return (

        <div className="homepage">

            <img src = {logo} id = "homepageLogo" />

            <header>
                <h1>TU Marketplace</h1>
            </header>

            <div className="container">

                <input type="text" id="searchInput" placeholder="Search items..." />
                
                <label for="category">Category:</label>
                <select id="category">
                    <option value="">All</option>
                    <option value="essentials">Essentials</option>
                    <option value="school">School Supplies</option>
                    <option value="furniture">Furniture</option>
                    <option vaulue = "Other">Other</option>
                </select>

                <button onclick="searchItems()">Search</button>

                <h2>Available Items</h2>
                
                <div className="listings">
                    {listings && listings.map( (listings) => (

                        <div className = "eachListing" key = {listings._id}>
                            
                            <Link to = {`/ListingDetails/${listings._id}`}>
                                {/* displays a listing's title and price fields */}
                                <h3> {listings.title} </h3>
                                <p> ${listings.price} </p>
                                <p>{listings.category}</p>
                            </Link>
                        </div>
                        
                    ))}

                </div>
            </div>
        </div>
        
    )
}

export default Homepage;