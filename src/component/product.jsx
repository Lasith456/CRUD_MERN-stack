import axios from 'axios';
import { Link } from 'react-router-dom';
import { toast } from "react-toastify";
import Swal from 'sweetalert2'
import {VITE_BACKEND_URL} from "../App";

const Product = ({ product, getProducts }) => {
    const deleteProduct =async (id) =>{
        const result= await Swal.fire({
            title: "Do you really want to delete this product?",
            icon: "warning",
            showCancelButton: true,
            confirmButtonColor: "#3085d6",
            cancelButtonColor: "#d33",
            confirmButtonText: "Yes, delete it!"
            })
            if (result.isConfirmed) {
                try {
                    await axios.delete(`${VITE_BACKEND_URL}/api/product/${id}`);
                    toast.success(`Delete a product successfully.`);
                    getProducts();
                } catch (error) {
                    toast.error(error.message);
                }
            }
        
    }
    return (
        <div className="overflow-hidden bg-white rounded shadow-lg">
            <img src={product.image} alt="product Image" className="object-cover w-full h-28"/>
            <div className="px-4 pt-2 pb-4">
                <h2 className="font-semibold text">{product.name}</h2>
                <div className="text-sm">Quantity: {product.quantity}</div>
                <div className="text-sm">Price: ${product.price}</div>

                <div className="flex gap-4 mt-2">
                    <Link to={`/edit/${product._id}`} className="inline-block w-full px-4 py-1 text-sm font-bold text-center text-white bg-gray-700 rounded-sm shadow-md hover:bg-gray-600 hover:cursor-pointer">Edit</Link>
                    <button onClick={()=> deleteProduct(product._id)}className="inline-block w-full px-4 py-1 text-sm font-bold text-center text-white bg-red-700 rounded-sm shadow-md hover:bg-red-600 hover:cursor-pointer">Delete</button>

                </div>
            </div>
           
        </div>
    );
}

export default Product;
