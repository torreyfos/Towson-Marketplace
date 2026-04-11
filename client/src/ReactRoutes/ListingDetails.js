import {useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import axios from "axios";

const ListingDetails = function () {
    
    const [listing, setListing] = useState("");
    const [loading, setLoading] = useState(true);
    const {id} = useParams();

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

    return (

        <div >

            <h1>Listing Details:</h1>
                    
            <li className="listingDetails">
                
                <div className="item-info">

                    {/* displays the details of a listing*/}
                    <p className="item-price">${listing.price}</p>
                    <p className="item-status"> - {listing.status}</p>
                    <p className="item-title">{listing.title}</p>
                    <p className="item-description">{listing.description}</p>
                    <p className="item-category">{listing.category} · On Campus</p>

                </div>
            </li>

            <br />
            <br />
            <h2>Contact Seller:</h2>
            <div className="contactDetails">

                {/* display seller's name and email*/}
                <p>{listing.seller.name}</p>
                <p>{listing.seller.email}</p>

            </div>

                

            {/* </div>

                <h2>Title:</h2>
                <h3>{listing.title}</h3>

                <h2>Price:</h2>
                <h3>${listing.price}</h3>

                <h2>Description:</h2>
                <h3>{listing.description}</h3>

                <h2>Status:</h2>
                <h3>{listing.status}</h3>

                <h2>Category:</h2>
                <h3>{listing.category}</h3>

                <h2>Seller: </h2>
                <h3>{listing.seller.name}</h3>

                <h2>Email:</h2>
                <h3>{listing.seller.email}</h3>
            </div> */}

        </div>
    )
}

export default ListingDetails;