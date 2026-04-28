import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";
import {useAuthContext} from "../CustomHooks/useAuthContext"

const ListingDetails = function () {
    
    const [listing, setListing] = useState("");
    const [loading, setLoading] = useState(true);
    const [message, setMessage] = useState("");
    const {id} = useParams();
    const {user} = useAuthContext();

    //gets the specific listing form the database
    useEffect (function () {

        const getListing = async function () {

            try {

                setLoading(true);

                //using axios to make a get request to the database to display the specfic listing (based on the provided listing _id)
                const response = await axios.get(`http://localhost:5000/listings/${id}`)

                setListing(response.data);
            } catch (error) {
                console.log(error.message);
                
            } finally {
                setLoading(false);
            }
        }

        getListing();
    }, [id]);

    if (loading) {
        return <h1>Loading please wait...</h1>
    }

    //-----------------------logic for the buyer to send the seller an email---------------------
    const handleSubmit = async function (e) {

        e.preventDefault();
        try {
            const response = await fetch('http://localhost:5000/contact-seller', {
                method: 'POST',
                headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${user.token}`
                },
                body: JSON.stringify({
                    buyerEmail: user.email,   // the logged-in buyer's email
                    sellerEmail: listing.seller.email,   // the seller's email from the listing
                    subject: "Someone Is Interested In Your Listing!",
                    message: message
                })
            });

            if (!response.ok) {
                throw new Error('Send failed');
            }
            alert('Message sent!');

        } catch (err) {
            alert('Failed to send message.');
        }
    }
    //----------------------------------------------------------------------------------------

    return (

        <main className = "main-container"> {/* Main Content */}

            {/* listing card */}
            <article className = "detail-card listing-card">

                {/* images */}
                <div className = "image-gallery">
                    No images uploaded
                </div>
                <hr className = "card-divider" />

                {/* status and price */}
                <div className = "card-top-row">
                    <span className = "status-available">Available</span>
                    <span className = "listing-price">${listing.price}</span>
                </div>

                {/* title */}
                <h1 className = "listing-title">{listing.title}</h1>

                {/* description */}
                <p className = "listing-description"> {listing.description} </p>

                <div className = "meta-row">
                    <span className = "meta-category">
                        ~ {listing.category}
                    </span>
                    <span>|</span>
                    <span className = "meta-location">
                        ~ On Campus
                    </span>
                </div>
            </article>

            {/* contact seller */}
            <aside className = "detail-card contact-card">
                <h2 className = "contact-heading">Contact Seller</h2>

                <div className = "seller-profile">
                    <div className = "seller-info">
                        <p className = "seller-name">{listing.seller.name}</p>
                        <p className = "seller-email"> {listing.seller.email} </p>
                    </div>
                </div>

                {/* email form */}
                <form className = "contact-form" onSubmit={handleSubmit}>
                    <div className = "form-group">

                        <label for="message" className = "form-label">Body:</label>
                        <textarea
                            id="message"
                            name="message"
                            rows="4"
                            placeholder="Hi, I'm interested in..."
                            required
                            onChange={function (e) {setMessage (e.target.value)} }
                            value={message}
                        ></textarea>
                    </div>
                    <button type="submit" className = "contact-btn">Send Email</button>
                </form>

                <p className = "contact-note">
                    This will be sent to the seller's email.
                </p>
            </aside>

        </main>
    )
}

export default ListingDetails;