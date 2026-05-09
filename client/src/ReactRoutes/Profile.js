import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { useAuthContext } from "../CustomHooks/useAuthContext";
import { useNavigate } from "react-router-dom";

const Profile = function () {
    const [listings, setListings] = useState([]);
    const [loading, setLoading] = useState(true);
    const { user } = useAuthContext();
    const navigate = useNavigate();

    useEffect(function () {
        const getUserListings = async function () {
            try {
                const response = await fetch("http://localhost:5000/listings/my", {
                    headers: { Authorization: `Bearer ${user.token}` }
                });

                const data = await response.json();
                if (response.ok) {
                    setListings(data);
                } else {
                    console.error("Couldn't get listings");
                }
            } catch (error) {
                console.error("Couldn't get listings", error);
            } finally {
                setLoading(false);
            }
        };

        if (user) {
            getUserListings();
        }
    }, [user]);

    const handleDelete = async function (id) {
        if (!window.confirm("Are you sure you want to permanently delete this listing?")) {
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/listings/${id}`, {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` }
            });

            const result = await response.json();

            if (response.ok) {
                setListings(listings.filter((listing) => listing._id !== id));
            } else {
                alert("Couldn't delete: " + result.message);
            }
        } catch (error) {
            console.error("Error with delete: ", error);
            alert("An error occurred :(");
        }
    };

    const handleStatusChange = async function (id, currentStatus) {
        const newStatus = currentStatus === "Available" ? "Sold" : "Available";

        try {
            const response = await fetch(`http://localhost:5000/listings/${id}`, {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${user.token}`,
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({ status: newStatus })
            });

            if (response.ok) {
                setListings(listings.map(listing =>
                    listing._id === id ? { ...listing, status: newStatus } : listing
                ));
            }
        } catch (error) {
            console.error("Error updating status: ", error);
        }
    };

    const deleteUser = async function () {
        if (!window.confirm("Are you sure you want to permanently delete your account? \nYou will lose all of your listings.")) {
            return;
        }

        try {
            const response = await fetch("http://localhost:5000/auth/delete", {
                method: "DELETE",
                headers: { Authorization: `Bearer ${user.token}` }
            });

            const result = await response.json();

            if (response.ok) {
                alert("Your account has been deleted");
                navigate("/auth/register");
            } else {
                alert("Couldn't delete: " + result.message);
            }
        } catch (error) {
            console.error("Error with delete: ", error);
        }
    };

    if (loading) {
        return <h2 className="loading-text">Loading your listings...</h2>;
    }

    return (
        <div className="profile">
            <h1>Profile</h1>

            <div className="profile-actions">
                <Link to="/create" className="create-listing-btn">
                    <button>Create Listing</button>
                </Link>
            </div>

            <div className="profile-actions">
                <button onClick={deleteUser}>Delete Account</button>
            </div>

            <div className="user-listings">
                <h3>Your Listings</h3>

                {listings.length === 0 ? (
                    <p className="no-listings">You haven't created any listings yet.</p>
                ) : (
                    <div className="listings-grid">
                        {listings.map((listing) => (
                            <div className="listing-card" key={listing._id}>
                                <div className="card-content">
                                    <img
                                        src={listing.images && listing.images[0] ? listing.images[0] : "placeholder.png"}
                                        alt={listing.title}
                                    />
                                    <h4 className="listing-title">{listing.title}</h4>
                                    <p className="listing-desc">{listing.description}</p>

                                    <div className="listing-meta">
                                        <span className="meta-price">${listing.price}</span>
                                        <span className="meta-category">{listing.category}</span>
                                        <span className={`meta-status ${listing.status === "Available" ? "status-avail" : "status-sold"}`}>
                                            {listing.status}
                                        </span>
                                    </div>

                                    <div className="card-actions">
                                        <button onClick={() => handleStatusChange(listing._id, listing.status)}>
                                            Mark as {listing.status === "Available" ? "Sold" : "Available"}
                                        </button>
                                        <Link to={`/edit/${listing._id}`}>
                                            <button className="edit-btn">Edit Listing</button>
                                        </Link>
                                        <button
                                            className="delete-btn"
                                            onClick={() => handleDelete(listing._id)}
                                        >
                                            Delete Listing
                                        </button>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                )}
            </div>
        </div>
    );
};

export default Profile;