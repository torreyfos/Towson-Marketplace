import {useEffect, useState} from "react";
import {Link} from "react-router-dom";
import chair from "../beanbag-chair.webp";

const Homepage = function () {

    const [listings, setListings] = useState(null);
    const [loading, setLoading] = useState(true);
    const [searchTitle, setSearchTitle] = useState("");
    const [searchCategory, setSearchCategory] = useState("All");
    const [error, setError] = useState("");

    useEffect(function () {
        const getListings = async function () {
            try {
                const response = await fetch("http://localhost:5000/listings/", { method: "GET" });
                const result = await response.json();
                if (response.ok) { setListings(result); }
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        }
        getListings();
    }, []);

    const handleSearch = async function () {
        try {
            setLoading(true);
            const response = await fetch(`http://localhost:5000/listings/search?searchTitle=${searchTitle}&searchCategory=${searchCategory}`, { method: "GET" });
            const result = await response.json();
            if (!response.ok) { throw new Error("Search failed"); }
            setListings(result);
        } catch (error) {
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    if (loading) return <h2 className="loading-text">Loading Available Listings...</h2>;
    if (error) return <p className="error">Error: {error}</p>;

    return (
        <div className="container">

            <div className="search-container">
                <input
                    type="text"
                    id="searchInput"
                    placeholder="Search items..."
                    onChange={(e) => setSearchTitle(e.target.value)}
                    value={searchTitle}
                    name="searchTitle"
                />
                <label htmlFor="category">Category:</label>
                <select
                    id="category"
                    onChange={(e) => setSearchCategory(e.target.value)}
                    value={searchCategory}
                    name="searchCategory"
                >
                    <option value="All">All</option>
                    <option value="Essentials">Essentials</option>
                    <option value="School Supplies">School Supplies</option>
                    <option value="Furniture">Furniture</option>
                    <option value="Other">Other</option>
                </select>
                <button onClick={handleSearch}>Search</button>
            </div>

            <div className="listings-header">
                <h2>Available Items</h2>
                {listings && <span className="listing-count">SHOWING {listings.length} LISTINGS</span>}
            </div>

            <div className="home-listings-grid">
                {listings && listings.map((listing) => (
                    <div className="home-listing-card" key={listing._id}>

                        <div className="home-card-image">
                            <img
                                src={listing.images && listing.images[0] ? listing.images[0] : chair}
                                alt={listing.title}
                            />
                            <span className={`status-badge ${listing.status === "Available" ? "badge-available" : "badge-sold"}`}>
                                {listing.status}
                            </span>
                            <span className="category-badge">{listing.category}</span>
                        </div>

                        <div className="home-card-body">
                            <p className="home-card-price">${listing.price}</p>
                            <h3 className="home-card-title">{listing.title}</h3>
                            <p className="home-card-description">{listing.description}</p>
                            <p className="home-card-seller">Listed by: {listing.seller?.name || "Unknown"}</p>
                        </div>

                        <div className="home-card-actions">
                            <Link to={`/ListingDetails/${listing._id}`}>
                                <button className="btn-details">View Details</button>
                            </Link>
                            {listing.status === "Available" && (
                                <Link to={`/ListingDetails/${listing._id}`}>
                                    <button className="btn-contact">Contact Seller</button>
                                </Link>
                            )}
                        </div>

                    </div>
                ))}
            </div>
        </div>
    );
}

export default Homepage;