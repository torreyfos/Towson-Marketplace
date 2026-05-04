import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import textbook from "../textbook.jpeg";
import chair from "../beanbag-chair.webp";

const Homepage = function () {

    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("All");
    const [error, setError] = useState("");

    //-------------------------------- gets all listings when the page renders/loads ---------------------------------
    useEffect( function () {
        const getListings = async function () {

            try {

                //calls the api to get all the listings from the database
                const response = await fetch("http://localhost:5000/listings/", {
                    method: "GET"
                });
                const result = await response.json();

                if (response.ok) {
                    setListings(result);
                }

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        }

        getListings();
    }, []);
    //----------------------------------------------------------------------------------------------------

    //-----------------------------------handles the search functionality---------------------------------
    const handleSearch = async function () {

        try {
            setLoading(true);
            //add query parameters to the url
            const response = await fetch(`http://localhost:5000/listings/search?searchTitle=${searchTitle}&searchCategory=${searchCategory}`, {
                method: "GET"
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error("Search failed");
            }

            setListings(result);

        } catch (error) {
            console.log(error.message);

        } finally {
            setLoading(false);
        }
        
    }
    
    //-----------------------------------------------------------------------------------------------------

    if (loading) {
            return <h2 className = "loading-text">Loading Available Listings...</h2>;
        }

    if (error) {
        return <p className = "error">Error: {error} </p>;
    }

    return (

    <div className = "container">

        <div className = "search-container">
            <input type="text" 
                id="searchInput" 
                placeholder="Search items..." 
                onChange = {function (e) {setSearchTitle(e.target.value)}}
                value = {searchTitle}
                name = "searchTitle"
                />
        
            <label for="category">Category:</label>
            <select 
                id="category"
                onChange = {function (e) {setSearchCategory(e.target.value)}}
                value = {searchCategory}
                name = "searchCategory"
                >
                    <option value="All">All</option>
                    <option value="Essentials">Essentials</option>
                    <option value="School Supplies">School Supplies</option>
                    <option value="Furniture">Furniture</option>
                    <option value = "Other">Other</option>
            </select>

            <button onClick={handleSearch}>Search</button>
        </div>

        <h2>Available Items</h2>
        
        <div className = "listings">
            {listings && listings.map( (listings) => (

                <div className = "eachListing" key = {listings._id}>
                    
                    <li className = "item-listing">

                        
                        <div className = "item-image"> 
                             <img src={chair} alt="Placeholder" />
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