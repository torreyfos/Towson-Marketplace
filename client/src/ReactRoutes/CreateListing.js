import {useState} from "react";

const CreateListing = function () {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Other");
    const [error, setError] = useState(null);

    const handleSubmit = async function (e) {
        e.preventDefault();

        const listing = {title, description, price, category};

        //gets the user's token to send to the API middleware for verification
        const token = null;

        //sending the created listing to the database
        const response = await fetch ("http://localhost:5000/listings/", {

            method: "POST",
            body: JSON.stringify(listing),
            headers: {
                "Content-Type": "application/json",
                "Authorization": `Bearer ${token}`,
            }
        });

        const jsonResponse = await response.json();

        //if an error occurs when creating the listing, output it to the console
        if (!response.ok) {
            setError(jsonResponse.error);
        }

        //if there is no error, then reset the form
        if (response.ok) {
            setTitle("");
            setDescription("");
            setPrice("");
            setCategory("Other");
            setError(null);
            console.log("Listing Created :)", jsonResponse)
        }

    }


    return (

        <div className="createContainer">
            <h1>Add New Listing:</h1>

            <form className="createForm" onSubmit = {handleSubmit}>

                <label for = "title">Title:</label>
                <input id = "title" 
                    type = "text" required
                    onChange = { function (e) {setTitle (e.target.value)} }
                    value = {title}
                />

                <label for = "description">Description:</label>
                <textarea id = "description" required
                    onChange = { function (e) {setDescription (e.target.value)} }
                    value = {description}
                />

                <label for = "price">Price:</label>
                <input id = "price" 
                    type = "number" 
                    min = "0" 
                    max = "500" required
                    onChange = { function (e) {setPrice (e.target.value)} }
                    value = {price}
                />

                <label for = "category">Category:</label>
                <select required
                    onChange = { function (e) {setCategory (e.target.value)} }
                    value = {category}
                >
                    <option>Essentials</option>
                    <option>School Supplies</option>
                    <option>Furniture</option>
                    <option selected >Other</option>
                </select>

                <button >Submit</button>
                {error && <div>{error}</div>}

            </form>
        </div>

    )
}

export default CreateListing;