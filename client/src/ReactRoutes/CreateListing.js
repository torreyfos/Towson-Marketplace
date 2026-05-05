import {useState} from "react";

const CreateListing = function () {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Other");
    const [images, setImages] = useState([]);
    const [fileKey, setFileKey] = useState(0);
    const [error, setError] = useState(null);

    const handleSubmit = async function (e) {
        e.preventDefault();
        console.log("handlesubmit fired");

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);
        
        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        const token = localStorage.getItem('token');
        console.log("token:", token);
        console.log("about to fetch...");


        //sending the created listing to the database
        const response = await fetch ("http://localhost:5000/listings/", {

            method: "POST",
            body: formData,
            headers: {
               "Authorization": `Bearer ${token}`
            }
        });
        console.log("fetch response status:", response.status)

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
            setImages([]);
            setFileKey(prev => prev + 1);
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

                <label htmlFor="images">Upload Images (up to 5)</label>
                <input
                    key={fileKey}
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        if(e.target.files.length > 5){
                            setError("Maximum 5 images allowed");
                            return;
                        }
                        setImages(e.target.files);
                    }}
                    />

                <button type="submit">Submit</button>
                {error && <div>{error}</div>}

            </form>
        </div>

    )
}

export default CreateListing;