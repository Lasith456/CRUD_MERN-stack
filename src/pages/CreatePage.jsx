import axios from "axios";
import { useState } from "react";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {VITE_BACKEND_URL} from "../App";

const CreatePage = () => {

    const [name, setName] = useState("");
    const [quantity, setQuantity] = useState("");
    const [price, setPrice] = useState("");
    const [imageURL, setImageURL] = useState("");
    const [isLoading, setIsLoading] = useState(false);
    const navigate = useNavigate();

    const saveProduct = async (e) => {
        e.preventDefault();
        if (name === "" || quantity === "" || price === "" || imageURL === "") {
            toast.warn("Please Fill Out All Inputs Completely");
            return;
        }
        try {
            setIsLoading(true);
            const response = await axios.post(`${VITE_BACKEND_URL}/api/product`, {
                name: name,
                quantity: quantity,
                price: price,
                image: imageURL
            });
            toast.success(`Save ${response.data.name} successfully.`);
            setIsLoading(false);
            navigate("/");
        } catch (error) {
            toast.error(error.message);
        }
    }

    return (
        <div className="max-w-lg mx-auto mt-6 bg-white rounded shadow-lg p-7">
            <h2 className="block mb-4 text-2xl font-semibold text-center">
                Add New Product
            </h2>
            <form onSubmit={saveProduct}>
                <div className="space-y-2">
                    <div>
                        <label htmlFor="">Name</label>
                        <input type="text" value={name} onChange={(e) => setName(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Name" />
                    </div>
                    <div>
                        <label htmlFor="">Quantity</label>
                        <input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Quantity" />
                    </div>
                    <div>
                        <label htmlFor="">Price</label>
                        <input type="number" value={price} onChange={(e) => setPrice(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Price" />
                    </div>
                    <div>
                        <label htmlFor="">Image URL</label>
                        <input type="text" value={imageURL} onChange={(e) => setImageURL(e.target.value)} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Image URL" />
                    </div>
                    <div>
                        {!isLoading && (<button type="submit" className="block w-full px-4 py-2 mt-6 font-bold text-white bg-blue-700 rounded-sm hover:bg-blue-600 hover:cursor-pointer">Add Product</button>)}
                    </div>
                </div>
            </form>
        </div>
    )
}
export default CreatePage;
