import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import textbook from "../textbook.jpeg";
import chair from "../beanbag-chair.webp";

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

    <div className = "container">

        <div className = "search-container">
            <input type="text" id="searchInput" placeholder="Search items..." />
        
            <label for="category">Category:</label>
            <select id="category">
                <option value="">All</option>
                <option value="essentials">Essentials</option>
                <option value="school">School Supplies</option>
                <option value="furniture">Furniture</option>
                <option value = "Other">Other</option>
            </select>

            <button onclick="searchItems()">Search</button>
        </div>

        <h2>Available Items</h2>
        
        <div className = "listings">
            {listings && listings.map( (listings) => (

                <div className = "eachListing" key = {listings._id}>
                    
                    <li className = "item-listing">

                        
                        <div className = "item-image">
                            
                            {/* <img src={textbook} alt="Item" /> */}
                            <img src={chair} alt="Item" />

                        </div>
                        
                        <div className = "item-info">

                            <Link to = {`/ListingDetails/${listings._id}`}>

                                <p className = "item-price">${listings.price}</p>
                                <p className = "item-title">{listings.title}</p>
                                <p className = "item-description">{listings.description}</p>
                                <p className = "item-category">{listings.category} · On Campus</p>
                            </Link>

                        </div>
                    </li>

                </div>
                
            ))}

        </div>
    </div>
        
    )
}

export default Homepage;