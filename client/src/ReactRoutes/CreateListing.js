import {useState} from "react";
import {useAuthContext} from "../CustomHooks/useAuthContext"

const CreateListing = function () {

    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [price, setPrice] = useState("");
    const [category, setCategory] = useState("Other");
    const [images, setImages] = useState([]);
    const [fileKey, setFileKey] = useState(0);
    const [error, setError] = useState(null);
    const {user} = useAuthContext();

    const handleSubmit = async function (e) {
        e.preventDefault();

        if (!user) {
            setError("You must log in");
            return;
        }

        const formData = new FormData();
        formData.append('title', title);
        formData.append('description', description);
        formData.append('price', price);
        formData.append('category', category);

        for (let i = 0; i < images.length; i++) {
            formData.append('images', images[i]);
        }

        const response = await fetch("http://localhost:5000/listings/", {
            method: "POST",
            body: formData,
            headers: {
                "Authorization": `Bearer ${user.token}`
            }
        });

        const jsonResponse = await response.json();

        if (!response.ok) {
            setError(jsonResponse.error);
        }

        if (response.ok) {
            alert("Listing Created :)");
            setTitle("");
            setDescription("");
            setPrice("");
            setCategory("Other");
            setImages([]);
            setFileKey(prev => prev + 1);
            setError(null);
        }
    }

    return (
        <div className="createContainer">
            <h1>Add New Listing:</h1>

            <form className="createForm" onSubmit={handleSubmit}>

                <label htmlFor="title">Title:</label>
                <input id="title"
                    type="text" required
                    onChange={(e) => setTitle(e.target.value)}
                    value={title}
                />

                <label htmlFor="description">Description:</label>
                <textarea id="description" required
                    onChange={(e) => setDescription(e.target.value)}
                    value={description}
                />

                <label htmlFor="price">Price:</label>
                <input id="price"
                    type="number"
                    min="0"
                    max="1500" required
                    onChange={(e) => setPrice(e.target.value)}
                    value={price}
                />

                <label htmlFor="category">Category:</label>
                <select required
                    onChange={(e) => setCategory(e.target.value)}
                    value={category}
                >
                    <option>Essentials</option>
                    <option>School Supplies</option>
                    <option>Furniture</option>
                    <option>Other</option>
                </select>

                <label htmlFor="images">Upload Images (up to 5)</label>
                <input
                    key={fileKey}
                    id="images"
                    type="file"
                    accept="image/*"
                    multiple
                    onChange={(e) => {
                        if (e.target.files.length > 5) {
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
    );
}

export default CreateListing;