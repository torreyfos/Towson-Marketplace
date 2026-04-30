import {useState, useEffect} from "react";
import {useParams, useNavigate} from "react-router-dom";
import { useAuthContext } from "../CustomHooks/useAuthContext";

const EditListing = function () {

    const {id} = useParams();
    const {user} = useAuthContext();
    const navigate = useNavigate();

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Other");
    const [status, setStatus] = useState("Available");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(true);

    //--------------------------gets the specific listing details----------------------------
    useEffect( function () {

        const getListing = async function () {

            try {

                const response = await fetch(`http://localhost:5000/listings/${id}`);
                const data = await response.json();

                if (!response.ok) {
                    throw new Error(data.message || "Could get listing");
                }

                setTitle(data.title);
                setDescription(data.description);
                setPrice(data.price);
                setCategory(data.category);
                setStatus(data.status);

            } catch (error) {
                setError(error.message);

            } finally {
                setLoading(false);
            }
        };

        if(user) {
            getListing();
        }

    }, [id, user]);
//------------------------------------------------------------------------------------------

    //-------------------handles sending the PATCH request------------------------------------------ 
    const handleSubmit = async function (e) {

        e.preventDefault();
        const listing = { title, description, price: Number(price), category, status };

        try {
            
            const response = await fetch(`http://localhost:5000/listings/${id}`, {
                method: "PATCH",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${user.token}`
                },
                body: JSON.stringify(listing)
            });

            const result = response.json();

            if(!response.ok) {
                throw new Error(result.error || "Edit failed :(");

            }

            alert("Listing updated successfully :)");
            navigate("/profile");

        } catch (error) {

            setError(error.message);
        }
    }
//----------------------------------------------------------------------------------------------------

    if (error && !title) {
        return <p className = "error">Error: {error} </p>;
    }

    return (
        <div className="createContainer">
            <h1>Edit Listing</h1>

            <form className="createForm" onSubmit = {handleSubmit}>
                <label htmlFor="title">Title:</label>
                <input
                    id="title"
                    type="text"
                    required
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />

                <label htmlFor="description">Description:</label>
                <textarea
                    id="description"
                    required
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />

                <label htmlFor="price">Price:</label>
                <input
                    id="price"
                    type="number"
                    min="0"
                    max="1500"
                    required
                    value={price}
                    onChange={(e) => setPrice(e.target.value)}
                />

                <label htmlFor="category">Category:</label>
                <select
                    required
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                >
                    <option>Essentials</option>
                    <option>School Supplies</option>
                    <option>Furniture</option>
                    <option>Other</option>
                </select>

                <label htmlFor="status">Status:</label>
                <select
                    required
                    value={status}
                    onChange={(e) => setStatus(e.target.value)}
                >
                <option>Available</option>
                <option>Sold</option>
                </select>

                <button type="submit">Update Listing</button>
                {error && <div className="error">{error}</div>}
            </form>
        </div>
    );

}

export default EditListing;