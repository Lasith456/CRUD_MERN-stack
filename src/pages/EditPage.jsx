import axios from "axios";
import { useEffect, useState } from "react";
import {useParams} from "react-router-dom";
import { useNavigate } from 'react-router-dom';
import { toast } from "react-toastify";
import {VITE_BACKEND_URL} from "../App";

const EditPage = ()=>{
    let {id}=useParams();
    const [isLoading, setIsLoading]= useState(false);
    const navigate = useNavigate();
    const [product, setProduct] = useState({
        name:"",
        quantity:"",
        price:"",
        image:""
    })
    const getProduct = async() => {
        setIsLoading(true);
        const response=await axios.get(`${VITE_BACKEND_URL}/api/product/${id}`)
        setProduct({
            name: response.data.name,
            quantity: response.data.quantity,
            price: response.data.price,
            image: response.data.image,
        })
        setIsLoading(false);
    }
    const updateProduct = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            const response = await axios.put(`${VITE_BACKEND_URL}/api/product/${id}`, product);
            toast.success(`update ${response.data.name} successfully.`);
            navigate("/");
        } catch (error) {
            setIsLoading(false);
            toast.error(error.message);
        }
    }
    
    useEffect(()=>{
        getProduct();
    },[])
return(
    <div className="max-w-lg mx-auto mt-6 bg-white rounded shadow-lg p-7">
    <h2 className="block mb-4 text-2xl font-semibold text-center">
        Update a Product - {product.name}
    </h2>
    {isLoading ? ("Loading ...."):(
        <form onSubmit={updateProduct}>
        <div className="space-y-2">
            <div>
                <label htmlFor="">Name</label>
                <input type="text" value={product.name} onChange={(e) => setProduct({...product, name: e.target.value})} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Name" />
            </div>
            <div>
                <label htmlFor="">Quantity</label>
                <input type="number" value={product.quantity} onChange={(e) => setProduct({...product, quantity: e.target.value})} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Quantity" />
            </div>
            <div>
                <label htmlFor="">Price</label>
                <input type="number" value={product.price} onChange={(e) => setProduct({...product, price: e.target.value})} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Price" />
            </div>
            <div>
                <label htmlFor="">Image URL</label>
                <input type="text" value={product.image} onChange={(e) => setProduct({...product, image: e.target.value})} className="block w-full p-3 text-gray-600 placeholder-gray-400 border rounded focus:outline-none focus:shadow-outline focus:border-blue-200" placeholder="Enter Product Image URL" />
            </div>
            <div>
                {!isLoading && (<button type="submit" className="block w-full px-4 py-2 mt-6 font-bold text-white bg-blue-700 rounded-sm hover:bg-blue-600 hover:cursor-pointer">Update</button>)}
            </div>
        </div>
    </form>
    )}
</div>
)
}
export default EditPage;