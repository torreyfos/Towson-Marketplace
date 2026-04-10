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

            <div className="listingDetails">

                {/* displays the details of a listing*/}
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
            </div>

        </div>
    )
}

export default ListingDetails;